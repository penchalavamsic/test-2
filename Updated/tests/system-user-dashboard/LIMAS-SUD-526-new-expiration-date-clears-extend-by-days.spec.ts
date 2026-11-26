import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-526: Entering A Date Clears Previously Set Extend By Days', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const daysInput = dashboard.getExtendDialogExpirationDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-20', async () => daysInput.fill('365'));
      const dateInput = dashboard.getExtendDialogExpirationDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-22', async () => dateInput.fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-23', async () => expect(daysInput).toHaveValue(''));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-526-new-expiration-date-clears-extend-by-days.spec-27', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
