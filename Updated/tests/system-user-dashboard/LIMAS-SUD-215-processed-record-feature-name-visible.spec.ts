import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-215: should display a non-empty feature name paragraph under "Feature" section', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstFeatureLabel = dashboard.pendingRequestsHeaderRow.getByText('Feature', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-215-processed-record-feature-name-visible.spec-12', async () => expect(firstFeatureLabel).toBeVisible());

    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(1);
    const featureNameParagraph = parentContainer.locator('p').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-215-processed-record-feature-name-visible.spec-16', async () => expect(featureNameParagraph).toBeVisible());
    await recordEvidence('assert-toBeEmpty-LIMAS-SUD-215-processed-record-feature-name-visible.spec-17', async () => expect(featureNameParagraph).not.toBeEmpty());
  });
});