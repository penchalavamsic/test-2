import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-015: Language current indicator', () => {
  test('should show current language selection indicator in menu', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await clickAndCapture(dashboard.languageButton, page, testInfo, 'action-1');

    const menu = dashboard.languageMenu;
    await verify(page, testInfo, 'check-1', () => expect(menu).toBeVisible());

    // At least one menuitem should have a visual selection class
    const selected = menu.locator('[role="menuitem"].bg-accent, [role="menuitem"][class*="accent"]');
    const count = await selected.count();
    await verify(page, testInfo, 'check-1', () => expect(count).toBeGreaterThan(0));

    // Close menu
    await pressAndCapture(page, 'Escape', testInfo, 'action-1');
    await verify(page, testInfo, 'assertion', () => expect(menu).not.toBeVisible());
  });
});