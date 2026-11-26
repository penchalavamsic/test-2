import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-001: Dashboard route', () => {
  test('should land at /system-user-dashboard after login', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.assertRoute();
    await captureStepScreenshot(page, testInfo, 'action-1');
  });
});