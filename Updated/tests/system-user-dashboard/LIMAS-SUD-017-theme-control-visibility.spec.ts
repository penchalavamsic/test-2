import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-017: Theme control visibility', () => {
  test('should show theme control button in header', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await verify(page, testInfo, 'check-1', () => expect(dashboard.themeButton).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(dashboard.themeButton).toBeEnabled());
  });
});