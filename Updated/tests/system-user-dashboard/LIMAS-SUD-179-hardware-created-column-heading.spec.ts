import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-179: should display "Hardware / Created" column heading in processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-179-hardware-created-column-heading.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-179-hardware-created-column-heading.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const hwHeading = page.getByText('Hardware / Created');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-179-hardware-created-column-heading.spec-15', async () => expect(hwHeading.first()).toBeVisible());
  });
});