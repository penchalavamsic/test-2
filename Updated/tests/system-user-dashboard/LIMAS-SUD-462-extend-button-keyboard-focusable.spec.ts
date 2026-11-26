import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-462: Extend Button Is Keyboard Focusable', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-462-extend-button-keyboard-focusable.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const extBtn = dashboard.getRecordExtendButton(card);
      const ti = await extBtn.evaluate(el => (el as HTMLElement).tabIndex);
      await recordEvidence('assert-toBe-LIMAS-SUD-462-extend-button-keyboard-focusable.spec-18', async () => expect(ti).toBe(0));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
