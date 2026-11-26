import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-330: Clicking Field Focuses The Date Control', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-330-expiring-expires-before-click-focuses-field.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    await flow.openExpiresBeforeCalendar();
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-330-expiring-expires-before-click-focuses-field.spec-14', async () => expect(dashboard.expiresBeforeInput).toBeFocused());
  });
});
