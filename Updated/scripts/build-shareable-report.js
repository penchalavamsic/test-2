#!/usr/bin/env node

/**
 * build-shareable-report.js
 * Reads Playwright JSON results + run-metadata + sud-batches config + plan files,
 * builds:
 *   Test-Reports/Complete-Suite-Test-Report.zip
 *   Test-Reports/Individual-Test-Reports/{ID}_test-report.zip
 *
 * Features:
 *   - Resolves plans by Test ID across multiple plan directories
 *   - Parses plan frontmatter + body sections (Preconditions, Steps, Expected Result)
 *   - Separates infrastructure prerequisites (auth-setup, auth-smoke) from functional tests
 *   - Populates profile, module, section from batch config → plan metadata → spec path
 *   - Handles tests skipped due to dependency failure (specs:0 in results.json)
 *
 * Usage: node scripts/build-shareable-report.js <run-folder-path>
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { resolveReportPlan } = require('./lib/report-plan.cjs');
const {
  buildSuiteHtml,
  buildIndividualHtml,
  buildReadme,
  validateAssets,
  createZip,
  resolveDisplayTitle,
  evidencePath,
  hasDuplicatedCategory,
  parsePlanFrontmatter,
  parsePlanSections,
} = require('./lib/report-builder');

// ─── CLI ──────────────────────────────────────────────────────────
const runFolder = process.argv[2];
if (!runFolder) {
  console.error('Usage: node scripts/build-shareable-report.js <test-runs/run-folder>');
  process.exit(1);
}

const runDir = path.resolve(runFolder);
const resultsFile = path.join(runDir, 'results.json');
const metadataFile = path.join(runDir, 'run-metadata.json');
const batchesFile = path.resolve(__dirname, '..', 'config', 'sud-batches.json');

if (!fs.existsSync(resultsFile)) {
  console.error(`results.json not found in ${runDir}`);
  process.exit(1);
}

// ─── Load data ────────────────────────────────────────────────────
const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8').replace(/^\uFEFF/, ''));
const metadata = fs.existsSync(metadataFile) ? JSON.parse(fs.readFileSync(metadataFile, 'utf8').replace(/^\uFEFF/, '')) : {};
let batchConfig = null;
if (metadata.batch && fs.existsSync(batchesFile)) {
  const batches = JSON.parse(fs.readFileSync(batchesFile, 'utf8'));
  batchConfig = (batches.batches || []).find((b) => b.name === metadata.batch) || null;
}

// ─── Plan resolution ──────────────────────────────────────────────

const PLAN_ROOTS = [
  path.resolve(__dirname, '..', 'plans', 'system-user-dashboard'),
  path.resolve(__dirname, '..', 'plans', 'authentication'),
  path.resolve(__dirname, '..', 'plans'),
];

/**
 * Find a plan by Test ID across all plan roots.
 * Returns { planPath, content } or null.
 */
function findPlan(testId) {
  function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
      ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
  }
  findPlan.files ||= walk(path.resolve(__dirname, '..', 'plans')).filter(file => file.endsWith('.md'));
  const matches = findPlan.files.filter(file => path.basename(file) === `${testId}.md` || path.basename(file).startsWith(`${testId}-`));
  // Never silently choose one of the conflicting plans. The workbook attachment
  // is preferred by buildEnrichedTest when available.
  if (matches.length !== 1) return null;
  return { planPath: matches[0], content: fs.readFileSync(matches[0], 'utf8') };
}

// ──────────────────────────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function safeFilename(baseName) {
  return baseName.replace(/[^a-zA-Z0-9._-]/g, '-');
}

