import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getPartialSearchValue } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-386: Partial Company Keeps The Owning Record', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-386-partial-company-keeps-the-owning-record.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
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
      const fragment = getPartialSearchValue(company);
      await flow.searchExpiringLicenses(fragment);
      await flow.verifyExpiringSearchResults({ value: fragment, baselineRecords: baseline.records, source: owner, strict: false });
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
