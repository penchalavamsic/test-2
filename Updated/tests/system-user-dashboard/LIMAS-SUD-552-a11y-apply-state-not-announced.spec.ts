import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Expiration Controls', () => {
  test('LIMAS-SUD-552: Apply Extension State Change Is Not Announced', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const applyBefore = await dashboard.getExtendDialogApplyButton().isEnabled();
      await recordEvidence('action-fill-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-20', async () => dashboard.getExtendDialogExpirationDaysInput().fill('-5'));
      await recordEvidence('action-fill-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-21', async () => dashboard.getExtendDialogExpirationDaysInput().fill(''));
      const liveRegions = await dashboard.extendLicenseDialog.locator('[aria-live]').count();
      await recordEvidence('assert-toBe-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-23', async () => expect(liveRegions).toBe(0));
      const applyAfter = await dashboard.getExtendDialogApplyButton().isEnabled();
      await recordEvidence('assert-toBe-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-25', async () => expect(applyAfter).toBe(applyBefore));
    } finally {
      await flow.clearExpirationExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-552-a11y-apply-state-not-announced.spec-29', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
