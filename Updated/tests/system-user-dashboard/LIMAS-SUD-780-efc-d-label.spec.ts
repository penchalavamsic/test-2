import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-780: expires until label is visible and associated', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-780-efc-d-label.spec-9', async () => dashboard.floatingConfigsCard.click());

    const label = page.getByText('Expires until');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-780-efc-d-label.spec-12', async () => expect(label).toBeVisible());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-780-efc-d-label.spec-15', async () => expect(expiresUntilInput).toHaveAccessibleName('Expires until'));
  });
});