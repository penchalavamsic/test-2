import { test, type Page, type TestInfo } from '@playwright/test';
import { envNumber } from './settings';

type EvidenceState = { page: Page; sequence: number; capturing: boolean; lastLandmark?: string; checkpoints: number };
const states = new WeakMap<TestInfo, EvidenceState>();
export function registerEvidence(page: Page, info: TestInfo): void {
  states.set(info, { page, sequence: 0, capturing: false, checkpoints: 0 });
}
export function unregisterEvidence(info: TestInfo): void { states.delete(info); }

export async function captureEvidence(label: string, info = test.info(), page?: Page): Promise<void> {
  if (process.env.PLAYWRIGHT_EVIDENCE_MODE === 'off') return;
  const state = states.get(info);
  const target = page ?? state?.page;
  if (!target || state?.capturing) return;
  if (state) state.capturing = true;
  const sequence = state ? ++state.sequence : info.attachments.length + 1;
  const name = `${String(sequence).padStart(4, '0')}-${label.replace(/[^a-zA-Z0-9-]+/g, '-').slice(0, 100)}`;
  try {
    if (target.isClosed()) throw new Error('Page closed');
    const selectors = ['input[type="email"]', 'input[name="email"]', 'input[type="password"]', 'input[name="username"]', 'input[autocomplete="username"]', ...JSON.parse(process.env.PLAYWRIGHT_EVIDENCE_MASK_SELECTORS || '[]')];
    const body = await target.screenshot({
      timeout: envNumber('PLAYWRIGHT_SCREENSHOT_TIMEOUT_MS', 3000, 1),
      fullPage: false, type: 'png', mask: selectors.map((s: string) => target.locator(s)),
    });
    await info.attach(`${name}.png`, { body, contentType: 'image/png' });
  } catch {
    try {
      await info.attach(`${name}-unavailable`, {
        body: 'Screenshot unavailable: page closed, capture timed out, or mask configuration invalid. See the trace and test result.',
        contentType: 'text/plain',
      });
    } catch { info.annotations.push({ type: 'evidence-unavailable', description: name }); }
  } finally {
    if (state) state.capturing = false;
  }
}

/** Capture distinct page/form/result states, with a small successful-checkpoint budget. */
async function captureImportantState(label: string): Promise<void> {
  const info = test.info(), state = states.get(info);
  if (!state || state.page.isClosed() || state.checkpoints >= 5) return;
  const landmark = await state.page.evaluate(() => {
    const visible = (e: Element) => (e as HTMLElement).getClientRects().length > 0;
    const texts = (selector: string) => Array.from(document.querySelectorAll(selector)).filter(visible)
      .map(e => (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0,180));
    return JSON.stringify({ route: location.pathname,
      headings: texts('h1,h2,[role="dialog"] h3,[role="alertdialog"]'),
      dialogs: Array.from(document.querySelectorAll('[role="dialog"]')).filter(visible).map(e => e.getAttribute('aria-labelledby') || e.getAttribute('aria-label') || 'dialog'),
      selectedTabs: texts('[role="tab"][aria-selected="true"]'),
      messages: texts('[role="alert"],[role="status"],[aria-live="assertive"]'),
      invalid: Array.from(document.querySelectorAll('[aria-invalid="true"]')).filter(visible).map(e => e.id || e.getAttribute('name')),
    });
  }).catch(() => null);
  if (landmark === null || landmark === state.lastLandmark) return;
  state.lastLandmark = landmark;
  state.checkpoints++;
  await captureEvidence('checkpoint-' + label);
}

/** Preserve the original return value/error; evidence must never turn failure into success. */
export async function recordEvidence<T>(label: string, operation: () => T | Promise<T>): Promise<T> {
  if (process.env.PLAYWRIGHT_SCREENSHOT_MODE !== 'important') {
    try { return await operation(); }
    finally { await captureEvidence(label); }
  }
  return test.step(label, async () => {
    try {
      const result = await operation();
      await captureImportantState(label);
      return result;
    } catch (error) {
      await captureEvidence('failure-' + label);
      throw error;
    }
  });
}
