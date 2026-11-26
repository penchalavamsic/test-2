const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { exactIdPattern } = require('./run-batches.cjs');
const root = path.resolve(__dirname, '..');
function check(args) {
  const result = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`Offline check failed: ${args[0]}\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)]); }
try {
  check([require.resolve('typescript/bin/tsc'), '--noEmit', '--pretty', 'false']);
  check([path.join(__dirname,'instrument-evidence.cjs'),'--check']);
  check([path.join(__dirname,'run-batches.cjs'),'--list']);
  const inventory = JSON.parse(fs.readFileSync(path.join(root,'config/execution-batches.json'),'utf8'));
  const cases=inventory.batches.flatMap(batch=>batch.cases);
  const plans=walk(path.join(root,'plans')).filter(file=>file.endsWith('.md')).map(file=>path.relative(root,file).replaceAll('\\','/'));
  const coverage=[];
  for(const batch of inventory.batches){
    const pattern=new RegExp(exactIdPattern(batch.cases.map(item=>item.id)));
    const selected=cases.filter(item=>item.file.split('/')[0]===batch.suite && pattern.test(item.fullTitle));
    if(selected.length!==batch.cases.length)throw new Error(`${batch.name}: selection count mismatch`);
    const perCase=batch.cases.map(item=>{
      const source=fs.readFileSync(path.join(root,'tests',item.file),'utf8');
      const matchingPlans=plans.filter(file=>path.basename(file).startsWith(`${item.id}-`) || path.basename(file)===`${item.id}.md`);
      return {id:item.id,file:item.file,workbookMapped:!!item.workbook,plans:matchingPlans,
        // File-level signals require review in context, not automatic assertion changes.
        sourceReview:{containsSkipOrFixme:/test\.(skip|fixme)\(/.test(source),containsFixedWait:/waitForTimeout\(/.test(source)},
        functionalStatus:'not-run-offline'};
    });
    coverage.push({name:batch.name,suite:batch.suite,cases:perCase,checks:{typescript:'passed',collection:'passed',exactSelection:'passed',evidenceInstrumentation:'passed'},functionalStatus:'not-run-offline'});
  }
  const result={workbook:inventory.workbook,workbookSha256:inventory.workbookSha256,
    workbookOnly:inventory.workbookOnly,scriptOnly:inventory.scriptOnly,
    note:'Static checks and synthetic framework tests do not establish application test outcomes.',batches:coverage};
  fs.writeFileSync(path.join(root,'config/batch-validation.json'),JSON.stringify(result,null,2)+'\n');
  const planGaps=coverage.flatMap(batch=>batch.cases).filter(item=>item.plans.length!==1);
  console.log(JSON.stringify({batches:coverage.length,cases:cases.length,workbookOnly:inventory.workbookOnly.length,scriptOnly:inventory.scriptOnly.length,nonUniquePlanMappings:planGaps.length,staticChecks:'passed',applicationTests:'not run'},null,2));
} catch(error){console.error(error.message);process.exitCode=1;}
