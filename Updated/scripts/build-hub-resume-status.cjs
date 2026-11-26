const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),groupName='super-admin-live-20261125',group=path.join(root,'test-runs',groupName);
const summary=JSON.parse(fs.readFileSync(path.join(group,'execution-summary.json'))),status=JSON.parse(fs.readFileSync(path.join(root,'execution-status/status-data.json')));
const inventory=JSON.parse(fs.readFileSync(path.join(root,'config/execution-batches.json')));
const resume=JSON.parse(fs.readFileSync(path.join(group,'execution-resume.json')));
const hub=summary.cases.filter(c=>c.suite==='user-license-hub');
const resumed=hub.filter(c=>{const n=Number(c.id.split('-').at(-1));return n>=1286&&n<=1481;});
const counts=cases=>({total:cases.length,passed:cases.filter(c=>c.status==='passed').length,failed:cases.filter(c=>['failed','timedOut'].includes(c.status)).length,skipped:cases.filter(c=>c.status==='skipped').length,remaining:cases.filter(c=>['pending','not-run','interrupted'].includes(c.status)).length});
const allCounts=counts(hub),resumeCounts=counts(resumed);
const batches=inventory.batches.filter(b=>resume.batches.includes(b.name)).map(b=>({batch:b.name,...counts(b.cases.map(c=>resumed.find(x=>x.id===c.id)).filter(Boolean))}));
const repairs=JSON.parse(fs.readFileSync(path.join(group,'automation-repairs.json'))).repairs.filter(r=>(r.ids||[]).some(id=>resumed.some(c=>c.id===id)));
const skipGroups={};for(const c of resumed.filter(c=>c.status==='skipped')){const reason=(c.annotations||[]).filter(a=>a.type==='skip').map(a=>a.description).filter(Boolean).join('; ')||'See individual result';(skipGroups[reason]??=[]).push(c.id);}
const text=[
'USER & LICENSE HUB - CURRENT EXECUTION STATUS',
'Updated: '+new Intl.DateTimeFormat('en-GB',{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date())+' IST',
'Scope: ULH-019 through ULH-028; Super Admin; important screenshots, videos and traces.',
'Status: '+resume.status,resume.completionMeaning||'Review in progress.','',
'1. THIS RESUME (196 PLANNED CASES)',
`${resumeCounts.passed} passed; ${resumeCounts.failed} failed; ${resumeCounts.skipped} skipped; ${resumeCounts.remaining} remaining.`,
'Latest results only. Original failed attempts remain. Skips are not passes.','',
'2. BATCH RESULTS',...batches.map(b=>`${b.batch}: ${b.passed} passed / ${b.failed} failed / ${b.skipped} skipped / ${b.remaining} remaining (${b.total} cases).`),'',
'3. ENTIRE USER & LICENSE HUB',
`${allCounts.total} planned; ${allCounts.passed} passed; ${allCounts.failed} failed; ${allCounts.skipped} skipped; ${allCounts.remaining} remaining.`,
'Previously recorded failures from ULH-001 through ULH-018 are included; they were not automatically rerun in this resume.','',
'4. FAILURES IN THESE TEN BATCHES',
...resumed.filter(c=>['failed','timedOut'].includes(c.status)).map(c=>`${c.id}: ${c.title}\n  Evidence: test-runs/${groupName}/${c.run}/Test-Reports/Complete-Suite-Test-Report.zip`),
...(resumeCounts.failed?[]:['None in the latest results.']),
'All Hub failures and classifications are listed in execution-status/03-failed-cases.csv.','',
'5. SKIPPED CASES',...Object.entries(skipGroups).map(([reason,ids])=>`${reason}\n  ${ids.join(', ')}`),
'Existing mutation gates and controlled-failure prerequisites remain. No skipped mutation scenario is claimed as executed.','',
'6. SCRIPT CORRECTIONS',...repairs.map(r=>`${(r.ids||[]).join(', ')}: ${r.change}\n  Verification: ${r.verification||'See repair record.'}`),'',
'7. EVIDENCE',
'Batch reports: test-runs/'+groupName+'/user-license-hub/',
'Each run contains Test-Reports/Complete-Suite-Test-Report.zip and individual test report ZIPs.',
'Extract the whole report ZIP before opening index.html. Keep all internal folders together.',
'ULH-018 packaging was completed without rerunning its application tests.',
'Privacy/path verification results are in each processed run/path-verification.json.',
'Coverage gaps in existing scripts remain documented in docs/execution-records/coverage-mapping-findings.json. A pass covers the implemented assertions, not missing assertions.',
'No GitHub upload of this resumed Hub execution has been performed. Original report media remains local.','',
'8. OTHER TABS',
'Other pending tabs were not resumed. Server Licensing remains excluded.',
'See EXECUTION-STATUS.html for the whole project and execution-status/08-remaining-batches.csv for remaining batches.'
];
fs.writeFileSync(path.join(root,'USER-LICENSE-HUB-STATUS.txt'),text.join('\r\n')+'\r\n');
fs.writeFileSync(path.join(group,'hub-resume-summary.json'),JSON.stringify({generatedAt:new Date().toISOString(),status:resume.status,resumeCounts,allCounts,batches,skipGroups},null,2));
const docdir=path.join(root,'docs/execution-records');fs.mkdirSync(docdir,{recursive:true});
for(const name of ['automation-repairs.json','application-findings.json','automation-limitations.json','data-availability.json','coverage-mapping-findings.json','execution-resume.json','hub-resume-summary.json'])fs.copyFileSync(path.join(group,name),path.join(docdir,name));
let handoff=fs.readFileSync(path.join(root,'PROJECT-HANDOFF.txt'),'utf8');
const start=handoff.indexOf('1. OVERALL STATUS'),end=handoff.indexOf('3. SCRIPT CORRECTIONS');
const overview=['1. OVERALL STATUS',status.status,`${status.counts.planned} planned cases: ${status.counts.passed} passed; ${status.counts.failed} failed; ${status.counts.skipped} skipped; ${status.counts.remaining} remaining.`,`${status.batches.planned} planned batches: ${status.batches.finished} finished; ${status.batches.remaining} with remaining cases. ${status.runAttempts} attempts.`, 'Server Licensing remains excluded.','','2. TAB SUMMARY',...status.tabs.map(t=>`${t.tab}: ${t.passed} passed, ${t.failed} failed, ${t.skipped} skipped, ${t.remaining} remaining; ${t.finishedBatches}/${t.batches} batches finished.`),'See USER-LICENSE-HUB-STATUS.txt for the ten resumed batches and verified corrections.','',''].join('\r\n');
if(start<0||end<start)throw Error('Handoff structure missing');handoff=handoff.slice(0,start)+overview+handoff.slice(end);
const deliveryStart=handoff.indexOf('5. REPORT AND MEDIA DELIVERY'),deliveryEnd=handoff.indexOf('6. USING THE SOURCE');
const delivery=['5. REPORT AND MEDIA DELIVERY','Updated on GitHub is an earlier source/documentation snapshot; the current local Hub changes have not been uploaded.','Completed transfers reported by the user: Dashboard, Profiles, Features and Floating License Configurations to test; Authentication to test-2.','The uploaded local Dashboard, Profiles, Features and Floating License Configurations delivery copies were removed after verification and explicit user authorization. Original raw runs are retained.','Authentication was downloaded by the user and its local copy remains.','Hub report packaging and validation: see USER-LICENSE-HUB-STATUS.txt and per-run path-verification.json.','Evidence is separate from Updated. Preserve the complete extracted report ZIP structure.','',''].join('\r\n');
if(deliveryStart<0||deliveryEnd<deliveryStart)throw Error('Delivery structure missing');handoff=handoff.slice(0,deliveryStart)+delivery+handoff.slice(deliveryEnd);
fs.writeFileSync(path.join(root,'PROJECT-HANDOFF.txt'),handoff);
console.log(JSON.stringify({resumeCounts,allCounts,batches}));
