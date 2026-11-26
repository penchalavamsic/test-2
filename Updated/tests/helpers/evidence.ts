import { recordEvidence } from './step-evidence';
import { Page, test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

interface EvidenceStepOptions {
  /** If true, capture a full-page screenshot. Default: viewport only. */
  fullPage?: boolean;
}

/**
 * Run a named test.step that captures a screenshot after execution and attaches it to the step.
 * Captures on both success and failure (when the page is available).
 */
export async function evidenceStep(
  page: Page,
  stepName: string,
  orderPrefix: string,
  fn: () => Promise<void>,
  options: EvidenceStepOptions = {},
): Promise<void> {
  const screenshotName = `${orderPrefix}-${stepName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}.png`;

  await base.step(stepName, async () => {
    try {
      await fn();
    } finally {
      try {
        const buffer = await page.screenshot({ fullPage: options.fullPage ?? false, mask: [page.locator('input[type="password"], input[type="email"], input[name="username"], input[autocomplete="username"]')] });
        await base.info().annotations.push({ type: 'screenshot', description: screenshotName });
        await base.info().attach(screenshotName, { body: buffer, contentType: 'image/png' });
      } catch {
        // Page may be closed — skip screenshot
      }
    }
  });
}

/**
 * Detailed evidence step with auto-sequenced neutral naming.
 * Each call auto-increments a counter per test and attaches a screenshot
 * with a deterministic, credential-safe name (e.g. step-001-login-page-loaded).
 *
 * @param page  Playwright Page
 * @param stepName  Human-readable step label for the Playwright test.step
 * @param counterRef  Object with a `seq` property that is incremented on each call
 * @param fn  The action or assertion to perform
 */
export async function detailedStep(
  page: Page,
  stepName: string,
  counterRef: { seq: number },
  fn: () => Promise<void>,
): Promise<void> {
  counterRef.seq += 1;
  const seq = String(counterRef.seq).padStart(3, '0');
  const safe = stepName.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-+/g, '-').toLowerCase().slice(0, 60);
  const screenshotName = `step-${seq}-${safe}.png`;

  await base.step(stepName, async () => {
    try {
      await fn();
    } finally {
      try {
        const buffer = await page.screenshot({ fullPage: false, mask: [page.locator('input[type="password"], input[type="email"], input[name="username"], input[autocomplete="username"]')] });
        await base.info().annotations.push({ type: 'screenshot', description: screenshotName });
        await base.info().attach(screenshotName, { body: buffer, contentType: 'image/png' });
      } catch {
        // Page may be closed
      }
    }
  });
}

/**
 * Type text into a locator one character at a time, capturing a screenshot
 * after each individual keystroke. The locator is cleared before typing.
 * Uses the same counterRef for sequential numbering across all detailed steps.
 *
 * @param locator  Playwright Locator for the input field
 * @param text  The value to type (each character generates a screenshot)
 * @param page  Playwright Page
 * @param fieldName  Neutral label for the field (e.g. 'username', 'password')
 * @param counterRef  Shared sequence counter
 */
export async function typeSequentially(
  locator: import('@playwright/test').Locator,
  text: string,
  page: Page,
  fieldName: string,
  counterRef: { seq: number },
): Promise<void> {
  await recordEvidence('action-clear-evidence-92', async () => locator.clear());
  for (const ch of text) {
    await recordEvidence('action-pressSequentially-evidence-94', async () => locator.pressSequentially(ch));
    counterRef.seq += 1;
    const seq = String(counterRef.seq).padStart(3, '0');
    const safeName = `keystroke-${fieldName}-char-${seq}`.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
    const screenshotName = `step-${seq}-${safeName}.png`;

    await base.step(`Keystroke in ${fieldName}`, async () => {
      try {
        const buffer = await page.screenshot({ fullPage: false, mask: [page.locator('input[type="password"], input[type="email"], input[name="username"], input[autocomplete="username"]')] });
        await base.info().annotations.push({ type: 'screenshot', description: screenshotName });
        await base.info().attach(screenshotName, { body: buffer, contentType: 'image/png' });
      } catch {
        // Page may be closed
      }
    });
  }
}

/**
 * Build an evidence summary markdown attachment.
 */
export function buildEvidenceSummary(params: {
  testId: string;
  module: string;
  accessProfile: string;
  purpose: string;
  preconditions: string;
  expectedResult: string;
  specPath: string;
  planPath: string;
}): string {
  return [
    `# Test: ${params.testId}`,
    '',
    `**Module:** ${params.module}`,
    `**Access Profile:** ${params.accessProfile}`,
    `**Spec:** ${params.specPath}`,
    `**Plan:** ${params.planPath}`,
    '',
    '## Purpose',
    params.purpose,
    '',
    '## Preconditions',
    params.preconditions,
    '',
    '## Expected Result',
    params.expectedResult,
  ].join('\n');
}

/**
 * Build an actual result attachment after test completion.
 */
export function buildActualResult(params: {
  status: 'passed' | 'failed';
  duration: number;
  finalRoute: string;
  errorMessage?: string;
}): string {
  const lines = [
    '# Actual Result',
    '',
    `**Status:** ${params.status}`,
    `**Duration:** ${(params.duration / 1000).toFixed(2)}s`,
    `**Final Route:** ${params.finalRoute}`,
  ];
  if (params.status === 'passed') {
    lines.push('', 'All assertions completed successfully.');
  }
  if (params.errorMessage) {
    lines.push('', '## Error', `\`\`\`\n${params.errorMessage}\n\`\`\``);
  }
  return lines.join('\n');
}

/**
 * Build a sanitized API/navigation summary.
 */
export function buildApiSummary(summary: {
  method: string;
  pathname: string;
  status: number;
  trigger: string;
  redirects?: string[];
}): string {
  const lines = [
    '# Declared API Expectations',
    'These are legacy test declarations, not observed HTTP results. Use the Observed HTTP responses attachment for captured traffic.',
    '',
    `**Method:** ${summary.method}`,
    `**Pathname:** ${summary.pathname}`,
    `**Status:** ${summary.status}`,
    `**Trigger:** ${summary.trigger}`,
  ];
  if (summary.redirects && summary.redirects.length > 0) {
    lines.push(`**Redirects:** ${summary.redirects.join(' → ')}`);
  }
  return lines.join('\n');
}

/**
 * Resolve a relative spec path from the current test file.
 */
export function getSpecRelativePath(testFilename: string): string {
  const testsDir = path.resolve(__dirname, '..');
  const relative = path.relative(testsDir, testFilename);
  return relative.replace(/\\/g, '/');
}
