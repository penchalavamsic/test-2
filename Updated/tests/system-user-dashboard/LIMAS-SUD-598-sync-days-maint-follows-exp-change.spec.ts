import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-598: Maintenance Days Follow Expiration Days Change Automatically', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const expDaysInput = dashboard.getExtendDialogExpirationDaysInput();
      const maintDaysInput = dashboard.getExtendDialogMaintenanceDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-21', async () => expDaysInput.fill(baseline.data.TEST_EXPIRATION_EXTENSION_DAYS));
      await recordEvidence('action-check-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-22', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('action-fill-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-23', async () => expDaysInput.fill(baseline.data.TEST_EXPIRATION_EXTENSION_MIN_DAYS));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-24', async () => expect(maintDaysInput).toHaveValue(baseline.data.TEST_EXPIRATION_EXTENSION_MIN_DAYS));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-598-sync-days-maint-follows-exp-change.spec-28', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
