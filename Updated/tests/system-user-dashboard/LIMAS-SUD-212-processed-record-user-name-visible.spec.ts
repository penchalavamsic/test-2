import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-212: should display a non-empty user name paragraph under first "User" label', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Locate the first "User" field label, then find its sibling paragraph (user name)
    const firstUserLabel = dashboard.pendingRequestsHeaderRow.getByText('User', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-212-processed-record-user-name-visible.spec-13', async () => expect(firstUserLabel).toBeVisible());

    // Navigate to the parent container and find the first paragraph child
    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(0);
    const nameParagraph = parentContainer.locator('p').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-212-processed-record-user-name-visible.spec-18', async () => expect(nameParagraph).toBeVisible());
    await recordEvidence('assert-toBeEmpty-LIMAS-SUD-212-processed-record-user-name-visible.spec-19', async () => expect(nameParagraph).not.toBeEmpty());
  });
});