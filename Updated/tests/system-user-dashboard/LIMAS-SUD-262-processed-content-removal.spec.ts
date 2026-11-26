import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — License Request History Disable & Pending Restoration', () => {
  test('LIMAS-SUD-262: should remove processed section content after disabling history', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    await dashboard.disableHistory();
    await dashboard.waitForPendingView();

    // Processed subsection content must be gone
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-262-processed-content-removal.spec-16', async () => expect(dashboard.processedSectionSubtitle).not.toBeVisible());

    // Processed count text must not be visible
    const totalProcessed = page.getByText(/total\s+processed/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-262-processed-content-removal.spec-20', async () => expect(totalProcessed).not.toBeVisible());
  });
});