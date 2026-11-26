import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-224: should not contain "User Group" text in the processed history area', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Scope to the processed area after the subtitle
    const processedSubtitle = dashboard.processedSectionSubtitle;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-224-processed-record-no-user-group.spec-13', async () => expect(processedSubtitle).toBeVisible());

    // Check the full page for "User Group" — it should be absent in processed view
    const userGroupText = page.getByText('User Group');
    // User Group may exist elsewhere on page (e.g. pending form labels), 
    // so we verify it is not present alongside processed records
    const countInProcessedArea = await userGroupText.count();

    // If User Group appears, it must not be after the processed subtitle
    if (countInProcessedArea > 0) {
      const subtitleBox = await processedSubtitle.boundingBox();
      for (let i = 0; i < countInProcessedArea; i++) {
        const box = await userGroupText.nth(i).boundingBox();
        if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
          // Found "User Group" in the processed area — this should not happen
          await recordEvidence('assert-toBe-LIMAS-SUD-224-processed-record-no-user-group.spec-28', async () => expect(true).toBe(false));
        }
      }
    }
    // If no "User Group" found at all, the test passes trivially
    await recordEvidence('assert-toBe-LIMAS-SUD-224-processed-record-no-user-group.spec-33', async () => expect(true).toBe(true));
  });
});