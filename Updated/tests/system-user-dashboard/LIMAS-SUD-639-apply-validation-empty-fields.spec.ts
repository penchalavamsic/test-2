import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-639: Apply Extension Validates That At Least One Date Field Is Populated', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-639-apply-validation-empty-fields.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-639-apply-validation-empty-fields.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-639-apply-validation-empty-fields.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      await recordEvidence('action-click-LIMAS-SUD-639-apply-validation-empty-fields.spec-23', async () => dashboard.getExtendDialogApplyButton().click());
      // Source: validate() returns "Provide at least one new date or number of extension days."
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-639-apply-validation-empty-fields.spec-25', async () => expect(dashboard.extendLicenseDialog.getByRole('alert')).toBeVisible());
      await recordEvidence('assert-toContainText-LIMAS-SUD-639-apply-validation-empty-fields.spec-26', async () => expect(dashboard.extendLicenseDialog.getByRole('alert')).toContainText('at least one'));
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-639-apply-validation-empty-fields.spec-27', async () => expect(dashboard.extendLicenseDialog).toBeVisible());
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-639-apply-validation-empty-fields.spec-33', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
