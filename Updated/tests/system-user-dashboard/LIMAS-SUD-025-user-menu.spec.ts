import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-025: User menu opening', () => {
  test('should open user menu with Logout option visible and enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('action-click-LIMAS-SUD-025-user-menu.spec-7', async () => dashboard.userButton.click());

    // User menu should appear with Logout menuitem
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-025-user-menu.spec-10', async () => expect(dashboard.userMenu).toBeVisible());
    const logout = dashboard.logoutOption;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-025-user-menu.spec-12', async () => expect(logout).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-025-user-menu.spec-13', async () => expect(logout).toBeEnabled());

    // Close menu — do NOT click Logout
    await recordEvidence('action-press-LIMAS-SUD-025-user-menu.spec-16', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-025-user-menu.spec-17', async () => expect(dashboard.userMenu).not.toBeVisible());
  });
});