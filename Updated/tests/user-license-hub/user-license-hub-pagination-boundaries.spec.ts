import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();
const USERS_API_PATH = '/api/users/f';

test.describe('User & License Hub — Pagination Boundaries', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1059: First page boundary — Previous disabled, Next enabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Verify total pages > 1 for meaningful boundary test
    const { totalPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-boundaries.spec-25', async () => expect(totalPages).toBeGreaterThan(1));

    // Previous disabled
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-28', async () => expect(await hub.isPreviousEnabled()).toBe(false));
    const prevDisabled = await hub.previousPageButton.evaluate(
      (el) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
    );
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-32', async () => expect(prevDisabled).toBe(true));

    // Next enabled
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-35', async () => expect(await hub.isNextEnabled()).toBe(true));

    // Range starts at 1
    const { start } = await hub.parsePaginationSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-39', async () => expect(start).toBe(1));

    // "Page 1 of M"
    const { currentPage } = await hub.parsePageSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-43', async () => expect(currentPage).toBe(1));

    // Showing range matches page 1
    const pageSize = await hub.getCurrentPageSize();
    const { end, total } = await hub.parsePaginationSummary();
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-48', async () => expect(end).toBe(Math.min(pageSize, total)));
  });

  test('LIMAS-SUD-1060: Clicking disabled Previous triggers no request', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-54', async () => expect(await hub.isPreviousEnabled()).toBe(false));

    let requestTriggered = false;
    page.on('request', (req) => {
      if (req.url().includes(USERS_API_PATH) && req.method() === 'GET') {
        requestTriggered = true;
      }
    });

    // Capture state before
    const beforeSummary = await hub.getPaginationSummaryText();
    const beforePage = await hub.getPageSummaryText();
    const beforeUrl = page.url();

    // Click disabled Previous
    await recordEvidence('action-click-user-license-hub-pagination-boundaries.spec-69', async () => hub.previousPageButton.click({ force: true }));

    // Flush pending microtasks — no actual timeout
    await new Promise<void>((r) => setTimeout(r, 0));

    // Verify no request was sent
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-75', async () => expect(requestTriggered).toBe(false));

    // State unchanged
    const afterSummary = await hub.getPaginationSummaryText();
    const afterPage = await hub.getPageSummaryText();
    const afterUrl = page.url();

    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-82', async () => expect(afterSummary).toBe(beforeSummary));
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-83', async () => expect(afterPage).toBe(beforePage));
    await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-84', async () => expect(afterUrl).toBe(beforeUrl));
  });

  test('LIMAS-SUD-1061: Reach the actual final user page and verify its boundary', async ({page})=>{test.setTimeout(240000);const hub=new UserLicenseHubPage(page);await recordEvidence('action-click-user-license-hub-pagination-boundaries.spec-89', async () => hub.rowsPerPageCombobox.click());const values=(await page.getByRole('listbox').getByRole('option').allTextContents()).map(Number).filter(Number.isFinite);await recordEvidence('action-press-user-license-hub-pagination-boundaries.spec-89', async () => page.keyboard.press('Escape'));await hub.setDynamicUserPageSize(Math.max(...values));let state=await hub.parsePageSummary();const totalPages=state.totalPages;for(let i=state.currentPage;i<totalPages;i++)await hub.goToNextUserPage();state=await hub.parsePageSummary();await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-89', async () => expect(state.currentPage).toBe(totalPages));await recordEvidence('assert-toBeDisabled-user-license-hub-pagination-boundaries.spec-89', async () => expect(hub.nextPageButton).toBeDisabled());if(totalPages>1)await recordEvidence('assert-toBeEnabled-user-license-hub-pagination-boundaries.spec-89', async () => expect(hub.previousPageButton).toBeEnabled());const range=await hub.parsePaginationSummary();await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-89', async () => expect(range.end).toBe(range.total));await recordEvidence('assert-toBe-user-license-hub-pagination-boundaries.spec-89', async () => expect(await hub.getVisibleUserCount()).toBe(range.end-range.start+1));});
});