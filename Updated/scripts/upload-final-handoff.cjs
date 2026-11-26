// Upload a fresh Updated snapshot and latest completed office-repair report packages.
// No application tests are executed. Run again to resume an interrupted transfer.
const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto');
const {runTransfer,describe,sha256}=require('./lib/hub-branch-transfer.cjs');
const root=path.resolve(__dirname,'..');
const repo='https://github.com/penchalavamsic/test-2.git',branch='hub-dashboard-handoff-20261126';
const group='test-runs/final-handoff-20261126',temp=path.join(root,'temp');
const prepFile=path.join(temp,'final-handoff-upload-preparation.json'),entriesFile=path.join(temp,'final-handoff-upload-entries.json');
const stateFile=path.join(temp,'final-handoff-upload-state.json'),lockFile=path.join(temp,'final-handoff-upload.lock');
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
 const evidence=read(path.join(root,group,'evidence-prepared.json')),selection=read(path.join(root,group,'evidence-selection.json'));
 const status=read(path.join(root,'execution-status/status-data.json'));
 const runs=evidence.packages.map(p=>({...p,bytes:fs.statSync(path.join(root,p.source)).size}));
 return{status,cases:selection.cases,runs};
}
function check(){const p=latestPlan(),bytes=p.runs.reduce((n,r)=>n+r.bytes,0);console.log(JSON.stringify({repository:repo,branch,folders:['Updated','Latest-Evidence'],repairCases:p.cases.length,packages:p.runs.length,mediaGiB:(bytes/1024**3).toFixed(2),currentDisposition:p.status.counts,applicationTestsRun:false},null,2));return p;}
function preparation(){let p=fs.existsSync(prepFile)?read(prepFile):null;if(p){if(p.repository!==repo||p.branch!==branch||p.folder!==group)throw Error('Invalid upload preparation');return p;}p={repository:repo,branch,createdAt:new Date().toISOString(),folder:group};save(prepFile,p);return p;}
function verifyEvidence(plan){const v=read(path.join(root,group,'Latest-Evidence/path-verification.json'));if(!Array.isArray(v.findings)||v.findings.length)throw Error('Evidence privacy verification has findings');for(const r of plan.runs){safe(r.source);if(!r.source.startsWith(group+'/Latest-Evidence/'))throw Error('Unexpected evidence location');if(Date.parse(v.checkedAt)<fs.statSync(path.join(root,r.source)).mtimeMs)throw Error('Evidence changed after verification');}}
async function prepare(p,plan,sourceOnly=false){
 const dest=path.join(root,p.folder,'Updated'),control=path.join(root,p.folder,'upload-control');fs.mkdirSync(control,{recursive:true});
 if(!sourceOnly)verifyEvidence(plan);
 run('scan-sensitive-data.cjs');
 await require('./prepare-final-source.cjs').prepare(rel(dest));
 if(sourceOnly){console.log('Prepared source only. No GitHub changes.');return;}
 const entries=[],manifest=read(path.join(dest,'SOURCE-MANIFEST.json')),ready=read(path.join(dest,'SOURCE-READY.json'));
 const known=new Map(manifest.files.map(a=>[a.file,a]));
 if(walk(dest).length!==manifest.files.length+3)throw Error('Unexpected source snapshot files');
 for(const f of walk(dest).sort()){const file=path.relative(dest,f).replaceAll('\\','/'),data=fs.readFileSync(f);if(file==='Updated-source.zip'){if(sha256(data)!==ready.zipSha256)throw Error('Source ZIP mismatch');}else if(!['SOURCE-MANIFEST.json','SOURCE-READY.json'].includes(file)){const a=known.get(file);if(!a||a.bytes!==data.length||a.sha256!==sha256(data))throw Error('Source snapshot mismatch: '+file);}entries.push(describe(root,'Updated/'+file,rel(f),'Updated'));}
 const packages=[],split=[];
 for(const r of plan.runs){const file=r.file,source=path.join(root,r.source),bytes=fs.statSync(source).size,hash=hashFile(source);const pkg={file,bytes,sha256:hash,sourceRun:r.run,parts:[]};if(bytes<=partSize)entries.push(describe(root,'Latest-Evidence/'+file,r.source,'Latest evidence'));else{let index=0;for(let offset=0;offset<bytes;offset+=partSize){const part='.parts/'+hash+'/'+String(++index).padStart(3,'0')+'.part',e=describe(root,'Latest-Evidence/'+part,r.source,'Latest evidence',offset,Math.min(partSize,bytes-offset));entries.push(e);pkg.parts.push({file:part,bytes:e.bytes,sha256:e.sha256});}split.push(pkg);}packages.push(pkg);}
 function add(name,text,target,phase){const f=path.join(control,name);fs.writeFileSync(f,text);entries.push(describe(root,target,rel(f),phase));}
 add('PACKAGE-PARTS.json',JSON.stringify({version:1,packages:split},null,2),'Latest-Evidence/PACKAGE-PARTS.json','Latest evidence');
 add('manifest.json',JSON.stringify({createdAt:new Date().toISOString(),scope:'Latest completed earlier-tab repair package for each locally rerun case. Full packages can include superseded attempts; Updated status is authoritative. Original office evidence remains in branch office-repair-20261126.',cases:plan.cases,packages:packages.map(({parts,...p})=>({...p,split:parts.length>0})),officeOnlyEvidence:'Results for office-only cases are documented; original office-laptop media is not recreated by this upload.',currentDisposition:plan.status.counts},null,2),'Latest-Evidence/manifest.json','Latest evidence');
 entries.push(describe(root,'Latest-Evidence/Restore-Report-Packages.ps1','scripts/restore-office-report-packages.ps1','Latest evidence'));
 add('OPEN-REPORTS.txt',['LATEST OFFICE-REPAIR EVIDENCE','', 'After downloading this branch ZIP, extract it fully.','Open PowerShell in Latest-Evidence and run:','powershell -NoProfile -ExecutionPolicy Bypass -File .\\Restore-Report-Packages.ps1','This joins lossless package parts and verifies SHA-256 hashes. Parts are retained.','Then extract the desired Complete-Suite-Test-Report.zip fully and open its HTML report.','Packages contain captured reports and evidence. Cases LIMAS-SUD-628 and LIMAS-SUD-638 have trace-finalization limitations; missing recordings were not recreated.','Keep each extracted package together so its relative evidence links work.','Updated contains scripts/docs separately; its current status overrides older attempts inside batch packages.','UPLOAD-COMPLETE.json at branch root confirms the whole transfer finished.',''].join('\n'),'Latest-Evidence/OPEN-REPORTS.txt','Latest evidence');
 add('README.txt',['LIMAS stopped-run handoff','Updated/: cumulative source for all tabs and the four current handoff documents.','Latest-Evidence/: 144 latest earlier-tab repair packages; original office evidence remains on office-repair-20261126.','Read Updated/EXECUTION-STATUS.html and Updated/FAILED-AND-SKIPPED.html for unresolved failures and pending verification.','Read Updated/FRAMEWORK-GUIDE.html for setup, folder structure, CI/CD and sharing.','Download Updated/Updated-source.zip for source alone.','For media, follow Latest-Evidence/OPEN-REPORTS.txt.','No credentials, saved sessions, node_modules or raw test-runs are included in Updated.','The transfer is complete only when UPLOAD-COMPLETE.json exists.',''].join('\n'),'README.txt','Updated');
 const unique=new Map();for(const e of entries){const previous=unique.get(e.file);if(previous&&previous.sha256!==e.sha256)throw Error('Conflicting upload destination');if(!previous)unique.set(e.file,e);}entries.splice(0,entries.length,...unique.values());
 entries.sort((a,b)=>(a.phase==='Updated'?0:1)-(b.phase==='Updated'?0:1)||a.file.localeCompare(b.file));
 add('UPLOAD-COMPLETE.json',JSON.stringify({repository:repo,branch,preparedAt:new Date().toISOString(),folders:['Updated','Latest-Evidence'],localRepairCases:plan.cases.length,reportPackages:packages.length,splitPackages:split.length,currentDisposition:plan.status.counts,sourceZip:'Updated/Updated-source.zip',restore:'Latest-Evidence/Restore-Report-Packages.ps1'},null,2),'UPLOAD-COMPLETE.json','Completion');
 save(entriesFile,{repository:repo,branch,preparedAt:new Date().toISOString(),entries});console.log(JSON.stringify({prepared:true,files:entries.length,splitPackages:split.length,githubChanged:false}));
}
function seedBranch(p){
 const seed=path.join(temp,'final-handoff-branch-seed'),owner=path.join(seed,'final-upload-owned.json');
 if(fs.existsSync(seed)){if(!fs.existsSync(owner)||read(owner).repository!==repo||read(owner).branch!==branch)throw Error('Unowned branch seed directory');}else{fs.mkdirSync(seed,{recursive:true});save(owner,{repository:repo,branch});}
 const git=(args,extra={})=>(cp.execFileSync('git',args,{cwd:seed,encoding:'utf8',windowsHide:true,...extra})||'').trim();
 const gitDir=path.join(seed,'objects.git');if(!fs.existsSync(gitDir))git(['init','--bare','--quiet',gitDir]);
 const g=(args,extra={})=>git(['--git-dir='+gitDir,...args],extra);
 if(!p.seedCommit){const blob=g(['hash-object','-w','--stdin'],{input:'LIMAS stopped-run handoff upload is in progress. Wait for UPLOAD-COMPLETE.json.\n'}),tree=g(['mktree'],{input:'100644 blob '+blob+'\tREADME.txt\n'});p.seedCommit=g(['commit-tree',tree,'-m','Initialize separate handoff branch']);save(prepFile,p);}
 const remote=git(['ls-remote',repo,'refs/heads/'+branch]).split(/\s/)[0];if(remote&&remote!==p.seedCommit)throw Error('Destination branch already exists with different content; no overwrite attempted');if(!remote){g(['cat-file','-e',p.seedCommit+'^{commit}']);g(['push',repo,p.seedCommit+':refs/heads/'+branch],{stdio:'inherit',timeout:1800000});}
}
async function main(args=process.argv.slice(2)){
 if(args.some(a=>!['--check','--prepare','--prepare-source'].includes(a)))throw Error('Supported options: --check, --prepare, --prepare-source');
 if(args.includes('--check')){check();return;}
 if(!args.includes('--prepare-source')&&!fs.existsSync(entriesFile)&&!fs.existsSync(stateFile)){
  const verification=path.join(root,group,'Latest-Evidence/path-verification.json');
  if(!fs.existsSync(verification))console.log('Waiting for the current evidence privacy verification to finish. No tests or uploads start while waiting.');
  const deadline=Date.now()+60*60*1000;
  while(!fs.existsSync(verification)){if(Date.now()>deadline)throw Error('Evidence verification is still pending; no upload attempted. Run this command again when verification finishes.');await new Promise(resolve=>setTimeout(resolve,5000));}
 }
 lock();const p=preparation();
 if(fs.existsSync(stateFile)){if(args.length)throw Error('Transfer checkpoint exists; run without options to resume');runTransfer({root,repo,branch,scratch:path.join(temp,'hub-branch-git-final-handoff'),stateFile});return;}
 if(!fs.existsSync(entriesFile)||args.includes('--prepare-source')){const plan=check();const disk=fs.statfsSync(root);if(disk.bavail*disk.bsize<2*1024**3)throw Error('At least 2 GiB free space is required for source staging and bounded transfer');await prepare(p,plan,args.includes('--prepare-source'));}
 if(args.includes('--prepare')||args.includes('--prepare-source'))return;
 const prepared=read(entriesFile);if(prepared.repository!==repo||prepared.branch!==branch)throw Error('Prepared destination mismatch');
 seedBranch(p);runTransfer({root,repo,branch,scratch:path.join(temp,'hub-branch-git-final-handoff'),stateFile,entries:prepared.entries});
}
if(require.main===module)main().catch(e=>{console.error('Handoff upload stopped: '+String(e.message).replaceAll(root,'[project]'));process.exitCode=1;}).finally(unlock);
module.exports={main,latestPlan,check};
