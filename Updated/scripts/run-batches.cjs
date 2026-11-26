const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn, spawnSync } = require('child_process');
const ExcelJS = require('exceljs');
const { runBatchSequence } = require('./lib/batch-sequence.cjs');
const root = path.resolve(__dirname, '..');
const cli = require.resolve('@playwright/test/cli');
require('dotenv').config({ path: path.join(root, '.env') });

function parseArgs(args) {
  const flags = {};
  const boolean = new Set(['list', 'all', 'dry-run', 'headed', 'portable', 'continue-on-failure']);
  const valued = new Set(['suite', 'batch', 'size', 'profile', 'workers', 'rebuild', 'exclude-suite', 'exclude-ids', 'run-group', 'only-ids-file']);
  for (let i = 0; i < args.length; i++) {
    const key = args[i].replace(/^--/, '');
    if (boolean.has(key)) flags[key] = true;
    else if (valued.has(key) && args[i + 1] && !args[i + 1].startsWith('--')) flags[key] = args[++i];
    else throw new Error(`Unknown or incomplete argument: ${args[i]}`);
  }
  return flags;
}
function collectCases(report) {
  const cases = [];
  function walk(suites, parents = []) {
    for (const suite of suites) {
      const titles = [...parents, suite.title];
      for (const spec of suite.specs || []) {
        const fullTitle = [...titles, spec.title].join(' ');
        const id = fullTitle.match(/\bLIMAS-[A-Z]+-\d+\b/)?.[0];
        if (!id) continue; // Auth infrastructure is executed as dependencies.
        for (const test of spec.tests) cases.push({ id, title: spec.title, fullTitle, file: spec.file.replaceAll('\\', '/'), project: test.projectName });
      }
      walk(suite.suites || [], titles);
    }
  }
  walk(report.suites || []);
  const ids = new Set();
  for (const item of cases) {
    if (ids.has(item.id)) throw new Error(`Duplicate collected Test ID: ${item.id}`);
    ids.add(item.id);
  }
  return cases;
}
const prefixes = { authentication: 'AUTH', 'system-user-dashboard': 'SUD', 'user-license-hub': 'ULH', reports: 'RPT', 'floating-license-configurations': 'FLC', 'standard-license-configurations': 'SLC', features: 'FTR', profiles: 'PRF', 'user-groups': 'UGR', 'system-users': 'SYU', 'server-licensing': 'SVL' };
function buildBatches(cases, size) {
  const suites = new Map();
  for (const item of cases) {
    const suite = item.file.split('/')[0];
    if (!suites.has(suite)) suites.set(suite, []);
    suites.get(suite).push(item);
  }
  const batches = [];
  for (const [suite, items] of suites) {
    items.sort((a,b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    for (let start = 0; start < items.length; start += size) batches.push({
      name: `${prefixes[suite] || suite.toUpperCase()}-${String(start / size + 1).padStart(3, '0')}`,
      suite, project: items[start].project, cases: items.slice(start, start + size),
    });
  }
  return batches;
}
function exactIdPattern(ids) { return `\\b(?:${ids.join('|')})(?![0-9])\\b`; }
function legacyBatch(name, cases) {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'config/sud-batches.json'), 'utf8'));
  function find(items, parent) {
    for (const item of items) {
      if (item.name === name) return { ...parent, ...item };
      const found = find([...(item.subBatches || []), ...(item.executionViews || [])], { ...parent, ...item });
      if (found) return found;
    }
  }
  const entry = find(config.batches);
  if (!entry) return;
  const pattern = new RegExp(entry.grep.replace(/^\//, '').replace(/\/$/, ''));
  const selected = cases.filter(item => pattern.test(`${item.id}:`));
  if (selected.length !== entry.testCount) throw new Error(`Legacy batch ${name} declares ${entry.testCount} tests but maps to ${selected.length}; review its definition`);
  return { name, suite: entry.suite || (entry.project === 'default' ? 'authentication' : 'system-user-dashboard'), project: entry.project || 'system-user-dashboard', cases: selected };
}
async function workbookCases(file) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(file);
  const sheet = workbook.getWorksheet('Test Checklist');
  if (!sheet) throw new Error('Test Checklist worksheet not found');
  const rows = new Map();
  sheet.eachRow(row => {
    const id = row.getCell(1).text;
    if (!/^LIMAS-[A-Z]+-\d+$/.test(id)) return;
    if (rows.has(id)) throw new Error(`Duplicate workbook Test ID: ${id}`);
    rows.set(id, { module: row.getCell(2).text, goal: row.getCell(3).text, expectedResult: row.getCell(6).text, type: row.getCell(7).text });
  });
  return rows;
}
async function runChild(args, env) {
  // No shell, no npx downloads, and inherited streams cannot deadlock on full pipes.
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, env, stdio: 'inherit', windowsHide: true });
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve(code ?? (signal ? 130 : 1)));
  });
}
async function main(args = process.argv.slice(2)) {
  const flags = parseArgs(args);
  if (flags.profile) process.env.LIMAS_ACCESS_PROFILE = flags.profile;
  if (flags.rebuild) return runChild([path.join(root, 'scripts/build-shareable-report.js'), path.resolve(root, flags.rebuild)], process.env);
  const size = Number(flags.size || 20);
  if (!Number.isInteger(size) || size < 1 || size > 50) throw new Error('--size must be between 1 and 50');
  const discovery = spawnSync(process.execPath, [cli, 'test', '--list', '--reporter=json'], {
    cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, windowsHide: true,
    env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_FILE: '', PLAYWRIGHT_JSON_OUTPUT_NAME: '' },
  });
  if (discovery.status !== 0) throw new Error(`Test discovery failed. Run npm run typecheck and playwright test --list. ${discovery.stderr || ''}`);
  const report = JSON.parse(discovery.stdout.replace(/^\uFEFF/, ''));
  if (report.errors?.length) throw new Error('Test discovery reported collection errors');
  const cases = collectCases(report);
  const workbook = path.resolve(root, process.env.LIMAS_CHECKLIST_PATH || 'inventory/LIMAS_3_Simple_Test_Checklist_AUTH-01_ADDED.xlsx');
  const rows = await workbookCases(workbook);
  for (const item of cases) item.workbook = rows.get(item.id) || null;
  const batches = buildBatches(cases, size);
  const implemented = new Set(cases.map(item => item.id));
  const audit = {
    workbook: path.relative(root, workbook).replaceAll('\\', '/'),
    workbookSha256: crypto.createHash('sha256').update(fs.readFileSync(workbook)).digest('hex'),
    batchSize: size, workbookCaseCount: rows.size, collectedCaseCount: cases.length,
    workbookOnly: [...rows.keys()].filter(id => !implemented.has(id)),
    scriptOnly: cases.filter(item => !rows.has(item.id)).map(item => item.id), batches,
  };
  fs.writeFileSync(path.join(root, 'config/execution-batches.json'), JSON.stringify(audit, null, 2) + '\n');
  let selected = flags.suite ? batches.filter(batch => batch.suite === flags.suite) : batches;
  if (flags.batch) {
    const found = batches.find(batch => batch.name === flags.batch) || legacyBatch(flags.batch, cases);
    if (!found) throw new Error(`Unknown batch: ${flags.batch}`);
    if (flags.suite && found.suite !== flags.suite) throw new Error('Batch does not belong to --suite');
    selected = [found];
  }
  const onlyIds = flags['only-ids-file'] ? new Set(JSON.parse(fs.readFileSync(path.resolve(root, flags['only-ids-file']), 'utf8'))) : null;
  const excludedSuites = new Set((flags['exclude-suite'] || '').split(',').filter(Boolean));
  const excludedIds = new Set((flags['exclude-ids'] || '').split(',').filter(Boolean));
  selected = selected.filter(batch => !excludedSuites.has(batch.suite))
    .map(batch => ({ ...batch, cases: batch.cases.filter(item => !excludedIds.has(item.id) && (!onlyIds || onlyIds.has(item.id))) }))
    .filter(batch => batch.cases.length);
  if (flags['run-group'] && !/^[a-zA-Z0-9_-]+$/.test(flags['run-group'])) throw new Error('Invalid run-group');
  if (!selected.length) throw new Error('No matching batches');
  if (flags.list || flags['dry-run'] || (!flags.batch && !flags.all)) {
    for (const batch of selected) console.log(`${batch.name}\t${batch.suite}\t${batch.cases.length}\t${batch.cases[0].id} .. ${batch.cases.at(-1).id}`);
    console.log(`Workbook: ${rows.size}; scripts: ${cases.length}; workbook-only: ${audit.workbookOnly.length}; script-only: ${audit.scriptOnly.length}. No browsers launched.`);
    return 0;
  }
  const profile = flags.profile || process.env.LIMAS_ACCESS_PROFILE || process.env.LIMAS_DEFAULT_ACCESS_PROFILE;
  const profiles = JSON.parse(fs.readFileSync(path.join(root, 'config/access-profiles.json'), 'utf8'));
  if (!profile || !Object.hasOwn(profiles, profile)) throw new Error('Select a configured --profile or LIMAS_DEFAULT_ACCESS_PROFILE');
  if (!process.env.LIMAS_BASE_URL) throw new Error('LIMAS_BASE_URL is required');
  const workers = Number(flags.workers || process.env.PLAYWRIGHT_WORKERS || 1);
  if (!Number.isInteger(workers) || workers < 1 || workers > 16) throw new Error('--workers must be 1..16');
  const sequenceId = `sequence-${new Date().toISOString().replace(/[:.]/g, '-')}-${crypto.randomUUID().slice(0,8)}`;
  const sequenceDir = path.join(root, 'test-runs', flags['run-group'] || '', sequenceId);
  fs.mkdirSync(sequenceDir, { recursive: true });
  const startedAt = new Date().toISOString();
  function saveSequence(results) {
    const summary = { startedAt, updatedAt: new Date().toISOString(), plannedBatches: selected.length,
      completedBatches: results.length, failedBatches: results.filter(item => item.exitCode !== 0).length,
      pendingBatches: selected.slice(results.length).map(batch => batch.name), results };
    fs.writeFileSync(path.join(sequenceDir, 'sequence-summary.json'), JSON.stringify(summary, null, 2));
  }
  saveSequence([]);
  console.log(`Sequence summary: ${path.join(sequenceDir, 'sequence-summary.json')}`);
  const outcome = await runBatchSequence(selected, async batch => {
    const batchId = `${batch.name}_${new Date().toISOString().replace(/[:.]/g, '-')}_${crypto.randomUUID().slice(0,8)}`;
    const runId = flags['run-group'] ? path.join(flags['run-group'], batch.suite, batchId) : batchId;
    const runDir = path.join(root, 'test-runs', runId);
    fs.mkdirSync(runDir, { recursive: true });
    const metadata = { batch: batch.name, suite: batch.suite, accessProfile: profile, expectedTestCount: batch.cases.length,
      workbook: audit.workbook, workbookSha256: audit.workbookSha256, testIds: batch.cases.map(item=>item.id), startedAt: new Date().toISOString() };
    fs.writeFileSync(path.join(runDir, 'run-metadata.json'), JSON.stringify(metadata, null, 2));
    fs.writeFileSync(path.join(runDir, 'test-plan.json'), JSON.stringify(batch, null, 2));
    const env = { ...process.env, LIMAS_ACCESS_PROFILE: profile, PLAYWRIGHT_RUN_ID: runId,
      PLAYWRIGHT_HTML_OUTPUT_DIR: path.join(runDir,'html-report'), PLAYWRIGHT_OUTPUT_DIR: path.join(runDir,'test-results'),
      PLAYWRIGHT_JSON_OUTPUT_FILE: path.join(runDir,'results.json'), PLAYWRIGHT_JUNIT_OUTPUT_FILE: path.join(runDir,'junit.xml') };
    const command = [cli, 'test', `tests/${batch.suite}`, '--project', batch.project, '--grep', exactIdPattern(metadata.testIds), '--workers', String(workers)];
    if (flags.headed) command.push('--headed');
    console.log(`Running ${batch.name} (${batch.cases.length} cases). Reports: ${runDir}`);
    let exitCode = await runChild(command, env);
    let reportError;
    try {
      const actual = JSON.parse(fs.readFileSync(path.join(runDir, 'results.json'), 'utf8'));
      const ids = new Set(collectCases(actual).map(item => item.id));
      if (metadata.testIds.some(id => !ids.has(id)) || ids.size !== metadata.testIds.length) {
        reportError = 'The report does not contain the exact planned functional case set. Inspect dependency failures and test collection.';
        exitCode ||= 1;
      }
    } catch {
      reportError = 'JSON result report is missing or invalid. The batch is not considered successful.';
      exitCode ||= 1;
    }
    Object.assign(metadata, { completedAt: new Date().toISOString(), exitCode, reportError });
    fs.writeFileSync(path.join(runDir, 'run-metadata.json'), JSON.stringify(metadata, null, 2));
    fs.writeFileSync(path.join(runDir, 'run-summary.txt'), `Batch: ${batch.name}\nPlanned cases: ${batch.cases.length}\nExit code: ${exitCode}\nHTML report: html-report/index.html\n`);
    fs.writeFileSync(path.join(root,'test-runs/latest.json'), JSON.stringify({ runDir: path.relative(root,runDir).replaceAll('\\','/') },null,2));
    if (flags.portable && fs.existsSync(path.join(runDir,'results.json'))) {
      const packaged = await runChild([path.join(root,'scripts/build-shareable-report.js'), runDir], env);
      metadata.packagingExitCode = packaged;
      if (packaged) exitCode ||= packaged;
      metadata.exitCode = exitCode;
      fs.writeFileSync(path.join(runDir, 'run-metadata.json'), JSON.stringify(metadata, null, 2));
    }
    fs.writeFileSync(path.join(runDir, 'run-summary.txt'), `Batch: ${batch.name}\nPlanned cases: ${batch.cases.length}\nExit code: ${exitCode}\nPackaging exit code: ${metadata.packagingExitCode ?? 'not requested'}\nHTML report: html-report/index.html\n`);
    return { batch: batch.name, runDir: path.relative(root,runDir).replaceAll('\\','/'), exitCode, reportError, plannedCases: batch.cases.length };
  }, { continueOnFailure: !!flags['continue-on-failure'], onResult: saveSequence });
  return outcome.exitCode;
}
module.exports = { parseArgs, collectCases, buildBatches, exactIdPattern, legacyBatch, main };
if (require.main === module) main().then(code => { process.exitCode = code; }).catch(error => { console.error(error.message); process.exitCode = 1; });
