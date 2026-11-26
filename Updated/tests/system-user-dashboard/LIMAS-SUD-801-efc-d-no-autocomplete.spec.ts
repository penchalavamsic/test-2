import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-801: expires until input has no autocomplete attribute', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-801-efc-d-no-autocomplete.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const autocomplete = await expiresUntilInput.getAttribute('autocomplete');
    await recordEvidence('assert-toBeFalsy-LIMAS-SUD-801-efc-d-no-autocomplete.spec-13', async () => expect(autocomplete).toBeFalsy());
  });
});