import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-605: Both Days Fields Populated Shows No Cross-Input Validation', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-605-cross-date-both-days-populated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-605-cross-date-both-days-populated.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-605-cross-date-both-days-populated.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('action-fill-LIMAS-SUD-605-cross-date-both-days-populated.spec-19', async () => dashboard.getExtendDialogExpirationDaysInput().fill('30'));
      await recordEvidence('action-fill-LIMAS-SUD-605-cross-date-both-days-populated.spec-20', async () => dashboard.getExtendDialogMaintenanceDaysInput().fill('60'));
      const alerts = await dashboard.extendLicenseDialog.locator('[role=alert]').count();
      await recordEvidence('assert-toBe-LIMAS-SUD-605-cross-date-both-days-populated.spec-22', async () => expect(alerts).toBe(0));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-605-cross-date-both-days-populated.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
