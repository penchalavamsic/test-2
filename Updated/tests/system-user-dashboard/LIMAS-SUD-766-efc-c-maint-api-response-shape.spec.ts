import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-766: maintenance response body has content array, totalElements, and empty fields', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-21', async () => efcMaintenanceRadio.click());
    const response = await maintResponse;

    const body = await response.json();
    await recordEvidence('assert-toBe-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-25', async () => expect(Array.isArray(body.content)).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-26', async () => expect(typeof body.totalElements).toBe('number'));
    await recordEvidence('assert-toBe-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-27', async () => expect(typeof body.empty).toBe('boolean'));

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-766-efc-c-maint-api-response-shape.spec-35', async () => efcExpirationRadio.click());
    await expResponse;
  });
});