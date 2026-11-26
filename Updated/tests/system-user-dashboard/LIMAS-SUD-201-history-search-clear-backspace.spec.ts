import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-201: should restore full history list when deleting all characters with backspace', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-201-history-search-clear-backspace.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-201-history-search-clear-backspace.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const firstPara = page.getByRole('paragraph').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-201-history-search-clear-backspace.spec-18', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-201-history-search-clear-backspace.spec-22', async () => dashboard.licenseSearchInput.fill(searchSubstring));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-201-history-search-clear-backspace.spec-23', async () => expect(dashboard.licenseSearchInput).toHaveValue(searchSubstring));

    await recordEvidence('action-focus-LIMAS-SUD-201-history-search-clear-backspace.spec-25', async () => dashboard.licenseSearchInput.focus());
    for (let i = 0; i < searchSubstring.length; i++) {
      await recordEvidence('action-press-LIMAS-SUD-201-history-search-clear-backspace.spec-27', async () => page.keyboard.press('Backspace'));
    }

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-201-history-search-clear-backspace.spec-30', async () => expect(dashboard.licenseSearchInput).toHaveValue(''));

    await recordEvidence('assert-toPass-LIMAS-SUD-201-history-search-clear-backspace.spec-32', async () => expect(async () => {
      const restoredLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-201-history-search-clear-backspace.spec-34', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));
  });
});