import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-331: Calendar Popup Exposes No Dialog Or Grid Semantics', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-331-expiring-expires-before-calendar-lacks-dialog-semantics.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    await flow.openExpiresBeforeCalendar();
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-331-expiring-expires-before-calendar-lacks-dialog-semantics.spec-14', async () => expect(dashboard.calendarDialog).toHaveCount(0));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-331-expiring-expires-before-calendar-lacks-dialog-semantics.spec-15', async () => expect(dashboard.calendarGrid).toHaveCount(0));
  });
});
