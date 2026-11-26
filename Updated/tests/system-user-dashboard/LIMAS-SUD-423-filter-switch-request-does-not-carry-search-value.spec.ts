import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-423: Filter Switch Request Does Not Carry Search Value', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_USER_EMAIL);
      const { url, status } = await dashboard.captureUsersResponse(() => flow.selectMaintenanceFilter());
      await recordEvidence('assert-toBe-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-19', async () => expect(status).toBe(200));
      await recordEvidence('assert-toBeNull-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-20', async () => expect(url.searchParams.get('page')).not.toBeNull());
      await recordEvidence('assert-toBeNull-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-21', async () => expect(url.searchParams.get('size')).not.toBeNull());
      await recordEvidence('assert-toContain-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-22', async () => expect([...url.searchParams.values()]).not.toContain(data.TEST_USER_EMAIL));
      await recordEvidence('assert-toBe-LIMAS-SUD-423-filter-switch-request-does-not-carry-search-value.spec-23', async () => expect(url.searchParams.get('maintenanceDate') ?? '').not.toBe(''));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
