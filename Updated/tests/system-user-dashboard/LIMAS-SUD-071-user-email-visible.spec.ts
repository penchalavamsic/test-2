import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-071: should display at least one email with @ in a row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-071-user-email-visible.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-071-user-email-visible.spec-13', async () => expect(firstRow).toBeVisible());

    const emailParagraph = dashboard.getPendingRequestUserEmail(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-071-user-email-visible.spec-16', async () => expect(emailParagraph).toBeVisible());
    const emailText = (await emailParagraph.textContent()) ?? '';
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-071-user-email-visible.spec-18', async () => expect(emailText.trim().length).toBeGreaterThan(0));
    await recordEvidence('assert-toContain-LIMAS-SUD-071-user-email-visible.spec-19', async () => expect(emailText).toContain('@'));
  });
});
