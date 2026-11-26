import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-527: Extend By Days Input Is Visible', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-527-extend-by-days-visible.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-527-extend-by-days-visible.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-527-extend-by-days-visible.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-527-extend-by-days-visible.spec-19', async () => expect(dashboard.getExtendDialogExpirationDaysInput()).toBeVisible());
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-527-extend-by-days-visible.spec-23', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
