import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-175: should have total processed count as numeric value >= 0', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-175-total-processed-count-numeric.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+processed/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-175-total-processed-count-numeric.spec-12', async () => expect(countText).toBeVisible());

    const text = await countText.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-175-total-processed-count-numeric.spec-15', async () => expect(text).toBeTruthy());

    const match = text!.match(/(\d+)\s*total\s+processed/i);
    await recordEvidence('assert-toBeNull-LIMAS-SUD-175-total-processed-count-numeric.spec-18', async () => expect(match).not.toBeNull());

    const total = parseInt(match![1], 10);
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-175-total-processed-count-numeric.spec-21', async () => expect(total).toBeGreaterThanOrEqual(0));
  });
});