import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-741: click on already-checked maintenance radio sends no request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Select Maintenance first
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-22', async () => efcMaintenanceRadio.click());
    await maintResponse;

    let requestCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET')
        requestCount++;
    });

    await recordEvidence('action-click-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-31', async () => efcMaintenanceRadio.click());

    // Verify no request was triggered by racing against a response promise
    const noRequestCheck = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 2000 }
    ).then(() => false).catch(() => true);
    const noFlconfigRequest = await noRequestCheck;
    await recordEvidence('assert-toBe-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-39', async () => expect(noFlconfigRequest).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-40', async () => expect(requestCount).toBe(0));
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-41', async () => expect(efcMaintenanceRadio).toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-741-efc-c-maintenance-click-on-checked-no-request.spec-49', async () => efcExpirationRadio.click());
    await expResponse;
  });
});