import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-628: Apply Extension With Synchronized Expiration Days', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      const days = baseline.data.TEST_EXPIRATION_EXTENSION_DAYS;
      const responsePromise = flow.captureExtensionResponse();
      await recordEvidence('action-fill-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-25', async () => dashboard.getExtendDialogExpirationDaysInput().fill(days));
      await recordEvidence('action-check-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-26', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('action-click-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-27', async () => dashboard.getExtendDialogApplyButton().click());
      const response = await responsePromise;
      await recordEvidence('assert-toBe-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-29', async () => expect(response.request().method()).toBe('PUT'));
      await recordEvidence('assert-toContain-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-30', async () => expect(response.url()).toContain('/api/users'));
      await flow.verifyExtensionSuccess(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-628-apply-with-sync-expiration-days.spec-37', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
