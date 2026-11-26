import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-463: Extend Button Has Visible Focus Indicator', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-463-extend-button-focus-indicator.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const extBtn = dashboard.getRecordExtendButton(card);
      await recordEvidence('action-focus-LIMAS-SUD-463-extend-button-focus-indicator.spec-17', async () => extBtn.focus());
      // Enter through keyboard navigation so the UI's :focus-visible styling applies.
      await recordEvidence('action-keyboard-focus-extend', async () => {
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
      });
      await recordEvidence('assert-extend-keyboard-focus', () => expect(extBtn).toBeFocused());
      const hasFocus = await extBtn.evaluate(el => {
        const cs = getComputedStyle(el);
        return (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
      });
      await recordEvidence('assert-toBe-LIMAS-SUD-463-extend-button-focus-indicator.spec-22', async () => expect(hasFocus).toBe(true));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
