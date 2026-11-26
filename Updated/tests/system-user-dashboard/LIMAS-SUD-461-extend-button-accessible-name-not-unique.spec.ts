import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-461: Every Extend Button Has The Same Accessible Name', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-461-extend-button-accessible-name-not-unique.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const names = await dashboard.extendButtons.evaluateAll(els => els.map(el => (el as HTMLElement).textContent?.trim()));
      for (const n of names) { await recordEvidence('assert-toBe-LIMAS-SUD-461-extend-button-accessible-name-not-unique.spec-17', async () => expect(n).toBe('Extend')); }
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
