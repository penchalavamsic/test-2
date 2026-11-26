import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-416: Clearing Search Keeps Expiration Selected And Date Empty', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-416-clearing-search-keeps-expiration-selected-and-date-empty.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_NAME);
      await flow.clearExpiringLicenseSearch();
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-416-clearing-search-keeps-expiration-selected-and-date-empty.spec-19', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-416-clearing-search-keeps-expiration-selected-and-date-empty.spec-20', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-416-clearing-search-keeps-expiration-selected-and-date-empty.spec-21', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
