import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-020: Initial theme is light', () => {
  test('should start with light theme (no dark class, moon icon)', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();
    await captureStepScreenshot(page, testInfo, 'action-1');

    // HTML should not have dark class
    const htmlClass = (await page.locator('html').getAttribute('class')) ?? '';
    await verify(page, testInfo, 'check-1', () => expect(htmlClass).not.toContain('dark'));

    // Moon icon should be present on theme button
    const moonIcon = dashboard.themeButton.locator('.lucide-moon');
    await verify(page, testInfo, 'check-1', () => expect(moonIcon).toBeAttached());
  });
});