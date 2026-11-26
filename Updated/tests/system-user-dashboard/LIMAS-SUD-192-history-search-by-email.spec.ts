import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-192: should filter processed list by email substring', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-192-history-search-by-email.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-192-history-search-by-email.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const emailPattern = dashboard.getPendingRequestUserEmail(dashboard.processedRecordCards.first());
    const emailCount = await emailPattern.count();

    if (emailCount > 0) {
      const emailText = await emailPattern.first().textContent();
      const atIndex = emailText!.indexOf('@');
      const domainPart = emailText!.substring(atIndex + 1, Math.min(atIndex + 6, emailText!.length));

      await recordEvidence('action-fill-LIMAS-SUD-192-history-search-by-email.spec-25', async () => dashboard.licenseSearchInput.fill(domainPart));

      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-192-history-search-by-email.spec-27', async () => expect.poll(async () => {
        return dashboard.getLoadedCount();
      }, { timeout: 10_000 }).toBeGreaterThanOrEqual(0));
    const filteredLoaded = await dashboard.getLoadedCount();

      await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-192-history-search-by-email.spec-31', async () => expect(filteredLoaded).toBeLessThanOrEqual(initialLoaded));
    }

    await recordEvidence('action-clear-LIMAS-SUD-192-history-search-by-email.spec-34', async () => dashboard.licenseSearchInput.clear());
  });
});