import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-488: Dialog Accessible Name Is Derived From Heading', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);

    await recordEvidence('action-click-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const labelledBy = await dashboard.extendLicenseDialog.getAttribute('aria-labelledby');
            await recordEvidence('assert-toBe-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-21', async () => expect(typeof labelledBy).toBe('string'));
            await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-22', async () => expect((labelledBy as string).length).toBeGreaterThan(0));
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-488-dialog-accessible-name-from-heading.spec-28', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
