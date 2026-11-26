import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { getExpiresBeforeRuntimeDates } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-343: Clearing Date Restores Initial Loaded Count', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-343-expiring-date-clear-loaded-count-restored.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dates = getExpiresBeforeRuntimeDates();

    await flow.prepareExpiringSection();

    try {
      const baselineLoaded = await flow.getExpiringLicenseLoadedCount();
      const baselineTotal = await flow.getExpiringLicenseTotalCount();
      await flow.setExpiresBeforeDate(dates.TEST_FUTURE_DATE);
      await flow.verifyFilterResultsUpdated();
      await flow.clearExpiresBeforeDate();
      await recordEvidence('assert-toBe-LIMAS-SUD-343-expiring-date-clear-loaded-count-restored.spec-19', async () => expect.poll(() => flow.getExpiringLicenseLoadedCount()).toBe(baselineLoaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
