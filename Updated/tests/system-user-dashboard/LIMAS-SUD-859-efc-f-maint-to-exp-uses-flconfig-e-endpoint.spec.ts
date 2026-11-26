import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-859: switching Maintenance to Expiration uses /flconfig/e/ endpoint', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const maintenanceRadio = page.getByRole('radio', { name: 'Maintenance' });
    let resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/m/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-24', async () => maintenanceRadio.click());
    await resp;

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-32', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    let lastFlconfigUrl = '';
    page.on('response', (response) => {
      if (response.url().includes('/api/flconfig/') && response.request().method() === 'GET') {
        lastFlconfigUrl = response.url();
      }
    });

    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/e/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-46', async () => page.getByRole('radio', { name: 'Expiration' }).click());
    await resp;

    await recordEvidence('assert-toContain-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-49', async () => expect(lastFlconfigUrl).toContain('/api/flconfig/e/'));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec-52', async () => dateInput.fill(''));
  });
});