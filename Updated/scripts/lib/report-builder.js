/**
 * report-builder.js — shared rendering, asset-copy, validation, and ZIP for
 * LIMAS portable test evidence reports.
 *
 * Exports:
 *   escapeHtml(str)
 *   simpleMarkdownToHtml(md)
 *   resolveDisplayTitle(testData, planMeta, testId)
 *   cleanText(val)
 *   evidencePath(prefix, category, testId, fileName)
 *   buildTestCardHtml(enrichedTest, idx, opts)
 *   buildSuiteHtml(enrichedTests, metadata, opts)
 *   buildIndividualHtml(enrichedTest, metadata, opts)
 *   validateAssets(reportDir, htmlContent, label?)
 *   createZip(reportDir, runDir, zipName)
 *   buildReadme(reportDir, content)
 *   SHARED_CSS
 *
 * opts may include { assetsPrefix } — "Evidence/" for both suite and individual.
 * Defaults to "Evidence/".
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// ═══════════════════════════════════════════════════════════════════
//  Text sanitisation
// ═══════════════════════════════════════════════════════════════════

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strip ANSI/CSI escape sequences (e.g. Playwright's colored error output:
 * \u001b[2m, \u001b[31m, \u001b[39m, \u001b[22m, \u001b[1m, \u001b[0m) without
 * touching the surrounding text. Preserves line breaks, indentation, locator
 * syntax, file paths, quotes, and unicode — only the escape bytes are removed.
 */
function stripAnsi(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '');
}

function cleanText(value) {
  if (typeof value !== 'string') return '';
  const text = stripAnsi(value).trim();
  if (!text || text === 'undefined' || text === 'null' || text === '[object Object]') return '';
  return text;
}

/**
 * Parse a (possibly ANSI-colored) Playwright error message into structured
 * fields: locator, expected state, timeout, failure reason, first line, and
 * the assertion the test never reached (read from the code frame line right
 * after the failing one). Returns best-effort fields; callers must handle
 * any of them being empty.
 */
function parseStructuredError(message) {
  const clean = stripAnsi(message || '');
  const locatorMatch = clean.match(/Locator:\s*(.+)/);
  const expectedMatch = clean.match(/Expected:\s*(.+)/);
  const timeoutMatch = clean.match(/Timeout:\s*(\d+)\s*ms/);
  const errorLineMatches = [...clean.matchAll(/^Error:\s*(.+)$/gm)].map((m) => m[1].trim());
  const reason = errorLineMatches.length > 1 ? errorLineMatches[errorLineMatches.length - 1] : (errorLineMatches[0] || '');
  const primaryMessage = (clean.split('\n')[0] || '').trim();

  let nextAssertion = '';
  const markedLineMatch = clean.match(/^>\s*\d+\s*\|.*$/m);
  if (markedLineMatch) {
    const afterIdx = clean.indexOf(markedLineMatch[0]) + markedLineMatch[0].length;
    const rest = clean.slice(afterIdx);
    const nextLineMatch = rest.match(/^\s*\n?\s*\d+\s*\|\s*(.+)$/m);
    if (nextLineMatch) {
      const callMatch = nextLineMatch[1].match(/\.(\w+)\(([^)]*)/);
      if (callMatch) {
        const argMatch = callMatch[2].match(/['"]([^'"]+)['"]/);
        nextAssertion = argMatch ? `${callMatch[1]}('${argMatch[1]}')` : callMatch[1];
      }
    }
  }

  return {
    clean,
    locator: locatorMatch ? locatorMatch[1].trim() : '',
    expected: expectedMatch ? expectedMatch[1].trim() : '',
    timeoutMs: timeoutMatch ? parseInt(timeoutMatch[1], 10) : null,
    reason,
    primaryMessage,
    nextAssertion,
  };
}

/**
 * Generate the "Actual Result" text for a test card, in precedence order:
 *   1. An explicit test-attached summary ("Actual Result" attachment).
 *   2. Structured Playwright error fields (locator/expected/timeout/next assertion).
 *   3. The cleaned primary (first-line) error message.
 *   4. A concise status-based fallback.
 * Never copies the full stack/code frame into this field — that stays in
 * Error Details.
 */
function computeActualResult(t) {
  if (t.status === 'skipped') return 'Test was not executed.';
  if (t.isAuthBlocked) return 'Test did not reach functional assertions — authentication infrastructure failure blocked execution.';
  if (t.isTeardownTimeout) return 'Functional assertions completed; the failure occurred afterward while Playwright was tearing down the browser context (closing/finalizing video and trace), which exceeded the test timeout. This is an infrastructure/evidence-finalization issue, not a product defect.';

  const explicit = cleanText(t.actualResultBody);
  if (explicit) return explicit;

  if (t.status === 'passed') {
    return 'All assertions in this test completed successfully; no failures were recorded during execution.';
  }

  const firstError = (t.errors && t.errors[0]) || null;
  if (!firstError) return 'Test failed, but no error details were captured.';

  const details = parseStructuredError(firstError.message);
  if (details.locator && details.expected && details.timeoutMs) {
    let sentence = `Element located via ${details.locator} was not found. Expected state: ${details.expected}. The assertion timed out after ${Math.round(details.timeoutMs / 1000)}s`;
    sentence += details.nextAssertion ? `, so the test stopped before the next check (${details.nextAssertion}).` : '.';
    return sentence;
  }

  return details.primaryMessage || 'Test failed; see Error Details for the full message.';
}

