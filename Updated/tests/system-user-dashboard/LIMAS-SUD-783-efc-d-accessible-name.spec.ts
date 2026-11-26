import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-783: expires until input has accessible name Expires until', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-783-efc-d-accessible-name.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-783-efc-d-accessible-name.spec-12', async () => expect(expiresUntilInput).toHaveAccessibleName('Expires until'));
  });
});