import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Extend Dialog', () => {
  test('LIMAS-SUD-489: Dialog Heading Is An H2 Element', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-489-dialog-heading-h2.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);

    await recordEvidence('action-click-LIMAS-SUD-489-dialog-heading-h2.spec-16', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-489-dialog-heading-h2.spec-17', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const heading = dashboard.extendLicenseDialog.locator('h2').first();
            await recordEvidence('assert-toBeVisible-LIMAS-SUD-489-dialog-heading-h2.spec-21', async () => expect(heading).toBeVisible());
            const text = await heading.textContent();
            await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-489-dialog-heading-h2.spec-23', async () => expect((text ?? '').length).toBeGreaterThan(0));
    } finally {
      // Ensure dialog is closed
      const dlg = dashboard.extendLicenseDialog;
      if (await dlg.isVisible().catch(() => false)) {
        await dashboard.closeExtendDialog();
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-489-dialog-heading-h2.spec-29', async () => expect(dlg).not.toBeVisible());
      }
      await flow.restoreDefaultFilterState();
    }
  });
});
