import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-213: should display a non-empty user email paragraph under first "User" label', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstUserLabel = dashboard.pendingRequestsHeaderRow.getByText('User', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-213-processed-record-user-email-visible.spec-12', async () => expect(firstUserLabel).toBeVisible());

    // The second <p> under the User section is the email
    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(0);
    const emailParagraph = parentContainer.locator('p').nth(1);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-213-processed-record-user-email-visible.spec-17', async () => expect(emailParagraph).toBeVisible());
    await recordEvidence('assert-toBeEmpty-LIMAS-SUD-213-processed-record-user-email-visible.spec-18', async () => expect(emailParagraph).not.toBeEmpty());
  });
});