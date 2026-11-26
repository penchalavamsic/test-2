import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-068: should display Hardware / Created column heading in the request table', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Accessibility finding (documented, non-failing): execution trace
    // inspection (SUD-PL-02-B, 2026-11-23) confirmed this heading is a plain
    // <div> with no role="columnheader". Heading visible, confirmed exact
    // text "Hardware / Created", so the functional check targets the
    // confirmed element.
    const hwHeading = dashboard.pendingRequestsHardwareCreatedHeading;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-068-hardware-created-column-heading.spec-15', async () => expect(hwHeading).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-068-hardware-created-column-heading.spec-16', async () => expect(hwHeading).toHaveText('Hardware / Created'));
  });
});
