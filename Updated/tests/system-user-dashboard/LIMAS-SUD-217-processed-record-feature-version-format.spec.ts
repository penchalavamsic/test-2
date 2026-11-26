import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-217: should display a version string starting with "Version" under "Feature" section', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstFeatureLabel = dashboard.pendingRequestsHeaderRow.getByText('Feature', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-217-processed-record-feature-version-format.spec-12', async () => expect(firstFeatureLabel).toBeVisible());

    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(1);
    const versionParagraph = parentContainer.locator('p').nth(1);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-217-processed-record-feature-version-format.spec-16', async () => expect(versionParagraph).toBeVisible());

    const versionText = await versionParagraph.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-217-processed-record-feature-version-format.spec-19', async () => expect(versionText).toBeTruthy());
    await recordEvidence('assert-toMatch-LIMAS-SUD-217-processed-record-feature-version-format.spec-20', async () => expect(versionText).toMatch(/Version\s+.+/));
  });
});