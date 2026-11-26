// Upload a fresh Updated snapshot and latest completed office-repair report packages.
// No application tests are executed. Run again to resume an interrupted transfer.
const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto');
const {runTransfer,describe,sha256}=require('./lib/hub-branch-transfer.cjs');
const root=path.resolve(__dirname,'..');
const repo='https://github.com/penchalavamsic/test-2.git',branch='office-repair-20261126';
const group='test-runs/office-repair-20261126',temp=path.join(root,'temp');
const prepFile=path.join(temp,'office-repair-upload-preparation.json'),entriesFile=path.join(temp,'office-repair-upload-entries.json');
const stateFile=path.join(temp,'office-repair-upload-state.json'),lockFile=path.join(temp,'office-repair-upload.lock');
const partSize=48*1024**2;let ownsLock=false;
const rel=f=>path.relative(root,f).replaceAll('\\','/');
const read=f=>JSON.parse(fs.readFileSync(f,'utf8').replace(/^\uFEFF/,''));
const save=(f,d)=>{fs.writeFileSync(f+'.tmp',JSON.stringify(d,null,2)+'\n');fs.renameSync(f+'.tmp',f);};
function safe(relative){if(!relative||relative.includes('\\')||relative.split('/').some(p=>!p||p==='..'||p==='.')||path.posix.isAbsolute(relative)||/^[A-Za-z]:/.test(relative))throw Error('Unsafe relative path');return relative;}
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Symbolic links refused');return e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)];});}
function hashFile(file){const fd=fs.openSync(file,'r'),hash=crypto.createHash('sha256'),buffer=Buffer.alloc(4*1024**2);try{let n;while((n=fs.readSync(fd,buffer,0,buffer.length,null)))hash.update(buffer.subarray(0,n));}finally{fs.closeSync(fd);}return hash.digest('hex');}
function run(script,args=[]){const r=cp.spawnSync(process.execPath,[path.join(root,'scripts',script),...args],{cwd:root,stdio:'inherit',windowsHide:true});if(r.status!==0)throw Error(script+' did not complete; no incomplete evidence will be uploaded. Rerun this command after resolving the reported issue.');}
function lock(){fs.mkdirSync(temp,{recursive:true});if(fs.existsSync(lockFile)){const l=read(lockFile);let alive=true;try{process.kill(l.pid,0);}catch(e){if(e.code==='ESRCH')alive=false;else throw e;}if(alive)throw Error('An office-repair upload/preparation is already running');fs.unlinkSync(lockFile);}fs.writeFileSync(lockFile,JSON.stringify({pid:process.pid}),{flag:'wx'});ownsLock=true;}
function unlock(){if(ownsLock&&fs.existsSync(lockFile)&&read(lockFile).pid===process.pid)fs.unlinkSync(lockFile);ownsLock=false;}
process.on('exit',unlock);process.on('SIGINT',()=>process.exit(130));process.on('SIGTERM',()=>process.exit(143));
function latestPlan(){
 const status=read(path.join(root,'docs/execution-records/office-repair/status.json')),latest=new Map();
 const allowed=new Set(['reports','system-users','user-groups','standard-license-configurations']);
 const visit=(s,fn)=>{for(const sp of s.specs||[])fn(sp);for(const child of s.suites||[])visit(child,fn);};
 for(const a of status.attempts){safe(a.run);if(!a.run.startsWith(group+'/')||!allowed.has(a.run.split('/')[2]))throw Error('Unexpected repair run scope');const folder=path.join(root,a.run),m=read(path.join(folder,'run-metadata.json'));if(!m.completedAt||m.packagingExitCode!==0)continue;for(const s of read(path.join(folder,'results.json')).suites||[])visit(s,sp=>{const id=sp.title.match(/LIMAS-SUD-\d+/)?.[0];if(id&&sp.tests?.some(t=>t.results?.length)&&(!latest.has(id)||latest.get(id).completedAt<a.completedAt))latest.set(id,{run:a.run,completedAt:a.completedAt});});}
 const runs=[...new Set([...latest.values()].map(a=>a.run))].sort().map(run=>{const source=run+'/Test-Reports/Complete-Suite-Test-Report.zip';return{run,source,bytes:fs.statSync(path.join(root,source)).size};});
 if(!runs.length)throw Error('No completed repair packages found');
 return{status,cases:[...latest].map(([id,a])=>({id,...a})),runs};
}
function check(){const p=latestPlan(),bytes=p.runs.reduce((n,r)=>n+r.bytes,0),disk=fs.statfsSync(root);const summary={repository:repo,branch,folders:['Updated','Latest-Evidence'],localRepairCases:p.cases.length,latestRunPackages:p.runs.length,mediaGiB:Number((bytes/1024**3).toFixed(2)),freeGiB:Number((disk.bavail*disk.bsize/1024**3).toFixed(2)),currentDisposition:p.status.latestCombined,manualVerification:p.status.skipCategories,applicationTestsRun:false};console.log(JSON.stringify(summary,null,2));return p;}
function preparation(){let p=fs.existsSync(prepFile)?read(prepFile):null;if(p){if(p.repository!==repo||p.branch!==branch||!/^test-runs\/office-repair-20261126\/delivery\/office-upload-[a-zA-Z0-9_-]+$/.test(p.folder))throw Error('Invalid upload preparation');return p;}p={repository:repo,branch,createdAt:new Date().toISOString(),folder:group+'/delivery/office-upload-'+new Date().toISOString().replace(/[-:.]/g,'').slice(0,15)};save(prepFile,p);return p;}
function verified(run){const f=path.join(root,run,'path-verification.json'),zip=path.join(root,run,'Test-Reports/Complete-Suite-Test-Report.zip');if(!fs.existsSync(f))return false;const v=read(f);return Array.isArray(v.findings)&&v.findings.length===0&&Date.parse(v.checkedAt)>=fs.statSync(zip).mtimeMs;}
async function prepare(p,plan,sourceOnly=false){
 const dest=path.join(root,p.folder,'Updated'),control=path.join(root,p.folder,'upload-control');fs.mkdirSync(control,{recursive:true});
 if(!sourceOnly){for(const [i,r] of plan.runs.entries()){if(verified(r.run)){console.log('Verified evidence reused '+(i+1)+'/'+plan.runs.length);continue;}console.log('Sanitizing and verifying evidence '+(i+1)+'/'+plan.runs.length+': '+r.run.slice(group.length+1));run('sanitize-run-paths.cjs',[r.run]);run('verify-run-paths.cjs',[r.run]);if(!verified(r.run))throw Error('Evidence verification did not cover the report package');}}
 run('build-office-repair-status.cjs');run('scan-sensitive-data.cjs');
 await require('./prepare-office-updated-source.cjs').prepare(rel(dest));
 if(sourceOnly){console.log('Prepared source only. No GitHub changes.');return;}
 const entries=[],manifest=read(path.join(dest,'SOURCE-MANIFEST.json')),ready=read(path.join(dest,'SOURCE-READY.json'));
 const known=new Map(manifest.files.map(a=>[a.file,a]));
 if(walk(dest).length!==manifest.files.length+3)throw Error('Unexpected source snapshot files');
 for(const f of walk(dest).sort()){const file=path.relative(dest,f).replaceAll('\\','/'),data=fs.readFileSync(f);if(file==='Updated-source.zip'){if(sha256(data)!==ready.zipSha256)throw Error('Source ZIP mismatch');}else if(!['SOURCE-MANIFEST.json','SOURCE-READY.json'].includes(file)){const a=known.get(file);if(!a||a.bytes!==data.length||a.sha256!==sha256(data))throw Error('Source snapshot mismatch: '+file);}entries.push(describe(root,'Updated/'+file,rel(f),'Updated'));}
 const packages=[],split=[];
 for(const r of plan.runs){const file=r.run.slice(group.length+1)+'/Complete-Suite-Test-Report.zip',source=path.join(root,r.source),bytes=fs.statSync(source).size,hash=hashFile(source);const pkg={file,bytes,sha256:hash,sourceRun:r.run,parts:[]};if(bytes<=partSize)entries.push(describe(root,'Latest-Evidence/'+file,r.source,'Latest evidence'));else{let index=0;for(let offset=0;offset<bytes;offset+=partSize){const part='.parts/'+hash+'/'+String(++index).padStart(3,'0')+'.part',e=describe(root,'Latest-Evidence/'+part,r.source,'Latest evidence',offset,Math.min(partSize,bytes-offset));entries.push(e);pkg.parts.push({file:part,bytes:e.bytes,sha256:e.sha256});}split.push(pkg);}packages.push(pkg);}
 function add(name,text,target,phase){const f=path.join(control,name);fs.writeFileSync(f,text);entries.push(describe(root,target,rel(f),phase));}
 add('PACKAGE-PARTS.json',JSON.stringify({version:1,packages:split},null,2),'Latest-Evidence/PACKAGE-PARTS.json','Latest evidence');
 add('manifest.json',JSON.stringify({createdAt:new Date().toISOString(),scope:'Latest completed local repair run for each locally rerun office case. Full batch packages can contain superseded case attempts; Updated status files are authoritative.',cases:plan.cases,packages:packages.map(({parts,...p})=>({...p,split:parts.length>0})),officeOnlyEvidence:'Results for office-only cases are documented; original office-laptop media is not recreated by this upload.',currentDisposition:read(path.join(root,'docs/execution-records/office-repair/status.json')).latestCombined},null,2),'Latest-Evidence/manifest.json','Latest evidence');
 entries.push(describe(root,'Latest-Evidence/Restore-Report-Packages.ps1','scripts/restore-office-report-packages.ps1','Latest evidence'));
 add('OPEN-REPORTS.txt',['LATEST OFFICE-REPAIR EVIDENCE','', 'After downloading this branch ZIP, extract it fully.','Open PowerShell in Latest-Evidence and run:','powershell -NoProfile -ExecutionPolicy Bypass -File .\\Restore-Report-Packages.ps1','This joins lossless package parts and verifies SHA-256 hashes. Parts are retained.','Then extract the desired Complete-Suite-Test-Report.zip fully and open its HTML report.','Each package contains the original report, screenshots, videos and test traces.','Keep each extracted package together so its relative evidence links work.','Updated contains scripts/docs separately; its current status overrides older attempts inside batch packages.','UPLOAD-COMPLETE.json at branch root confirms the whole transfer finished.',''].join('\n'),'Latest-Evidence/OPEN-REPORTS.txt','Latest evidence');
 add('README.txt',['LIMAS office-repair snapshot','Updated/: latest scripts, all-tab test sources, plans and current execution documents.','Latest-Evidence/: latest completed local repair packages for Standard License Configurations, System Users, User Groups and Reports.','Some failures remain; download/export cases require manual verification. Read Updated/OFFICE-REPAIR-STATUS.txt.','This branch does not claim every test or tab passed.','Download Updated/Updated-source.zip for scripts alone.','For evidence, follow Latest-Evidence/OPEN-REPORTS.txt.','A branch ZIP includes only this branch tree, without old-branch media folders.','No credentials, saved sessions, node_modules or raw test-runs folder is included in Updated.','The transfer is complete only when UPLOAD-COMPLETE.json exists.',''].join('\n'),'README.txt','Updated');
 entries.sort((a,b)=>(a.phase==='Updated'?0:1)-(b.phase==='Updated'?0:1)||a.file.localeCompare(b.file));
 add('UPLOAD-COMPLETE.json',JSON.stringify({repository:repo,branch,preparedAt:new Date().toISOString(),folders:['Updated','Latest-Evidence'],localRepairCases:plan.cases.length,reportPackages:packages.length,splitPackages:split.length,currentDisposition:read(path.join(root,'docs/execution-records/office-repair/status.json')).latestCombined,sourceZip:'Updated/Updated-source.zip',restore:'Latest-Evidence/Restore-Report-Packages.ps1'},null,2),'UPLOAD-COMPLETE.json','Completion');
 save(entriesFile,{repository:repo,branch,preparedAt:new Date().toISOString(),entries});console.log(JSON.stringify({prepared:true,files:entries.length,splitPackages:split.length,githubChanged:false}));
}
function seedBranch(p){
 const seed=path.join(temp,'office-repair-branch-seed'),owner=path.join(seed,'office-upload-owned.json');
 if(fs.existsSync(seed)){if(!fs.existsSync(owner)||read(owner).repository!==repo||read(owner).branch!==branch)throw Error('Unowned branch seed directory');}else{fs.mkdirSync(seed,{recursive:true});save(owner,{repository:repo,branch});}
 const git=(args,extra={})=>(cp.execFileSync('git',args,{cwd:seed,encoding:'utf8',windowsHide:true,...extra})||'').trim();
 const gitDir=path.join(seed,'objects.git');if(!fs.existsSync(gitDir))git(['init','--bare','--quiet',gitDir]);
 const g=(args,extra={})=>git(['--git-dir='+gitDir,...args],extra);
 if(!p.seedCommit){const blob=g(['hash-object','-w','--stdin'],{input:'LIMAS office-repair upload is in progress. Wait for UPLOAD-COMPLETE.json.\n'}),tree=g(['mktree'],{input:'100644 blob '+blob+'\tREADME.txt\n'});p.seedCommit=g(['commit-tree',tree,'-m','Initialize separate office-repair upload branch']);save(prepFile,p);}
 const remote=git(['ls-remote',repo,'refs/heads/'+branch]).split(/\s/)[0];if(remote&&remote!==p.seedCommit)throw Error('Destination branch already exists with different content; no overwrite attempted');if(!remote)git(['push',repo,p.seedCommit+':refs/heads/'+branch],{stdio:'inherit',timeout:1800000});
}
async function main(args=process.argv.slice(2)){
 if(args.some(a=>!['--check','--prepare','--prepare-source'].includes(a)))throw Error('Supported options: --check, --prepare, --prepare-source');
 if(args.includes('--check')){check();return;}
 lock();const p=preparation();
 if(fs.existsSync(stateFile)){if(args.length)throw Error('Transfer checkpoint exists; run without options to resume');runTransfer({root,repo,branch,scratch:path.join(temp,'hub-branch-git-office-repair'),stateFile});return;}
 if(!fs.existsSync(entriesFile)||args.includes('--prepare-source')){const plan=check();const disk=fs.statfsSync(root);if(disk.bavail*disk.bsize<2*1024**3)throw Error('At least 2 GiB free space is required for source staging and bounded transfer');await prepare(p,plan,args.includes('--prepare-source'));}
 if(args.includes('--prepare')||args.includes('--prepare-source'))return;
 const prepared=read(entriesFile);if(prepared.repository!==repo||prepared.branch!==branch)throw Error('Prepared destination mismatch');
 seedBranch(p);runTransfer({root,repo,branch,scratch:path.join(temp,'hub-branch-git-office-repair'),stateFile,entries:prepared.entries});
}
if(require.main===module)main().catch(e=>{console.error('Office-repair upload stopped: '+String(e.message).replaceAll(root,'[project]'));process.exitCode=1;}).finally(unlock);
module.exports={main,latestPlan,check};
