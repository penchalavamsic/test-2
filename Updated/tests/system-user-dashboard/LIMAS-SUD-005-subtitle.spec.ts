import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-005: Dashboard subtitle', () => {
  test('should display the dashboard subtitle with correct text', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();
    await captureStepScreenshot(page, testInfo, 'action-1');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.subtitle).toBeVisible());
    await verify(page, testInfo, 'check-1', () => expect(dashboard.subtitle).toHaveText(
      'Monitor pending requests, expiring licenses, and floating seat usage.',
    ));
  });
});