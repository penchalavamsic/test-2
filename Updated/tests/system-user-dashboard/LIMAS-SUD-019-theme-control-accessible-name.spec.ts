import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-019: Theme control accessible name', () => {
  test('should document that theme control has no accessible name', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await verify(page, testInfo, 'check-1', () => expect(dashboard.themeButton).toBeVisible());

    const ariaLabel = await dashboard.themeButton.getAttribute('aria-label');
    const title = await dashboard.themeButton.getAttribute('title');
    await verify(page, testInfo, 'check-1', () => expect(ariaLabel).toBeNull());
    await verify(page, testInfo, 'check-1', () => expect(title).toBeNull());
  });
});