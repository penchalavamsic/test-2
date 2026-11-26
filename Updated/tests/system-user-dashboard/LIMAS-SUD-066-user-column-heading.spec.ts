import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-066: should display User column heading in the request table', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Accessibility finding (documented, non-failing): execution trace
    // inspection (SUD-PL-02-B, 2026-11-23) confirmed this heading is a plain
    // <div> with no role="columnheader" (and no role="table"/"row" on its
    // ancestors). The heading is still visible, confirmed exact text "User",
    // so the functional check is asserted against the confirmed element
    // rather than the absent columnheader role.
    const userHeading = dashboard.pendingRequestsUserHeading;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-066-user-column-heading.spec-16', async () => expect(userHeading).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-066-user-column-heading.spec-17', async () => expect(userHeading).toHaveText('User'));
  });
});
