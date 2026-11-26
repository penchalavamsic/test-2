import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-746: both radios share the same name attribute', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-746-efc-c-radios-shared-name.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const efcMaintenanceRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });

    const expName = await efcExpirationRadio.getAttribute('name');
    const maintName = await efcMaintenanceRadio.getAttribute('name');
    await recordEvidence('assert-toBe-LIMAS-SUD-746-efc-c-radios-shared-name.spec-16', async () => expect(expName).toBe(maintName));
  });
});