function safeText(value, fallback) {
  const t = cleanText(value);
  return escapeHtml(t || fallback);
}

function removeTestIdPrefix(value, testId) {
  const text = cleanText(value);
  if (!text || !testId) return text;
  const escapedId = testId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`^${escapedId}\\s*[:\\-–—]?\\s*`, 'i'), '').trim();
}

/**
 * Clean display text: remove backslash-escaped quotes (\\") and
 * "To verify" / "to verify" boilerplate prefixes.
 */
function cleanDisplayTitle(text) {
  let s = cleanText(text);
  if (!s) return s;
  // Replace \\" with "
  s = s.replace(/\\"/g, '"');
  // Strip leading "To verify the functionality of" / "to verify" / "Verify"
  s = s.replace(/^(?:to verify the functionality of|to verify|verify)\s+/i, '');
  // Normalize arrows — collapse spaces around →
  s = s.replace(/\s*→\s*/g, ' → ');
  // Collapse multiple spaces
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
}

function resolveDisplayTitle(testData, planMeta, testId) {
  const candidates = [
    planMeta?.title,
    planMeta?.name,
    testData?.title,
  ];

  for (const candidate of candidates) {
    const title = removeTestIdPrefix(candidate, testId);
    const cleaned = cleanDisplayTitle(title);
    if (cleaned) return cleaned;
  }

  return 'Test scenario';
}

// ═══════════════════════════════════════════════════════════════════
//  Evidence path builder
// ═══════════════════════════════════════════════════════════════════

/**
 * evidencePath(prefix, category, testId, fileName)
 *
 * prefix   — root, e.g. "Evidence/" or ""
 * category — "Screenshots", "Recording", "Trace", "API", "Plans"
 * testId   — Test ID folder name
 * fileName — the filename
 *
 * Returns a /-normalised relative path like:
 *   Evidence/Screenshots/LIMAS-AUTH-009/screenshot-1.png
 */
function evidencePath(prefix, category, testId, fileName) {
  const root = String(prefix || 'Evidence/')
    .replace(/\\/g, '/')
    .replace(/\/+$/, '');
  return [root, category, testId, fileName]
    .filter(Boolean)
    .join('/')
    .replace(/\/+/g, '/');
}

// Reject paths that contain duplicated category segments
function hasDuplicatedCategory(normalizedPath) {
  return /\/Screenshots\/Screenshots\//i.test(normalizedPath)
    || /\/Recording\/Recording\//i.test(normalizedPath)
    || /\/Trace\/Trace\//i.test(normalizedPath)
    || /\/API\/API\//i.test(normalizedPath)
    || /\/Plans\/Plans\//i.test(normalizedPath);
}

// ═══════════════════════════════════════════════════════════════════
//  Plan parsing
// ═══════════════════════════════════════════════════════════════════

/**
 * Parse YAML frontmatter from a plan file.
 * Returns an object with all frontmatter keys (lowercased/underscored).
 */
function parsePlanFrontmatter(content) {
  const meta = {};
  if (!content) return meta;
  const lines = content.split(/\r?\n/);
  let inFrontmatter = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      if (!inFrontmatter) { inFrontmatter = true; continue; }
      else break;
    }
    if (!inFrontmatter) continue;
    const m = trimmed.match(/^(\w[\w\s-]*?)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase().replace(/\s+/g, '_');
    let val = m[2].trim().replace(/^['"]|['"]$/g, '');
    meta[key] = val;
  }
  return meta;
}

/**
 * Parse plan content into structured sections.
 * Returns { preconditions, steps, expectedResult, purpose }.
 */
function parsePlanSections(content) {
  const result = { preconditions: '', steps: '', expectedResult: '', purpose: '' };
  if (!content) return result;

  const lines = content.split(/\r?\n/);
  let currentSection = '';
  let inFrontmatter = false;
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) { inCodeBlock = !inCodeBlock; continue; }
    if (trimmed === '---') { inFrontmatter = !inFrontmatter; continue; }
    if (inFrontmatter) continue;

    if (/^# Purpose/i.test(trimmed)) { currentSection = 'purpose'; continue; }
    if (/^# Preconditions/i.test(trimmed)) { currentSection = 'preconditions'; continue; }
    if (/^# Steps and Expected Results/i.test(trimmed)) { currentSection = 'steps'; continue; }
    if (/^# Expected Final Result/i.test(trimmed)) { currentSection = 'expectedResult'; continue; }
    if (/^#/.test(trimmed)) { currentSection = ''; continue; }

    if (currentSection && trimmed) {
      result[currentSection] += (result[currentSection] ? '\n' : '') + trimmed;
    }
  }
  return result;
}

// ═══════════════════════════════════════════════════════════════════
//  Markdown-to-HTML (with path sanitisation)
// ═══════════════════════════════════════════════════════════════════

function simpleMarkdownToHtml(md) {
  let cleaned = stripAnsi(md)
    .replace(/[A-Za-z]:[\\\/][^\s,)\]]+/g, (match) => path.basename(match))
    .replace(/tests[\\\/]authentication[\\\/][^\s,)\]]+/g, (match) => path.basename(match))
    .replace(/tests[\\\/]pages[\\\/][^\s,)\]]+/g, (match) => path.basename(match))
    .replace(/plans[\\\/]authentication[\\\/][^\s,)\]]+/g, (match) => path.basename(match));
  return cleaned
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p>${match}</p>`;
    });
}

// ═══════════════════════════════════════════════════════════════════
//  Shared CSS
// ═══════════════════════════════════════════════════════════════════

const SHARED_CSS = `
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; max-width: 100%; margin: 0; overflow-x: hidden; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; color: #333; line-height: 1.6; }

