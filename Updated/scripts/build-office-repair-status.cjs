const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const group='test-runs/office-repair-20261126';
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,''));
const write=(p,v)=>fs.writeFileSync(path.join(root,p),typeof v==='string'?v:JSON.stringify(v,null,2));
const suites=['standard-license-configurations','system-users','user-groups','reports'];
const failed=new Set(read(group+'/office-failed-ids.json'));
const skipped=new Set([2575,2462,2483,2504,2522,1524,1633,1634,1635,1739,1740,1760,1761,1764,1769,1774,1778].map(n=>'LIMAS-SUD-'+n));
const cases=new Map(),attempts=[];
for(const batch of read('config/execution-batches.json').batches.filter(b=>suites.includes(b.suite)))for(const c of batch.cases){
 const baseline=failed.has(c.id)?'failed':skipped.has(c.id)?'skipped':'passed';
 cases.set(c.id,{id:c.id,title:c.title,suite:batch.suite,batch:batch.name,baseline,status:baseline,source:'office-log',run:'',completedAt:''});
}
if(cases.size!==531)throw Error('Unexpected office baseline size: '+cases.size);
function walk(s,visit){for(const sp of s.specs||[])visit(sp);for(const child of s.suites||[])walk(child,visit);}
for(const suite of suites){const folder=path.join(root,group,suite);if(!fs.existsSync(folder))continue;for(const name of fs.readdirSync(folder)){
 const run=group+'/'+suite+'/'+name,metadata=path.join(root,run,'run-metadata.json');if(!fs.existsSync(metadata))continue;
 const m=read(run+'/run-metadata.json');if(!m.completedAt||!fs.existsSync(path.join(root,run,'results.json')))continue;
 const d=read(run+'/results.json'),counts={passed:0,failed:0,skipped:0};
 for(const s of d.suites||[])walk(s,sp=>{const id=sp.title.match(/LIMAS-SUD-\d+/)?.[0];if(!cases.has(id))return;for(const t of sp.tests||[]){const result=t.results?.at(-1);if(!result)continue;const status=result.status==='passed'?'passed':result.status==='skipped'?'skipped':'failed';counts[status]++;const prev=cases.get(id);if(m.completedAt>=prev.completedAt)cases.set(id,{...prev,title:sp.title,status,source:'repair-run',run,completedAt:m.completedAt});}});
 attempts.push({batch:m.batch,run,completedAt:m.completedAt,exitCode:m.exitCode,packagingExitCode:m.packagingExitCode,...counts});
}}
const all=[...cases.values()].sort((a,b)=>Number(a.id.split('-').at(-1))-Number(b.id.split('-').at(-1)));
const manualPolicy=read('config/manual-verification-cases.json');
const manualIds=new Set(manualPolicy.cases.map(c=>c.id));
const executionRows=all.map(row=>({...row}));
for(const row of all){
 row.lastExecutionStatus=row.status;
 row.skipCategory='';
 if(manualIds.has(row.id)){row.status='skipped';row.skipCategory='manual-verification';row.dispositionSource='user-decision';}
 else if(row.status==='skipped')row.skipCategory='unavailable-data';
}
const explanations = new Map();
const explain=(ids,reason,nextAction)=>ids.forEach(id=>explanations.set('LIMAS-SUD-'+id,{reason,nextAction}));
explain([2462,2483,2504,2522],'DELETE returned 200 but the owned group remained after fresh GET and reload.','Investigate application deletion/persistence; preserve the removal assertion.');
explain([2530],'Name search returned rows that do not match the displayed name.','Confirm searchable-field requirements and correct application matching if required.');
explain([1539,1540,1542],'Hardware lookup supports checkbox selection; the reviewed Enter-based action did not submit the required filter request.','Resolve the UI/request contract; do not silently replace the reviewed action.');
explain([1541],'Hardware filter payload contains objects; the reviewed contract expects strings.','Confirm the API contract and correct implementation or explicitly revise the requirement.');
explain([1548,1566,1568,1570,1572,1574,1575,1576],'Clear restores cached data without the fresh request required by the reviewed plan.','Resolve cache behavior versus the required network contract.');
explain([1581],'Zero results are shown, but table headers disappear.','Keep table headers visible for the empty state or explicitly revise the requirement.');
explain([1524],'Controlled next-page failure/recovery did not meet the corrected visible-error, Retry, restored-data and continuation checks.','Inspect the latest assertion and verify error recovery manually; hiding cached rows alone is no longer considered a failure.');
explain([1525],'Reports has no main-content live/status region for row-update announcements.','Add report-specific accessibility announcements.');
explain([1590,1592,1593,1594,1595,1596,1598],'Deleted reports preload data and filter locally; the reviewed scenario expects additional server requests.','Confirm the intended server-versus-browser filtering contract. Review any remaining setup failure before classifying it as an application defect.');
explain([1591,1607],'The email filter chip persists across the mode switch, contrary to the reset expectation.','Confirm mode-specific filter reset requirements and correct the application if reset is required.');
explain([1597],'Maintenance Date is unavailable in the settled Deleted filter view.','Confirm whether Deleted mode must offer the reviewed maintenance-date control.');
explain([1604],'Cached Active report refresh did not meet the corrected mode/data consistency checks.','Inspect the latest assertion; a spinner is not required when valid cached data remains visible.');
explain([1614],'The app fetches JSON report pages and creates Excel locally; the reviewed test expects an export response with workbook headers.','Resolve the export endpoint/response contract.');
explain([1623],'A zero-result export produces a workbook with no header row.','Generate the expected header-only workbook for empty results.');
explain([1664],'Clear all is absent for a single email filter; removing the chip and clearing multiple filters work.','Confirm the single-filter Clear all requirement; do not remove it merely to pass.');
explain([1688,1694,1696,1704,1732,1734],'Deleted Floating Licenses exposes Hardware IDs, Expiration Date and Deletion Date; the reviewed Email/Profile/Role controls are absent.','Restore the required controls or explicitly revise the reviewed filter inventory.');
explain([1710,1712],'Deleted Floating data is prefetched, but the corrected test requires scrolling to reveal additional cached records and preserve row order.','Inspect the latest continuation assertion; fix the application scroll callback if loaded rows remain unchanged.');
explain([1720],'No report-specific live/status region announces Floating Licenses row-count changes.','Add the reviewed accessible count-update announcements.');
explain([1739,1740],'Floating export is client-side and makes no export request; the hypothetical HTTP 401/500 interceptor cannot run. This is not an observed backend outage.','Replace the hypothetical endpoint scenario with an agreed client-export failure contract or implement the required endpoint.');
explain([1745],'Selected and unselected configuration modes differ by color; inspected font, border, outline, shadow and icons provide no non-color selection cue.','Add a visible non-color selection indicator; aria-pressed already communicates selection programmatically.');
explain([1761,1778],'The configuration error is displayed as a paragraph without the named error heading required by the plan.','Provide the required error heading/status semantics and verify assistive-technology announcements.');
explain([1787,1791,1795],'Clear restores the full total but resets displayed rows from the initial 100 to 50; the difference persists after settling. No loss of total records was observed.','Resolve the exact visible-row restoration requirement; retain the original count assertion until agreed.');
explain([1539,1540],'Selected hardware IDs are sent as objects, but the API/displayed total remains unfiltered or the selected-object payload loses an ID.','Inspect the linked assertion and correct hardware selection/count handling; do not mask the failure with longer waits.');
explain([1542],'Unavailable hardware lookup returns 404 and the dropdown shows no explicit no-match message.','Verify empty-lookup handling manually and show a clear no-results message.');
explain([1590],'Deleted reports preload all records but scrolling does not append beyond the initial 100 displayed rows.','Fix the Deleted scroll continuation callback; current callback increments on mount but does not observe scrolling.');
explain([1595,1596,1597],'Selecting a runtime date yields zero records despite matching records in the fetched dataset. The deployed code converts local midnight to UTC before comparing date text.','Verify timezone/date handling manually and preserve calendar-day matching in the application.');
for(const row of all){
 if(row.skipCategory==='manual-verification'){row.reason=manualPolicy.reason;row.nextAction='Perform the UI download/export and record the manual outcome; historical execution status is retained separately.';}
 else if(row.status==='passed'){row.reason=row.source==='repair-run'?'Passed in the latest completed repair run.':'Passed in the supplied office execution; not rerun here.';row.nextAction='None for this recorded result.';}
 else if(row.status==='skipped'){row.reason=row.id==='LIMAS-SUD-2575'?'Designated Test User is absent; skip explicitly allowed by the user.':'Office skip still awaiting local review; do not treat it as an approved permanent skip.';row.nextAction=row.id==='LIMAS-SUD-2575'?'Run the implemented save/reload/restore test when the designated disposable user exists.':'Implement/verify the required fixture or establish genuine data absence.';}
 else if(row.source==='office-log'){row.reason='Failed in the supplied office execution; not rerun here yet.';row.nextAction='Inspect UI and source, correct automation issues, then rerun with evidence.';}
 else Object.assign(row,explanations.get(row.id)||{reason:'Latest repair run failed; diagnosis still needs review.',nextAction:'Inspect the linked run before changing the assertion.'});
}
const counts=rows=>({cases:rows.length,passed:rows.filter(r=>r.status==='passed').length,failed:rows.filter(r=>r.status==='failed').length,skipped:rows.filter(r=>r.status==='skipped').length});
const totals=counts(all),bySuite=suites.map(suite=>({suite,...counts(all.filter(r=>r.suite===suite)),repairCases:all.filter(r=>r.suite===suite&&r.source==='repair-run').length}));
const pending=all.filter(r=>r.source==='office-log'&&r.baseline!=='passed');
const pendingBatches=[...new Set(pending.map(r=>r.batch))];
const cleanup=read(group+'/group-cleanup-verification.json');
const status={updatedAt:new Date().toISOString(),completed:false,baseline:{cases:531,passed:368,failed:146,skipped:17},latestCombined:totals,latestExecutionTotals:counts(executionRows),skipCategories:{manualVerification:all.filter(r=>r.skipCategory==='manual-verification').length,unavailableData:all.filter(r=>r.skipCategory==='unavailable-data').length},suites:bySuite,attempts:attempts.sort((a,b)=>a.completedAt.localeCompare(b.completedAt)),officeFailureReviewComplete:pending.length===0,pendingReviewCases:pending.length,pendingReviewBatches:pendingBatches,remainingFixtureNames:cleanup.records.filter(r=>r.present).map(r=>r.name),limitations:['Current disposition includes user-designated manual skips; latestExecutionTotals and lastExecutionStatus preserve actual execution history.','Office baseline and repair reruns are combined; untouched office passes were not rerun here.','Office failure review is complete when pendingReviewCases is zero; retained application/requirement failures and earlier-suite CRUD remain outstanding.','LIMAS-SUD-2575 is skipped by user agreement while the designated disposable user is absent. The save/restore path is implemented and typechecked but not live-verified.','Latest deletion retry guard is typechecked; the observed failed runs predate that guard.','No source or evidence from this repair phase has been pushed to GitHub.']};
const out='docs/execution-records/office-repair';fs.mkdirSync(path.join(root,out),{recursive:true});write(out+'/status.json',status);
function csv(rows){const fields=['id','title','suite','batch','baseline','status','lastExecutionStatus','skipCategory','source','run','reason','nextAction'];return fields.join(',')+'\n'+rows.map(r=>fields.map(f=>'"'+String(r[f]??'').replaceAll('"','""')+'"').join(',')).join('\n')+'\n';}
write(out+'/manual-verification-cases.csv',csv(all.filter(r=>r.skipCategory==='manual-verification')));write(out+'/all-cases.csv',csv(all));write(out+'/failed-cases.csv',csv(all.filter(r=>r.status==='failed')));write(out+'/skipped-cases.csv',csv(all.filter(r=>r.status==='skipped')));write(out+'/pending-review-cases.csv',csv(pending));write(out+'/execution-attempts.json',status.attempts);
let text='OFFICE FAILURE REPAIR STATUS\nUpdated: '+new Date().toLocaleString('en-GB',{timeZone:'Asia/Kolkata'})+' IST\n\n';
text+='1. WHAT THESE NUMBERS MEAN\nOriginal office execution: 531 cases; 368 passed, 146 failed, 17 skipped, across 28 batches.\nCurrent disposition (including user-designated manual skips): '+totals.passed+' passed, '+totals.failed+' failed, '+totals.skipped+' skipped.\nThese totals combine office results, latest completed reruns, and the explicit manual-verification decision. Actual execution history is preserved in latestExecutionTotals and lastExecutionStatus; manual designations are not claimed as newly executed skips.\n\n2. TAB STATUS\n';
for(const row of bySuite)text+=row.suite+': '+row.passed+' passed, '+row.failed+' failed, '+row.skipped+' skipped; '+row.repairCases+' distinct cases rerun here.\n';
text+='\n3. EXECUTION BATCHES\n'+attempts.length+' completed repair attempts, including targeted reruns. See docs/execution-records/office-repair/execution-attempts.json.\n'+(pending.length ? pending.length+' office failed/skipped cases still need repair review across: '+pendingBatches.join(', ')+'.' : 'All original office failed/skipped cases have now had a completed local review run.')+'\n\n4. FAILED: REASON AND NEXT ACTION\n';
text+='User Groups 2462, 2483, 2504, 2522: create/subgroup/edit succeeded where applicable, but deletion did not persist. DELETE returned 200; fresh GET and the UI still show the records enabled. Investigate the application delete handler and persistence; do not make these tests pass by removing the removal assertion.\n';
text+='System Users 2530: the deployed search covers names, usernames, email, company, role, groups and profiles. The corrected case verifies the target name/email identity and full-count restoration; see its latest outcome in all-cases.csv.\n';
text+='Reports: confirmed findings and pending script corrections are listed in reports-ui-contract-findings.json. failed-cases.csv now includes reason and nextAction columns.\n';
text+='Reports: examine failed-cases.csv and each completed run. New failures remain failures until the UI/API behavior and requirement are checked.\n\n5. SKIPPED\nSystem Users 2575: designated Test User is absent; a full-table search returned Showing 0 of 56. User agreed to skip this case for now. Set TEST_SYSTEM_USER_NAME or TEST_SYSTEM_USER_EMAIL when a disposable record is available; the implementation saves, reloads, verifies, restores, and cleans up. This path is typechecked, not live-verified.\nReports export/download cases are skipped by explicit user request and require manual verification. See manual-verification-cases.csv. This is separate from unavailable-data skips. Other cases may skip only for genuine absent data.\n\n6. TEST-CREATED GROUPS STILL PRESENT\n';
for(const name of status.remainingFixtureNames)text+='- '+name+'\n';
text+='No business group was targeted for deletion. Cleanup requires an application fix or an authorized administrator follow-up.\n\n7. SCRIPTS AND EVIDENCE\nCurrent source is in tests/ and plans/. New evidence is under '+group+'/<suite>/<run>/Test-Reports/. Copy complete report ZIP contents to preserve media links.\nImportant screenshots, videos, and traces are retained. Sanitization and path verification are tracked separately. New repair runs still require final verification before sharing; existing path-verification.json files apply only to their recorded coverage.\nNo new GitHub push was performed. Existing uploaded Updated snapshots do not include these latest changes.\n\n8. REMAINING WORK\nResolve the retained application/requirement failures listed in failed-cases.csv. Earlier-suite CRUD remains a separate pending stage; those tests need disposable records instead of selecting an existing business record. Server Licensing remains excluded.\n\n9. SIMPLE RESULT FILES\n'+out+'/all-cases.csv\n'+out+'/failed-cases.csv\n'+out+'/skipped-cases.csv\n'+out+'/pending-review-cases.csv\n'+out+'/status.json\n';
text+='\n10. LOCAL MEDIA CLEANUP\nRemoved 1,126 old Dashboard report ZIP packages already confirmed uploaded and downloaded by the user: 21.40 GiB. Raw Dashboard evidence, current repair runs, source scripts, and Updated snapshots remain. Details: '+out+'/dashboard-report-package-cleanup.json\n';

