import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-722: expiration radio receives keyboard focus', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-722-efc-c-expiration-radio-keyboard-focus.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-722-efc-c-expiration-radio-keyboard-focus.spec-12', async () => efcExpirationRadio.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-722-efc-c-expiration-radio-keyboard-focus.spec-13', async () => expect(efcExpirationRadio).toBeFocused());
  });
});