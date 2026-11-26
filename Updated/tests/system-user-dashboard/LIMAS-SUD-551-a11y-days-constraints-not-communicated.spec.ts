import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-551: Numeric Constraints Are Not Communicated Before Submission', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const input = dashboard.getExtendDialogExpirationDaysInput();
      await recordEvidence('action-fill-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-20', async () => input.fill('0'));
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-21', async () => expect(input).toHaveValue('0'));
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-22', async () => expect(input).not.toHaveAttribute('aria-invalid'));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-551-a11y-days-constraints-not-communicated.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
