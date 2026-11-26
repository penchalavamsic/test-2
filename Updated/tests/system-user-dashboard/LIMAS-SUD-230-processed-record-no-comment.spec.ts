import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-230: should not reference "reason" or "comment" text in the processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const processedSubtitle = dashboard.processedSectionSubtitle;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-230-processed-record-no-comment.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const bodyText = await page.locator('body').textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-230-processed-record-no-comment.spec-15', async () => expect(bodyText).toBeTruthy());

    const commentPatterns = [/reason/i, /comment/i];

    for (const pattern of commentPatterns) {
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
        await recordEvidence('assert-toBe-LIMAS-SUD-230-processed-record-no-comment.spec-33', async () => expect(foundInProcessed).toBe(false));
      }
    }
  });
});