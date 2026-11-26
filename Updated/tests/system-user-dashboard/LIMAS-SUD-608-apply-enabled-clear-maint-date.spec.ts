import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-608: Apply Extension Remains Enabled After Clearing Maintenance Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const input = dashboard.getExtendDialogMaintenanceDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-20', async () => input.fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      await recordEvidence('action-fill-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-21', async () => input.fill(''));
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-22', async () => expect(dashboard.getExtendDialogApplyButton()).toBeEnabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-608-apply-enabled-clear-maint-date.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
