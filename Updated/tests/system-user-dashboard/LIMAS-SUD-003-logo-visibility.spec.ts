import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-003: LIMAS logo visibility', () => {
  test('should display the LIMAS logo in the dashboard header', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();
    await captureStepScreenshot(page, testInfo, 'action-1');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.logo).toBeVisible());
  });
});