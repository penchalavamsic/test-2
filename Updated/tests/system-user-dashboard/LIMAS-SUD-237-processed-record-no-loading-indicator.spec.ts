import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-237: should not show a loading spinner or progress indicator during history display', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // After history is loaded, check for absence of common loading indicators
    const spinner = page.locator('[role="progressbar"], [role="status"]');
    const spinnerCount = await spinner.count();

    // Also check for MUI circular progress indicators
    const muiSpinner = page.locator('.MuiCircularProgress-root, .MuiLinearProgress-root');
    const muiCount = await muiSpinner.count();

    // There might be spinners elsewhere; verify none are visible in the processed area
    const subtitleBox = await dashboard.processedSectionSubtitle.boundingBox();
    if (subtitleBox) {
      for (let i = 0; i < spinnerCount; i++) {
        const box = await spinner.nth(i).boundingBox();
        if (box && box.y > subtitleBox.y + subtitleBox.height) {
          await recordEvidence('assert-toBeVisible-LIMAS-SUD-237-processed-record-no-loading-indicator.spec-25', async () => expect(spinner.nth(i)).not.toBeVisible());
        }
      }
      for (let i = 0; i < muiCount; i++) {
        const box = await muiSpinner.nth(i).boundingBox();
        if (box && box.y > subtitleBox.y + subtitleBox.height) {
          await recordEvidence('assert-toBeVisible-LIMAS-SUD-237-processed-record-no-loading-indicator.spec-31', async () => expect(muiSpinner.nth(i)).not.toBeVisible());
        }
      }
    }
  });
});