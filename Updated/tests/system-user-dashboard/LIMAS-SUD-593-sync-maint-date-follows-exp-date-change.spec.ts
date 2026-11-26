import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-593: Maintenance Date Follows Expiration Date Change Automatically', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const expInput = dashboard.getExtendDialogExpirationDateInput();
      const maintInput = dashboard.getExtendDialogMaintenanceDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-21', async () => expInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-check-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-22', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('action-fill-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-23', async () => expInput.fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-24', async () => expect(maintInput).toHaveValue(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-593-sync-maint-date-follows-exp-date-change.spec-28', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
