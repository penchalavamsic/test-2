const fs=require('fs'),path=require('path'),crypto=require('crypto');
const unzipper=require('unzipper'),archiver=require('archiver');
const {redactText,redactObject}=require('./lib/evidence-redaction.cjs');
const root=path.resolve(__dirname,'..');
const allFiles=process.argv.includes('--all');
const input=process.argv[2];if(!input)throw Error('Provide a run-group or completed run folder');
const target=path.resolve(root,input);if(!target.startsWith(path.join(root,'test-runs')+path.sep))throw Error('Target must be within test-runs');
const zipCache=new Map();let changedFiles=0,checkedFiles=0,changedEntries=0,cachedFiles=0;
const cacheFile=path.join(target,'.sanitization-cache.json');
const version=crypto.createHash('sha256').update(fs.readFileSync(__filename)).update(fs.readFileSync(path.join(__dirname,'lib/evidence-redaction.cjs'))).digest('hex');
let fileCache={};if(fs.existsSync(cacheFile)){try{const saved=JSON.parse(fs.readFileSync(cacheFile));if(saved.version===version)fileCache=saved.files||{};}catch{}}
function saveCache(){fs.writeFileSync(cacheFile,JSON.stringify({version,files:fileCache}));}
const roots=[root,process.env.USERPROFILE].filter(Boolean);
let cachedBytes=0;
function cacheZip(hash,buffer){ if(buffer.length>32*1024*1024)return; while(cachedBytes+buffer.length>96*1024*1024&&zipCache.size){const first=zipCache.keys().next().value;cachedBytes-=zipCache.get(first).length;zipCache.delete(first);}zipCache.set(hash,buffer);cachedBytes+=buffer.length; }
function cleanText(s){
 s=redactText(s);
 for(const base of roots){const rel=base===root?'':'runtime/';const slash=base.replaceAll('\\','/');for(const v of ['file:///'+slash,base,base.replaceAll('\\','\\\\'),slash,encodeURI(slash)]){
   for(const sep of ['\\\\','\\','/'])s=s.split(v+sep).join(rel);
   s=s.split(v).join(rel||'.');
 }}
 // Other historical machine-specific paths become portable references.
 s=s.replace(/\b[A-Z]:(?:\\\\|\\|\/)(?:[^\s<>"'`|)\]}]+(?:[ ](?!at\b)[^\s<>"'`|)\]}]+)*)/gi,m=>{
   const normalized=m.replace(/\\+/g,'/');const known=normalized.match(/\/(tests|plans|scripts|inventory|config|test-runs|node_modules)\//i);return known?normalized.slice(known.index+1):'runtime/'+normalized.split('/').at(-1);
 });
 return s.replace(/file:\/\/\/(?=[^/])/g,'');
}
function cleanObject(value){if(typeof value==='string')return cleanText(value);if(Array.isArray(value))return value.map(cleanObject);if(value&&typeof value==='object'){const out={};for(const[k,v]of Object.entries(value))out[k]=cleanObject(v);if(typeof value.body==='string'&&/^(text\/|application\/(json|xml))/.test(value.contentType||'')){try{const decoded=Buffer.from(value.body,'base64').toString('utf8');out.body=Buffer.from(cleanText(decoded)).toString('base64')}catch{}}return out;}return value;}
async function cleanBuffer(buffer,name,depth=0){
 if(depth>5)throw Error('Archive nesting too deep');
 if(buffer[0]===0x50&&buffer[1]===0x4b&&buffer[2]===3&&buffer[3]===4){
  const hash=crypto.createHash('sha256').update(buffer).digest('hex');if(zipCache.has(hash)){const cached=zipCache.get(hash);return cached.equals(buffer)?buffer:cached;}
  const zip=await unzipper.Open.buffer(buffer);const entries=[];let changed=false;
  const sourceNames=new Map();
  const registerSource=file=>{if(typeof file!=='string')return;const cleaned=cleanText(file);const candidates=[file];if(!/^[A-Za-z]:/.test(file)&&!path.isAbsolute(file))candidates.push(path.join(root,file),path.join(root,file).replaceAll('\\','/'));for(const candidate of candidates){const oldHash=crypto.createHash('sha1').update(candidate).digest('hex');const newHash=crypto.createHash('sha1').update(cleaned).digest('hex');sourceNames.set(oldHash,newHash);}};
  for(const entry of zip.files.filter(e=>/\.(trace|stacks)$/.test(e.path))){const data=(await entry.buffer()).toString('utf8');for(const line of data.split('\n')){try{const item=JSON.parse(line);for(const file of item.files||[])registerSource(file);for(const frame of item.stack||[])registerSource(frame.file);}catch{}}}

  for(const entry of zip.files){if(entry.type==='Directory')continue;const original=await entry.buffer();const next=await cleanBuffer(original,entry.path,depth+1);if(next!==original){changed=true;changedEntries++;}let name=cleanText(entry.path);name=name.replace(/^(src\/|resources\/src@)([a-f0-9]{40})(\.[^/]+)$/,(_,prefix,hash,ext)=>prefix+(sourceNames.get(hash)||hash)+ext);if(name!==entry.path)changed=true;entries.push({name,data:next});}
  if(!changed){cacheZip(hash,buffer);return buffer;}
  const chunks=[];const archive=archiver('zip',{zlib:{level:4}});const output=new Promise((resolve,reject)=>{archive.on('data',c=>chunks.push(c));archive.on('end',()=>resolve(Buffer.concat(chunks)));archive.on('error',reject)});for(const entry of entries)archive.append(entry.data,{name:entry.name,store:/\.(zip|webm|mp4|png|jpe?g|woff2?)$/i.test(entry.name)});await archive.finalize();const result=await output;cacheZip(hash,result);return result;
 }
 if(/\.(png|jpe?g|webm|mp4|woff2?|ico|pdf|xlsx)$/i.test(name)||buffer.includes(0))return buffer;
 const original=buffer.toString('utf8');if(original.includes('\uFFFD'))return buffer;let text=original;
 if(/\.json$/i.test(name)){try{const parsed=JSON.parse(text),cleaned=cleanObject(redactObject(parsed));if(JSON.stringify(parsed)!==JSON.stringify(cleaned))text=JSON.stringify(cleaned,null,2)}catch{text=cleanText(text)}}else text=cleanText(text);
 // Playwright embeds a ZIP of report data inside its HTML viewer.
 const marker=/(<template id="playwrightReportBase64">data:application\/zip;base64,)([A-Za-z0-9+/=]+)(<\/template>)/;
 const match=text.match(marker);if(match){const oldZip=Buffer.from(match[2],'base64');const newZip=await cleanBuffer(oldZip,'report.zip',depth+1);if(newZip!==oldZip)text=text.replace(marker,(_,a,b,c)=>a+newZip.toString('base64')+c);}
 return text===original?buffer:Buffer.from(text);
}
function files(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(d,e.name)):[path.join(d,e.name)])}
(async()=>{
 const candidates=files(target);
 if(allFiles && candidates.filter(f=>path.basename(f)==='run-metadata.json').some(f=>{const m=JSON.parse(fs.readFileSync(f));return m.startedAt && m.testIds && !m.completedAt && !m.interrupted;}))throw Error('Final sanitation refused while a run is active');
 const completedRuns=new Set(candidates.filter(f=>path.basename(f)==='run-metadata.json').filter(f=>{const m=JSON.parse(fs.readFileSync(f));return m.completedAt&&(m.packagingExitCode!==undefined||m.interrupted===true)}).map(f=>path.dirname(f)));
 for(const file of candidates){
  const relative=path.relative(target,file);const topLevel=path.dirname(file)===target;
  const preflight=relative.startsWith('auth-preflight')&&fs.existsSync(path.join(target,relative.split(path.sep)[0],'results.json'));
  const source=relative.startsWith('source-before'+path.sep);
  const completed=[...completedRuns].some(d=>file.startsWith(d+path.sep));
  const sequence = relative.startsWith('sequence-') && path.basename(file) === 'sequence-summary.json';
  if(!allFiles&&!topLevel&&!preflight&&!source&&!completed&&!sequence)continue;
  if(relative.startsWith('delivery'+path.sep))continue;
  if(file.endsWith('path-sanitization.json')||file.endsWith('.sanitizing')||file===cacheFile)continue;
  if(/\.(png|jpe?g|webm|mp4|woff2?|ico|pdf|xlsx)$/i.test(file))continue;
  const buffer=fs.readFileSync(file),key=relative.replaceAll('\\','/'),beforeHash=crypto.createHash('sha256').update(buffer).digest('hex');
  if(fileCache[key]===beforeHash){cachedFiles++;continue;}
  const next=await cleanBuffer(buffer,path.basename(file));checkedFiles++;if(next!==buffer){const temp=file+'.sanitizing';fs.writeFileSync(temp,next);fs.renameSync(temp,file);changedFiles++;}
  fileCache[key]=next===buffer?beforeHash:crypto.createHash('sha256').update(next).digest('hex');
  if(checkedFiles%100===0){saveCache();console.log(JSON.stringify({checkedFiles,changedFiles,changedEntries,cachedFiles}));}
 }
 saveCache();
 fs.writeFileSync(path.join(target,'path-sanitization.json'),JSON.stringify({checkedAt:new Date().toISOString(),checkedFiles,changedFiles,changedEntries,scope:allFiles?'All files in inactive target; existing delivery packages excluded.':'Completed runs only; active runs are processed after completion.'},null,2));console.log(JSON.stringify({checkedFiles,changedFiles,changedEntries}));
})().catch(e=>{console.error(cleanText(e.message));process.exitCode=1});
