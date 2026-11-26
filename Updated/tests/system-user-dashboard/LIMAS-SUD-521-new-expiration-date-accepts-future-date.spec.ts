import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-521: Accepts A Future Date Value', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const date = baseline.data.TEST_EXTENSION_FUTURE_DATE;
      const input = dashboard.getExtendDialogExpirationDateInput();
      await recordEvidence('action-fill-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-21', async () => input.fill(date));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-22', async () => expect(input).toHaveValue(date));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-521-new-expiration-date-accepts-future-date.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
