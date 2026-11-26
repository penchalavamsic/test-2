const {test}=require('node:test');
const assert=require('node:assert/strict');
const {collectHtmlRefs}=require('../scripts/lib/report-builder');
test('asset references exclude quoted example text and other attribute values',()=>{
 const html=`<code>href="/features"</code><pre>&lt;a href="/profiles"&gt;</pre><img alt='example href="/wrong"' src="Evidence/image.png"><a href='Evidence/trace.zip'>Trace</a><script>const s='<a href="/not-markup">';</script>`;
 assert.deepEqual(collectHtmlRefs(html),['Evidence/image.png','Evidence/trace.zip']);
});
test('real absolute references remain visible to validation',()=>{
 assert.deepEqual(collectHtmlRefs('<a href="/features">Bad local link</a>'),['/features']);
});
