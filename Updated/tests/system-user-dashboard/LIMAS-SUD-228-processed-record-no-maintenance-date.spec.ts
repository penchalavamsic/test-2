import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-228: should not reference "Maintenance Date" in the processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const processedSubtitle = dashboard.processedSectionSubtitle;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-228-processed-record-no-maintenance-date.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const maintText = page.getByText('Maintenance Date');
    const count = await maintText.count();

    if (count > 0) {
      const subtitleBox = await processedSubtitle.boundingBox();
      for (let i = 0; i < count; i++) {
        const box = await maintText.nth(i).boundingBox();
        if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
          await recordEvidence('assert-toBe-LIMAS-SUD-228-processed-record-no-maintenance-date.spec-22', async () => expect(true).toBe(false));
        }
      }
    }
    await recordEvidence('assert-toBe-LIMAS-SUD-228-processed-record-no-maintenance-date.spec-26', async () => expect(true).toBe(true));
  });
});