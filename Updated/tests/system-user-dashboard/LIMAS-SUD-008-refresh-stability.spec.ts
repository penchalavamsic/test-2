import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture, reloadAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-008: Dashboard stability after refresh', () => {
  test('should retain dashboard page shell after page refresh', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await captureStepScreenshot(page, testInfo, 'action-1');

    await reloadAndCapture(page, testInfo, 'action-2');
    await dashboard.waitForFullRender();
    await captureStepScreenshot(page, testInfo, 'action-3');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.heading).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(dashboard.subtitle).toBeVisible());
  });
});