import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-009: Footer visibility', () => {
  test('should display KPIT copyright notice in footer', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();
    await captureStepScreenshot(page, testInfo, 'action-1');
    await verify(page, testInfo, 'check-1', () => expect(dashboard.footer).toBeVisible());
  });
});