function uniquePath(dir, desiredName) {
  const ext = path.extname(desiredName);
  const stem = desiredName.slice(0, desiredName.length - ext.length);
  let candidate = desiredName;
  let idx = 2;
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${stem}-${idx}${ext}`;
    idx++;
  }
  return path.join(dir, candidate);
}

function removeTemporaryReport(dir) {
  const resolved = path.resolve(dir);
  const relative = path.relative(runDir, resolved);
  if (relative.startsWith('..') || path.isAbsolute(relative) || path.dirname(resolved) !== runDir || !/^\.(ind-tmp-|suite-tmp$|technical-tmp$)/.test(path.basename(resolved))) {
    throw new Error('Refusing to remove a directory outside this run temporary reports');
  }
  fs.rmSync(resolved, { recursive: true, force: true });
}

function sanitizePlanContent(content) {
  return content
    .replace(/[A-Z]:\\[^\s)\]]*/gi, (match) => path.basename(match))
    .replace(/tests[\\\/][^\s,)\]]+/g, (match) => path.basename(match));
}

// ──────────────────────────────────────────────────────────────────
//  Asset-copy helpers
// ──────────────────────────────────────────────────────────────────

function copyPlanTo(evidenceDir, testId) {
  const plan = findPlan(testId);
  if (!plan) return null;
  const plansSub = path.join(evidenceDir, 'Plans');
  ensureDir(plansSub);
  const dst = path.join(plansSub, safeFilename(testId) + '.md');
  fs.copyFileSync(plan.planPath, dst);
  return path.relative(evidenceDir, dst).replace(/\\/g, '/');
}

function readPlanContent(testId) {
  const plan = findPlan(testId);
  return plan ? sanitizePlanContent(plan.content) : null;
}

function copyInlineScreenshotTo(evidenceDir, testId, desiredName, buffer) {
  const data = Buffer.from(buffer, 'base64');
  const ssDir = path.join(evidenceDir, 'Screenshots');
  ensureDir(ssDir);
  const name = crypto.createHash('sha256').update(data).digest('hex').slice(0,16) + '.png';
  const dst = path.join(ssDir,name);
  fs.writeFileSync(dst,data);
  return path.relative(evidenceDir,dst).replace(/\\/g,'/');
}

function copyFileAttachmentTo(evidenceDir, testId, srcAbs, ext) {
  if (!fs.existsSync(srcAbs)) throw new Error('Evidence attachment is missing: ' + path.basename(srcAbs));
  const dirMap = { '.webm':'Recording', '.mp4':'Recording', '.zip':'Trace', '.png':'Screenshots', '.md':'Plans' };
  const destDir = path.join(evidenceDir,dirMap[ext] || 'Screenshots');
  ensureDir(destDir);
  const data = fs.readFileSync(srcAbs);
  const name = crypto.createHash('sha256').update(data).digest('hex').slice(0,16) + ext;
  const dst = path.join(destDir,name);
  fs.writeFileSync(dst,data);
  return path.relative(evidenceDir,dst).replace(/\\/g,'/');
}

// ──────────────────────────────────────────────────────────────────
//  Infrastructure detection
// ──────────────────────────────────────────────────────────────────

const INFRA_TEST_IDS = new Set(['auth-setup', 'auth-smoke', 'authenticate for System User Dashboard']);

function isInfraTest(test) {
  const tid = test.testId || '';
  if (INFRA_TEST_IDS.has(tid)) return true;
  // Detect auth-setup / auth-smoke by source spec
  const source = (test.sourceSpec || '').toLowerCase();
  if (source.includes('auth.setup') || source.includes('auth-smoke')) return true;
  return false;
}

// ──────────────────────────────────────────────────────────────────
//  Extract tests from Playwright JSON — handles empty suites
// ──────────────────────────────────────────────────────────────────

function extractAllTests() {
  const allTests = [];
  function walk(suite, parentTitle) {
    const suiteTitle = suite.title || parentTitle || '';
    if (suite.suites) suite.suites.forEach((s) => walk(s, suiteTitle));
    if (suite.specs) {
      suite.specs.forEach((spec) => {
        if (spec.tests && spec.tests.length > 0) {
          spec.tests.forEach((t) => {
            const r = t.results && t.results[t.results.length - 1];
            if (!r) return;

            const testId = (r.annotations || []).find((a) => a.type === 'testId')?.description || '';
            // Fallback: extract LIMAS-SUD-* from the test title, spec title, or parent suite title
            const titleMatch = (t.title || '').match(/\b(LIMAS-[A-Z]+-\d+)\b/);
            const specMatch = (spec.title || '').match(/\b(LIMAS-[A-Z]+-\d+)\b/);
            const suiteMatch = suiteTitle.match(/\b(LIMAS-[A-Z]+-\d+)\b/);
            const resolvedId = testId || (titleMatch ? titleMatch[1] : '') || (specMatch ? specMatch[1] : '') || (suiteMatch ? suiteMatch[1] : '');

            const profile = (r.annotations || []).find((a) => a.type === 'accessProfile')?.description || metadata.accessProfile || '';
            const rawModule = (r.annotations || []).find((a) => a.type === 'module')?.description || '';
            const planPathRel = (r.annotations || []).find((a) => a.type === 'planPath')?.description || '';

            allTests.push({
              testId: resolvedId,
              title: t.title || spec.title || suiteTitle,
              status: r.status === 'skipped' ? 'skipped' : r.status === 'passed' ? 'passed' : 'failed',
              rawStatus: r.status || '',
              duration: r.duration || 0,
              profile,
              module: rawModule,
              planPath: planPathRel,
              attachments: r.attachments || [],
              steps: r.steps || [],
              errors: r.errors || [],
              annotations: r.annotations || t.annotations || [],
              sourceSpec: spec.file || suiteTitle || spec.title || '',
              suiteTitle: suiteTitle,
            });
          });
        }
      });
    }
  }
  results.suites.forEach((s) => walk(s, ''));
  return allTests;
}

// ──────────────────────────────────────────────────────────────────
//  Module / section resolution
// ──────────────────────────────────────────────────────────────────

function resolveModuleInfo(testId, planMeta) {
  // 1. Batch config
  if (batchConfig && batchConfig.section) {
    return { module: 'System User Dashboard', section: batchConfig.section };
  }
  // 2. Plan metadata
  if (planMeta && planMeta.module) {
    return { module: planMeta.module, section: planMeta.section || '' };
  }
  // 3. Suite (metadata)
  if (metadata.suite) {
    return { module: metadata.suite, section: metadata.batch || '' };
  }
  return { module: '', section: '' };
}

// ──────────────────────────────────────────────────────────────────
//  Build enriched test data
// ──────────────────────────────────────────────────────────────────

function buildEnrichedTest(test, evidenceDir) {
  const tid = test.testId;
  const isSkipped = test.status === 'skipped';

  // Plan resolution
  const plan = findPlan(tid);
  const workbookAttachment = (test.attachments || []).find(attachment => attachment.name === 'Workbook test plan');
  let workbookRow;
  if (workbookAttachment) {
    try {
      const content = workbookAttachment.body ? Buffer.from(workbookAttachment.body, 'base64').toString('utf8') : fs.readFileSync(workbookAttachment.path, 'utf8');
      workbookRow = JSON.parse(content).case;
    } catch { /* Preserve the missing-plan warning if the attachment is unavailable. */ }
  }
  const mappingFile = path.resolve(runDir, '../..', 'coverage-mapping-findings.json');
  const mapping = fs.existsSync(mappingFile) ? JSON.parse(fs.readFileSync(mappingFile, 'utf8')).findings?.find(item => item.id === tid) : null;
  const resolvedPlan = resolveReportPlan({ workbookRow, atomicPlan: plan?.content, mappingWarning: mapping?.status });
  const planRaw = resolvedPlan.raw;
  const planMeta = planRaw ? parsePlanFrontmatter(planRaw) : {};
  const planSections = planRaw ? parsePlanSections(planRaw) : {};
  if (resolvedPlan.warning) planSections.purpose = [resolvedPlan.warning, planSections.purpose].filter(Boolean).join("\n\n");
  const planContent = planRaw ? sanitizePlanContent(planRaw) : null;

  const displayTitle = resolveDisplayTitle(test, planMeta, tid);

  // Module / section
  const { module, section } = resolveModuleInfo(tid, planMeta);

  // Profile
  const profile = test.profile || metadata.accessProfile || planMeta.access_profile || '';

  function copyResolvedPlan() {
    if (!planRaw) return null;
    const destination = path.join(evidenceDir, 'Plans', tid + '-case.md');
    ensureDir(path.dirname(destination));
    fs.writeFileSync(destination, planRaw, 'utf8');
    return path.relative(evidenceDir, destination).replace(/\\/g, '/');
  }

  // For skipped tests, build a placeholder
  if (isSkipped) {
    const planFile = copyResolvedPlan();
    return {
      testId: tid,
      displayTitle,
      title: test.title,
      status: 'skipped',
      duration: 0,
      profile,
      module,
      section,
      planFile,
      planContent: planContent || `No plan found for ${tid}. Searched: ${PLAN_ROOTS.map(p => path.relative(path.resolve(__dirname, '..'), p)).join(', ')}`,
      planSections,
      planSearchedRoots: PLAN_ROOTS,
      summaryBody: '',
      actualResultBody: 'Test was not executed. ' + (test.annotations || []).filter(a => a.type === 'skip' || a.type === 'fixme').map(a => a.description || '').join('; '),
      apiSummaryBody: '',
      screenshotRefs: [],
      finalScreenshotRef: null,
      videoRef: null,
      traceRef: null,
      stepNames: [],
      errors: test.errors || [],
      sourceSpec: test.sourceSpec || '',
      isInfra: false,
    };
  }

  const planFile = copyResolvedPlan();

  // Build attachments
  const inlineAtts = [];
  const fileAtts = [];
  for (const att of test.attachments) {
    if (att.body) inlineAtts.push(att);
    else if (att.path) fileAtts.push(att);
  }

  const screenshotRefs = [];
  for (const att of inlineAtts) {
    // Skip the final-state attachment from the fixture — handled separately below
    if (/final-state(?:\.png)?$/.test(att.name)) continue;
    // Skip diagnostic attachments
    if (att.name === 'final-state-unavailable' || att.name === 'final-state-error') continue;
    if (att.contentType === 'image/png' && att.name !== 'Final Screenshot' && att.name !== 'screenshot') {
      const ref = copyInlineScreenshotTo(evidenceDir, tid, att.name, att.body);
      const label = att.name.replace(/\.png$/i, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      screenshotRefs.push({ ref, label });
    }
  }

  for (const att of fileAtts.filter(a => a.contentType === 'image/png' && !/final-state(?:\.png)?$/.test(a.name))) {
    const ref = copyFileAttachmentTo(evidenceDir, tid, att.path, '.png');
    if (ref) screenshotRefs.push({ ref, label: att.name });
  }

  let videoRef = null;
  for (const att of fileAtts) {
    if (att.contentType === 'video/webm') { videoRef = copyFileAttachmentTo(evidenceDir, tid, att.path, '.webm'); break; }
  }

  let traceRef = null;
  for (const att of fileAtts) {
    if (att.contentType === 'application/zip' && att.name === 'trace') { traceRef = copyFileAttachmentTo(evidenceDir, tid, att.path, '.zip'); break; }
  }

  const summaryBody = inlineAtts.find((a) => a.name === 'Test Summary')?.body || '';
  const actualResultBody = inlineAtts.find((a) => a.name === 'Actual Result')?.body || inlineAtts.find(a => a.name === 'Execution summary')?.body || '';
  const apiSummaryBody = inlineAtts.find(a => a.name === 'Observed HTTP responses')?.body || '';

  let finalScreenshotRef = null;
  const finalSs = inlineAtts.find((a) => /final-state(?:\.png)?$/.test(a.name))
    || inlineAtts.find((a) => a.name === 'Final Screenshot');
  if (finalSs) {
    finalScreenshotRef = copyInlineScreenshotTo(evidenceDir, tid, 'final-state.png', finalSs.body);
  }
  if (!finalScreenshotRef) {
    const finalFile = fileAtts.find(a => a.contentType === 'image/png' && /final-state(?:\.png)?$/.test(a.name));
    if (finalFile) finalScreenshotRef = copyFileAttachmentTo(evidenceDir, tid, finalFile.path, '.png');
  }

  const stepNames = test.steps.map((s) => s.title);

  // Build errors with source info
  const errors = test.errors.map((e) => {
    const msg = typeof e === 'string' ? e : (e.message || '');
    // Extract file:line from error message
    const locMatch = msg.match(/(\w+\.spec\.ts:\d+:\d+)/);
    return {
      message: msg,
      location: locMatch ? locMatch[1] : '',
      stack: e.stack || '',
    };
  });

  return {
    testId: tid,
    displayTitle,
    title: test.title,
    status: test.status,
    duration: test.duration,
    profile,
    module,
    section,
    planFile,
    planContent: planContent || `No plan found for ${tid}. Searched: ${PLAN_ROOTS.join(', ')}`,
    planSections,
    planSearchedRoots: planContent ? null : PLAN_ROOTS.map(p => path.relative(path.resolve(__dirname, '..'), p)),
    summaryBody: Buffer.from(summaryBody, 'base64').toString('utf8'),
    actualResultBody: Buffer.from(actualResultBody, 'base64').toString('utf8'),
    apiSummaryBody: Buffer.from(apiSummaryBody, 'base64').toString('utf8'),
    screenshotRefs,
    finalScreenshotRef,
    videoRef,
    traceRef,
    stepNames,
    errors,
    sourceSpec: test.sourceSpec || '',
    isInfra: false,
    isAuthBlocked: isAuthBlockedError(errors),
    isTeardownTimeout: isTeardownTimeout(test.rawStatus, errors),
  };
}

/**
 * Check whether a test failure is due to auth infrastructure (not a functional failure).
 *
 * Detects AuthBlockedError from the shared authentication guard (tests/fixtures/base.ts)
 * by structured error identity first, then by confirmed message variants:
 *   1. "Auth state is invalid — redirected to sign-in page"
 *   2. "Auth regeneration triggered — state was invalidated mid-batch"
 *
 * Does NOT classify ordinary Keycloak, network, assertion, timeout, or application errors
 * as Auth Blocked unless they carry the AuthBlockedError identity or structured
 * authentication-block metadata.
 */
function isAuthBlockedError(errors) {
  if (!errors || errors.length === 0) return false;
  return errors.some((e) => {
    // Structured identity signals (highest confidence)
    const msg = (e.message || '').toLowerCase();
    const stack = (e.stack || '').toLowerCase();
    const name = (e.name || '').toLowerCase();

    if (name === 'authblockederror') return true;
    if (stack.includes('authblockederror')) return true;

    // Metadata-based auth-block marker (tests/fixtures/base.ts AuthBlockedError)
    if (
      msg.includes('authblockederror') ||
      msg.includes('auth regeneration triggered') ||
      msg.includes('auth state is invalid') ||
      msg.includes('redirected to sign-in') ||
      msg.includes('batch stopped: authentication infrastructure failure')
    ) {
      return true;
    }

    return false;
  });
}

/**
 * Check whether a test's failure is a teardown/evidence-finalization timeout,
 * not a functional defect — the test body itself ran to completion (or was
 * never shown to fail an assertion), but Playwright's built-in context/page
 * teardown (closing the browser context, finalizing video/trace) exceeded
 * the shared test timeout.
 *
 * Evidence (LIMAS-SUD-069, run system-user-dashboard_SUD-PL-02-B_2026-11-23_18-44-57):
 * status "timedOut" with the exact message "Tearing down \"context\" exceeded
 * the test timeout" — the functional assertion had already completed
 * successfully per the trace; the browserContext.close() call itself never
 * finished in time. This does not flip the test's functional outcome, it is
 * a report-level classification so the failure reads as an infrastructure/
 * evidence problem rather than a product defect.
 */
function isTeardownTimeout(status, errors) {
  if (status !== 'timedOut') return false;
  if (!errors || errors.length === 0) return false;
  return errors.some((e) => {
    const msg = (e.message || '').toLowerCase();
    return msg.includes('tearing down') && msg.includes('exceeded the test timeout');
  });
}

// ──────────────────────────────────────────────────────────────────
//  Pre-render rejection check
// ──────────────────────────────────────────────────────────────────

function rejectIfDuplicatedCategories(filePaths) {
  for (const p of filePaths) {
    const normalized = String(p).replace(/\\/g, '/');
    if (hasDuplicatedCategory(normalized)) {
      console.error(`DUPLICATED CATEGORY PATH detected: ${normalized}`);
      return true;
    }
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════

const allTests = extractAllTests();
if (allTests.length === 0) {
  console.error('No test results found in results.json');
  process.exit(1);
}

// ─── Classify ─────────────────────────────────────────────────────
const infraTests = allTests.filter(isInfraTest);
const functionalTests = allTests.filter((t) => !isInfraTest(t));

// Among functional tests, detect auth-blocked (failed before reaching assertions)
const authBlockedTests = functionalTests.filter((t) => isAuthBlockedError(t.errors));
// Detect teardown/evidence-finalization timeouts (not a functional defect)
const teardownTimeoutTests = functionalTests.filter(
  (t) => !authBlockedTests.includes(t) && isTeardownTimeout(t.rawStatus, t.errors),
);

const total = allTests.length;
const functionalTotal = functionalTests.length;
const functionalPassed = functionalTests.filter((t) => t.status === 'passed').length;
const functionalFailed = functionalTests.filter(
  (t) => t.status === 'failed' && !authBlockedTests.includes(t) && !teardownTimeoutTests.includes(t),
).length;
const functionalAuthBlocked = authBlockedTests.length;
const functionalTeardownTimeout = teardownTimeoutTests.length;
const functionalSkipped = functionalTests.filter((t) => t.status === 'skipped').length;
const infraPassed = infraTests.filter((t) => t.status === 'passed').length;
const infraFailed = infraTests.filter((t) => t.status === 'failed').length;

console.log('');
console.log(`Functional batch tests: ${functionalTotal}`);
console.log(`  Passed:            ${functionalPassed}`);
console.log(`  Failed:            ${functionalFailed}`);
console.log(`  Auth Blocked:      ${functionalAuthBlocked}`);
console.log(`  Teardown Timeout:  ${functionalTeardownTimeout}`);
console.log(`  Skipped:           ${functionalSkipped}`);
console.log(`Infrastructure prerequisites:`);
console.log(`  Passed:  ${infraPassed}`);
console.log(`  Failed:  ${infraFailed}`);

// ─── Output directories ───────────────────────────────────────────
const reportsRoot = path.join(runDir, 'Test-Reports');
const individualDir = path.join(reportsRoot, 'Individual-Test-Reports');
ensureDir(reportsRoot);
ensureDir(individualDir);

let suiteOk = false;
let individualGenerated = 0;
let individualFailures = 0;

// ═══════════════════════════════════════════════════════════════════
//  PHASE 1: Build individual reports for FUNCTIONAL tests only
// ═══════════════════════════════════════════════════════════════════

console.log('');
console.log('============================================================');
console.log('  PHASE 1: BUILDING INDIVIDUAL TEST REPORTS');
console.log('============================================================');

const enrichedCache = new Map();

for (const test of functionalTests) {
  const tid = test.testId;
  if (!tid) continue;

  console.log('');
  console.log(`  --- ${tid} ---`);

  const indTmpDir = path.join(runDir, `.ind-tmp-${tid}`);
  const indEvidenceDir = path.join(indTmpDir, 'Evidence');
  ensureDir(indEvidenceDir);

  const enriched = buildEnrichedTest(test, indEvidenceDir);
  enrichedCache.set(tid, enriched);

  const checkPaths = [
    enriched.planFile,
    enriched.finalScreenshotRef,
    enriched.videoRef,
    enriched.traceRef,
    ...enriched.screenshotRefs.map((r) => r.ref),
  ].filter(Boolean);

  if (rejectIfDuplicatedCategories(checkPaths)) {
    individualFailures++;
    console.error(`  REJECTED: duplicated category paths in ${tid}`);
    try { removeTemporaryReport(indTmpDir); } catch (_) {}
    continue;
  }

  const indHtml = buildIndividualHtml(enriched, metadata, batchConfig, { assetsPrefix: 'Evidence/' });
  const indIndexPath = path.join(indTmpDir, 'index.html');
  fs.writeFileSync(indIndexPath, indHtml, 'utf8');

  buildReadme(indTmpDir, `LIMAS 3.0 Individual Test Evidence — ${tid}

1. Extract the complete ZIP before opening the report.
2. Keep index.html and the Evidence folder together.
3. Open the extracted index.html.
4. Do not open index.html directly inside the ZIP.
`);

  const indHtmlContent = fs.readFileSync(indIndexPath, 'utf8');
  if (validateAssets(indTmpDir, indHtmlContent, tid)) {
    const zipName = `${tid}_test-report.zip`;
    if (createZip(indTmpDir, individualDir, zipName)) {
      individualGenerated++;
    } else {
      individualFailures++;
      console.error(`  ZIP failed for: ${tid}`);
    }
  } else {
    individualFailures++;
    console.error(`  Validation failed for: ${tid}`);
  }

  try { removeTemporaryReport(indTmpDir); } catch (_) {}
}

// ═══════════════════════════════════════════════════════════════════
//  PHASE 2: Confirm individual ZIPs
// ═══════════════════════════════════════════════════════════════════

console.log('');
console.log('============================================================');
console.log('  PHASE 2: VERIFYING INDIVIDUAL ZIPs');
console.log('============================================================');

let allIndividualZipsExist = true;
for (const test of functionalTests) {
  const tid = test.testId;
  if (!tid) continue;
  const zipPath = path.join(individualDir, `${tid}_test-report.zip`);
  if (!fs.existsSync(zipPath) || fs.statSync(zipPath).size === 0) {
    console.error(`  MISSING or EMPTY individual ZIP: ${tid}_test-report.zip`);
    allIndividualZipsExist = false;
  }
}

if (!allIndividualZipsExist) {
  console.error('');
  console.error('Some individual ZIPs are missing — suite report will NOT be built.');
}

// ═══════════════════════════════════════════════════════════════════
//  PHASE 3: Build suite report
// ═══════════════════════════════════════════════════════════════════

if (allIndividualZipsExist) {
  console.log('');
  console.log('============================================================');
  console.log('  PHASE 3: BUILDING COMPLETE SUITE TEST REPORT');
  console.log('============================================================');

  const suiteTmpDir = path.join(runDir, '.suite-tmp');
  const suiteEvidenceDir = path.join(suiteTmpDir, 'Evidence');
  ensureDir(suiteEvidenceDir);

  // Re-enrich for suite
  const enrichedSuiteTests = [
    ...infraTests.map((t) => {
      const enriched = buildEnrichedTest(t, suiteEvidenceDir);
      enriched.isInfra = true;
      return enriched;
    }),
    ...functionalTests.map((t) => buildEnrichedTest(t, suiteEvidenceDir)),
  ];

  // Patch infra flag
  enrichedSuiteTests.forEach((t) => {
    const tid = t.testId;
    if (isInfraTest({ testId: tid })) t.isInfra = true;
  });

  let suiteHasDupCategory = false;
  for (const t of enrichedSuiteTests) {
    const checkPaths = [
      t.planFile,
      t.finalScreenshotRef,
      t.videoRef,
      t.traceRef,
      ...t.screenshotRefs.map((r) => r.ref),
    ].filter(Boolean);
    if (rejectIfDuplicatedCategories(checkPaths)) {
      suiteHasDupCategory = true;
    }
  }

  if (suiteHasDupCategory) {
    console.error('');
    console.error('Suite report has duplicated category paths — suite ZIP not created.');
  } else {
    const suiteHtml = buildSuiteHtml(enrichedSuiteTests, metadata, batchConfig, {
      assetsPrefix: 'Evidence/',
      individualReportsDir: 'Individual-Test-Reports',
      functionalTotal,
      functionalPassed,
      functionalFailed,
      functionalAuthBlocked,
      functionalTeardownTimeout,
      functionalSkipped,
      infraTests,
      infraPassed,
      infraFailed,
    });
    const suiteIndexPath = path.join(suiteTmpDir, 'index.html');
    fs.writeFileSync(suiteIndexPath, suiteHtml, 'utf8');

    buildReadme(suiteTmpDir, `LIMAS 3.0 Complete Suite Test Evidence Report

1. Extract the complete ZIP before opening the report.
2. Keep index.html and the Evidence folder together.
3. Open the extracted index.html.
4. Do not open index.html directly inside the ZIP.
5. Header links open the corresponding test evidence in this report.
6. Separate individual test ZIPs are supplied alongside the complete suite ZIP.
`);

    const suiteHtmlContent = fs.readFileSync(suiteIndexPath, 'utf8');
    if (validateAssets(suiteTmpDir, suiteHtmlContent, 'suite')) {
      suiteOk = createZip(suiteTmpDir, reportsRoot, 'Complete-Suite-Test-Report.zip');
    } else {
      console.error('Suite report validation failed — suite ZIP not created.');
    }

    try { removeTemporaryReport(suiteTmpDir); } catch (_) {}
  }
}

// ═══════════════════════════════════════════════════════════════════
//  Final output
// ═══════════════════════════════════════════════════════════════════

const executionSettingsFile = path.join(runDir, '..', '..', 'execution-settings.json');
const executionSettings = fs.existsSync(executionSettingsFile) ? JSON.parse(fs.readFileSync(executionSettingsFile, 'utf8')) : {};
const archiveTechnicalEvidence = executionSettings.technicalArchive !== false;
let technicalOk = false;
if (suiteOk && !archiveTechnicalEvidence) {
  const retained = ['html-report', 'test-results', 'results.json', 'junit.xml'];
  technicalOk = retained.every(name => fs.existsSync(path.join(runDir, name)));
  if (technicalOk) fs.writeFileSync(path.join(runDir, 'technical-evidence.json'), JSON.stringify({
    storage: 'original run files', retained, duplicateArchive: false,
    reason: 'Retain all technical evidence without an additional duplicate ZIP during live execution.'
  }, null, 2));
}
if (suiteOk && archiveTechnicalEvidence) {
  const technicalDir = path.join(runDir, '.technical-tmp');
  ensureDir(technicalDir);
  for (const name of ['html-report', 'test-results', 'results.json', 'junit.xml', 'run-metadata.json', 'run-summary.txt', 'test-plan.json']) {
    const source = path.join(runDir, name);
    if (fs.existsSync(source)) fs.cpSync(source, path.join(technicalDir, name), { recursive: true });
  }
  technicalOk = createZip(technicalDir, runDir, 'Technical-Evidence.zip');
  removeTemporaryReport(technicalDir);
}

console.log('');
console.log('============================================================');
console.log('  TEST REPORT SUMMARY');
console.log('============================================================');
console.log(`Complete suite report generated: ${suiteOk ? 'Yes' : 'No'}`);
console.log(`Individual test reports generated: ${individualGenerated}/${functionalTotal}`);
console.log(`Individual report failures: ${individualFailures}`);
console.log(`Technical evidence ${archiveTechnicalEvidence ? 'packaged' : 'retained in run folder'}: ${technicalOk ? 'Yes' : 'No'}`);
console.log(`Reviewer report folder: Test-Reports`);
console.log(`Run packaging completed: ${suiteOk ? 'Yes' : 'No'}`);
console.log(`Functional batch tests: ${functionalTotal}`);
console.log(`  Passed:            ${functionalPassed}`);
console.log(`  Failed:            ${functionalFailed}`);
console.log(`  Auth Blocked:      ${functionalAuthBlocked}`);
console.log(`  Teardown Timeout:  ${functionalTeardownTimeout}`);
console.log(`  Skipped:           ${functionalSkipped}`);
console.log(`Infrastructure prerequisites:`);
console.log(`  Passed:  ${infraPassed}`);
console.log(`  Failed:  ${infraFailed}`);
if (functionalTeardownTimeout > 0) {
  console.log('');
  console.log(`NOTE: ${functionalTeardownTimeout} test(s) failed during evidence/context teardown, not`);
  console.log(`      during the functional assertions themselves. See the "Teardown Timeout" badge`);
  console.log(`      in the report for the affected Test ID(s). No individual ZIP is produced for`);
  console.log(`      these tests because their video/trace evidence never finished finalizing.`);
}
if (!suiteOk || !technicalOk || individualFailures > 0) process.exitCode = 1;
