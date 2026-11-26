import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-581: Entering Maintenance Extend By Days Clears Previously Set Maintenance Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-581-maint-days-clears-date.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-581-maint-days-clears-date.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-581-maint-days-clears-date.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const dateInput = dashboard.getExtendDialogMaintenanceDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-581-maint-days-clears-date.spec-20', async () => dateInput.fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      const daysInput = dashboard.getExtendDialogMaintenanceDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-581-maint-days-clears-date.spec-22', async () => daysInput.fill('365'));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-581-maint-days-clears-date.spec-23', async () => expect(dateInput).toHaveValue(''));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-581-maint-days-clears-date.spec-27', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
