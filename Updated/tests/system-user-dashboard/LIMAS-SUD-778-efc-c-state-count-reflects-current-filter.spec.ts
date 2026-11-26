import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-778: count text reflects current filter after switch to maintenance', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-778-efc-c-state-count-reflects-current-filter.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-778-efc-c-state-count-reflects-current-filter.spec-21', async () => efcMaintenanceRadio.click());
    await maintResponse;

    const countText = page.getByText(/0\s*loaded\s*[·•]\s*0\s*total\s*configurations/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-778-efc-c-state-count-reflects-current-filter.spec-25', async () => expect(countText).toBeVisible());

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-click-LIMAS-SUD-778-efc-c-state-count-reflects-current-filter.spec-33', async () => efcExpirationRadio.click());
    await expResponse;
  });
});