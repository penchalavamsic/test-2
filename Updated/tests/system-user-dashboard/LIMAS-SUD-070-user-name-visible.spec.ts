import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-070: should display at least one user name in a row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Accessibility finding (documented, non-failing): execution trace
    // inspection (SUD-PL-02-B, 2026-11-23) confirmed there is no
    // role="columnheader"/"row"/"td" in this section — it is a div-based CSS
    // grid. The functional intent (a visible, non-empty user name in the
    // first loaded request row) is unaffected, so this test targets the
    // confirmed heading/row/field elements instead of the absent roles.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-070-user-name-visible.spec-15', async () => expect(dashboard.pendingRequestsUserHeading).toBeVisible());

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-070-user-name-visible.spec-18', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-070-user-name-visible.spec-21', async () => expect(firstRow).toBeVisible());

    const nameParagraph = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-070-user-name-visible.spec-24', async () => expect(nameParagraph).toBeVisible());
    const nameText = (await nameParagraph.textContent()) ?? '';
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-070-user-name-visible.spec-26', async () => expect(nameText.trim().length).toBeGreaterThan(0));

    // Email is a distinct field from the user name and is verified separately.
    const emailParagraph = dashboard.getPendingRequestUserEmail(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-070-user-name-visible.spec-30', async () => expect(emailParagraph).toBeVisible());
  });
});
