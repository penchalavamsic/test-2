import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-219: should display a visible created date paragraph under "Hardware / Created" section', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstHwLabel = dashboard.pendingRequestsHeaderRow.getByText('Hardware / Created', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-219-processed-record-created-date-visible.spec-12', async () => expect(firstHwLabel).toBeVisible());

    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(2);
    const dateParagraph = parentContainer.locator('p').nth(1);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-219-processed-record-created-date-visible.spec-16', async () => expect(dateParagraph).toBeVisible());
    await recordEvidence('assert-toBeEmpty-LIMAS-SUD-219-processed-record-created-date-visible.spec-17', async () => expect(dateParagraph).not.toBeEmpty());
  });
});