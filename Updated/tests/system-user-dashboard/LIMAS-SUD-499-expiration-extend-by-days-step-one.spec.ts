import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-499: Expiration Extend By Days Has Step One', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-499-expiration-extend-by-days-step-one.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);

    await recordEvidence('action-click-LIMAS-SUD-499-expiration-extend-by-days-step-one.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-499-expiration-extend-by-days-step-one.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-499-expiration-extend-by-days-step-one.spec-20', async () => expect(dashboard.getExtendDialogExpirationDaysInput()).toHaveAttribute('step', '1'));
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-499-expiration-extend-by-days-step-one.spec-26', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
