import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-844: setting date under Expiration triggers exactly one flconfig/e GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-fill-LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec-25', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));

    await recordEvidence('assert-toBe-LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec-27', async () => expect(reqCount).toBe(1));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec-30', async () => dateInput.fill(''));
  });
});