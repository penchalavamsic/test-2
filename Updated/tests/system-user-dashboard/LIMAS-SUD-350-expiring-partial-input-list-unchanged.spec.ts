import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-350: Partial Segment Entry Leaves List Unchanged', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-350-expiring-partial-input-list-unchanged.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      const baselineLoaded = await flow.getExpiringLicenseLoadedCount();
      await dashboard.stepExpiresBeforeFirstSegment();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-350-expiring-partial-input-list-unchanged.spec-16', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-350-expiring-partial-input-list-unchanged.spec-17', async () => expect(await flow.getExpiringLicenseLoadedCount()).toBe(baselineLoaded));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
