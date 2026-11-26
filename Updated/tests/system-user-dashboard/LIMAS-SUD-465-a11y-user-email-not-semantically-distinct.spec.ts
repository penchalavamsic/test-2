import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-465: User Name And Email Are Not Semantically Distinct', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-465-a11y-user-email-not-semantically-distinct.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const nameRole = await card.locator('p').first().evaluate(el => el.getAttribute('role'));
      const emailRole = await card.locator('p').nth(1).evaluate(el => el.getAttribute('role'));
      await recordEvidence('assert-toBeNull-LIMAS-SUD-465-a11y-user-email-not-semantically-distinct.spec-18', async () => expect(nameRole).toBeNull());
      await recordEvidence('assert-toBeNull-LIMAS-SUD-465-a11y-user-email-not-semantically-distinct.spec-19', async () => expect(emailRole).toBeNull());
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
