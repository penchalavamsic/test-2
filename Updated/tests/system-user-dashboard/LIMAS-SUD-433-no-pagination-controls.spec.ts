import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-433: No Pagination Controls Are Rendered', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-433-no-pagination-controls.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-433-no-pagination-controls.spec-15', async () => expect(page.locator('nav, [aria-label*=page i], [role=navigation], button:has-text("Next"), button:has-text("Previous"), button:has-text("Page")')).toHaveCount(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
