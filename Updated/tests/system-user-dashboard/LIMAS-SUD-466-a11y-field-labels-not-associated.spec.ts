import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Record Fields', () => {
  test('LIMAS-SUD-466: In-Card Labels Are Not Associated With Values', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-466-a11y-field-labels-not-associated.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);

    try {
      const expTag = await dashboard.getRecordExpirationLabel(card).evaluate(el => (el as HTMLElement).tagName);
      const maintTag = await dashboard.getRecordMaintenanceLabel(card).evaluate(el => (el as HTMLElement).tagName);
      await recordEvidence('assert-toBe-LIMAS-SUD-466-a11y-field-labels-not-associated.spec-18', async () => expect(expTag).toBe('SPAN'));
      await recordEvidence('assert-toBe-LIMAS-SUD-466-a11y-field-labels-not-associated.spec-19', async () => expect(maintTag).toBe('SPAN'));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
