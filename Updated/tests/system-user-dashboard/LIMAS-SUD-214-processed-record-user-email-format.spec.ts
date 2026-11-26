import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-214: should display an email containing "@" under first "User" label', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstUserLabel = dashboard.pendingRequestsHeaderRow.getByText('User', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-214-processed-record-user-email-format.spec-12', async () => expect(firstUserLabel).toBeVisible());

    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(0);
    const emailParagraph = parentContainer.locator('p').nth(1);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-214-processed-record-user-email-format.spec-16', async () => expect(emailParagraph).toBeVisible());

    const emailText = await emailParagraph.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-214-processed-record-user-email-format.spec-19', async () => expect(emailText).toBeTruthy());
    await recordEvidence('assert-toMatch-LIMAS-SUD-214-processed-record-user-email-format.spec-20', async () => expect(emailText).toMatch(/.+@.+/));
  });
});