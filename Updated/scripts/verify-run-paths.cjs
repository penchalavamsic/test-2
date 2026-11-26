const fs=require('fs'),path=require('path'),crypto=require('crypto'),unzipper=require('unzipper');
const {containsKnownSecret}=require('./lib/evidence-redaction.cjs');
const root=path.resolve(__dirname,'..'),target=path.resolve(root,process.argv[2]||'test-runs/super-admin-live-20261125');
if(!target.startsWith(path.join(root,'test-runs')+path.sep))throw Error('Target must be within test-runs');
let checkedText=0,checkedArchives=0,checkedSourceLinks=0;const findings=[],seen=new Set(),seenText=new Set(),traceSources=new Map();
const machinePath=/\b[A-Za-z]:(?:\\{1,2}|\/)(?!\/)|file:\/\/\/(?:Users|home|tmp)\/|\/(?:Users|home)\/[^/\s]+\//;
function inspectText(text,label){checkedText++;if(containsKnownSecret(text))findings.push({file:label,issue:'Authentication secret or token'});if(machinePath.test(text))findings.push({file:label,issue:'Machine-specific path'});}
async function inspect(buffer,label,depth=0){
 if(depth>6)throw Error('Archive nesting too deep');
 if(buffer[0]===0x50&&buffer[1]===0x4b&&buffer[2]===3&&buffer[3]===4){
  const digest=crypto.createHash('sha256').update(buffer).digest('hex');if(seen.has(digest))return;seen.add(digest);checkedArchives++;
  const zip=await unzipper.Open.buffer(buffer),names=new Set(zip.files.map(e=>e.path));const hasSources=[...names].some(n=>/^(resources\/src@|src\/)[a-f0-9]{40}/.test(n));
  for(const entry of zip.files){if(entry.type==='Directory')continue;const content=await entry.buffer();const name=label+'!/'+entry.path;inspectText(entry.path,name+' (entry name)');
   if(/\.(trace|stacks)$/.test(entry.path)) {
    const digest=crypto.createHash('sha256').update(content).digest('hex');
    if(!traceSources.has(digest)) {
     const refs=new Set();
     for(const line of content.toString('utf8').split('\n'))try{const item=JSON.parse(line);for(const file of [...(item.files||[]),...(item.stack||[]).map(f=>f.file)])if(typeof file==='string'&&!/^project#[a-zA-Z0-9_-]+$/.test(file))refs.add(file);}catch{}
     traceSources.set(digest,refs);
    }
    for(const file of traceSources.get(digest)){const hash=crypto.createHash('sha1').update(file).digest('hex'),ext=path.extname(file);if(names.has('resources/src@'+hash+ext)||names.has('src/'+hash+ext))checkedSourceLinks++;else if(hasSources)findings.push({file:name,issue:'Missing source link',source:file});}
   }
   await inspect(content,name,depth+1);
  }return;
 }
 if(/\.(png|jpe?g|webm|mp4|woff2?|ico|pdf)$/i.test(label)||buffer.includes(0))return;const text=buffer.toString('utf8');if(text.includes('\uFFFD'))return;const textKey=(/\.json$/i.test(label)?'json:':'text:')+crypto.createHash('sha256').update(buffer).digest('hex');if(seenText.has(textKey))return;seenText.add(textKey);inspectText(text,label);
 const embedded=text.match(/<template id="playwrightReportBase64">data:application\/zip;base64,([A-Za-z0-9+/=]+)<\/template>/);if(embedded)await inspect(Buffer.from(embedded[1],'base64'),label+'!/embedded-report.zip',depth+1);
 if(/\.json$/i.test(label)){try{const visit=v=>{if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object'){if(typeof v.body==='string'&&/^(text\/|application\/(json|xml))/.test(v.contentType||''))inspectText(Buffer.from(v.body,'base64').toString('utf8'),label+' (attachment)');Object.values(v).forEach(visit);}};visit(JSON.parse(text));}catch{}}
}
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)])}
(async()=>{for(const f of files(target)){if(/path-verification\.json$|\.sanitizing$/.test(f))continue;await inspect(fs.readFileSync(f),path.relative(target,f).replaceAll('\\','/'));}const result={checkedAt:new Date().toISOString(),checkedText,checkedArchives,checkedSourceLinks,findings};fs.writeFileSync(path.join(target,'path-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({checkedText,checkedArchives,checkedSourceLinks,findings:findings.length}));if(findings.length)process.exitCode=1;})().catch(e=>{console.error(e.name);process.exitCode=1});
