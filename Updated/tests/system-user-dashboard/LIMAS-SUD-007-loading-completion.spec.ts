import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-007: Dashboard loading completion', () => {
  test('should complete loading and render full dashboard content', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await captureStepScreenshot(page, testInfo, 'action-1');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.heading).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(dashboard.subtitle).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(dashboard.pendingRequestsTab).toBeVisible());
  });
});