import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-732: maintenance radio is not checked by default', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-732-efc-c-maintenance-radio-default-unchecked.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-732-efc-c-maintenance-radio-default-unchecked.spec-12', async () => expect(efcMaintenanceRadio).not.toBeChecked());
  });
});