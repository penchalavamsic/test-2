import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-721: expiration radio has accessible name Expiration', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-721-efc-c-expiration-radio-label-association.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-721-efc-c-expiration-radio-label-association.spec-12', async () => expect(efcExpirationRadio).toHaveAccessibleName('Expiration'));
  });
});