import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-336: Total Count Equals Loaded Count After Future Date Selection', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-336-expiring-date-future-total-equals-loaded.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.verifyFilterResultsUpdated();
      const total = await flow.getExpiringLicenseTotalCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-336-expiring-date-future-total-equals-loaded.spec-17', async () => expect(total).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBe-LIMAS-SUD-336-expiring-date-future-total-equals-loaded.spec-18', async () => expect(await flow.getExpiringLicenseLoadedCount()).toBe(total));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
