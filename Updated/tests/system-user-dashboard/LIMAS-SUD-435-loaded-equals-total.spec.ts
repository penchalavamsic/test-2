import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-435: Loaded Count Equals Total Count', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-435-loaded-equals-total.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await recordEvidence('assert-toBe-LIMAS-SUD-435-loaded-equals-total.spec-15', async () => expect(await dashboard.getExpiringLoadedTotalMatch()).toBe(true));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
