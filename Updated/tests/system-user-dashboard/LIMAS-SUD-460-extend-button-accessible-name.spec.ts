import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-460: Extend Button Has Accessible Name Extend', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-460-extend-button-accessible-name.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-460-extend-button-accessible-name.spec-16', async () => expect(dashboard.getRecordExtendButton(card)).toHaveAccessibleName('Extend'));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
