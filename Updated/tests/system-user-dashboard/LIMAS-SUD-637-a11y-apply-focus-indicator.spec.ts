import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-637: Apply Extension Button Has Visible Focus Indicator', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      const btn = dashboard.getExtendDialogApplyButton();
      await recordEvidence('action-focus-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-24', async () => btn.focus());
      await recordEvidence('action-keyboard-focus-apply', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
      });
      await recordEvidence('assert-apply-keyboard-focus', () => expect(btn).toBeFocused());
      const hasIndicator = await btn.evaluate((el) => {
      const style = getComputedStyle(el);
      return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none';
      });
      await recordEvidence('assert-toBe-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-29', async () => expect(hasIndicator).toBe(true));
    } finally {
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-637-a11y-apply-focus-indicator.spec-35', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
