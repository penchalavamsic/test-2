import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-021: Light to dark theme switch', () => {
  test('should toggle from light to dark and restore original theme', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();

    // Confirm light theme
    await recordEvidence('assert-toHaveClass-LIMAS-SUD-021-light-to-dark-theme.spec-10', async () => expect(page.locator('html')).not.toHaveClass(/dark/));

    // Switch to dark
    await recordEvidence('action-click-LIMAS-SUD-021-light-to-dark-theme.spec-13', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toHaveClass-LIMAS-SUD-021-light-to-dark-theme.spec-14', async () => expect(page.locator('html')).toHaveClass(/dark/));

    // Header elements remain readable in dark theme
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-021-light-to-dark-theme.spec-17', async () => expect(dashboard.logo).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-021-light-to-dark-theme.spec-18', async () => expect(dashboard.heading).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-021-light-to-dark-theme.spec-19', async () => expect(dashboard.languageButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-021-light-to-dark-theme.spec-20', async () => expect(dashboard.userButton).toBeVisible());

    // Restore light theme
    await recordEvidence('action-click-LIMAS-SUD-021-light-to-dark-theme.spec-23', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toHaveClass-LIMAS-SUD-021-light-to-dark-theme.spec-24', async () => expect(page.locator('html')).not.toHaveClass(/dark/));
  });
});