import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-329: Tab Moves Focus To Expires Before Field', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-329-expiring-radio-tab-moves-focus-to-expires-before.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    await recordEvidence('action-focus-LIMAS-SUD-329-expiring-radio-tab-moves-focus-to-expires-before.spec-13', async () => dashboard.expirationRadio.focus());
    await recordEvidence('action-press-LIMAS-SUD-329-expiring-radio-tab-moves-focus-to-expires-before.spec-14', async () => page.keyboard.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-329-expiring-radio-tab-moves-focus-to-expires-before.spec-15', async () => expect(dashboard.expiresBeforeInput).toBeFocused());
  });
});
