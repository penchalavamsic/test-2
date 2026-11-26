const fs = require('fs'), path = require('path');
const { redactText } = require('./lib/evidence-redaction.cjs');
const root = path.resolve(__dirname, '..');
const doc = 'docs/execution-records/earlier-crud-repair';
const group = 'test-runs/earlier-crud-20261126';
const read = p => JSON.parse(fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,''));
const baseline = read(doc + '/baseline-review-inventory.json');
const rows = new Map(baseline.cases.map(c=>[c.id,{...c,currentStatus:c.baselineStatus,reviewStatus:'pending',latestRun:'',completedAt:'',reason:'Not reviewed in this phase yet.',nextAction:'Inspect the deployed workflow, then repair and execute the relevant cases.'}]));
const attempts=[];
function walk(s,visit,parents=[]){const context=[...parents,s.title||''];for(const sp of s.specs||[]){const id=[...context,sp.title].join(' ').match(/LIMAS-SUD-\d+/)?.[0];visit({...sp,title:/LIMAS-SUD-\d+/.test(sp.title)||!id?sp.title:id+': '+sp.title});}for(const child of s.suites||[])walk(child,visit,context);}
for(const suite of baseline.scope){const folder=path.join(root,group,suite);if(!fs.existsSync(folder))continue;for(const name of fs.readdirSync(folder)){
 const run=group+'/'+suite+'/'+name;
 if(!fs.existsSync(path.join(root,run,'run-metadata.json')))continue;
 const m=read(run+'/run-metadata.json');if(!m.completedAt||!fs.existsSync(path.join(root,run,'results.json')))continue;
 const data=read(run+'/results.json'),counts={passed:0,failed:0,skipped:0};
 for(const s of data.suites||[])walk(s,sp=>{const id=sp.title.match(/LIMAS-SUD-\d+/)?.[0];if(!rows.has(id))return;for(const t of sp.tests||[]){const r=t.results?.at(-1);if(!r)continue;const status=r.status==='passed'?'passed':r.status==='skipped'?'skipped':'failed';counts[status]++;const old=rows.get(id);if(old.completedAt>m.completedAt)continue;let reason=status==='passed'?'Latest repaired execution passed.':status==='skipped'?(t.annotations||[]).filter(a=>a.type==='skip'||a.type==='unavailable-data').map(a=>a.description).join('; '):(r.errors||[]).map(e=>e.message||'').join('\n');reason=redactText(reason).replace(/\u001b\[[0-9;]*m/g,'').replace(/\b[A-Z]:[\\/][^\r\n]+/gi,'[portable source location]');rows.set(id,{...old,title:sp.title,currentStatus:status,reviewStatus:'executed',latestRun:run,completedAt:m.completedAt,reason,nextAction:status==='passed'?'Retain the verified functional assertions.':status==='skipped'?'Reevaluate the data prerequisite on the next run; do not permanently disable the case.':'Inspect the current evidence and verified findings. Fix script errors; retain genuine application failures.'});}});
 attempts.push({run,batch:m.batch,completedAt:m.completedAt,packagingExitCode:m.packagingExitCode,...counts});
}}
const findings=read(doc+'/verified-findings.json').findings;
const batches=new Map(read('config/execution-batches.json').batches.flatMap(b=>b.cases.map(c=>[c.id,b.name])));
for(const row of rows.values()){
 row.batch=batches.get(row.id)||'';
 if(row.reviewStatus==='executed'&&row.currentStatus==='failed'){
  row.diagnosticError=row.reason;
  const matches=findings.filter(f=>f.ids.includes(row.id)&&f.classification.startsWith('application-'));
  if(matches.length){row.reason=matches.map(f=>f.reason).join(' ');row.nextAction=matches.map(f=>f.nextAction).join(' ');}
 }
}
const reviewedFile=path.join(root,doc,'reviewed-structural-cases.json');
if(fs.existsSync(reviewedFile))for(const review of read(doc+'/reviewed-structural-cases.json').cases){const row=rows.get(review.id);if(row?.reviewStatus==='pending'&&row.baselineStatus==='passed'){row.reviewStatus='source-reviewed';row.reason=review.reason;row.nextAction='Retain the existing read-only scenario. Historical pass is not counted as a newly executed result.';}}
const all=[...rows.values()].sort((a,b)=>a.suite.localeCompare(b.suite)||a.id.localeCompare(b.id));
const executed=all.filter(c=>c.reviewStatus==='executed');
const counts=items=>({cases:items.length,passed:items.filter(c=>c.currentStatus==='passed').length,failed:items.filter(c=>c.currentStatus==='failed').length,skipped:items.filter(c=>c.currentStatus==='skipped').length});
for (const row of all) if (row.reviewStatus === 'executed' && row.currentStatus === 'skipped' && /manual verification/i.test(row.reason)) row.nextAction = 'Complete the agreed download/export verification manually and record its outcome.';
const additionalReview=new Set(read(doc+'/additional-review-candidates.json').map(c=>c.id));
const pending=all.filter(c=>c.reviewStatus==='pending'&&(c.baselineStatus!=='passed'||c.mutationCandidate||c.nonDataSkip||additionalReview.has(c.id))); 
const status={updatedAt:new Date().toISOString(),phase:'Earlier-tab CRUD and assumption repairs in progress',scope:baseline.scope,latestExecuted:counts(executed),historicalPlusLatest:counts(all),completedAttempts:attempts.length,sourceReviewedHistoricalPasses:all.filter(c=>c.reviewStatus==='source-reviewed').length,pendingReviewCandidates:pending.length,bySuite:baseline.scope.map(s=>({suite:s,latestExecuted:counts(executed.filter(c=>c.suite===s)),pendingReviewCandidates:pending.filter(c=>c.suite===s).length})),warning:'Historical plus latest totals include old unreviewed results; they are not a new full regression run.'};
fs.writeFileSync(path.join(root,doc,'status.json'),JSON.stringify(status,null,2));
fs.writeFileSync(path.join(root,doc,'execution-attempts.json'),JSON.stringify(attempts,null,2));
fs.writeFileSync(path.join(root,doc,'all-cases.json'),JSON.stringify(all,null,2));
const columns=['id','suite','batch','title','baselineStatus','currentStatus','reviewStatus','latestRun','reason','nextAction'];
const csv=rs=>columns.join(',')+'\n'+rs.map(r=>columns.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
for(const [name,rs]of [['all-cases',all],['failed-cases',executed.filter(c=>c.currentStatus==='failed')],['skipped-cases',executed.filter(c=>c.currentStatus==='skipped')],['pending-review',pending]])fs.writeFileSync(path.join(root,doc,name+'.csv'),csv(rs));
let text='EARLIER TABS - CRUD REPAIR STATUS\n\nThis phase is IN PROGRESS. Old pass counts are not newly verified results.\n\nLATEST EXECUTED CASES\n'+JSON.stringify(status.latestExecuted)+'\nCompleted targeted execution attempts: '+attempts.length+'\n\nTAB PROGRESS\n';
for(const s of status.bySuite)text+=s.suite+': '+s.latestExecuted.cases+' reviewed executions; '+s.latestExecuted.passed+' passed, '+s.latestExecuted.failed+' failed, '+s.latestExecuted.skipped+' skipped; '+s.pendingReviewCandidates+' remaining review candidates.\n';
text+='\nSOURCE-REVIEWED HISTORICAL PASSES\n'+status.sourceReviewedHistoricalPasses+' existing read-only cases were inspected for CRUD scope. They are not new executions or newly verified passes.\n';
text+='\nFAILED: REASON AND NEXT ACTION\n';for(const r of executed.filter(c=>c.currentStatus==='failed'))text+=r.id+' - '+r.title+'\n'+r.reason+'\nNext: '+r.nextAction+'\nEvidence: '+r.latestRun+'\n\n';
text+='\nSKIPPED\n';const skipped=executed.filter(c=>c.currentStatus==='skipped');text+=skipped.length?skipped.map(r=>r.id+': '+r.reason).join('\n'):'No skips in the latest executed cases of this phase.';
text+='\n\nPOLICY\nOnly genuinely unavailable data may cause a skip, except the explicitly agreed manual download/Excel-export checks. Disposable CRUD prerequisites are created when supported. Cleanup failures and application errors remain failures. Failed mutations are not automatically repeated.\n\nDETAILS\nSee docs/execution-records/earlier-crud-repair for all cases, pending review, individual reasons, attempts, and verified findings.\nThe active office-repair upload remains pinned to its completed snapshot. These new repairs are not claimed to be included in that upload.\n';
fs.writeFileSync(path.join(root,'EARLIER-CRUD-REPAIR-STATUS.txt'),text);
console.log(JSON.stringify(status));
