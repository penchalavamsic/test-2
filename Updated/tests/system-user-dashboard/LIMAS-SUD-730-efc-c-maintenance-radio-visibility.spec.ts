import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-730: maintenance radio is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-730-efc-c-maintenance-radio-visibility.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-730-efc-c-maintenance-radio-visibility.spec-12', async () => expect(efcMaintenanceRadio).toBeVisible());
  });
});