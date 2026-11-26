const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const group='test-runs/earlier-crud-20261126';
const rows=[];
function walk(s,run){for(const sp of s.specs||[]){const id=sp.title.match(/LIMAS-SUD-[0-9]+/)?.[0];if(!id)continue;for(const t of sp.tests||[])for(const r of t.results||[])for(const a of r.attachments||[]){if(a.contentType!=='application/json'||!a.name.endsWith('-response')||!a.body)continue;const data=JSON.parse(Buffer.from(a.body,'base64').toString());if(!data.method||!(data.path||data.endpoint)||typeof data.status!=='number')continue;rows.push({id,run,testStatus:r.status,operation:a.name,...data});}}for(const c of s.suites||[])walk(c,run);}
for(const suite of ['profiles','user-license-hub','features','floating-license-configurations','system-user-dashboard']){const base=path.join(root,group,suite);if(!fs.existsSync(base))continue;for(const name of fs.readdirSync(base)){const rel=group+'/'+suite+'/'+name;const dir=path.join(root,rel),meta=path.join(dir,'run-metadata.json'),result=path.join(dir,'results.json');if(!fs.existsSync(meta)||!fs.existsSync(result))continue;const m=JSON.parse(fs.readFileSync(meta,'utf8'));if(!m.completedAt)continue;walk(JSON.parse(fs.readFileSync(result,'utf8')),rel);}}
fs.writeFileSync(path.join(root,'docs/execution-records/earlier-crud-repair/crud-operation-log.json'),JSON.stringify(rows,null,2)+'\n');
console.log(JSON.stringify({recordedOperations:rows.length,note:'HTTP success alone is not a persistence pass; see testStatus and latest case result.'}));
