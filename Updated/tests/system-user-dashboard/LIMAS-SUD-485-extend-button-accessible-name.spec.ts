import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-485: Extend Button Has Accessible Name Extend', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-485-extend-button-accessible-name.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER, true);
    const extendBtn = dashboard.getRecordExtendButton(card, true);

    await recordEvidence('action-click-LIMAS-SUD-485-extend-button-accessible-name.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-485-extend-button-accessible-name.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-485-extend-button-accessible-name.spec-20', async () => expect(extendBtn).toHaveAccessibleName('Extend'));
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-485-extend-button-accessible-name.spec-26', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
