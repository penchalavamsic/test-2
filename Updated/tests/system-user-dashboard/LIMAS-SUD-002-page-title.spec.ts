import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-002: Browser page title', () => {
  test('should have "LIMAS" as the browser page title', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();
    await captureStepScreenshot(page, testInfo, 'action-1');

    const title = await dashboard.getTitle();
    await verify(page, testInfo, 'check-1', () => expect(title).toBe('LIMAS'));
  });
});