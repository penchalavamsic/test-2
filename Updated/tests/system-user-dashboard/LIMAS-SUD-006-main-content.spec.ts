import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-006: Main content visibility', () => {
  test('should display the main content container', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await captureStepScreenshot(page, testInfo, 'action-1');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.mainContent).toBeVisible());
  });
});