import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-439: Record List Is Not In A Live Region', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-439-a11y-results-not-in-live-region.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.selectExpirationFilter();
      await dashboard.verifyFilterResultsUpdated();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-439-a11y-results-not-in-live-region.spec-19', async () => expect(dashboard.extendButtons.first()).toBeVisible());
      await recordEvidence('assert-toBe-LIMAS-SUD-439-a11y-results-not-in-live-region.spec-20', async () => expect(await dashboard.isInsideLiveRegion(dashboard.extendButtons.first())).toBe(false));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
