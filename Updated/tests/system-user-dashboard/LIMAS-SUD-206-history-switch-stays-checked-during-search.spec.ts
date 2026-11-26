import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History Search', () => {
  test('LIMAS-SUD-206: should keep history switch checked during search operations', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-12', async () => expect(dashboard.licenseHistorySwitch).toBeChecked());

    const firstPara = page.getByRole('paragraph').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-15', async () => expect(firstPara).toBeVisible());
    const text = await firstPara.textContent();
    const searchSubstring = text!.trim().substring(0, Math.min(4, text!.trim().length));

    await recordEvidence('action-fill-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-19', async () => dashboard.licenseSearchInput.fill(searchSubstring));

    // History switch must remain checked during search
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-22', async () => expect(dashboard.licenseHistorySwitch).toBeChecked());

    await recordEvidence('action-clear-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-24', async () => dashboard.licenseSearchInput.clear());

    // History switch must remain checked after clearing
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-206-history-switch-stays-checked-during-search.spec-27', async () => expect(dashboard.licenseHistorySwitch).toBeChecked());
  });
});