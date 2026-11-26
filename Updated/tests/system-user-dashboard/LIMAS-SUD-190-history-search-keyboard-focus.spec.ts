import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-190: should focus the search field via Tab in history mode', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-190-history-search-keyboard-focus.spec-12', async () => expect(dashboard.licenseSearchInput).toBeVisible());

    await recordEvidence('action-focus-LIMAS-SUD-190-history-search-keyboard-focus.spec-14', async () => dashboard.floatingLicensesCard.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-190-history-search-keyboard-focus.spec-15', async () => expect(dashboard.floatingLicensesCard).toBeFocused());

    await recordEvidence('action-press-LIMAS-SUD-190-history-search-keyboard-focus.spec-17', async () => page.keyboard.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-190-history-search-keyboard-focus.spec-18', async () => expect(dashboard.licenseSearchInput).toBeFocused());
  });
});