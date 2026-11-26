import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-332: Escape Key Keeps Focus On Field', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-332-expiring-expires-before-escape-keeps-focus.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    await flow.openExpiresBeforeCalendar();
    await recordEvidence('action-press-LIMAS-SUD-332-expiring-expires-before-escape-keeps-focus.spec-14', async () => page.keyboard.press('Escape'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-332-expiring-expires-before-escape-keeps-focus.spec-15', async () => expect(dashboard.expiresBeforeInput).toBeFocused());
  });
});
