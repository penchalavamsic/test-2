import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-595: Unchecking Sync Keeps The Maintenance Date Value And Re-enables Fields', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const expInput = dashboard.getExtendDialogExpirationDateInput();
      const maintInput = dashboard.getExtendDialogMaintenanceDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-21', async () => expInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-check-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-22', async () => dashboard.getExtendDialogSyncCheckbox().check());
      await recordEvidence('action-uncheck-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-23', async () => dashboard.getExtendDialogSyncCheckbox().uncheck());
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-24', async () => expect(maintInput).toHaveValue(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-25', async () => expect(maintInput).toBeEnabled());
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-26', async () => expect(dashboard.getExtendDialogMaintenanceDaysInput()).toBeEnabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-595-sync-uncheck-keeps-maint-value.spec-30', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
