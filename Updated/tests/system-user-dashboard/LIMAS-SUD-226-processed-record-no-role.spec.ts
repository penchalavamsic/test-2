import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-226: should not contain "Role" text in the processed history area', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const processedSubtitle = dashboard.processedSectionSubtitle;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-226-processed-record-no-role.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const roleText = page.getByText('Role');
    const count = await roleText.count();

    if (count > 0) {
      const subtitleBox = await processedSubtitle.boundingBox();
      for (let i = 0; i < count; i++) {
        const box = await roleText.nth(i).boundingBox();
        if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
          await recordEvidence('assert-toBe-LIMAS-SUD-226-processed-record-no-role.spec-22', async () => expect(true).toBe(false));
        }
      }
    }
    await recordEvidence('assert-toBe-LIMAS-SUD-226-processed-record-no-role.spec-26', async () => expect(true).toBe(true));
  });
});