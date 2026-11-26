import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-204: should show all records when search field is emptied in history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-204-history-search-empty-submission.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-204-history-search-empty-submission.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    // Perform search
    const firstPara = page.getByRole('paragraph').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-204-history-search-empty-submission.spec-19', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-204-history-search-empty-submission.spec-23', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    // Now clear by filling empty string
    await recordEvidence('action-fill-LIMAS-SUD-204-history-search-empty-submission.spec-26', async () => dashboard.licenseSearchInput.fill(''));

    await recordEvidence('assert-toPass-LIMAS-SUD-204-history-search-empty-submission.spec-28', async () => expect(async () => {
      const restoredLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-204-history-search-empty-submission.spec-30', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-204-history-search-empty-submission.spec-33', async () => expect(dashboard.licenseSearchInput).toHaveValue(''));
  });
});