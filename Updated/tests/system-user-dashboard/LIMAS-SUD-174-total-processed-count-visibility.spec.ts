import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-174: should show total processed count in count text after enabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-174-total-processed-count-visibility.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+processed/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-174-total-processed-count-visibility.spec-12', async () => expect(countText).toBeVisible());

    const text = await countText.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-174-total-processed-count-visibility.spec-15', async () => expect(text).toBeTruthy());

    // Verify the total processed count portion is present
    const hasTotal = /\d+\s*total\s+processed/i.test(text!);
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-174-total-processed-count-visibility.spec-19', async () => expect(hasTotal).toBeTruthy());
  });
});