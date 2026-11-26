// Build the latest office-repair source snapshot; never runs application tests.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),archiver=require('archiver'),unzipper=require('unzipper');
const root=path.resolve(__dirname,'..');
const dirs=['config','docs','execution-status','framework-tests','healing','inventory','plans','reporters','scripts','tests'];
const tops=['.env.example','.gitignore','EXECUTION-STATUS.html','EXECUTION-STATUS.txt','HOW-TO-COPY-REPORTS.txt','PROJECT-HANDOFF.txt','USER-LICENSE-HUB-STATUS.txt','OFFICE-REPAIR-STATUS.txt','CURRENT-FAILURES-REVIEW.txt','MANUAL-EXPORT-VERIFICATION.txt','WHY-TESTS-STILL-FAIL.txt','package.json','package-lock.json','playwright.config.ts','playwright.offline.config.ts','tsconfig.json'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{if(e.isSymbolicLink())throw Error('Symbolic links refused');return e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)];});}
async function prepare(relative){
 const dest=path.resolve(root,relative),allowed=path.join(root,'test-runs','office-repair-20261126','delivery')+path.sep;
 if(!dest.startsWith(allowed)||path.basename(dest)!=='Updated')throw Error('Invalid source snapshot destination');
 // Preserve a verified completed-stage snapshot while later repairs are in progress.
 const existingReady=path.join(dest,'SOURCE-READY.json');
 if(fs.existsSync(existingReady)){
  const ready=JSON.parse(fs.readFileSync(existingReady)),manifest=JSON.parse(fs.readFileSync(path.join(dest,'SOURCE-MANIFEST.json')));
  if(walk(dest).length!==manifest.files.length+3)throw Error('Unexpected files in the pinned source snapshot');
  for(const asset of manifest.files){const data=fs.readFileSync(path.join(dest,asset.file));if(data.length!==asset.bytes||hash(data)!==asset.sha256)throw Error('Pinned source snapshot changed: '+asset.file);}
  if(hash(fs.readFileSync(path.join(dest,'Updated-source.zip')))!==ready.zipSha256)throw Error('Pinned source ZIP changed');
  console.log('Reusing the verified completed-stage Updated snapshot; later local edits are separate.');return;
 }
 // Create a snapshot only when this destination has no completed snapshot.
 // Refresh the unified status only for a NEW snapshot; pinned uploads remain immutable.
 const {execFileSync}=require("child_process");
 for(const script of ["build-earlier-crud-status.cjs","build-current-execution-status.cjs"]) execFileSync(process.execPath,[path.join(__dirname,script)],{cwd:root,stdio:"pipe"});

 fs.mkdirSync(dest,{recursive:true});
 const selected=[...tops,...dirs.flatMap(d=>walk(path.join(root,d)).map(f=>path.relative(root,f).replaceAll('\\','/')))].filter(f=>!(/\.(png|jpe?g|webm|mp4|zip)$/i.test(f)));
 const {containsKnownSecret}=require('./lib/evidence-redaction.cjs');
 for(const rel of selected){const data=fs.readFileSync(path.join(root,rel));if(/\.xlsx$/i.test(rel)){const workbook=await unzipper.Open.buffer(data);for(const entry of workbook.files.filter(e=>/\.(xml|rels)$/i.test(e.path))){const text=(await entry.buffer()).toString();if(containsKnownSecret(text)||/\b[A-Za-z]:[\\/]/.test(text))throw Error('Private data or machine path in workbook: '+rel);}}if(/\.(?:ts|js|cjs|ps1|json|html|txt|md|csv|ya?ml)$|^\.env\.example$/i.test(rel)){const t=data.toString();if(containsKnownSecret(t)||/\b[A-Za-z]:[\\/]/.test(t))throw Error('Private data or machine path in source: '+rel);}const to=path.resolve(dest,rel);if(!to.startsWith(dest+path.sep))throw Error('Unsafe source path');fs.mkdirSync(path.dirname(to),{recursive:true});fs.writeFileSync(to,data);}
 const h=path.join(dest,'EXECUTION-STATUS.html');let html=fs.readFileSync(h,'utf8').replace(/<a\s+href="test-runs\/[^"<>]*"[^>]*>([\s\S]*?)<\/a>/g,'<span>$1 (media supplied separately)</span>');html=html.replace('<main>','<main><section><h2>Updated source snapshot</h2><p>These are the latest scripts and execution documents. Latest completed repair evidence is in the separate Latest-Evidence folder. Read the reconciled totals below for all tabs. OFFICE-REPAIR-STATUS.txt covers the office subset only. Media is supplied separately.</p></section>');fs.writeFileSync(h,html);
 const repair=JSON.parse(fs.readFileSync(path.join(root,'docs/execution-records/office-repair/status.json')));
 const counts=repair.latestCombined;
 fs.writeFileSync(path.join(dest,'README.md'),'# Updated LIMAS automation\n\nCurrent scripts and documentation, including scripts for tabs not yet executed.\n\nCurrent office-repair disposition: '+counts.passed+' passed, '+counts.failed+' failed, '+counts.skipped+' skipped. Manual export/download verification and genuine missing-data skips are separated in OFFICE-REPAIR-STATUS.txt. This does not mean all tests passed or all tabs were executed.\n\nRead OFFICE-REPAIR-STATUS.txt, CURRENT-FAILURES-REVIEW.txt, MANUAL-EXPORT-VERIFICATION.txt and docs/execution-records/office-repair. EXECUTION-STATUS.html contains the reconciled overall totals; the historical baseline is retained separately.\n\nDownload Updated-source.zip for source only. Extract it fully, configure your own .env, then run npm ci --include=dev if dependencies are missing. No application tests are launched by the upload command.\n\nLatest-Evidence contains separate self-contained report packages and restoration instructions. test-runs, credentials, saved sessions, node_modules and temporary files are excluded from Updated.\n');
 const assets=selected.map(rel=>{const b=fs.readFileSync(path.join(dest,rel));return{file:rel,bytes:b.length,sha256:hash(b)}});const readme=fs.readFileSync(path.join(dest,'README.md'));assets.push({file:'README.md',bytes:readme.length,sha256:hash(readme)});
 fs.writeFileSync(path.join(dest,'SOURCE-MANIFEST.json'),JSON.stringify({createdAt:new Date().toISOString(),files:assets,excluded:['test-runs','.env','.auth','node_modules','temporary files','generated media']},null,2));
 const zipFile=path.join(dest,'Updated-source.zip');await new Promise((resolve,reject)=>{const out=fs.createWriteStream(zipFile+'.tmp'),zip=archiver('zip',{zlib:{level:6}});out.on('close',resolve);out.on('error',reject);zip.on('error',reject);zip.pipe(out);for(const a of [...assets,{file:'SOURCE-MANIFEST.json'}])zip.file(path.join(dest,a.file),{name:a.file});zip.finalize().catch(reject);});fs.renameSync(zipFile+'.tmp',zipFile);
 const z=await unzipper.Open.file(zipFile),entries=z.files.filter(e=>e.type!=='Directory'),known=new Map(assets.map(a=>[a.file,a]));if(entries.length!==assets.length+1)throw Error('Source ZIP entry count mismatch');for(const e of entries){const b=await e.buffer();if(e.path==='SOURCE-MANIFEST.json'){if(!b.equals(fs.readFileSync(path.join(dest,e.path))))throw Error('Manifest mismatch');continue;}const a=known.get(e.path);if(!a||a.bytes!==b.length||hash(b)!==a.sha256)throw Error('Source ZIP mismatch: '+e.path);}
 fs.writeFileSync(path.join(dest,'SOURCE-READY.json'),JSON.stringify({createdAt:new Date().toISOString(),files:assets.length+3,zipSha256:hash(fs.readFileSync(zipFile)),repair:counts},null,2));console.log('Prepared Updated source and verified Updated-source.zip');
}
module.exports={prepare};if(require.main===module)prepare(process.argv[2]).catch(e=>{console.error(e.message.replaceAll(root,'[project]'));process.exitCode=1});
