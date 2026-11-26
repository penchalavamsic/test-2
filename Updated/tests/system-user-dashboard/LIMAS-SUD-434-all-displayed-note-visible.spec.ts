import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-434: All Expiring Licenses Displayed Note Is Visible', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-434-all-displayed-note-visible.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.verifyAllExpiringLicensesDisplayedNote();
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
