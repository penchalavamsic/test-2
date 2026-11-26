import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-013: Language menu opening', () => {
  test('should open language menu on globe button click', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await clickAndCapture(dashboard.languageButton, page, testInfo, 'action-1');

    const menu = dashboard.languageMenu;
    await verify(page, testInfo, 'check-1', () => expect(menu).toBeVisible());
    const menuitems = menu.getByRole('menuitem');
    await verify(page, testInfo, 'check-1', () => expect(menuitems.first()).toBeVisible());

    // Close menu
    await pressAndCapture(page, 'Escape', testInfo, 'action-1');
    await verify(page, testInfo, 'assertion', () => expect(menu).not.toBeVisible());
  });
});