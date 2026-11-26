import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-069: should display Actions column heading in the request table', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Accessibility finding (documented, non-failing): execution trace
    // inspection (SUD-PL-02-B, 2026-11-23) confirmed this heading is a plain
    // <div> with no role="columnheader". Heading visible, confirmed exact
    // text "Actions", so the functional check targets the confirmed element.
    const actionsHeading = dashboard.pendingRequestsActionsHeading;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-069-actions-column-heading.spec-14', async () => expect(actionsHeading).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-069-actions-column-heading.spec-15', async () => expect(actionsHeading).toHaveText('Actions'));
  });
});
