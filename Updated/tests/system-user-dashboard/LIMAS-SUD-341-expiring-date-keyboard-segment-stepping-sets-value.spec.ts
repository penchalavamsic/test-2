import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-341: Keyboard Segment Stepping Produces A Date', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-341-expiring-date-keyboard-segment-stepping-sets-value.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.stepExpiresBeforeSegmentsWithKeyboard();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-341-expiring-date-keyboard-segment-stepping-sets-value.spec-15', async () => expect(dashboard.expiresBeforeInput).toHaveValue(/^\d{4}-\d{2}-\d{2}$/));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
