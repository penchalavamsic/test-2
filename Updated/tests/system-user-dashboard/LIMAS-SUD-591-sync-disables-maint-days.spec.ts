import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-591: Sync Disables Maintenance Days Input', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-591-sync-disables-maint-days.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-591-sync-disables-maint-days.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-591-sync-disables-maint-days.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('action-fill-LIMAS-SUD-591-sync-disables-maint-days.spec-19', async () => dashboard.getExtendDialogExpirationDateInput().fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-check-LIMAS-SUD-591-sync-disables-maint-days.spec-20', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('assert-toBeDisabled-LIMAS-SUD-591-sync-disables-maint-days.spec-21', async () => expect(dashboard.getExtendDialogMaintenanceDaysInput()).toBeDisabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-591-sync-disables-maint-days.spec-25', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
