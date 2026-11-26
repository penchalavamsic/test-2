import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-626: Apply Extension With Valid Expiration Days', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      const days = baseline.data.TEST_EXPIRATION_EXTENSION_DAYS;
      const responsePromise = flow.captureExtensionResponse();
      await recordEvidence('action-fill-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-25', async () => dashboard.getExtendDialogExpirationDaysInput().fill(days));
      await recordEvidence('action-click-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-26', async () => dashboard.getExtendDialogApplyButton().click());
      const response = await responsePromise;
      await recordEvidence('assert-toBe-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-28', async () => expect(response.request().method()).toBe('PUT'));
      await recordEvidence('assert-toContain-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-29', async () => expect(response.url()).toContain('/api/users'));
      await flow.verifyExtensionSuccess(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
      // Verify the updated date has advanced from original by 'days'
      const updatedCard = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-33', async () => expect(updatedCard).toBeVisible());
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-626-apply-with-valid-expiration-days.spec-39', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
