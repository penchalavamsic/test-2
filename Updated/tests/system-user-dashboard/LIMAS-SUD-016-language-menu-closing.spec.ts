import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-016: Language menu closing', () => {
  test('should close language menu on Escape and preserve route', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await clickAndCapture(dashboard.languageButton, page, testInfo, 'action-1');

    const menu = dashboard.languageMenu;
    await verify(page, testInfo, 'check-1', () => expect(menu).toBeVisible());
    await pressAndCapture(page, 'Escape', testInfo, 'action-1');
    await verify(page, testInfo, 'assertion', () => expect(menu).not.toBeVisible());

    // Verify route unchanged
    await dashboard.assertRoute();
    await captureStepScreenshot(page, testInfo, 'action-5');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.heading).toBeVisible());
  });
});