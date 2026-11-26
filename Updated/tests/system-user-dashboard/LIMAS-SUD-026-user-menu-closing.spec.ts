import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-026: User menu closing and session stability', () => {
  test('should close user menu on Escape and preserve authenticated session', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('action-click-LIMAS-SUD-026-user-menu-closing.spec-7', async () => dashboard.userButton.click());

    // Confirm menu open
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-026-user-menu-closing.spec-10', async () => expect(dashboard.userMenu).toBeVisible());

    // Close menu with Escape
    await recordEvidence('action-press-LIMAS-SUD-026-user-menu-closing.spec-13', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-026-user-menu-closing.spec-14', async () => expect(dashboard.userMenu).not.toBeVisible());

    // Verify session stability
    await dashboard.assertRoute();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-026-user-menu-closing.spec-18', async () => expect(dashboard.heading).toBeVisible());
  });
});