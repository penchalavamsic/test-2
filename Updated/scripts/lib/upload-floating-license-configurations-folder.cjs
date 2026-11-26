const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'../..'),folder=process.argv[2];
if(!folder||!/^floating-license-configurations-[a-zA-Z0-9_-]+$/.test(folder))throw Error('Expected a prepared Floating License Configurations folder name');
const source=path.join(root,'test-runs/super-admin-live-20261125/delivery',folder),scratch=path.join(root,'temp',folder+'-github-transfer'),stateFile=path.join(root,'temp',folder+'-github-upload-state.json'),repo='https://github.com/penchalavamsic/test.git';
const limit=256*1024*1024;
function git(args,cwd=scratch,extra={}){return cp.execFileSync('git',args,{cwd,encoding:'utf8',maxBuffer:24*1024*1024,windowsHide:true,...extra});}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Symlink refused');return e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]});}
function tree(){const map={};for(const line of git(['ls-tree','-r','-z','HEAD']).split('\0')){if(!line)continue;const tab=line.indexOf('\t'),info=line.slice(0,tab).split(' ');map[line.slice(tab+1)]={mode:info[0],sha:info[2]};}return map;}
function save(s){fs.writeFileSync(stateFile+'.tmp',JSON.stringify(s,null,2));fs.renameSync(stateFile+'.tmp',stateFile);}
function removeScratch(){const resolved=path.resolve(scratch),expected=path.resolve(root,'temp',folder+'-github-transfer');if(resolved!==expected||!resolved.startsWith(path.resolve(root,'temp')+path.sep))throw Error('Unsafe cleanup path');if(fs.existsSync(resolved)){if(fs.lstatSync(resolved).isSymbolicLink())throw Error('Unsafe scratch link');if(git(['remote','get-url','origin']).trim()!==repo)throw Error('Unexpected remote');fs.rmSync(resolved,{recursive:true,force:true});}}
function clone(){git(['clone','--quiet','--filter=blob:none','--no-checkout','--depth=1',repo,scratch],root);}
(async()=>{
 let state;
 if(fs.existsSync(stateFile))state=JSON.parse(fs.readFileSync(stateFile));else{
  const manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'))),known=new Map(manifest.assets.map(a=>[a.file,a]));
  const entries=[];let i=0;const {containsKnownSecret}=require('./evidence-redaction.cjs');
  for(const f of files(source).sort()){const rel=path.relative(source,f).replaceAll('\\','/');if(/(^|\/)\.env(?:$|\.)|(^|\/)\.auth\//i.test(rel))throw Error('Private configuration refused');const data=fs.readFileSync(f);const sha256=crypto.createHash('sha256').update(data).digest('hex');const expected=known.get(rel);if(rel!=='manifest.json'&&(!expected||expected.bytes!==data.length||expected.sha256!==sha256))throw Error('Manifest mismatch: '+rel);if(data.length>=100*1024*1024)throw Error('File exceeds GitHub limit');if(/\.(html|json|txt|md|csv|js|css)$/i.test(rel)){const text=data.toString();if(containsKnownSecret(text)||/\b[A-Za-z]:(?:\\{1,2}|\/)(?!\/)/.test(text))throw Error('Sensitive text or machine path: '+rel);}const sha=crypto.createHash('sha1').update(Buffer.from('blob '+data.length+'\0')).update(data).digest('hex');entries.push({file:rel,bytes:data.length,sha,sha256});if(++i%5000===0)console.log('Verified '+i+' package files');}
  if(fs.existsSync(scratch))removeScratch();clone();
  const initialHead=git(['rev-parse','HEAD']).trim();
  const baseline=tree();if(Object.keys(baseline).some(f=>f.startsWith(folder+'/')))throw Error('Destination folder already exists; review required');
  const batches=[];let batch=[],bytes=0;for(const e of entries){if(bytes+e.bytes>limit&&batch.length){batches.push(batch);batch=[];bytes=0;}batch.push(e);bytes+=e.bytes;}if(batch.length)batches.push(batch);
  state={repo,folder,currentRemoteHead:initialHead,branch:'master',createdAt:new Date().toISOString(),baseline,entries,batches,completed:[],totalBytes:entries.reduce((a,e)=>a+e.bytes,0)};save(state);
 }
 console.log(JSON.stringify({files:state.entries.length,batches:state.batches.length,completed:state.completed.length,totalGiB:(state.totalBytes/1024**3).toFixed(2)}));
 if(process.argv.includes('--plan'))return;
 for(let i=state.completed.length;i<state.batches.length;i++){
  const batch=state.batches[i];
  if(fs.existsSync(scratch))removeScratch();clone();
  const head=git(['rev-parse','HEAD']).trim();if(head!==(state.currentRemoteHead||state.completed.at(-1)?.commit))throw Error('Remote changed during upload; review before continuing');
  for(const [k,v]of [['gc.auto','0'],['core.autocrlf','false'],['core.attributesfile','NUL'],['core.hooksPath','NUL'],['pack.threads','2'],['pack.window','0'],['pack.windowMemory','128m'],['pack.deltaCacheSize','64m']])git(['config',k,v]);
  git(['read-tree','HEAD']);
  for(const e of batch){const src=path.join(source,e.file),target=path.join(scratch,folder,e.file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.linkSync(src,target);}
  const pathspec=path.join(scratch,'.git/upload-paths');fs.writeFileSync(pathspec,Buffer.from(batch.map(e=>folder+'/'+e.file).join('\0')+'\0'));
  git(['add','-f','--pathspec-from-file='+pathspec,'--pathspec-file-nul']);
  const staged=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean);if(staged.length!==batch.length||staged.some(f=>!batch.some(e=>f===folder+'/'+e.file)))throw Error('Unexpected staged changes');
  const t=tree();for(const [f,v]of Object.entries(state.baseline))if(t[f]?.sha!==v.sha)throw Error('Baseline changed');
  const treeId=git(['write-tree','--missing-ok']).trim();
  const newCommit=git(['commit-tree',treeId,'-p',head,'-m','Add Dashboard report evidence ('+(i+1)+'/'+state.batches.length+')']).trim();
  git(['update-ref','HEAD',newCommit,head]);
  const candidate=tree();for(const e of batch)if(candidate[folder+'/'+e.file]?.sha!==e.sha)throw Error('Changed evidence file: '+e.file);
  const commit=git(['rev-parse','HEAD']).trim();console.log('Pushing batch '+(i+1)+'/'+state.batches.length+' ('+(batch.reduce((a,e)=>a+e.bytes,0)/1024**2).toFixed(0)+' MiB, '+batch.length+' files)');
  git(['push','--quiet','origin','HEAD:refs/heads/'+state.branch],scratch,{stdio:'inherit',timeout:1800000});
  const remote=git(['ls-remote','origin','refs/heads/'+state.branch]).split(/\s/)[0];if(remote!==commit)throw Error('Remote commit verification failed');
  state.currentRemoteHead=commit;state.completed.push({batch:i+1,commit,files:batch.length,completedAt:new Date().toISOString()});save(state);console.log('Verified upload batch '+(i+1)+'/'+state.batches.length);
 }
 const final=tree();for(const e of state.entries)if(final[folder+'/'+e.file]?.sha!==e.sha)throw Error('Final evidence content mismatch: '+e.file);for(const[f,v]of Object.entries(state.baseline))if(final[f]?.sha!==v.sha)throw Error('Original repository content changed');if(Object.keys(final).length!==Object.keys(state.baseline).length+state.entries.length)throw Error('Unexpected final file count');
 state.verifiedAt=new Date().toISOString();state.finalCommit=git(['rev-parse','HEAD']).trim();save(state);console.log(JSON.stringify({complete:true,files:state.entries.length,batches:state.completed.length,commit:state.finalCommit,originalFilesPreserved:Object.keys(state.baseline).length}));
})().catch(e=>{console.error('Upload stopped: '+String(e.message).replaceAll(root,'[project]').slice(0,600));process.exitCode=1});
