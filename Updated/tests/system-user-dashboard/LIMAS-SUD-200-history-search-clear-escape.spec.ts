import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-200: should clear history search and restore list when pressing Escape', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-200-history-search-clear-escape.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    const initialLoaded = await dashboard.getLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-200-history-search-clear-escape.spec-15', async () => expect(initialLoaded).toBeGreaterThan(0));

    const firstPara = page.getByRole('paragraph').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-200-history-search-clear-escape.spec-18', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-200-history-search-clear-escape.spec-22', async () => dashboard.licenseSearchInput.fill(searchSubstring));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-200-history-search-clear-escape.spec-23', async () => expect(dashboard.licenseSearchInput).toHaveValue(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-200-history-search-clear-escape.spec-25', async () => expect(async () => {
      const searchedText = await dashboard.processedCountText.textContent();
      await recordEvidence('assert-toMatch-LIMAS-SUD-200-history-search-clear-escape.spec-27', async () => expect(searchedText).toMatch(/\d+\s*loaded[·•]\d+\s*total\s+processed/i));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('action-focus-LIMAS-SUD-200-history-search-clear-escape.spec-30', async () => dashboard.licenseSearchInput.focus());
    await recordEvidence('action-press-LIMAS-SUD-200-history-search-clear-escape.spec-31', async () => page.keyboard.press('Escape'));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-200-history-search-clear-escape.spec-33', async () => expect(dashboard.licenseSearchInput).toHaveValue(''));

    await recordEvidence('assert-toPass-LIMAS-SUD-200-history-search-clear-escape.spec-35', async () => expect(async () => {
      const restoredLoaded = await dashboard.getLoadedCount();
      await recordEvidence('assert-toBe-LIMAS-SUD-200-history-search-clear-escape.spec-37', async () => expect(restoredLoaded).toBe(initialLoaded));
    }).toPass({ timeout: 10_000 }));
  });
});