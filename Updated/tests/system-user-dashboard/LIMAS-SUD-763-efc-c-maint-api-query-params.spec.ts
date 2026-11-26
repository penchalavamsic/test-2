import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-763: maintenance request query params include page=0 and size=5', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-763-efc-c-maint-api-query-params.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-763-efc-c-maint-api-query-params.spec-21', async () => efcMaintenanceRadio.click());
    const response = await maintResponse;

    const params = new URL(response.url()).searchParams;
    await recordEvidence('assert-toBe-LIMAS-SUD-763-efc-c-maint-api-query-params.spec-25', async () => expect(params.get('page')).toBe('0'));
    await recordEvidence('assert-toBe-LIMAS-SUD-763-efc-c-maint-api-query-params.spec-26', async () => expect(params.get('size')).toBe('5'));

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-763-efc-c-maint-api-query-params.spec-34', async () => efcExpirationRadio.click());
    await expResponse;
  });
});