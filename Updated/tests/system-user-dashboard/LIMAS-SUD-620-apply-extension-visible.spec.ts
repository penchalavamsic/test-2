import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-620: Apply Extension Button Is Visible', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-620-apply-extension-visible.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-620-apply-extension-visible.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-620-apply-extension-visible.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-620-apply-extension-visible.spec-23', async () => expect(dashboard.getExtendDialogApplyButton()).toBeVisible());
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-620-apply-extension-visible.spec-29', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
