import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-456: No Color-Only Date Status Is Rendered', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-456-no-color-status-indicator.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const dateBlock = card.locator('> :nth-child(3)');
      const classes = (await dateBlock.evaluate(el => el.innerHTML)) || '';
      await recordEvidence('assert-toMatch-LIMAS-SUD-456-no-color-status-indicator.spec-18', async () => expect(classes).not.toMatch(/text-red|text-orange|text-yellow|text-lime/i));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
