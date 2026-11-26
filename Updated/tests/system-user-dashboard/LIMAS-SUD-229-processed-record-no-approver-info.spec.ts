import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-229: should not reference approver identity ("processed by"/"approved by"/"deleted by") in the processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const processedSubtitle = dashboard.processedSectionSubtitle;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-229-processed-record-no-approver-info.spec-12', async () => expect(processedSubtitle).toBeVisible());

    // Check the page body text for any approver/deleter identity strings
    const bodyText = await page.locator('body').textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-229-processed-record-no-approver-info.spec-16', async () => expect(bodyText).toBeTruthy());

    const approverPatterns = [
      /processed by/i,
      /approved by/i,
      /deleted by/i,
    ];

    // These patterns may appear in the pending section but should not appear
    // below the processed subtitle. We do a reasonable check: if present at all,
    // verify they are not near processed records.
    for (const pattern of approverPatterns) {
      const match = bodyText!.match(pattern);
      if (match) {
        const matchedElements = page.getByText(pattern);
        const count = await matchedElements.count();
        const subtitleBox = await processedSubtitle.boundingBox();
        let foundInProcessed = false;
        for (let i = 0; i < count; i++) {
          const box = await matchedElements.nth(i).boundingBox();
          if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
            foundInProcessed = true;
            break;
          }
        }
        await recordEvidence('assert-toBe-LIMAS-SUD-229-processed-record-no-approver-info.spec-41', async () => expect(foundInProcessed).toBe(false));
      }
    }
  });
});