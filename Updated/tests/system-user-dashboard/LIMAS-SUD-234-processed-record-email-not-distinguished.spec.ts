import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-234: should render user name and email as plain paragraphs with no semantic distinction', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstUserLabel = dashboard.pendingRequestsHeaderRow.getByText('User', { exact: true });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-12', async () => expect(firstUserLabel).toBeVisible());

    const parentContainer = dashboard.processedRecordCards.first().locator(':scope > div.grid > div.min-w-0').nth(0);

    // Both name and email paragraphs should be plain <p> with no distinguishing attributes
    const namePara = parentContainer.locator('p').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-18', async () => expect(namePara).toBeVisible());

    const emailPara = parentContainer.locator('p').nth(1);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-21', async () => expect(emailPara).toBeVisible());

    // Verify they are both <p> elements
    const nameTag = await namePara.evaluate(el => el.tagName.toLowerCase());
    const emailTag = await emailPara.evaluate(el => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-26', async () => expect(nameTag).toBe('p'));
    await recordEvidence('assert-toBe-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-27', async () => expect(emailTag).toBe('p'));

    // Verify they have the same roles
    const nameRole = await namePara.evaluate(el => el.getAttribute('role'));
    const emailRole = await emailPara.evaluate(el => el.getAttribute('role'));
    await recordEvidence('assert-toBe-LIMAS-SUD-234-processed-record-email-not-distinguished.spec-32', async () => expect(nameRole).toBe(emailRole));
  });
});