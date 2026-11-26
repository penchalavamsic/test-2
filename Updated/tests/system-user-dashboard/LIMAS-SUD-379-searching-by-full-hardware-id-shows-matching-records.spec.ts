import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-379: Searching By Full Hardware ID Shows Matching Records', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-379-searching-by-full-hardware-id-shows-matching-records.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await flow.searchExpiringLicenses(data.TEST_HARDWARE_ID);
      await flow.verifyExpiringSearchResults({ value: data.TEST_HARDWARE_ID, baselineRecords: baseline.records, source, strict: true });
      await recordEvidence('assert-toBeChecked-LIMAS-SUD-379-searching-by-full-hardware-id-shows-matching-records.spec-19', async () => expect(dashboard.expirationRadio).toBeChecked());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-379-searching-by-full-hardware-id-shows-matching-records.spec-20', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-379-searching-by-full-hardware-id-shows-matching-records.spec-21', async () => expect(await dashboard.getExpiringResultTotal()).toBe(baseline.total));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
