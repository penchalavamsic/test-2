import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-640: Apply Extension Validates Maintenance Cannot Exceed Expiration', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      await recordEvidence('action-fill-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-23', async () => dashboard.getExtendDialogExpirationDateInput().fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-fill-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-24', async () => dashboard.getExtendDialogMaintenanceDateInput().fill('2035-12-31'));
      await recordEvidence('action-click-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-25', async () => dashboard.getExtendDialogApplyButton().click());
      // Source: validate() returns "Maintenance date cannot be later than the expiration date."
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-27', async () => expect(dashboard.extendLicenseDialog.getByRole('alert')).toBeVisible());
      await recordEvidence('assert-toContainText-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-28', async () => expect(dashboard.extendLicenseDialog.getByRole('alert')).toContainText('Maintenance date cannot be later'));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-29', async () => expect(dashboard.extendLicenseDialog).toBeVisible());
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-640-apply-validation-maint-after-exp.spec-35', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
