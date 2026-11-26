import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-544: Date And Extend By Days Are Mutually Exclusive', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const dateInput = dashboard.getExtendDialogExpirationDateInput();
      const daysInput = dashboard.getExtendDialogExpirationDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-21', async () => dateInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('action-fill-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-22', async () => daysInput.fill('90'));
      await recordEvidence('assert-toBe-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-23', async () => expect(await dateInput.inputValue()).toBe(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-24', async () => expect(await daysInput.inputValue()).toBe('90'));
      await recordEvidence('action-fill-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-25', async () => daysInput.fill(''));
      await recordEvidence('action-fill-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-26', async () => daysInput.fill('555'));
      await recordEvidence('action-fill-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-27', async () => dateInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('assert-toBe-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-28', async () => expect(await daysInput.inputValue()).toBe(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-29', async () => expect(await dateInput.inputValue()).toBe(baseline.data.TEST_EXTENSION_FUTURE_DATE));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-544-extend-date-and-days-mutually-exclusive.spec-33', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
