import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-202: should not crash or break when special characters are entered in history search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-202-history-search-special-chars.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-202-history-search-special-chars.spec-13', async () => expect(dashboard.processedCountText).toBeVisible());

    const specialChars = '@#$%&*()+=[]{}\\|<>/';
    await recordEvidence('action-fill-LIMAS-SUD-202-history-search-special-chars.spec-16', async () => dashboard.licenseSearchInput.fill(specialChars));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-202-history-search-special-chars.spec-17', async () => expect(dashboard.licenseSearchInput).toHaveValue(specialChars));

    await recordEvidence('assert-toPass-LIMAS-SUD-202-history-search-special-chars.spec-19', async () => expect(async () => {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-202-history-search-special-chars.spec-20', async () => expect(dashboard.processedCountText).toBeVisible());
      const text = await dashboard.processedCountText.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-202-history-search-special-chars.spec-22', async () => expect(text).toMatch(/\d+\s*loaded[·•]\d+\s*total\s+processed/i));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('action-clear-LIMAS-SUD-202-history-search-special-chars.spec-25', async () => dashboard.licenseSearchInput.clear());
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-202-history-search-special-chars.spec-26', async () => expect(dashboard.licenseSearchInput).toHaveValue(''));

    await recordEvidence('assert-toPass-LIMAS-SUD-202-history-search-special-chars.spec-28', async () => expect(async () => {
      const loaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-202-history-search-special-chars.spec-30', async () => expect(loaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));
  });
});