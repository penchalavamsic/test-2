// Prepare and upload existing Features evidence. Never executes application tests.
const fs=require('fs'),path=require('path'),cp=require('child_process'),unzipper=require('unzipper');
const root=path.resolve(__dirname,'..'),group='super-admin-live-20261125',groupDir=path.join(root,'test-runs',group),temp=path.join(root,'temp');
const preparationFile=path.join(temp,'features-upload-preparation.json'),lockFile=path.join(temp,'features-upload.lock');
const checkOnly=process.argv.includes('--check');let ownsLock=false;
function unlock(){if(ownsLock&&fs.existsSync(lockFile)){const l=JSON.parse(fs.readFileSync(lockFile));if(l.pid===process.pid)fs.unlinkSync(lockFile);}ownsLock=false;}
function run(script,args=[],extraEnv={}){const r=cp.spawnSync(process.execPath,[path.join(root,'scripts',script),...args],{cwd:root,env:{...process.env,...extraEnv},stdio:'inherit',windowsHide:true});if(r.status!==0)throw Error(script+' did not finish; rerun this command to retry from its saved checkpoint.');}
function size(dir){if(!fs.existsSync(dir))return 0;return fs.readdirSync(dir,{withFileTypes:true}).reduce((n,e)=>{const p=path.join(dir,e.name);if(e.isSymbolicLink())throw Error('Unexpected symbolic link');return n+(e.isDirectory()?size(p):fs.statSync(p).size)},0);}
process.on('exit',unlock);process.on('SIGINT',()=>process.exit(130));process.on('SIGTERM',()=>process.exit(143));
(async()=>{
 const summary=JSON.parse(fs.readFileSync(path.join(groupDir,'execution-summary.json'))),cases=summary.cases.filter(c=>c.suite==='features');
 if(!cases.length||cases.some(c=>['pending','not-run','interrupted'].includes(c.status)))throw Error('Features execution is incomplete');
 const runs=[...new Set(cases.flatMap(c=>c.attempts.map(a=>a.run)))];let expanded=0;
 for(const relative of runs){const dir=path.resolve(groupDir,relative);if(!dir.startsWith(path.join(groupDir,'features')+path.sep))throw Error('Invalid Features run');const m=JSON.parse(fs.readFileSync(path.join(dir,'run-metadata.json')));if(m.packagingExitCode!==0)throw Error('Incomplete run packaging: '+relative);const z=await unzipper.Open.file(path.join(dir,'Test-Reports/Complete-Suite-Test-Report.zip'));for(const e of z.files)if(e.type!=='Directory')expanded+=e.uncompressedSize;}
 let prep=fs.existsSync(preparationFile)?JSON.parse(fs.readFileSync(preparationFile)):null;
 if(prep&&!/^features-[a-zA-Z0-9_-]+$/.test(prep.folder))throw Error('Invalid saved preparation folder');
 const folder=prep?.folder||'features-'+new Date().toISOString().replace(/[-:.]/g,'').slice(0,15),dest=path.join(groupDir,'delivery',folder),disk=fs.statfsSync(root),free=disk.bavail*disk.bsize,need=Math.max(0,expanded-size(dest))+0.8*1024**3;
 const counts={};for(const c of cases)counts[c.status]=(counts[c.status]||0)+1;
 console.log(JSON.stringify({suite:'features',cases:cases.length,counts,reportRuns:runs.length,expandedGiB:(expanded/1024**3).toFixed(2),freeGiB:(free/1024**3).toFixed(2),requiredFreeGiB:(need/1024**3).toFixed(2),destination:folder,mode:checkOnly?'check-only':'prepare-and-upload'}));
 if(free<need)throw Error('Insufficient free disk space for safe preparation/upload. No evidence was deleted.');
 if(checkOnly)return;
 fs.mkdirSync(temp,{recursive:true});if(fs.existsSync(lockFile)){const l=JSON.parse(fs.readFileSync(lockFile));let active=true;try{process.kill(l.pid,0)}catch(e){if(e.code==='ESRCH')active=false;else throw e;}if(active)throw Error('Another Features uploader is running');fs.unlinkSync(lockFile);}fs.writeFileSync(lockFile,JSON.stringify({pid:process.pid}),{flag:'wx'});ownsLock=true;
 if(!prep){if(fs.existsSync(dest))throw Error('Preparation folder already exists');prep={folder,createdAt:new Date().toISOString(),suite:'features'};fs.writeFileSync(preparationFile,JSON.stringify(prep,null,2));}
 const manifest=path.join(dest,'manifest.json');if(!fs.existsSync(manifest)){
  console.log('Preparing portable Features reports; then checking paths, credentials and evidence links. No second large ZIP will be created.');
  run('build-review-package.cjs',[group,'features','--no-zip','--resume'],{LIMAS_REVIEW_FOLDER_NAME:folder});
 }
 const m=JSON.parse(fs.readFileSync(manifest));const verification=JSON.parse(fs.readFileSync(path.join(dest,'path-verification.json')));if(m.suite!=='features'||m.reportCount!==runs.length||verification.findings.length)throw Error('Features package is not verified');
 console.log('Uploading '+folder+' at repository root; Dashboard and Updated remain separate.');run('lib/upload-features-folder.cjs',[folder]);
 console.log('Features upload completed. Folder: '+folder);unlock();
})().catch(e=>{console.error('Features upload stopped: '+String(e.message).replaceAll(root,'[project]'));unlock();process.exitCode=1});
