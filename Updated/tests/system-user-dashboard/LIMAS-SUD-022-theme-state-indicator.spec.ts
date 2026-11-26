import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-022: Theme state indicator', () => {
  test('should show moon icon in light and sun icon in dark theme', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();

    // Light theme: moon icon visible
    const moonIcon = dashboard.themeButton.locator('.lucide-moon');
    const sunIcon = dashboard.themeButton.locator('.lucide-sun');
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-022-theme-state-indicator.spec-12', async () => expect(moonIcon).toBeAttached());

    // Switch to dark: sun icon visible, moon gone
    await recordEvidence('action-click-LIMAS-SUD-022-theme-state-indicator.spec-15', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-022-theme-state-indicator.spec-16', async () => expect(sunIcon).toBeAttached());
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-022-theme-state-indicator.spec-17', async () => expect(moonIcon).not.toBeAttached());

    // Restore light theme
    await recordEvidence('action-click-LIMAS-SUD-022-theme-state-indicator.spec-20', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-022-theme-state-indicator.spec-21', async () => expect(moonIcon).toBeAttached());
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-022-theme-state-indicator.spec-22', async () => expect(sunIcon).not.toBeAttached());
  });
});