import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-177: should display "User" column heading in processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-177-user-column-heading.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-177-user-column-heading.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const userHeading = page.getByText('User');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-177-user-column-heading.spec-15', async () => expect(userHeading.first()).toBeVisible());
  });
});