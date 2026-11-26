import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-335: Selecting Future Date Keeps Loaded Count And Records Consistent', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-335-expiring-date-future-list-consistent.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.verifyFilterResultsUpdated();
      const loaded = await flow.getExpiringLicenseLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-335-expiring-date-future-list-consistent.spec-19', async () => expect(loaded).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-335-expiring-date-future-list-consistent.spec-20', async () => expect(dashboard.extendButtons).toHaveCount(loaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
