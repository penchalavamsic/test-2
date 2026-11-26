const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const env = fs.existsSync(path.join(root,'.env')) ? dotenv.parse(fs.readFileSync(path.join(root,'.env'))) : {};
const secrets = Object.entries(env).filter(([key,value])=> /PASSWORD|SECRET|TOKEN|USERNAME/.test(key) && value.length >= 4);
function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]);
}
const files = ['tests','scripts','config','reporters'].flatMap(dir=>walk(path.join(root,dir))).filter(file=>/\.(ts|js|cjs|json)$/.test(file));
const findings=[];
for(const file of files){
  const text=fs.readFileSync(file,'utf8');
  // Match credential literals in credential-bearing assignments/calls, not
  // substrings in imports, comments or ordinary test IDs and product text.
  const source=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
  function visit(node){
    if(ts.isStringLiteralLike(node)){
      let context=node.parent;
      while(context && !ts.isVariableDeclaration(context) && !ts.isPropertyAssignment(context) && !ts.isCallExpression(context)) context=context.parent;
      const label=context && (ts.isVariableDeclaration(context)||ts.isPropertyAssignment(context)) ? context.name.getText(source)
        : context && ts.isCallExpression(context) ? context.expression.getText(source) : '';
      if(/password|username|secret|token|credentials/i.test(label)){
        for(const [key,value] of secrets) if(node.text===value) findings.push({file:path.relative(root,file).replaceAll('\\','/'),line:source.getLineAndCharacterOfPosition(node.getStart()).line+1,environmentKey:key});
      }
    }
    ts.forEachChild(node,visit);
  }
  visit(source);
}
// Never print the matched value or source line.
console.log(JSON.stringify({scannedFiles:files.length,findingCount:findings.length,findings:findings.slice(0,50)},null,2));
if(findings.length)process.exitCode=1;
