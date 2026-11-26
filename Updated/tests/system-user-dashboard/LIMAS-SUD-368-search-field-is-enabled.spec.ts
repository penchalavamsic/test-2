import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-368: Search Field Is Enabled', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-368-search-field-is-enabled.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-368-search-field-is-enabled.spec-17', async () => expect(dashboard.expiringSearchInput).toBeEnabled());
      await recordEvidence('assert-toBeEditable-LIMAS-SUD-368-search-field-is-enabled.spec-18', async () => expect(dashboard.expiringSearchInput).toBeEditable());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
