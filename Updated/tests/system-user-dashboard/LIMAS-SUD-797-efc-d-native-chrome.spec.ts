import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-797: showPicker does not create DOM dialog', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-797-efc-d-native-chrome.spec-9', async () => dashboard.floatingConfigsCard.click());

    await page.evaluate(() => {
      const el = document.querySelector('#floating-expires-before') as HTMLInputElement;
      if (el && typeof el.showPicker === 'function') {
        el.showPicker();
      }
    });
    const dialog = page.getByRole('dialog');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-797-efc-d-native-chrome.spec-18', async () => expect(dialog).not.toBeVisible());
  });
});