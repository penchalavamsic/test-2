import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-769: empty state preserved during filter transition', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-769-efc-c-transition-empty-state-preserved.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const emptyState = page.getByText('No expiring floating configurations found');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-769-efc-c-transition-empty-state-preserved.spec-17', async () => expect(emptyState).toBeVisible());

    // Switch to Maintenance but do NOT wait for response — verify empty state still visible
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-769-efc-c-transition-empty-state-preserved.spec-25', async () => efcMaintenanceRadio.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-769-efc-c-transition-empty-state-preserved.spec-27', async () => expect(emptyState).toBeVisible());
    await maintResponsePromise;

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-769-efc-c-transition-empty-state-preserved.spec-36', async () => efcExpirationRadio.click());
    await expResponse;
  });
});