const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const unzipper = require('unzipper');
const root = path.resolve(__dirname, '..');

test('portable reports retain full IDs, latest retry, skipped reasons, plans and all evidence', async () => {
  const auditDir = path.resolve(root, process.env.PLAYWRIGHT_OFFLINE_RUN_DIR || 'temp/framework-audit');
  const reportFile = path.join(auditDir, 'offline-results.json');
  assert.ok(fs.existsSync(reportFile), 'Run npm run test:offline first');
  const original = JSON.parse(fs.readFileSync(reportFile, 'utf8'));
  const sourceTests = [];
  function walk(suites) { for (const suite of suites) { for (const spec of suite.specs || []) sourceTests.push(...spec.tests); walk(suite.suites || []); } }
  walk(original.suites);
  const source = sourceTests.find(item => item.results.at(-1).attachments.some(a => a.name === 'Workbook test plan'));
  assert.ok(source, 'Offline workbook-evidence fixture must have completed');
  const runDir = fs.mkdtempSync(path.join(auditDir, 'portable-fixture-'));
  const result = structuredClone(source.results.at(-1));
  result.annotations = [];
  const screenshot = result.attachments.find(a => a.contentType === 'image/png');
  assert.ok(screenshot?.body);
  const screenshotFile = path.join(runDir, 'file-step.png');
  fs.writeFileSync(screenshotFile, Buffer.from(screenshot.body, 'base64'));
  result.attachments.push({ name: 'file-based-step', path: screenshotFile, contentType: 'image/png' });
  result.attachments.push({ name: 'step-' + 'long-descriptive-test-action-'.repeat(8) + '.png', body: screenshot.body, contentType: 'image/png' });
  const makeTest = (title, results) => ({ title, file: 'offline-report-fixture.spec.ts', tests: [{ expectedStatus: 'passed', annotations: [], results }] });
  const fixture = { suites: [{ title: 'Offline exporter fixtures, not application results', specs: [
    makeTest('LIMAS-SUD-1234: offline retry fixture', [{ ...result, status: 'failed', attachments: [], errors: [{ message: 'Synthetic first-attempt failure' }] }, { ...result, retry: 1, status: 'passed' }]),
    makeTest('LIMAS-AUTH-001: offline skipped fixture', [{ status: 'skipped', duration: 0, attachments: [], annotations: [{ type: 'skip', description: 'Synthetic mutation gate' }], errors: [] }]),
    makeTest('LIMAS-SUD-001: offline failed fixture', [{ ...result, status: 'failed', errors: [{ message: 'Synthetic assertion failure' }] }]),
  ] }] };
  fs.writeFileSync(path.join(runDir, 'results.json'), JSON.stringify(fixture));
  fs.writeFileSync(path.join(runDir, 'run-metadata.json'), JSON.stringify({ suite: 'offline-report-fixtures', accessProfile: 'synthetic', note: 'Synthetic verification only; no application tests ran.' }));
  const built = spawnSync(process.execPath, [path.join(root, 'scripts/build-shareable-report.js'), runDir], { cwd: root, encoding: 'utf8', windowsHide: true });
  assert.equal(built.status, 0, built.stdout + built.stderr);
  assert.match(built.stdout, /Passed:\s+1/);
  assert.match(built.stdout, /Failed:\s+1/);
  assert.match(built.stdout, /Skipped:\s+1/);
  assert.ok(fs.existsSync(path.join(runDir, 'Technical-Evidence.zip')));
  const individual = path.join(runDir, 'Test-Reports/Individual-Test-Reports/LIMAS-SUD-1234_test-report.zip');
  const archive = await unzipper.Open.file(individual);
  assert.ok(archive.files.some(file => file.path.endsWith('.webm')));
  assert.ok(archive.files.some(file => /^Evidence\/Trace\/[^/]+\.zip$/.test(file.path)));
  assert.ok(archive.files.some(file => /^Evidence\/Plans\/.*-case\.md$/.test(file.path)));
  assert.ok(archive.files.filter(file => file.path.endsWith('.png')).length >= 1);
  const html = (await archive.files.find(file => file.path === 'index.html').buffer()).toString('utf8');
  assert.ok(html.includes('LIMAS-SUD-1234'));
  assert.ok([...html.matchAll(/<img /g)].length >= 2, 'All screenshot labels must remain even when images are deduplicated');
  const names = new Set(archive.files.map(f => f.path));
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|#)/.test(m[1])) continue;
    assert.ok(names.has(m[1]), 'Every offline evidence link must resolve: ' + m[1]);
    assert.ok(m[1].length < 80, 'Portable asset path must stay short');
  }
  const skipped = await unzipper.Open.file(path.join(runDir, 'Test-Reports/Individual-Test-Reports/LIMAS-AUTH-001_test-report.zip'));
  const skippedHtml = (await skipped.files.find(file => file.path === 'index.html').buffer()).toString('utf8');
  assert.ok(!skippedHtml.includes('infrastructure prerequisite failed'));
});
