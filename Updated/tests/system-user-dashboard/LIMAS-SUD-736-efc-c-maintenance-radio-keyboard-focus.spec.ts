import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-736: maintenance radio receives keyboard focus', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-736-efc-c-maintenance-radio-keyboard-focus.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('action-focus-LIMAS-SUD-736-efc-c-maintenance-radio-keyboard-focus.spec-12', async () => efcMaintenanceRadio.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-736-efc-c-maintenance-radio-keyboard-focus.spec-13', async () => expect(efcMaintenanceRadio).toBeFocused());
  });
});