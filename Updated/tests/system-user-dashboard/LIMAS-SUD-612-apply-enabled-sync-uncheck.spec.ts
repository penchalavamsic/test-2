import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-612: Apply Extension Remains Enabled After Unchecking Sync', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const cb = dashboard.getExtendDialogSyncCheckbox();
      await recordEvidence('action-check-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-20', async () => cb.check());
      await recordEvidence('action-uncheck-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-21', async () => cb.uncheck());
      await recordEvidence('assert-toBeEnabled-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-22', async () => expect(dashboard.getExtendDialogApplyButton()).toBeEnabled());
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-612-apply-enabled-sync-uncheck.spec-26', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
