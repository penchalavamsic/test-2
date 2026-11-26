import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-497: Expiration Extend By Days Input Is Visible And Empty', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);

    await recordEvidence('action-click-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const input = dashboard.getExtendDialogExpirationDaysInput();
            await recordEvidence('assert-toBeVisible-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-21', async () => expect(input).toBeVisible());
            await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-22', async () => expect(input).toHaveAttribute('type', 'number'));
            await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-23', async () => expect(input).toHaveAttribute('placeholder', 'e.g. 365'));
            await recordEvidence('assert-toHaveValue-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-24', async () => expect(input).toHaveValue(''));
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-497-expiration-extend-by-days-visible.spec-30', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
