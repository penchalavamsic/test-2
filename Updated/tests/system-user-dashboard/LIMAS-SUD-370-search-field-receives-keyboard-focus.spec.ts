import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Search and Filtering', () => {
  test('LIMAS-SUD-370: Search Field Receives Keyboard Focus', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-370-search-field-receives-keyboard-focus.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const data = baseline.data;
    const source = flow.sourceRecord(baseline);

    try {
      await recordEvidence('action-focus-LIMAS-SUD-370-search-field-receives-keyboard-focus.spec-17', async () => dashboard.expiringSearchInput.focus());
      await recordEvidence('assert-toBeFocused-LIMAS-SUD-370-search-field-receives-keyboard-focus.spec-18', async () => expect(dashboard.expiringSearchInput).toBeFocused());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
