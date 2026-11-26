import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-367: Search Field Placeholder Lists Searchable Fields', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-367-search-field-placeholder-lists-searchable-fields.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-367-search-field-placeholder-lists-searchable-fields.spec-17', async () => expect(dashboard.expiringSearchInput).toHaveAttribute('placeholder', /name, email, profile, company, or Hardware ID/i));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
