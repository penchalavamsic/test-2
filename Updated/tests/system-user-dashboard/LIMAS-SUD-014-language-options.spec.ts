import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-014: Language options', () => {
  test('should show English, Deutsch, and Français in language menu', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await clickAndCapture(dashboard.languageButton, page, testInfo, 'action-1');

    const menu = dashboard.languageMenu;
    await verify(page, testInfo, 'check-1', () => expect(menu).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(page.getByRole('menuitem', { name: 'English' })).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(page.getByRole('menuitem', { name: 'Deutsch' })).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(page.getByRole('menuitem', { name: 'Français' })).toBeVisible());

    // Close menu
    await pressAndCapture(page, 'Escape', testInfo, 'action-1');
    await verify(page, testInfo, 'assertion', () => expect(menu).not.toBeVisible());
  });
});