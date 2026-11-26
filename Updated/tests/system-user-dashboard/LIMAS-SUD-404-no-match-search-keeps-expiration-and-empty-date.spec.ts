import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-404: No-Match Search Keeps Expiration And Empty Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-404-no-match-search-keeps-expiration-and-empty-date.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_NO_MATCH_VALUE);
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-404-no-match-search-keeps-expiration-and-empty-date.spec-18', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-404-no-match-search-keeps-expiration-and-empty-date.spec-19', async () => expect(dashboard.maintenanceRadio).not.toBeChecked());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-404-no-match-search-keeps-expiration-and-empty-date.spec-20', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
