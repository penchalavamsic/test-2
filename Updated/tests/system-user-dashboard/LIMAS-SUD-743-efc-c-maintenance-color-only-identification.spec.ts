import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-743: maintenance radio is not identified by color alone', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-743-efc-c-maintenance-color-only-identification.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-743-efc-c-maintenance-color-only-identification.spec-12', async () => expect(efcMaintenanceRadio).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-743-efc-c-maintenance-color-only-identification.spec-13', async () => expect(efcMaintenanceRadio).toHaveAccessibleName('Maintenance'));

    // Verify the radio has a visible text label adjacent to it (not purely color-based)
    const labelText = page.getByRole('group', { name: 'Filter by' }).getByText('Maintenance');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-743-efc-c-maintenance-color-only-identification.spec-17', async () => expect(labelText).toBeVisible());
  });
});