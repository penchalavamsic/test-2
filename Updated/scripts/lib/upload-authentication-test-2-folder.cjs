// Authentication evidence uploader for test-2. Retains its temporary checkout.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),cp=require('child_process');
const root=path.resolve(__dirname,'../..'),folder=process.argv[2],repo='https://github.com/penchalavamsic/test-2.git';
if(!folder||!/^authentication-[a-zA-Z0-9_-]+$/.test(folder))throw Error('Expected a prepared Authentication folder');
const source=path.join(root,'test-runs/super-admin-live-20261125/delivery',folder),scratch=path.join(root,'temp',folder+'-test-2-github-transfer'),stateFile=path.join(root,'temp',folder+'-test-2-github-upload-state.json'),limit=256*1024*1024;
function git(args,cwd=scratch,extra={}){return cp.execFileSync('git',args,{cwd,encoding:'utf8',maxBuffer:24*1024*1024,windowsHide:true,...extra});}
function head(){try{return git(['rev-parse','--verify','--quiet','HEAD']).trim()}catch{return null}}
function tree(ref='HEAD'){const out={};if(ref==='HEAD'&&!head())return out;for(const l of git(['ls-tree','-r','-z',ref]).split('\0')){if(!l)continue;const i=l.indexOf('\t'),a=l.slice(0,i).split(' ');out[l.slice(i+1)]={mode:a[0],sha:a[2]};}return out;}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Symbolic links refused');const f=path.join(dir,e.name);return e.isDirectory()?walk(f):[f]});}
function save(s){fs.writeFileSync(stateFile+'.tmp',JSON.stringify(s,null,2));fs.renameSync(stateFile+'.tmp',stateFile);}
function remoteHead(s){return git(['ls-remote','origin','refs/heads/'+s.branch]).trim().split(/\s/)[0]||null;}
function verifyTree(s,t,entries){for(const[f,v]of Object.entries(s.baseline))if(t[f]?.sha!==v.sha||t[f]?.mode!==v.mode)throw Error('Existing repository content changed: '+f);for(const e of entries)if(t[folder+'/'+e.file]?.sha!==e.sha)throw Error('Evidence mismatch: '+e.file);if(Object.keys(t).length!==Object.keys(s.baseline).length+entries.length)throw Error('Unexpected repository file count');}
function finishPending(s){const p=s.pending;if(!p)return;if(p.batch!==s.completed.length+1||head()!==p.commit)throw Error('Invalid pending upload checkpoint');verifyTree(s,tree(),s.batches.slice(0,p.batch).flat());let remote=remoteHead(s);if(remote===s.currentRemoteHead){console.log('Pushing batch '+p.batch+'/'+s.batches.length);git(['push','--quiet','origin',p.commit+':refs/heads/'+s.branch],scratch,{stdio:'inherit',timeout:1800000});remote=remoteHead(s);}if(remote!==p.commit)throw Error('Remote changed; review required');s.currentRemoteHead=p.commit;s.completed.push({...p,completedAt:new Date().toISOString()});delete s.pending;save(s);console.log('Verified upload batch '+s.completed.length+'/'+s.batches.length);}
(async()=>{
 fs.mkdirSync(path.dirname(scratch),{recursive:true});if(!fs.existsSync(scratch))git(['clone','--quiet','--filter=blob:none','--no-checkout','--depth=1',repo,scratch],root);
 if(git(['remote','get-url','origin']).trim()!==repo)throw Error('Destination must be test-2');
 for(const[k,v]of [['gc.auto','0'],['core.autocrlf','false'],['core.attributesfile','NUL'],['pack.window','0'],['pack.threads','2']])git(['config',k,v]);
 let s;
 if(fs.existsSync(stateFile)){s=JSON.parse(fs.readFileSync(stateFile));if(s.repo!==repo||s.folder!==folder)throw Error('Checkpoint belongs to another destination');}
 else{
  const manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'))),known=new Map(manifest.assets.map(a=>[a.file,a]));if(manifest.suite!=='authentication')throw Error('Wrong report suite');
  const {containsKnownSecret}=require('./evidence-redaction.cjs'),entries=[];
  for(const f of walk(source).sort()){const rel=path.relative(source,f).replaceAll('\\','/'),data=fs.readFileSync(f),sha256=crypto.createHash('sha256').update(data).digest('hex'),a=known.get(rel);if(rel!=='manifest.json'&&(!a||a.bytes!==data.length||a.sha256!==sha256))throw Error('Manifest mismatch: '+rel);if(data.length>=100*1024*1024)throw Error('File exceeds GitHub file limit');if(/(^|\/)\.env(?:$|\.)|(^|\/)\.auth\//i.test(rel))throw Error('Private configuration refused');if(/\.(html|json|txt|md|csv|js|css)$/i.test(rel)){const text=data.toString();if(containsKnownSecret(text)||/\b[A-Za-z]:(?:\\{1,2}|\/)(?!\/)/.test(text))throw Error('Sensitive text or machine path: '+rel);}entries.push({file:rel,bytes:data.length,sha256,sha:crypto.createHash('sha1').update(Buffer.from('blob '+data.length+'\0')).update(data).digest('hex')});}
  const initialHead=head();let branch;if(initialHead)branch=git(['symbolic-ref','--short','HEAD']).trim();else{branch='main';git(['symbolic-ref','HEAD','refs/heads/main']);}
  const baseline=tree();if(Object.keys(baseline).some(f=>f.startsWith(folder+'/')))throw Error('Destination folder already exists');const batches=[];let batch=[],bytes=0;for(const e of entries){if(batch.length&&bytes+e.bytes>limit){batches.push(batch);batch=[];bytes=0;}batch.push(e);bytes+=e.bytes;}if(batch.length)batches.push(batch);
  s={repo,folder,branch,currentRemoteHead:initialHead,createdAt:new Date().toISOString(),baseline,entries,batches,completed:[],totalBytes:entries.reduce((n,e)=>n+e.bytes,0)};save(s);
 }
 console.log(JSON.stringify({repository:repo,folder,branch:s.branch,files:s.entries.length,batches:s.batches.length,completed:s.completed.length}));finishPending(s);
 for(let i=s.completed.length;i<s.batches.length;i++){
  if(remoteHead(s)!==s.currentRemoteHead||head()!==s.currentRemoteHead)throw Error('Remote or local checkout changed; review required');const previous=head(),batch=s.batches[i];git(previous?['read-tree','HEAD']:['read-tree','--empty']);
  for(const e of batch){const src=path.join(source,e.file),dest=path.join(scratch,folder,e.file);fs.mkdirSync(path.dirname(dest),{recursive:true});if(!fs.existsSync(dest))fs.linkSync(src,dest);}
  const list=path.join(scratch,'.git','upload-paths');fs.writeFileSync(list,Buffer.from(batch.map(e=>folder+'/'+e.file).join('\0')+'\0'));git(['add','-f','--pathspec-from-file='+list,'--pathspec-file-nul']);
  const staged=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean),allowed=new Set(batch.map(e=>folder+'/'+e.file));if(staged.length!==batch.length||staged.some(f=>!allowed.has(f)))throw Error('Unexpected staged changes');
  const treeId=git(['write-tree','--missing-ok']).trim();verifyTree(s,tree(treeId),s.batches.slice(0,i+1).flat());const commit=git(['commit-tree',treeId,...(previous?['-p',previous]:[]),'-m','Add Authentication report evidence ('+(i+1)+'/'+s.batches.length+')']).trim();
  git(['update-ref','HEAD',commit,previous||'0'.repeat(40)]);s.pending={batch:i+1,commit,files:batch.length};save(s);finishPending(s);
 }
 if(remoteHead(s)!==head())throw Error('Final remote verification failed');verifyTree(s,tree(),s.entries);s.finalCommit=head();s.verifiedAt=new Date().toISOString();save(s);console.log(JSON.stringify({complete:true,repository:repo,folder,files:s.entries.length,batches:s.completed.length,commit:s.finalCommit,originalFilesPreserved:Object.keys(s.baseline).length}));
})().catch(e=>{console.error('Authentication upload stopped: '+String(e.message).replaceAll(root,'[project]').slice(0,600));process.exitCode=1});
