import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-582: Maintenance Date And Extend By Days Are Mutually Exclusive', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const dateInput = dashboard.getExtendDialogMaintenanceDateInput();
      const daysInput = dashboard.getExtendDialogMaintenanceDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-21', async () => dateInput.fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      await recordEvidence('action-fill-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-22', async () => daysInput.fill('30'));
      await recordEvidence('assert-toBe-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-23', async () => expect(await dateInput.inputValue()).toBe(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-24', async () => expect(await daysInput.inputValue()).toBe('30'));
      await recordEvidence('action-fill-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-25', async () => daysInput.fill(''));
      await recordEvidence('action-fill-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-26', async () => daysInput.fill('555'));
      await recordEvidence('action-fill-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-27', async () => dateInput.fill(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
      await recordEvidence('assert-toBe-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-28', async () => expect(await daysInput.inputValue()).toBe(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-29', async () => expect(await dateInput.inputValue()).toBe(baseline.data.TEST_MAINTENANCE_FUTURE_DATE));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-582-maint-date-and-days-mutually-exclusive.spec-33', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
