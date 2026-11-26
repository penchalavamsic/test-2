import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-557: Label Is Associated With The Maintenance Date Input', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-557-maint-date-label-associated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-557-maint-date-label-associated.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-557-maint-date-label-associated.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const inputId = await dashboard.getExtendDialogMaintenanceDateInput().getAttribute('id');
      await recordEvidence('assert-toBe-LIMAS-SUD-557-maint-date-label-associated.spec-20', async () => expect(inputId).toBe('new-maintenance-date'));
      const labelFor = await dashboard.extendLicenseDialog.locator('label[for="new-maintenance-date"]').first().isVisible().catch(() => false);
      await recordEvidence('assert-toBe-LIMAS-SUD-557-maint-date-label-associated.spec-22', async () => expect(labelFor).toBe(true));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-557-maint-date-label-associated.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
