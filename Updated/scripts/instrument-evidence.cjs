// AST-guided, idempotent instrumentation. Never rewrites selectors or assertions.
// --check reports uninstrumented operations without editing source files.
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const actions = new Set(['click', 'dblclick', 'fill', 'clear', 'press', 'pressSequentially', 'type', 'check', 'uncheck', 'setChecked', 'selectOption', 'setInputFiles', 'hover', 'tap', 'dragTo', 'focus', 'blur', 'goto', 'reload', 'goBack', 'goForward', 'wheel', 'down', 'up', 'move']);
const changes = [];
const unsupported = [];
let existingEvidence = 0;
for (const source of program.getSourceFiles()) {
  const relative = path.relative(root, source.fileName).replaceAll('\\', '/');
  if (!relative.startsWith('tests/') || /tests\/(fixtures|test-data)\//.test(relative)) continue;
  if (/tests\/helpers\//.test(relative) && !/\/(auth|evidence)\.ts$/.test(relative)) continue;
  const text = source.text;
  const edits = [];
  function visit(node, wrapped = false) {
    if (ts.isCallExpression(node) && ['recordEvidence', 'verify', 'performAction', 'clickAndCapture', 'pressAndCapture', 'fillAndCapture', 'reloadAndCapture', 'navigateAndCapture'].includes(node.expression.getText(source))) { existingEvidence++; return; }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const method = node.expression.name.text;
      const receiver = node.expression.expression;
      const receiverText = receiver.getText(source);
      const assertion = /^expect(?:\.|\()/.test(receiverText) && /^(to|last|nth)/.test(method);
      const step = receiverText === 'test' && method === 'step';
      const type = checker.typeToString(checker.getTypeAtLocation(receiver));
      const domAction = method === 'evaluate' && /\.click\(|dispatchEvent\(|\.scrollTop\s*=|\.scrollTo\(|\.focus\(|\.value\s*=/.test(node.getText(source));
      const action = (actions.has(method) || domAction) && /^(Page|Locator|Frame|FrameLocator|Keyboard|Mouse|Touchscreen)$/.test(type);
      if (assertion || action || step) {
        let fn = node.parent;
        while (fn && !ts.isFunctionLike(fn)) fn = fn.parent;
        const async = fn?.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
        if (!async && !action) {
          unsupported.push({ file: relative, line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1, method });
        } else {
          const start = node.getStart(source), end = node.getEnd();
          const line = source.getLineAndCharacterOfPosition(start).line + 1;
          // Await sync assertions too. For Promise.all actions preserve the promise
          // shape and keep network/event observers registered before interaction.
          const prefix = assertion && !ts.isAwaitExpression(node.parent) ? 'await ' : '';
          edits.push({ start, end, prefix: `${prefix}recordEvidence('${assertion ? 'assert' : step ? 'step' : 'action'}-${method}-${path.basename(relative, '.ts')}-${line}', async () => `, suffix: ')' });
        }
      }
    }
    ts.forEachChild(node, child => visit(child, wrapped));
  }
  visit(source);
  if (!edits.length) continue;
  // Insert boundaries rather than replacing nodes, preserving nested operations.
  const insertions = new Map();
  for (const edit of edits) {
    insertions.set(edit.start, (insertions.get(edit.start) || '') + edit.prefix);
    insertions.set(edit.end, edit.suffix + (insertions.get(edit.end) || ''));
  }
  let output = text;
  for (const [index, value] of [...insertions].sort((a,b)=>b[0]-a[0])) output = output.slice(0,index)+value+output.slice(index);
  const helper = path.relative(path.dirname(source.fileName), path.join(root, 'tests/helpers/step-evidence')).replaceAll('\\', '/');
  if (!/import \{ recordEvidence \}/.test(output)) output = `import { recordEvidence } from '${helper.startsWith('.') ? helper : './'+helper}';\n` + output.replace(/^\uFEFF/, '');
  changes.push({ file: relative, operations: edits.length });
  if (!process.argv.includes('--check')) fs.writeFileSync(source.fileName, output);
}
fs.mkdirSync(path.join(root, 'temp/framework-audit'), { recursive: true });
fs.writeFileSync(path.join(root, 'temp/framework-audit/evidence-coverage.json'), JSON.stringify({ changes, unsupported, existingEvidence }, null, 2));
console.log(JSON.stringify({ files: changes.length, operations: changes.reduce((n,c)=>n+c.operations,0), unsupported: unsupported.length, existingEvidence }));
if (process.argv.includes('--check') && changes.length) process.exitCode = 1;
