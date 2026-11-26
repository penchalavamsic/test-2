import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-616: Synchronization Constraint Communication Is Limited', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const cb = dashboard.getExtendDialogSyncCheckbox();
      const ariaLabel = await cb.getAttribute('aria-label').catch(() => null);
      await recordEvidence('assert-toBeNull-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-21', async () => expect(ariaLabel).toBeNull());
      const liveRegions = await dashboard.extendLicenseDialog.locator('[aria-live]').count();
      await recordEvidence('assert-toBe-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-23', async () => expect(liveRegions).toBe(0));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-616-a11y-sync-constraints-not-communicated.spec-27', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
