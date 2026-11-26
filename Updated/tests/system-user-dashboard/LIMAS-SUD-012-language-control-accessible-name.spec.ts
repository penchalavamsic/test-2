import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-012: Language control accessible name', () => {
  test('should document that language control has no accessible name', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await verify(page, testInfo, 'check-1', () => expect(dashboard.languageButton).toBeVisible());

    const ariaLabel = await dashboard.languageButton.getAttribute('aria-label');
    const title = await dashboard.languageButton.getAttribute('title');
    await verify(page, testInfo, 'check-1', () => expect(ariaLabel).toBeNull());
    await verify(page, testInfo, 'check-1', () => expect(title).toBeNull());
  });
});