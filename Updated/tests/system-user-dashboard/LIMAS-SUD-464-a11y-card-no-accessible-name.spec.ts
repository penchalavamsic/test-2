import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-464: Cards Lack Unique Accessible Names', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-464-a11y-card-no-accessible-name.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const label = await card.evaluate(el => (el as HTMLElement).getAttribute('aria-label'));
      const labBy = await card.evaluate(el => (el as HTMLElement).getAttribute('aria-labelledby'));
      await recordEvidence('assert-toBeNull-LIMAS-SUD-464-a11y-card-no-accessible-name.spec-18', async () => expect(label).toBeNull());
      await recordEvidence('assert-toBeNull-LIMAS-SUD-464-a11y-card-no-accessible-name.spec-19', async () => expect(labBy).toBeNull());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
