import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-651: maintenance radio is unchecked by default', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-651-efc-filter-maintenance-radio.spec-9', async () => dashboard.floatingConfigsCard.click());

    const maintRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-651-efc-filter-maintenance-radio.spec-12', async () => expect(maintRadio).not.toBeChecked());
  });
});
