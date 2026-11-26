import { test, expect, captureStepScreenshot, verify, clickAndCapture, pressAndCapture } from '../fixtures/batch-01-a';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-011: Language control enabled state', () => {
  test('should show language control button as enabled', async ({ page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await verify(page, testInfo, 'check-1', () => expect(dashboard.languageButton).toBeEnabled());
  });
});