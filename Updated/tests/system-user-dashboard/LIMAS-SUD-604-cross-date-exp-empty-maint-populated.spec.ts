import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-604: Expiration Date Empty With Maintenance Date Populated Shows No Validation', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('action-fill-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-19', async () => dashboard.getExtendDialogMaintenanceDateInput().fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-20', async () => expect(dashboard.getExtendDialogExpirationDateInput()).toHaveValue(''));
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-21', async () => expect(dashboard.getExtendDialogMaintenanceDateInput()).not.toHaveAttribute('aria-invalid'));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-604-cross-date-exp-empty-maint-populated.spec-25', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