.report-header { width: 100%; max-width: 100%; min-width: 0; background: #1a1a2e; color: #fff; padding: 24px; }
.report-header h1 { margin: 0; max-width: 100%; white-space: normal; overflow-wrap: anywhere; word-break: normal; font-size: 1.4em; }

.summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; width: 100%; margin-top: 16px; }
.summary-card { min-width: 0; max-width: 100%; overflow: hidden; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; text-align: center; }
.summary-card .summary-value { max-width: 100%; white-space: normal; overflow-wrap: anywhere; word-break: break-word; text-align: center; line-height: 1.2; font-size: 1.6em; font-weight: bold; }
.summary-card.profile .summary-value { font-size: clamp(15px, 1.8vw, 26px); }
.summary-card .summary-label { font-size: 0.75em; opacity: 0.8; margin-top: 4px; }
.summary-card.passed .summary-value { color: #4caf50; }
.summary-card.failed .summary-value { color: #f44336; }

.container { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }

.test-card { background: #fff; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; }
.test-card.failed { border-left: 4px solid #f44336; }
.test-card.passed { border-left: 4px solid #4caf50; }

.test-card-heading { display: grid; grid-template-columns: minmax(150px, auto) minmax(0, 1fr); align-items: start; gap: 16px; }
.test-id-col { font-family: monospace; font-weight: 700; white-space: nowrap; }
.test-title-col { min-width: 0; white-space: normal; overflow-wrap: anywhere; }

.test-header { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; gap: 12px; user-select: none; }
.test-header:hover { background: #f0f0f0; }
.test-status { padding: 2px 10px; border-radius: 12px; font-size: 0.75em; font-weight: bold; white-space: nowrap; }
.test-status.passed { background: #e8f5e9; color: #2e7d32; }
.test-status.failed { background: #ffebee; color: #c62828; }
.test-duration { color: #666; font-size: 0.85em; min-width: 60px; text-align: right; white-space: nowrap; }
.expand-icon { transition: transform 0.2s; }
.test-card.expanded .expand-icon { transform: rotate(180deg); }
.test-body { display: none; padding: 0 16px 16px; }
.test-card.expanded .test-body { display: block; }

.test-meta { display: flex; flex-wrap: wrap; gap: 24px; margin-bottom: 12px; font-size: 0.9em; color: #555; }
.steps { margin: 12px 0; }
.steps ol { padding-left: 24px; }
.screenshots { margin: 16px 0; }
.ss-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
.ss-item { text-align: center; min-width: 0; }
.ss-item img { width: 100%; border-radius: 4px; border: 1px solid #ddd; cursor: pointer; transition: transform 0.15s; }
.ss-item img:hover { transform: scale(1.02); }
.ss-item span { display: block; font-size: 0.8em; color: #666; margin-top: 4px; overflow-wrap: anywhere; }
.video-container { margin: 16px 0; }
.trace-section, .api-summary, .test-plan, .actual-result, .test-summary { margin: 16px 0; overflow-wrap: anywhere; }
.final-ss { margin: 16px 0; }
.final-ss img { border-radius: 4px; border: 1px solid #ddd; max-width: 100%; }
.errors { background: #fff3e0; border: 1px solid #ff9800; border-radius: 4px; padding: 12px; margin: 16px 0; }
.errors pre { font-size: 0.85em; overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
.error-fields { list-style: none; padding: 0; margin: 0 0 10px; font-size: 0.9em; }
.error-fields li { margin: 3px 0; overflow-wrap: anywhere; }
.ind-link { margin: 16px 0; padding: 12px; background: #e3f2fd; border-radius: 4px; font-size: 0.9em; }
h3 { font-size: 1.1em; margin: 12px 0 6px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
h4 { font-size: 1em; margin: 10px 0 4px; color: #555; }
code { background: #f4f4f4; padding: 1px 4px; border-radius: 3px; font-size: 0.9em; white-space: pre-wrap; word-break: break-word; }
pre { background: #f4f4f4; padding: 8px; border-radius: 4px; font-size: 0.85em; overflow-x: auto; white-space: pre-wrap; word-break: break-word; }
p { margin: 4px 0; }
a { color: #1976d2; }
.no-evidence { background: #f9f9f9; border: 1px dashed #ccc; border-radius: 4px; padding: 12px; margin: 12px 0; color: #888; font-style: italic; }
.report-container { width: 100%; max-width: 100%; min-width: 0; }

@media (max-width: 700px) {
  .test-card-heading { grid-template-columns: 1fr; gap: 6px; }
  .test-header { flex-wrap: wrap; }
  .summary-grid { grid-template-columns: repeat(3, 1fr); }
}
`;

// ═══════════════════════════════════════════════════════════════════
//  Test card HTML (shared by suite and individual)
// ═══════════════════════════════════════════════════════════════════

function buildTestCardHtml(t, idx, opts) {
  const prefix = (opts && opts.assetsPrefix) || 'Evidence/';
  const statusClass = t.status === 'passed' ? 'passed' : (t.status === 'skipped' ? 'skipped' : (t.isAuthBlocked ? 'auth-blocked' : (t.isTeardownTimeout ? 'teardown-timeout' : 'failed')));
  const durationSec = (t.duration / 1000).toFixed(2);
  const id = `test-${idx}`;

  const displayTitle = escapeHtml(t.displayTitle || t.testId);
  const profileText = safeText(t.profile, 'Not specified');
  const moduleText = safeText(t.module, 'Not specified');
  const sectionText = t.section ? ` — ${escapeHtml(t.section)}` : '';
  const planFileName = t.planFile ? escapeHtml(t.planFile) : '';
  const sourceSpec = t.sourceSpec ? escapeHtml(t.sourceSpec) : '';
  const isSkipped = t.status === 'skipped';

  // Plan sections
  const preconditions = t.planSections?.preconditions || '';
  const steps = t.planSections?.steps || '';
  const expectedResult = t.planSections?.expectedResult || '';
  const purpose = t.planSections?.purpose || '';

  // Steps from plan — always prefer plan sections over Playwright step titles
  const planSteps = steps
    ? steps.split('\n').filter((s) => s.trim())
    : [];

  // ── Screenshot section ─────────────────────────────────────────
  let screenshotsHtml = '';

  // Collect all screenshots: step screenshots in sequence, then final-state last
  const allSsItems = [];

  // Step screenshots from the fixture helper (step-NN-*.png) or Playwright auto-capture
  // already come in attachment order from `screenshotRefs`
  for (const ss of t.screenshotRefs) {
    const ssPath = evidencePath(prefix, '', ss.ref, '');
    allSsItems.push({
      ref: ssPath,
      label: ss.label,
    });
  }

  // Final-state screenshot (from fixture afterEach) — shown last
  if (t.finalScreenshotRef) {
    const fsPath = evidencePath(prefix, '', t.finalScreenshotRef, '');
    allSsItems.push({
      ref: fsPath,
      label: 'Final State',
    });
  }

  if (allSsItems.length > 0) {
    screenshotsHtml = '<div class="screenshots"><h3>Screenshots</h3><div class="ss-grid">';
    for (const item of allSsItems) {
      screenshotsHtml += `<div class="ss-item">
        <a href="${item.ref}" target="_blank" rel="noopener">
          <img src="${item.ref}" alt="${escapeHtml(item.label)}" loading="lazy">
        </a>
        <span>${escapeHtml(item.label)}</span>
        <p><a href="${item.ref}" download>Download</a></p>
      </div>`;
    }
    screenshotsHtml += '</div></div>';
  } else if (t.status !== 'skipped') {
    // Diagnostic: no screenshot was captured
    screenshotsHtml = '<div class="screenshots"><h3>Screenshots</h3><div class="no-evidence">No screenshot captured for this test. The page may have been closed before the screenshot hook ran, or DetailedEvidence was not enabled.</div></div>';
  }

  const planHtml = simpleMarkdownToHtml(t.planContent || '');

  let videoHtml = '';
  if (t.videoRef) {
    const vPath = evidencePath(prefix, '', t.videoRef, '');
    videoHtml = `<div class="video-container">
      <h3>Screen Recording</h3>
      <video controls preload="metadata" style="width:100%;max-width:640px">
        <source src="${vPath}" type="video/webm">
        Video playback is not supported by this browser.
      </video>
      <p><a href="${vPath}" download>Download video</a></p>
    </div>`;
  }

  let traceHtml = '';
  if (t.traceRef) {
    const trPath = evidencePath(prefix, '', t.traceRef, '');
    traceHtml = `<div class="trace-section">
      <h3>Trace</h3>
      <p>Raw trace available for download: <a href="${trPath}" download>trace.zip</a></p>
    </div>`;
  }

  let apiHtml = '';
  if (t.apiSummaryBody && t.apiSummaryBody.trim()) {
    apiHtml = `<div class="api-summary"><h4>API / Navigation Summary</h4>${simpleMarkdownToHtml(t.apiSummaryBody)}</div>`;
  }

  let errorsHtml = '';
  if (t.errors && t.errors.length > 0) {
    errorsHtml = '<div class="errors"><h4>Error Details</h4>';
    for (const e of t.errors) {
      const rawMsg = (typeof e === 'string' ? e : e.message) || '';
      const msg = cleanText(rawMsg) || 'Unknown error';
      const details = parseStructuredError(rawMsg);

      let structuredHtml = '';
      if (details.locator || details.expected || details.timeoutMs) {
        structuredHtml = '<ul class="error-fields">';
        if (details.reason) structuredHtml += `<li><strong>Failure:</strong> ${escapeHtml(details.reason)}</li>`;
        if (details.locator) structuredHtml += `<li><strong>Locator:</strong> <code>${escapeHtml(details.locator)}</code></li>`;
        if (details.expected) structuredHtml += `<li><strong>Expected:</strong> ${escapeHtml(details.expected)}</li>`;
        if (details.timeoutMs) structuredHtml += `<li><strong>Timeout:</strong> ${details.timeoutMs}ms</li>`;
        structuredHtml += '</ul>';
      }

      const loc = e.location ? `<br><code>${escapeHtml(e.location)}</code>` : '';
      errorsHtml += `${structuredHtml}<pre><code>${escapeHtml(msg)}${loc}</code></pre>`;
    }
    errorsHtml += '</div>';
  }

  // Steps — from plan if available, otherwise from Playwright test steps
  let stepsHtml = '';
  if (planSteps.length > 0) {
    stepsHtml = '<div class="steps"><h4>Test Steps & Expected Results</h4><ol>';
    for (const s of planSteps) {
      stepsHtml += `<li>${escapeHtml(s)}</li>`;
    }
    stepsHtml += '</ol></div>';
  } else if (t.stepNames.length > 0) {
    stepsHtml = '<div class="steps"><h4>Test Steps</h4><ol>';
    for (const s of t.stepNames) {
      stepsHtml += `<li>${escapeHtml(cleanText(s) || 'Step')}</li>`;
    }
    stepsHtml += '</ol></div>';
  }

  // Preconditions
  let precondsHtml = '';
  if (preconditions) {
    precondsHtml = `<div class="test-summary"><h4>Preconditions</h4>${simpleMarkdownToHtml(preconditions)}</div>`;
  }

  // Expected result
  let expectedHtml = '';
  if (expectedResult) {
    expectedHtml = `<div class="test-plan"><h4>Expected Result</h4>${simpleMarkdownToHtml(expectedResult)}</div>`;
  }

  // Purpose
  let purposeHtml = '';
  if (purpose) {
    purposeHtml = `<div class="test-plan"><h4>Purpose</h4>${simpleMarkdownToHtml(purpose)}</div>`;
  }

  const summaryText = stripAnsi(t.summaryBody || '');
  const actualResultText = computeActualResult(t);

  return `
  <div class="test-card ${statusClass}" id="${id}">
    <div class="test-header" onclick="toggleExpand('${id}')">
      <div class="test-card-heading">
        <span class="test-id-col">${escapeHtml(t.testId)}</span>
        <span class="test-title-col">${displayTitle}</span>
      </div>
      <span class="test-status ${statusClass}">${t.isTeardownTimeout ? 'TEARDOWN TIMEOUT' : t.status.toUpperCase()}</span>
      <span class="test-duration">${durationSec}s</span>
      <span class="expand-icon">▼</span>
    </div>
    <div class="test-body">
      <div class="test-meta">
        <span><strong>Profile:</strong> ${profileText}</span>
        <span><strong>Module:</strong> ${moduleText}${sectionText}</span>
        ${planFileName ? `<span><strong>Plan:</strong> ${planFileName}</span>` : ''}
        ${sourceSpec ? `<span><strong>Spec:</strong> ${sourceSpec}</span>` : ''}
      </div>
      ${precondsHtml}
      ${purposeHtml}
      ${summaryText ? `<div class="test-summary">${simpleMarkdownToHtml(summaryText)}</div>` : ''}
      ${expectedHtml}
      ${stepsHtml}
      <div class="test-plan">
        <h4>Test Plan</h4>
        ${planHtml}
      </div>
      ${screenshotsHtml}
      ${videoHtml}
      ${traceHtml}
      ${apiHtml}
      <div class="actual-result"><h4>Actual Result</h4>${simpleMarkdownToHtml(actualResultText)}</div>
      ${errorsHtml}
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════════
//  Suite HTML
// ═══════════════════════════════════════════════════════════════════

function buildSuiteHtml(enrichedTests, metadata, batchConfig, opts) {
  const functionalTests = enrichedTests.filter((t) => !t.isInfra);
  const infraTests = enrichedTests.filter((t) => t.isInfra);

  const functionalTotal = opts.functionalTotal || functionalTests.length;
  const functionalPassed = opts.functionalPassed || functionalTests.filter((t) => t.status === 'passed').length;
  const functionalFailed = opts.functionalFailed || functionalTests.filter((t) => t.status === 'failed').length;
  const functionalAuthBlocked = opts.functionalAuthBlocked || 0;
  const functionalTeardownTimeout = opts.functionalTeardownTimeout || 0;
  const functionalSkipped = opts.functionalSkipped || functionalTests.filter((t) => t.status === 'skipped').length;
  const infraTotal = infraTests.length;
  const infraPassed = opts.infraPassed || infraTests.filter((t) => t.status === 'passed').length;
  const infraFailed = opts.infraFailed || infraTests.filter((t) => t.status === 'failed').length;
  const flaky = 0;

  const batchName = batchConfig ? batchConfig.name : (metadata.batch || '');
  const sectionName = batchConfig ? batchConfig.section : '';
  const profileName = safeText(metadata.accessProfile, 'Not specified');
  const suiteLabel = metadata.suite || 'system-user-dashboard';
  const pageTitle = `LIMAS 3.0 Detailed Test Evidence Report — ${suiteLabel}${batchName ? ` — ${batchName}` : ''} — ${profileName}`;
  const durationStr = metadata.durationSeconds ? `${metadata.durationSeconds}s` : 'Not captured';
  const dateStr = metadata.startTime ? metadata.startTime.split('T')[0] : new Date().toISOString().split('T')[0];
  const statusLabel = metadata.status || 'FAILED';

  // Infrastructure section HTML
  let infraHtml = '';
  if (infraTests.length > 0) {
    infraHtml = `
  <div class="container">
    <h2>Execution Prerequisites</h2>
    <p class="section-desc">Infrastructure checks required before the functional batch can execute.</p>
    ${infraTests.map((t, i) => buildTestCardHtml(t, i, opts)).join('\n')}
  </div>`;
  }

  // Functional section HTML
  const funcHtml = `
  <div class="container">
    <h2>Functional Test Results — ${batchName || 'Batch'}</h2>
    ${sectionName ? `<p class="section-desc">Section: ${escapeHtml(sectionName)} | Batch: ${escapeHtml(batchName)} | ${functionalTotal} test${functionalTotal !== 1 ? 's' : ''}</p>` : ''}
    ${functionalTests.map((t, i) => buildTestCardHtml(t, i + infraTests.length, opts)).join('\n')}
  </div>`;

  // Individual reports link
  const indReportsDir = opts.individualReportsDir || 'Individual-Test-Reports';
  let indReportsHtml = '';
  if (functionalTests.length > 0) {
    indReportsHtml = `<div class="ind-link">
      <strong>Test evidence:</strong>
      ${functionalTests.map((t,i) => `<a href="#test-${i + infraTests.length}" onclick="document.getElementById('test-${i + infraTests.length}').classList.add('expanded')">${escapeHtml(t.testId)}</a>`).join(' | ')}
    </div>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(pageTitle)}</title>
<style>${SHARED_CSS}
.skipped { border-left: 4px solid #ff9800; }
.test-status.skipped { background: #fff3e0; color: #e65100; }
.auth-blocked { border-left: 4px solid #e91e63; }
.test-status.auth-blocked { background: #fce4ec; color: #c2185b; }
.teardown-timeout { border-left: 4px solid #9c27b0; }
.test-status.teardown-timeout { background: #f3e5f5; color: #6a1b9a; }
.section-desc { color: #666; font-size: 0.9em; margin-bottom: 16px; }
.infra-badge { background: #e3f2fd; color: #1565c0; border-radius: 4px; padding: 2px 8px; font-size: 0.75em; margin-left: 8px; }
</style>
</head>
<body>
<div class="report-header">
  <h1>${escapeHtml(pageTitle)}</h1>
  <div class="summary-grid">
    <div class="summary-card"><div class="summary-value">${functionalTotal}</div><div class="summary-label">Functional Total</div></div>
    <div class="summary-card passed"><div class="summary-value">${functionalPassed}</div><div class="summary-label">Passed</div></div>
    <div class="summary-card failed"><div class="summary-value">${functionalFailed}</div><div class="summary-label">Failed</div></div>
    ${functionalAuthBlocked > 0 ? `<div class="summary-card"><div class="summary-value" style="color:#ff9800">${functionalAuthBlocked}</div><div class="summary-label">Auth Blocked</div></div>` : ''}
    ${functionalTeardownTimeout > 0 ? `<div class="summary-card"><div class="summary-value" style="color:#9c27b0">${functionalTeardownTimeout}</div><div class="summary-label">Teardown Timeout</div></div>` : ''}
    <div class="summary-card"><div class="summary-value">${functionalSkipped}</div><div class="summary-label">Skipped</div></div>
    <div class="summary-card"><div class="summary-value">${escapeHtml(durationStr)}</div><div class="summary-label">Duration</div></div>
    <div class="summary-card"><div class="summary-value">${escapeHtml(dateStr)}</div><div class="summary-label">Date</div></div>
    <div class="summary-card"><div class="summary-value">Edge</div><div class="summary-label">Browser</div></div>
    <div class="summary-card profile"><div class="summary-value">${profileName}</div><div class="summary-label">Profile</div></div>
  </div>
  <div class="summary-grid" style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.2); padding-top:12px;">
    <div class="summary-card"><div class="summary-value">${infraTotal}</div><div class="summary-label">Prerequisites</div></div>
    <div class="summary-card passed"><div class="summary-value">${infraPassed}</div><div class="summary-label">Infra Passed</div></div>
    <div class="summary-card failed"><div class="summary-value">${infraFailed}</div><div class="summary-label">Infra Failed</div></div>
    <div class="summary-card"><div class="summary-value">${escapeHtml(statusLabel)}</div><div class="summary-label">Run Status</div></div>
  </div>
</div>
${infraHtml}
${indReportsHtml}
${funcHtml}
<script>
function toggleExpand(id) {
  document.getElementById(id).classList.toggle('expanded');
}
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
//  Individual test HTML
// ═══════════════════════════════════════════════════════════════════

function buildIndividualHtml(enrichedTest, metadata, batchConfig, opts) {
  const pageTitle = `LIMAS 3.0 Detailed Test Evidence — ${enrichedTest.testId}`;
  const profileName = safeText(enrichedTest.profile, 'Not specified');
  const moduleName = safeText(enrichedTest.module, 'Not specified');
  const displayTitle = escapeHtml(enrichedTest.displayTitle || enrichedTest.testId);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(pageTitle)}</title>
<style>${SHARED_CSS}</style>
</head>
<body>
<div class="report-header">
  <h1>${displayTitle}</h1>
  <div class="summary-grid">
    <div class="summary-card ${enrichedTest.status === 'passed' ? 'passed' : 'failed'}"><div class="summary-value">${enrichedTest.status.toUpperCase()}</div><div class="summary-label">Status</div></div>
    <div class="summary-card"><div class="summary-value">${(enrichedTest.duration / 1000).toFixed(2)}s</div><div class="summary-label">Duration</div></div>
    <div class="summary-card profile"><div class="summary-value">${profileName}</div><div class="summary-label">Profile</div></div>
    <div class="summary-card"><div class="summary-value">${moduleName}</div><div class="summary-label">Module</div></div>
  </div>
</div>
<div class="container">
  ${buildTestCardHtml(enrichedTest, 0, opts)}
</div>
<script>
function toggleExpand(id) {
  document.getElementById(id).classList.toggle('expanded');
}
</script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
//  README.txt
// ═══════════════════════════════════════════════════════════════════

function buildReadme(reportDir, content) {
  const text = content || `LIMAS 3.0 Detailed Test Evidence Report

1. Extract the complete ZIP before opening the report.
2. Keep index.html and the Evidence folder together.
3. Open the extracted index.html.
4. Do not open index.html directly inside the ZIP.
`;
  fs.writeFileSync(path.join(reportDir, 'README.txt'), text, 'utf8');
}

// ═══════════════════════════════════════════════════════════════════
//  Asset validator — with deduplication
// ═══════════════════════════════════════════════════════════════════

function collectHtmlRefs(htmlContent) {
  const refs = [];
  // Only real opening tags contain asset attributes. Plan/code text can also
  // contain href="/application-route" and must not be treated as a local link.
  const markup = htmlContent.replace(/(<(?:script|style)\b[^>]*>)[\s\S]*?(<\/(?:script|style)>)/gi, '$1$2');
  for (const tag of markup.matchAll(/<[a-z][a-z0-9:-]*\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi)) {
    const attributes = tag[0].replace(/^<[a-z][a-z0-9:-]*/i, '');
    for (const attr of attributes.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      if (/^(?:src|href)$/i.test(attr[1])) refs.push(attr[2] ?? attr[3] ?? attr[4]);
    }
  }
  return refs;
}

/**
 * Normalize a URL-encoded or raw path to a /-separated decoded string.
 */
function normalizeLink(raw) {
  let s = raw.replace(/\\/g, '/');
  try {
    // Decode percent-encoding safely
    s = decodeURIComponent(s);
  } catch (_) {
    // If decoding fails, keep the original
  }
  // Collapse multiple slashes
  return s.replace(/\/+/g, '/');
}

function validateAssets(reportDir, htmlContent, label) {
  const lbl = label || 'report';
  const rawRefs = collectHtmlRefs(htmlContent);

  // 1. Normalize and filter
  const localRefs = [];
  let absolutePaths = 0;
  let tempPaths = 0;
  let testResultsLinks = 0;
  let pathTraversals = 0;
  let dupCategoryPaths = 0;

  for (const raw of rawRefs) {
    if (/^(?:data:|https?:|mailto:|#)/i.test(raw)) continue;

    if (/^[A-Za-z]:[\\\/]/.test(raw)) {
      absolutePaths++;
      console.error(`  ABSOLUTE PATH rejected: ${raw}`);
      continue;
    }

    if (raw.startsWith('/') && !raw.startsWith('//')) {
      absolutePaths++;
      console.error(`  ABSOLUTE PATH rejected: ${raw}`);
      continue;
    }

    if (raw.includes('..') || raw.includes('~')) {
      pathTraversals++;
      console.error(`  PATH TRAVERSAL rejected: ${raw}`);
      continue;
    }

    const normalized = normalizeLink(raw);

    if (hasDuplicatedCategory(normalized)) {
      dupCategoryPaths++;
      console.error(`  DUPLICATED CATEGORY rejected: ${raw}`);
      continue;
    }

    // Skip external references — e.g. Individual-Test-Reports ZIP links in suite
    // All local links must resolve inside this self-contained report.

    localRefs.push(normalized);
  }

  // 2. Deduplicate — same physical path only once
  const uniqueRefs = [...new Set(localRefs)];

  // 3. Validate each unique physical file
  let brokenLocalLinks = 0;
  for (const ref of uniqueRefs) {
    const absPath = path.resolve(reportDir, ref);

    const relCheck = path.relative(reportDir, absPath);
    if (relCheck.startsWith('..') || path.isAbsolute(relCheck)) {
      console.error(`  OUTSIDE REPORT DIR: ${ref}`);
      brokenLocalLinks++;
      continue;
    }

    if (!fs.existsSync(absPath)) {
      console.error(`  MISSING: ${ref}`);
      brokenLocalLinks++;
    }
  }

  // 4. Classify unique paths into asset categories
  const counts = { screenshots: 0, videos: 0, plans: 0, traces: 0, apiSummaries: 0 };

  for (const ref of uniqueRefs) {
    // Match a category segment regardless of prefix depth
    if (/\/Screenshots\//i.test(ref)) counts.screenshots++;
    if (/\/Recording\//i.test(ref)) counts.videos++;
    if (/\/Trace\//i.test(ref)) counts.traces++;
    if (/\/Plans\//i.test(ref)) counts.plans++;
    if (/\/API\//i.test(ref)) counts.apiSummaries++;
  }

  // 5. Check for temp paths and test-results links in raw HTML
  const tempRe = /\b(?:AppData|Temp|tmp|temp)\b/i;
  if (tempRe.test(htmlContent)) {
    tempPaths = 1;
  }
  if (/test-results/i.test(htmlContent)) {
    testResultsLinks = 1;
  }

  console.log('');
  console.log(`=== ASSET VALIDATION (${lbl}) ===`);
  console.log(`  Unique local links: ${uniqueRefs.length}`);
  console.log(`  Screenshots: ${counts.screenshots}`);
  console.log(`  Videos: ${counts.videos}`);
  console.log(`  Traces: ${counts.traces}`);
  console.log(`  Plans: ${counts.plans}`);
  console.log(`  API summaries: ${counts.apiSummaries}`);
  if (absolutePaths > 0) console.log(`  Absolute paths found: ${absolutePaths}`);
  if (tempPaths > 0) console.log(`  Temporary paths found: ${tempPaths}`);
  if (testResultsLinks > 0) console.log(`  Original test-results links: ${testResultsLinks}`);
  if (pathTraversals > 0) console.log(`  Path traversals: ${pathTraversals}`);
  if (dupCategoryPaths > 0) console.log(`  Duplicated category paths: ${dupCategoryPaths}`);
  console.log(`  Broken local links: ${brokenLocalLinks}`);

  const invalid = absolutePaths + tempPaths + testResultsLinks + brokenLocalLinks + pathTraversals + dupCategoryPaths;
  // Absolute paths in error messages (e.g. "/system-user-dashboard") are not file references
  // — only treat Windows drive-letter paths as blocking.
  if (invalid > 0) {
    console.error('');
    console.error(`  ASSET VALIDATION FAILED for ${lbl} — ZIP will NOT be created.`);
    return false;
  }

  console.log(`  All assets valid.`);
  return true;
}

// ═══════════════════════════════════════════════════════════════════
//  ZIP helper
// ═══════════════════════════════════════════════════════════════════

function createZip(reportDir, runDir, zipName) {
  const zipPath = path.join(runDir, zipName);
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'zip-directory.cjs'), reportDir, zipPath], { stdio: 'pipe', windowsHide: true });
    console.log('');
    console.log(`ZIP generated: ${zipPath}`);
    return true;
  } catch (e) {
    console.error(`ZIP creation failed for ${zipName}:`, e.message);
    return false;
  }
}

module.exports = {
  escapeHtml,
  stripAnsi,
  cleanText,
  safeText,
  cleanDisplayTitle,
  resolveDisplayTitle,
  parseStructuredError,
  computeActualResult,
  evidencePath,
  hasDuplicatedCategory,
  simpleMarkdownToHtml,
  buildTestCardHtml,
  buildSuiteHtml,
  buildIndividualHtml,
  buildReadme,
  validateAssets,
  collectHtmlRefs,
  createZip,
  parsePlanFrontmatter,
  parsePlanSections,
  SHARED_CSS,
};
