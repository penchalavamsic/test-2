const {test}=require('node:test');
const assert=require('node:assert/strict');
const {redactText,containsKnownSecret}=require('../scripts/lib/evidence-redaction.cjs');
test('redaction removes credentials from nested trace data while preserving actions and public headers',()=>{
 const secret='synthetic-secret-42';
 const token=['eyJhbGciOiJIUzI1NiJ9','eyJzdWIiOiJmaXh0dXJlIn0','c2lnbmF0dXJl'].join('.');
 const event={type:'before',apiName:'locator.fill',params:{value:secret},headers:[{name:'Authorization',value:'Bearer '+token},{name:'Content-Type',value:'application/json'}],cookies:[{name:'session',value:'opaque-cookie'}],payload:JSON.stringify({refresh_token:'opaque-refresh',access_token:token}),url:'https://example.invalid/auth/callback?code=one-time-code&view=dashboard'};
 const safe=redactText(JSON.stringify(event),[secret]);
 const parsed=JSON.parse(safe);
 assert.equal(parsed.type,'before');assert.equal(parsed.apiName,'locator.fill');
 assert.equal(parsed.params.value,'[REDACTED]');assert.equal(parsed.headers[0].value,'[REDACTED]');assert.equal(parsed.headers[1].value,'application/json');assert.equal(parsed.cookies[0].value,'[REDACTED]');assert.equal(JSON.parse(parsed.payload).refresh_token,'[REDACTED]');assert.match(parsed.url,/view=dashboard/);assert.ok(!safe.includes('one-time-code'));
 assert.equal(containsKnownSecret(JSON.stringify(event)),true);assert.equal(containsKnownSecret(safe),false);assert.equal(redactText(safe,[secret]),safe);
 const lines=JSON.stringify(event)+'\n'+JSON.stringify({type:'after',result:{status:'passed'}})+'\n';
 const cleaned=redactText(lines,[secret]);assert.equal(JSON.parse(cleaned.trim().split('\n')[1]).result.status,'passed');assert.equal(containsKnownSecret(cleaned),false);
});