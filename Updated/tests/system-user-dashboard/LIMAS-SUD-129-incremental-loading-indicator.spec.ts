import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-129: Incremental loading indicator', () => {
  test('should display "More requests will load automatically." text', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-129-incremental-loading-indicator.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-129-incremental-loading-indicator.spec-10', async () => dashboard.pendingRequestsTab.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-129-incremental-loading-indicator.spec-12', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const loadingHint = page.getByText('More requests will load automatically.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-129-incremental-loading-indicator.spec-15', async () => expect(loadingHint).toBeVisible());
  });
});