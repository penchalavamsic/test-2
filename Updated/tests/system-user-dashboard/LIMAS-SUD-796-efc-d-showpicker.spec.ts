import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-796: expires until input supports showPicker method', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-796-efc-d-showpicker.spec-9', async () => dashboard.floatingConfigsCard.click());

    const hasShowPicker = await page.evaluate(() => {
      const el = document.querySelector('#floating-expires-before') as HTMLInputElement;
      return el && typeof el.showPicker === 'function';
    });
    await recordEvidence('assert-toBe-LIMAS-SUD-796-efc-d-showpicker.spec-15', async () => expect(hasShowPicker).toBe(true));
  });
});