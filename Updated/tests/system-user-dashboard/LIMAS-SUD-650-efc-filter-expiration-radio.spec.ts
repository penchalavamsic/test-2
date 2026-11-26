import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-650: expiration radio is checked by default', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-650-efc-filter-expiration-radio.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-650-efc-filter-expiration-radio.spec-12', async () => expect(expRadio).toBeChecked());
  });
});
