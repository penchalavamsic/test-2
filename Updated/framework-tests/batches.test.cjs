const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildBatches, exactIdPattern, collectCases, parseArgs } = require('../scripts/run-batches.cjs');
const { runBatchSequence } = require('../scripts/lib/batch-sequence.cjs');
test('batches cover every input once, cap size and sort numerically', () => {
  const cases = Array.from({length:43},(_,i)=>({id:`LIMAS-SUD-${43-i}`,file:'system-user-dashboard/fixture.spec.ts',project:'system-user-dashboard'}));
  const batches=buildBatches(cases,20);
  assert.deepEqual(batches.map(b=>b.cases.length),[20,20,3]);
  assert.equal(new Set(batches.flatMap(b=>b.cases.map(t=>t.id))).size,43);
  assert.equal(batches[0].cases[0].id,'LIMAS-SUD-1');
});
test('exact ID selection never selects numeric prefixes', () => {
  const pattern=new RegExp(exactIdPattern(['LIMAS-SUD-196','LIMAS-AUTH-001']));
  assert.equal(pattern.test('LIMAS-SUD-196: goal'),true);
  assert.equal(pattern.test('LIMAS-SUD-1960: another case'),false);
  assert.equal(pattern.test('LIMAS-AUTH-001: goal'),true);
});
test('collection finds IDs in describe titles and rejects duplicates', () => {
  const report={suites:[{title:'LIMAS-SUD-001: shell',specs:[{title:'route',file:'system-user-dashboard/a.spec.ts',tests:[{projectName:'system-user-dashboard'}]}]}]};
  assert.equal(collectCases(report)[0].id,'LIMAS-SUD-001');
  report.suites.push(report.suites[0]);
  assert.throws(()=>collectCases(report),/Duplicate/);
});
test('unknown options and missing values fail instead of running tests', () => {
  assert.throws(()=>parseArgs(['--batch']),/incomplete/);
  assert.throws(()=>parseArgs(['--typo']),/Unknown/);
  assert.deepEqual(parseArgs(['--batch','SUD-001','--dry-run']),{batch:'SUD-001','dry-run':true});
});

test('CI continues through failures once per batch and preserves a failing final status', async () => {
  const visited = [], updates = [];
  const outcome = await runBatchSequence(['A','B','C'], async name => {
    visited.push(name);
    return { batch: name, exitCode: name === 'B' ? 0 : 1 };
  }, { continueOnFailure: true, onResult: results => { updates.push(results.length); } });
  assert.deepEqual(visited, ['A','B','C']);
  assert.deepEqual(updates, [1,2,3]);
  assert.equal(outcome.exitCode, 1);
});

test('local execution stops after failure without retrying or losing results', async () => {
  const visited = [];
  const outcome = await runBatchSequence(['A','B'], async name => {
    visited.push(name);
    return { batch: name, exitCode: 1 };
  });
  assert.deepEqual(visited, ['A']);
  assert.equal(outcome.results.length, 1);
  assert.equal(outcome.exitCode, 1);
});

test('CI records a runner exception and attempts the remaining batch', async () => {
  const outcome = await runBatchSequence(['A','B'], async name => {
    if (name === 'A') throw new Error('Synthetic process launch failure');
    return { batch: name, exitCode: 0 };
  }, { continueOnFailure: true });
  assert.equal(outcome.results.length, 2);
  assert.equal(outcome.results[0].infrastructureError, 'Error');
  assert.equal(outcome.exitCode, 1);
});
