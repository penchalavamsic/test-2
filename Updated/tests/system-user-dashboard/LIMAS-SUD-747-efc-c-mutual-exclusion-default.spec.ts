import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-747: mutual exclusion — only one radio checked by default', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-747-efc-c-mutual-exclusion-default.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });

    await recordEvidence('assert-toBeChecked-LIMAS-SUD-747-efc-c-mutual-exclusion-default.spec-14', async () => expect(efcExpirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-747-efc-c-mutual-exclusion-default.spec-15', async () => expect(efcMaintenanceRadio).not.toBeChecked());
  });
});