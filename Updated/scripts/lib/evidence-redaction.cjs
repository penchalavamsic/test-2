const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envFile = path.resolve(__dirname, '../..', '.env');
const env = fs.existsSync(envFile) ? dotenv.parse(fs.readFileSync(envFile)) : {};
const knownSecrets = [...new Set(Object.entries(env).filter(([k,v]) => /PASSWORD|TOKEN|SECRET/.test(k) && v).map(([,v])=>v))];
const variantsFor = secrets => [...new Set(secrets.flatMap(secret => [secret, encodeURIComponent(secret), JSON.stringify(secret).slice(1,-1)]))].filter(Boolean);
const knownVariants = variantsFor(knownSecrets);
const sensitiveKey = /^(?:password|passwd|access_token|id_token|refresh_token|client_secret|code_verifier|authorization|proxy-authorization)$/i;
const sensitiveHeader = /^(?:authorization|proxy-authorization|cookie|set-cookie)$/i;
const jwt = /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
function redactString(value, secrets = knownSecrets) {
  for (const variant of secrets === knownSecrets ? knownVariants : variantsFor(secrets)) if(value.includes(variant)) value=value.split(variant).join('[REDACTED]');
  return value.replace(jwt,'[REDACTED_TOKEN]').replace(/((?:^|[?&])(?:code|access_token|id_token|refresh_token|code_verifier)=)[^&\s"<>]+/g,'$1[REDACTED]');
}
function redactObject(value, secrets = knownSecrets, context = '', depth = 0) {
  if (typeof value === 'string') {
    const next = redactString(value,secrets);
    if(depth<8 && /^[\s]*[\[{]/.test(next)){try{return JSON.stringify(redactObject(JSON.parse(next),secrets,context,depth+1));}catch{}}
    return next;
  }
  if (Array.isArray(value)) return value.map(v=>redactObject(v,secrets,context,depth+1));
  if (!value || typeof value !== 'object') return value;
  const output={};
  for(const [key,item] of Object.entries(value)) {
    const privateValue = sensitiveKey.test(key) || (key==='value' && (sensitiveHeader.test(value.name||'') || context==='cookies'));
    output[key] = privateValue && typeof item==='string' ? '[REDACTED]' : redactObject(item,secrets,key,depth+1);
  }
  return output;
}
function redactText(text, secrets = knownSecrets) {
  const plain = redactString(text,secrets);
  if (!/^\s*[\[{"]/.test(plain)) return plain;
  try { const value=JSON.parse(plain); const safe=redactObject(value,secrets); return JSON.stringify(value)===JSON.stringify(safe)?plain:JSON.stringify(safe); } catch {}
  if (plain.includes('\n') && /^\s*\{/.test(plain)) return plain.split('\n').map(line=>{try{const value=JSON.parse(line),safe=redactObject(value,secrets);return JSON.stringify(value)===JSON.stringify(safe)?line:JSON.stringify(safe);}catch{return line;}}).join('\n');
  return plain;
}
function containsKnownSecret(text) {
  if(knownSecrets.some(s=>text.includes(s)||text.includes(encodeURIComponent(s))) || /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/.test(text)) return true;
  const isSecret = v => typeof v==='string' && v!=='' && !/^\[REDACTED(?:_TOKEN)?\]$/.test(v);
  function visit(v,context='',depth=0){
    if(depth>10)return false;
    if(typeof v==='string'){if(!/^\s*[\[{"]/.test(v))return false;try{return visit(JSON.parse(v),context,depth+1)}catch{return false}}
    if(Array.isArray(v))return v.some(x=>visit(x,context,depth+1));
    if(!v||typeof v!=='object')return false;
    return Object.entries(v).some(([k,x])=>(sensitiveKey.test(k)&&isSecret(x))||(k==='value'&&(sensitiveHeader.test(v.name||'')||context==='cookies')&&isSecret(x))||visit(x,k,depth+1));
  }
  if(!/^\s*[\[{"]/.test(text))return false;
  try{return visit(JSON.parse(text))}catch{return text.split('\n').some(line=>{try{return visit(JSON.parse(line))}catch{return false}})}
}
module.exports={redactText,redactObject,containsKnownSecret};