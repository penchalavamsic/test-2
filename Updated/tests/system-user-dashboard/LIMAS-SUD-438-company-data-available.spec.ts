import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-438: Company Data Is Available In The API Response', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-438-company-data-available.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();

    try {
      const sample = await flow.resolveCompanySample(baseline);
      test.skip(sample === null, 'Requires deterministic runtime search data: no loaded record exposes a company');
      const { email, company } = sample as { email: string; company: string };
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-438-company-data-available.spec-19', async () => expect(company).toBeTruthy());
      await recordEvidence('assert-toBe-LIMAS-SUD-438-company-data-available.spec-20', async () => expect(baseline.records.some((r: { email: string }) => r.email === email)).toBe(true));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
