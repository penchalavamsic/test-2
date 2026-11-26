import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-541: Accepts Alphabetic Input', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const input = dashboard.getExtendDialogExpirationDaysInput();
      await recordEvidence('action-type-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-20', async () => input.pressSequentially('abc'));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-21', async () => expect(input).toHaveValue('abc'));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-541-extend-by-days-accepts-alphabetic.spec-25', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
