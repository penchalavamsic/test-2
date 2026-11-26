import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-459: Extend Button Is Enabled', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-459-extend-button-enabled.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const extBtn = dashboard.getRecordExtendButton(card);
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-459-extend-button-enabled.spec-17', async () => expect(extBtn).toBeEnabled());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
