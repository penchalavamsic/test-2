import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-623: Apply Extension Button Shows Applying State During Submission', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-623-apply-extension-loading-state.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-623-apply-extension-loading-state.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-623-apply-extension-loading-state.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      // Verified from source: button text changes to "Applying..." with Loader2 spinner while isApplying=true
      await recordEvidence('action-fill-LIMAS-SUD-623-apply-extension-loading-state.spec-24', async () => dashboard.getExtendDialogExpirationDateInput().fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      const btn = dashboard.getExtendDialogApplyButton();
      await recordEvidence('action-click-LIMAS-SUD-623-apply-extension-loading-state.spec-26', async () => btn.click());
      // Check for the applying state (may be brief but should be observable)
      const isDisabled = await btn.isDisabled().catch(() => false);
      await recordEvidence('assert-toBe-LIMAS-SUD-623-apply-extension-loading-state.spec-29', async () => expect(isDisabled).toBe(true));
      await flow.waitForExtensionResponse();
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-623-apply-extension-loading-state.spec-36', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
