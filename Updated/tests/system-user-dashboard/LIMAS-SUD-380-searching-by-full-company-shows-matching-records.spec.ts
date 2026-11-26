import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-380: Searching By Full Company Shows Matching Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-380-searching-by-full-company-shows-matching-records.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      const sample = await flow.resolveCompanySample(baseline);
      test.skip(sample === null, 'Requires deterministic runtime search data: no loaded record exposes a company');
      const { email, company } = sample as { email: string; company: string };
      const owner = baseline.records.find((r) => r.email === email);
      await flow.searchExpiringLicenses(company);
      await flow.verifyExpiringSearchResults({ value: company, baselineRecords: baseline.records, source: owner, strict: false });
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-380-searching-by-full-company-shows-matching-records.spec-23', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-380-searching-by-full-company-shows-matching-records.spec-24', async () => expect(await dashboard.getExpiringResultTotal()).toBe(baseline.total));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
