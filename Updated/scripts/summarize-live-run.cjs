const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const group = process.argv[2] || 'super-admin-live-20261125';
if (!/^[a-zA-Z0-9_-]+$/.test(group)) throw new Error('Invalid run group');
const dir = path.join(root, 'test-runs', group);
const env = require('dotenv').parse(fs.readFileSync(path.join(root,'.env')));
function redact(s) { for (const [key,value] of Object.entries(env)) if (/USERNAME|PASSWORD|TOKEN|SECRET/.test(key) && value) s=s.split(value).join('<redacted>'); for (const base of [root, root.replaceAll('\\','/')]) s=s.split(base).join('.'); return s.replace(/\u001b\[[0-9;]*m/g,'').replace(/\b[A-Za-z]:(?:\\{1,2}|\/)[^\s<>\"'`]+/g,'[machine path omitted]'); }
function walk(d) { return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory() && !['test-results','html-report','Test-Reports','source-before'].includes(e.name)?walk(path.join(d,e.name)):e.isFile()?[path.join(d,e.name)]:[]); }
const files = walk(dir);
const inventory = JSON.parse(fs.readFileSync(path.join(root,'config/execution-batches.json')));
const excluded = inventory.batches.flatMap(b=>b.cases).filter(c=>c.file.startsWith('server-licensing/')||c.id==='LIMAS-SUD-040');
const planned = inventory.batches.flatMap(b=>b.cases).filter(c=>!excluded.some(e=>e.id===c.id));
const latest = new Map(planned.map(c=>[c.id,{id:c.id,suite:c.file.split('/')[0],title:c.title,status:'pending',attempts:[]}]));
const runs=[];
for(const file of files.filter(f=>path.basename(f)==='run-metadata.json')) {
 const meta=JSON.parse(fs.readFileSync(file)); if(!meta.batch || !meta.startedAt || !Array.isArray(meta.testIds)) continue; const resultFile=path.join(path.dirname(file),'results.json');
 if(!fs.existsSync(resultFile))continue;
 const result=JSON.parse(fs.readFileSync(resultFile));runs.push({meta,result,dir:path.dirname(file)});
}
runs.sort((a,b)=>a.meta.startedAt.localeCompare(b.meta.startedAt));
for(const run of runs){
 function visit(suites,parents=[]){ for(const suite of suites||[]){const titles=[...parents,suite.title];for(const spec of suite.specs||[]){ const id=[...titles,spec.title].join(' ').match(/\bLIMAS-[A-Z]+-\d+\b/)?.[0];if(!id||!latest.has(id))continue; const test=spec.tests[0], last=test.results?.at(-1);let status=last?.status||'not-run';if(status==='skipped'&&!(test.annotations||[]).some(a=>a.type==='skip'))status='not-run';if(status==='passed'&&test.expectedStatus==='failed')status='failed';const entry=latest.get(id);const attempt={status,run:path.relative(dir,run.dir).replaceAll('\\','/'),startedAt:run.meta.startedAt,durationMs:last?.duration||0,error:redact((last?.errors||[]).map(e=>e.message||'').join('\n')),annotations:test.annotations||[]};entry.attempts.push(attempt);Object.assign(entry,{...attempt,title:spec.title});}visit(suite.suites,titles)}}visit(run.result.suites);
}
const cases=[...latest.values()];const counts={};const tabs={};
for(const c of cases){counts[c.status]=(counts[c.status]||0)+1;const t=tabs[c.suite]||={planned:0,passed:0,failed:0,skipped:0,pending:0,notRun:0};t.planned++;if(c.status==='passed')t.passed++;else if(c.status==='pending')t.pending++;else if(c.status==='skipped')t.skipped++;else if(c.status==='not-run')t.notRun++;else t.failed++;}
const failures=cases.filter(c=>['failed','timedOut','interrupted','not-run'].includes(c.status));
const summary={updatedAt:new Date().toISOString(),profile:'SUPER_USER_ADMIN_USER',planned:planned.length,excluded:excluded.map(c=>({id:c.id,reason:'Server Licensing excluded by user'})),completedRuns:runs.length,counts,tabs,cases};
fs.writeFileSync(path.join(dir,'execution-summary.json'),JSON.stringify(summary,null,2));
fs.writeFileSync(path.join(dir,'failed-case-ids.json'),JSON.stringify(failures.map(c=>c.id),null,2));
fs.writeFileSync(path.join(dir,'failed-cases.json'),JSON.stringify(failures,null,2));
const csv=v=>'"'+String(v??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(dir,'case-results.csv'),[['ID','Tab','Latest status','Attempts','Title','Run folder','Reason'],...cases.map(c=>[c.id,c.suite,c.status,c.attempts.length,c.title,c.run,c.error||c.annotations?.filter(a=>a.type==='skip').map(a=>a.description).join('; ')])].map(r=>r.map(csv).join(',')).join('\r\n'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tabrows=Object.entries(tabs).map(([name,t])=>`<tr><td>${esc(name)}</td>${Object.values(t).map(n=>`<td>${n}</td>`).join('')}</tr>`).join('');
const rows=cases.map(c=>`<tr data-status="${esc(c.status)}"><td>${esc(c.id)}</td><td>${esc(c.suite)}</td><td class="${c.status}">${esc(c.status)}</td><td>${c.attempts.length}</td><td>${esc(c.title)}</td><td>${c.run?`<a href="${esc(c.run)}/Test-Reports/Complete-Suite-Test-Report.zip">Portable report ZIP</a> · <a href="${esc(c.run)}/html-report/index.html">Playwright report</a>`:''}</td><td><details><summary>Details</summary><pre>${esc(c.error||c.annotations?.map(a=>a.description).filter(Boolean).join('\n')||'')}</pre>${c.attempts.map(a=>`<p>${esc(a.startedAt)}: ${esc(a.status)} — <a href="${esc(a.run)}/html-report/index.html">evidence</a></p>`).join('')}</details></td></tr>`).join('');
fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html><meta charset="utf-8"><title>LIMAS Super Admin Test Runs</title><style>body{font:15px system-ui;margin:32px;background:#f6f8fa;color:#172b4d}table{border-collapse:collapse;background:white;width:100%;margin:20px 0}td,th{padding:9px;border:1px solid #dce2e8;text-align:left}th{background:#e8eef6}h1{font-size:26px}.passed{color:#176b36}.failed,.timedOut{color:#b42318}.skipped,.pending{color:#856000}pre{white-space:pre-wrap;max-width:600px}input,select{padding:10px;margin-right:8px}</style><h1>LIMAS — Super Admin execution</h1><p>Updated ${esc(summary.updatedAt)} · Profile SUPER_USER_ADMIN_USER · ${planned.length} planned cases · ${excluded.length} Server Licensing cases excluded.</p><p>Latest result per test is shown; original attempts remain linked. Pending and skipped cases are not passes. Existing data-mutation gates remain in effect.</p><p><a href="case-results.csv">All case results (CSV)</a> · <a href="data-availability.json">Tabs with missing data</a> · <a href="application-findings.json">Application findings</a> · <a href="failed-cases.json">Failure details</a> · <a href="execution-summary.json">Full summary</a></p><table><thead><tr><th>Tab</th><th>Planned</th><th>Passed</th><th>Failed</th><th>Skipped</th><th>Pending</th><th>Not run</th></tr></thead><tbody>${tabrows}</tbody></table><input id="q" placeholder="Find case ID, title, or tab"><select id="status"><option value="">All statuses</option>${Object.keys(counts).map(s=>`<option>${s}</option>`).join('')}</select><table><thead><tr><th>Test ID</th><th>Tab</th><th>Status</th><th>Attempts</th><th>Scenario</th><th>Report</th><th>Details</th></tr></thead><tbody id="cases">${rows}</tbody></table><script>function filter(){const q=document.querySelector('#q').value.toLowerCase(),s=document.querySelector('#status').value;document.querySelectorAll('#cases tr').forEach(r=>r.hidden=!!((s&&r.dataset.status!==s)||!r.textContent.toLowerCase().includes(q)))}document.querySelector('#q').oninput=filter;document.querySelector('#status').onchange=filter;</script>`);
console.log(JSON.stringify({planned:summary.planned,completedRuns:runs.length,counts,tabs}));
