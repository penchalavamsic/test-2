import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-618: No ARIA Live Regions Exist In The Extend Dialog', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-618-a11y-no-live-regions-in-dialog.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-618-a11y-no-live-regions-in-dialog.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-618-a11y-no-live-regions-in-dialog.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const liveRegions = await dashboard.extendLicenseDialog.locator('[aria-live]').count();
      await recordEvidence('assert-toBe-LIMAS-SUD-618-a11y-no-live-regions-in-dialog.spec-20', async () => expect(liveRegions).toBe(0));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-618-a11y-no-live-regions-in-dialog.spec-24', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
