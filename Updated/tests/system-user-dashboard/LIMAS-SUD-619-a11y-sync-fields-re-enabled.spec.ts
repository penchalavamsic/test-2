import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-619: Maintenance Fields Are Correctly Re-enabled After Unchecking Sync', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const expInput = dashboard.getExtendDialogExpirationDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-20', async () => expInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-check-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-21', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('assert-toBeDisabled-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-22', async () => expect(dashboard.getExtendDialogMaintenanceDateInput()).toBeDisabled());
      await recordEvidence('action-uncheck-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-23', async () => dashboard.getExtendDialogSyncCheckbox().uncheck());
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-24', async () => expect(dashboard.getExtendDialogMaintenanceDateInput()).toBeEnabled());
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-25', async () => expect(dashboard.getExtendDialogMaintenanceDaysInput()).toBeEnabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-619-a11y-sync-fields-re-enabled.spec-29', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
