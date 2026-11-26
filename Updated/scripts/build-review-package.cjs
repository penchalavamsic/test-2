// Build a portable review folder from completed self-contained suite archives.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const unzipper = require('unzipper');
const archiver = require('archiver');
const { spawnSync } = require('child_process');
const { collectHtmlRefs } = require('./lib/report-builder');
const root = path.resolve(__dirname, '..');
const group = process.argv[2] || 'super-admin-live-20261125';
const suite = process.argv[3] || 'system-user-dashboard';
const partial = process.argv.includes('--partial');
const noZip = process.argv.includes('--no-zip');
const resume = process.argv.includes('--resume');
if (![group, suite].every(s => /^[a-zA-Z0-9_-]+$/.test(s))) throw Error('Invalid group or suite');
const groupDir = path.join(root, 'test-runs', group);
const summary = JSON.parse(fs.readFileSync(path.join(groupDir, 'execution-summary.json')));
const cases = summary.cases.filter(c => suite === 'all' || c.suite === suite);
const selectedSuites = new Set(cases.map(c => c.suite));
if (!cases.length) throw Error('Suite not found in execution summary');
if (!partial && cases.some(c => c.status === 'pending')) throw Error('Suite still has pending cases; final export refused');
const stamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
const generatedName = (suite === 'system-user-dashboard' ? 'dashboard' : suite === 'all' ? 'all-tabs' : suite) + '-' + stamp;
const name = process.env.LIMAS_REVIEW_FOLDER_NAME || generatedName;
if (!/^[a-zA-Z0-9_-]+$/.test(name)) throw Error('Invalid review folder name');
const dest = path.join(groupDir, 'delivery', name);
if (fs.existsSync(dest) && !resume) throw Error('Delivery folder already exists');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const runs = new Map();
const assets = [];
let localLinks = 0;
function write(relative, data) {
  const target = path.resolve(dest, relative);
  if (!target.startsWith(dest + path.sep)) throw Error('Unsafe destination');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, data);
  const asset = { file: relative.replaceAll('\\', '/'), bytes: Buffer.byteLength(data), sha256: crypto.createHash('sha256').update(data).digest('hex') };
  const existing = assets.findIndex(a => a.file === asset.file);
  if (existing < 0) assets.push(asset); else assets[existing] = asset;
}
function validateHtml(html, entryName, names) {
  for (const ref of collectHtmlRefs(html)) {
    if (/^(?:https?:|data:|mailto:|#)/i.test(ref)) continue;
    const local = decodeURIComponent(ref.split('#')[0].split('?')[0]).replaceAll('&amp;', '&');
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(entryName), local));
    if (!names.has(target)) throw Error('Broken review link: ' + target);
    localLinks++;
  }
}
(async () => {
  const runDirs = [...new Set(cases.flatMap(c => c.attempts.map(a => a.run)))].sort();
  for (const relative of runDirs) {
    const runDir = path.resolve(groupDir, relative);
    const runSuite = relative.split(/[\\/]/)[0];
    if (!selectedSuites.has(runSuite) || !runDir.startsWith(path.join(groupDir, runSuite) + path.sep)) throw Error('Run outside selected suites');
    const metadata = JSON.parse(fs.readFileSync(path.join(runDir, 'run-metadata.json')));
    if (metadata.packagingExitCode !== 0) throw Error('Run evidence packaging incomplete: ' + relative);
    const zip = await unzipper.Open.file(path.join(runDir, 'Test-Reports', 'Complete-Suite-Test-Report.zip'));
    const files = zip.files.filter(f => f.type !== 'Directory');
    const names = new Set(files.map(f => f.path.replaceAll('\\', '/')));
    const short = 'r/' + String(runs.size + 1).padStart(3, '0');
    const anchors = {};
    for (const entry of files) {
      const entryName = entry.path.replaceAll('\\', '/');
      if (entryName.length > 100 || entryName.startsWith('/') || entryName.split('/').includes('..')) throw Error('Unsafe or long evidence path: ' + entryName);
      let data = await entry.buffer();
      if (entryName.endsWith('.html')) {
        let html = data.toString('utf8');
        validateHtml(html, entryName, names);
        for (const m of html.matchAll(/<div class="test-card [^"]*" id="([^"]+)"[\s\S]*?<span class="test-id-col">([^<]+)<\/span>/g)) anchors[m[2]] = m[1];
        html += '<script>function openLinkedCase(){const el=document.getElementById(location.hash.slice(1));if(el){el.classList.add("expanded");el.scrollIntoView()}}addEventListener("hashchange",openLinkedCase);openLinkedCase();</script>';
        data = Buffer.from(html);
      }
      write(short + '/' + entryName, data);
    }
    runs.set(relative, { folder: short, batch: metadata.batch, startedAt: metadata.startedAt, anchors });
    console.log('Prepared report '+runs.size+'/'+runDirs.length+' ('+metadata.batch+')');
  }
  const counts = {};
  for (const c of cases) counts[c.status] = (counts[c.status] || 0) + 1;
  const evidenceLink = (run, id) => {
    const r = runs.get(run);
    if (!r) return null;
    if (!r.anchors[id]) throw Error('Missing case evidence anchor: ' + id);
    return r.folder + '/index.html#' + r.anchors[id];
  };
  const portableCases = cases.map(c => ({ id:c.id, title:c.title, status:c.status,
    evidence: c.run ? evidenceLink(c.run,c.id) : null,
    attempts: c.attempts.map(a => ({ status:a.status, startedAt:a.startedAt, evidence:evidenceLink(a.run,c.id) })),
    annotations: c.annotations || [],
    skipReasons: (c.annotations || []).filter(a=>a.type==='skip' || a.type==='simulation').map(a=>a.description) }));
  write('results.json', JSON.stringify({ createdAt:new Date().toISOString(), suite, profile:summary.profile, partial:cases.some(c=>c.status==='pending'), counts, cases:portableCases },null,2));
  function portableObservations(value) {
    if (typeof value === 'string') return value.replace(/ui-observations\/[a-zA-Z0-9_.-]+/g, ref => {
      const source = path.resolve(groupDir, ref);
      if (!source.startsWith(path.join(groupDir, 'ui-observations') + path.sep) || !fs.existsSync(source)) throw Error('Missing observation: ' + ref);
      const local = 'observations/' + path.basename(source);
      write(local, fs.readFileSync(source));
      return local;
    });
    if (Array.isArray(value)) return value.map(portableObservations);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portableObservations(item)]));
    return value;
  }
  for (const file of ['application-findings.json','data-availability.json','failure-review-policy.json','coverage-mapping-findings.json','automation-limitations.json','automation-repairs.json']) {
    const source = path.join(groupDir,file);
    if (!fs.existsSync(source)) continue;
    const data = JSON.parse(fs.readFileSync(source));
    if (file === 'application-findings.json') {
      const byId = new Map(cases.map(c => [c.id,c]));
      data.issues = data.issues.filter(issue => issue.ids.some(id => byId.has(id))).map(issue => {
        const entry = issue.ids.map(id => byId.get(id)).find(c => c?.run);
        const copied = { ...issue, evidence: entry ? evidenceLink(entry.run,entry.id) : null };
        if (issue.evidence?.startsWith('ui-observations/')) {
          const observation = path.resolve(groupDir,issue.evidence);
          if (observation.startsWith(path.join(groupDir,'ui-observations') + path.sep) && fs.existsSync(observation)) {
            const local = 'observations/' + path.basename(observation);
            write(local,fs.readFileSync(observation)); copied.independentObservation = local;
          }
        }
        return copied;
      });
    }
    write(file,JSON.stringify(portableObservations(data),null,2));
  }
  write('README.txt', 'Extract the entire ZIP before opening index.html. Keep all folders together.\nAll screenshots, recordings, plans and traces are included beside their reports.\nLatest results and earlier attempts are linked. Failed and skipped tests are not passes.\nThe package is checked for machine-specific paths, authentication data and broken local evidence links before its ZIP is created.\n');
  const rows = portableCases.map(c=>'<tr data-status="'+esc(c.status)+'"><td>'+esc(c.id)+'</td><td>'+esc(c.status)+'</td><td>'+esc(c.title)+'</td><td>'+(c.evidence?'<a href="'+esc(c.evidence)+'">Open evidence</a>':'Pending')+'</td><td>'+c.attempts.map((a,i)=>'<a href="'+esc(a.evidence)+'">Attempt '+(i+1)+' ('+esc(a.status)+')</a>').join('<br>')+'</td><td>'+esc(c.skipReasons.join('; '))+'</td></tr>').join('');
  const html='<!doctype html><html><head><meta charset="utf-8"><title>LIMAS '+esc(suite)+' evidence</title><style>body{font:15px system-ui;margin:28px;color:#172b4d;background:#f6f8fa}table{border-collapse:collapse;width:100%;background:white}th,td{padding:10px;border:1px solid #dce2e8;text-align:left}th{background:#e8eef6}input,select{padding:9px;margin:12px 10px 18px 0}tr[data-status=failed] td:nth-child(2){color:#b42318}tr[data-status=passed] td:nth-child(2){color:#176b36}</style></head><body><h1>LIMAS '+esc(suite)+'</h1><p>'+cases.length+' cases · '+esc(Object.entries(counts).map(([s,n])=>n+' '+s).join(' · '))+'</p><p>'+(cases.some(c=>c.status==='pending')?'Partial review; execution is still in progress.':'Execution results with all recorded attempts.')+' Server Licensing excluded.</p><p><a href="results.json">Results data</a> · <a href="application-findings.json">Application findings</a> · <a href="data-availability.json">Data availability</a></p><input id="q" placeholder="Find ID or scenario"><select id="s"><option value="">All statuses</option>'+Object.keys(counts).map(s=>'<option>'+esc(s)+'</option>').join('')+'</select><table><thead><tr><th>Case</th><th>Status</th><th>Scenario</th><th>Latest evidence</th><th>Attempts</th><th>Execution notes</th></tr></thead><tbody id="cases">'+rows+'</tbody></table><script>function filter(){const q=document.querySelector("#q").value.toLowerCase(),s=document.querySelector("#s").value;document.querySelectorAll("#cases tr").forEach(r=>r.hidden=!!((s&&r.dataset.status!==s)||!r.textContent.toLowerCase().includes(q)))}document.querySelector("#q").oninput=filter;document.querySelector("#s").onchange=filter;</script></body></html>';
  write('index.html',html);
  validateHtml(html,'index.html',new Set(assets.map(a=>a.file)));
  console.log('Sanitizing exported evidence before packaging');
  for (const script of ['sanitize-run-paths.cjs','verify-run-paths.cjs']) {
    const args = [path.join(__dirname,script),path.relative(root,dest),...(script==='sanitize-run-paths.cjs'?['--all']:[])];
    const result = spawnSync(process.execPath,args,{cwd:root,windowsHide:true,encoding:'utf8',maxBuffer:10*1024*1024});
    if(result.status!==0) throw Error(script+' failed: '+(result.stderr||result.stdout).slice(-500));
    console.log(script+': '+result.stdout.trim().split('\n').at(-1));
  }
  const cache = path.join(dest,'.sanitization-cache.json');
  if(fs.existsSync(cache)) fs.unlinkSync(cache);
  // Sanitizing traces changes their bytes, so integrity hashes are calculated afterwards.
  assets.length = 0;
  function collectAssets(dir) {
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {
      const file=path.join(dir,entry.name);
      if(entry.isDirectory()) collectAssets(file);
      else {const data=fs.readFileSync(file);assets.push({file:path.relative(dest,file).replaceAll('\\','/'),bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')});}
    }
  }
  collectAssets(dest);
  write('manifest.json',JSON.stringify({createdAt:new Date().toISOString(),suite,counts,reportCount:runs.size,verifiedLocalLinks:localLinks,assets},null,2));
  if(noZip){console.log(JSON.stringify({folder:path.relative(root,dest).replaceAll('\\','/'),archive:null,counts,reports:runs.size,verifiedLocalLinks:localLinks}));return;}
  const zipFile=dest+'.zip';
  await new Promise((resolve,reject)=>{const out=fs.createWriteStream(zipFile+'.tmp'),archive=archiver('zip',{zlib:{level:4}});out.on('close',resolve);out.on('error',reject);archive.on('error',reject);archive.pipe(out);archive.directory(dest,false);archive.finalize().catch(reject);});
  fs.renameSync(zipFile+'.tmp',zipFile);
  console.log(JSON.stringify({folder:path.relative(root,dest).replaceAll('\\','/'),archive:path.relative(root,zipFile).replaceAll('\\','/'),counts,reports:runs.size,verifiedLocalLinks:localLinks}));
})().catch(e=>{console.error(e.message);process.exitCode=1});