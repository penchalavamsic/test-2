import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-427: Search Field Is Named Only By Its Placeholder', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-427-search-field-is-named-only-by-its-placeholder.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await recordEvidence('assert-toBe-LIMAS-SUD-427-search-field-is-named-only-by-its-placeholder.spec-17', async () => expect(await dashboard.isExpiringSearchNamedOnlyByPlaceholder()).toBe(true));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
