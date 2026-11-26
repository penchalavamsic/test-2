import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Request History', () => {
  test('LIMAS-SUD-178: should display "Feature" column heading in processed view', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-178-feature-column-heading.spec-9', async () => dashboard.licenseHistorySwitch.click());

    const processedSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-178-feature-column-heading.spec-12', async () => expect(processedSubtitle).toBeVisible());

    const featureHeading = page.getByText('Feature');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-178-feature-column-heading.spec-15', async () => expect(featureHeading.first()).toBeVisible());
  });
});