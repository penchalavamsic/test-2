import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-508: Escape Key Closes The Dialog', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-508-escape-closes-dialog.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);

    await recordEvidence('action-click-LIMAS-SUD-508-escape-closes-dialog.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-508-escape-closes-dialog.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      await recordEvidence('action-press-LIMAS-SUD-508-escape-closes-dialog.spec-20', async () => dashboard.page.keyboard.press('Escape'));
            await recordEvidence('assert-toBeVisible-LIMAS-SUD-508-escape-closes-dialog.spec-21', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-508-escape-closes-dialog.spec-27', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
