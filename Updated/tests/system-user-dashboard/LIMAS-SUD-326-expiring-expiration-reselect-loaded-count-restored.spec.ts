import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-326: Reselecting Expiration Restores Initial Loaded Count', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-326-expiring-expiration-reselect-loaded-count-restored.spec-6', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);

    await flow.prepareExpiringSection();

    try {
      const baselineLoaded = await flow.getExpiringLicenseLoadedCount();
      await flow.selectMaintenanceFilter();
      await flow.selectExpirationFilter();
      await recordEvidence('assert-toBe-LIMAS-SUD-326-expiring-expiration-reselect-loaded-count-restored.spec-15', async () => expect.poll(() => flow.getExpiringLicenseLoadedCount()).toBe(baselineLoaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
