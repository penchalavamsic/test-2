import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-740: Space on already-checked maintenance radio sends no request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Select Maintenance first
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-22', async () => efcMaintenanceRadio.click());
    await maintResponse;

    // Now count requests and press Space on already-checked Maintenance
    let requestCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET')
        requestCount++;
    });

    await recordEvidence('action-focus-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-32', async () => efcMaintenanceRadio.focus());
    await recordEvidence('action-press-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-33', async () => page.keyboard.press('Space'));

    // Verify no request was triggered by racing against a response promise
    const noRequestCheck = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 2000 }
    ).then(() => false).catch(() => true);
    const noFlconfigRequest = await noRequestCheck;
    await recordEvidence('assert-toBe-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-41', async () => expect(noFlconfigRequest).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-42', async () => expect(requestCount).toBe(0));
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-43', async () => expect(efcMaintenanceRadio).toBeChecked());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-740-efc-c-maintenance-space-on-checked-no-request.spec-51', async () => efcExpirationRadio.click());
    await expResponse;
  });
});