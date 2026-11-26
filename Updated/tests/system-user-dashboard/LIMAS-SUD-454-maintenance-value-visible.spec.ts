import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-454: Maintenance Date Value Is Visible And Follows Day Month Year Format', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-454-maintenance-value-visible.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const maintVal = dashboard.getRecordMaintenanceValue(card);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-454-maintenance-value-visible.spec-17', async () => expect(maintVal).toBeVisible());
      await recordEvidence('assert-toHaveText-LIMAS-SUD-454-maintenance-value-visible.spec-18', async () => expect(maintVal).toHaveText(/^\d{1,2}\s[A-Z][a-z]{2}\s\d{4}$/));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
