import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-597: Sync With Expiration Days Disables Maintenance Controls', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-597-sync-days-disables-maint.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-597-sync-days-disables-maint.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-597-sync-days-disables-maint.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const expDaysInput = dashboard.getExtendDialogExpirationDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-597-sync-days-disables-maint.spec-20', async () => expDaysInput.fill(baseline.data.TEST_EXPIRATION_EXTENSION_DAYS));
      await recordEvidence('action-check-LIMAS-SUD-597-sync-days-disables-maint.spec-21', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('assert-toBeDisabled-LIMAS-SUD-597-sync-days-disables-maint.spec-22', async () => expect(dashboard.getExtendDialogMaintenanceDateInput()).toBeDisabled());
      await recordEvidence('assert-toBeDisabled-LIMAS-SUD-597-sync-days-disables-maint.spec-23', async () => expect(dashboard.getExtendDialogMaintenanceDaysInput()).toBeDisabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-597-sync-days-disables-maint.spec-27', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