const failureBuckets = [
 ['Network or implementation assumptions',[1539,1540,1541,1542,1548,1566,1568,1570,1572,1574,1575,1576,1590,1592,1593,1594,1595,1596,1598,1614,1710,1712]],
 ['UI controls or accessibility expectations needing a confirmed baseline',[1525,1581,1597,1604,1688,1694,1696,1704,1720,1732,1734,1745,1761,1778]],
 ['State restoration, empty export or error-rendering expectations',[1524,1591,1623,1664,1787,1791,1795]],
 ['Hypothetical HTTP export scenarios with no deployed endpoint',[1739,1740]],
 ['Deletion did not persist after successful API response',[2462,2483,2504,2522]],
 ['Search matching rule needs confirmation',[2530]],
];
let why='WHY TESTS STILL SHOW FAILED\n\n';
why+='A failed test is a difference between the script expectation and observed behavior. It is NOT automatically a confirmed application bug. A Reviewed label in an existing plan is not independent proof that its assumptions were approved.\n\n';
why+='At the start of this continuation, 81 failures included 49 original office failures not yet rerun and 32 failures reproduced locally. All original office failed/skipped cases have now had a local rerun.\n';
why+='Latest combined results: '+totals.passed+' passed, '+totals.failed+' failed, '+totals.skipped+' skipped. Original office passes that were not rerun remain included.\n\n';
for(const [label,ids] of failureBuckets){const rows=all.filter(r=>r.status==='failed'&&ids.includes(Number(r.id.split('-').at(-1))));if(rows.length)why+=label+': '+rows.length+' cases\n'+rows.map(r=>r.id).join(', ')+'\n\n';}
why+='Examples of implementation assumptions: requiring a fresh POST when Clear restores cached data; expecting a server continuation when rows are rendered from already-loaded data; requiring a fixed visible-row count after Clear. The user approved the deployed functional workflow as the baseline; unsupported implementation assumptions are being corrected and rerun.\n\n';
why+='Requirements explicitly confirmed by the user remain enforced, including email display and actual CRUD persistence. Permitted skip reasons are genuine missing data and the explicit user-requested manual verification of download/Excel export cases. Never change assertions solely to make a test green.\n\n';
why+='Case-by-case observations and next actions: docs/execution-records/office-repair/failed-cases.csv\n';
write('WHY-TESTS-STILL-FAIL.txt',why);

text+='\n11. USER-REQUESTED MANUAL VERIFICATION\n'+status.skipCategories.manualVerification+' Reports export/download cases are designated manual verification, pending manual results. '+status.skipCategories.unavailableData+' case is skipped for unavailable data. Historical automated outcomes remain recorded. See MANUAL-EXPORT-VERIFICATION.txt and '+out+'/manual-verification-cases.csv.\n';
text+='\nAdditional cleanup: 56 backed-up Dashboard Technical-Evidence ZIPs removed, freeing 18.43 GiB. See '+out+'/dashboard-technical-package-cleanup.json.\n';
write('OFFICE-REPAIR-STATUS.txt',text);console.log(JSON.stringify({latestCombined:totals,bySuite,completedAttempts:attempts.length,pendingCases:pending.length}));
