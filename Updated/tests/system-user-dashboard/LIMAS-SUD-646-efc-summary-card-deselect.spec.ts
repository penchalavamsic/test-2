import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-646: clicking EL card deselects the EFC card', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // First select the EFC card
    await recordEvidence('action-click-LIMAS-SUD-646-efc-summary-card-deselect.spec-10', async () => dashboard.floatingConfigsCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-646-efc-summary-card-deselect.spec-11', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'true'));

    // Click Expiring Licenses card
    await recordEvidence('action-click-LIMAS-SUD-646-efc-summary-card-deselect.spec-14', async () => dashboard.expiringLicensesCard.click());
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-646-efc-summary-card-deselect.spec-15', async () => expect(dashboard.expiringLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-646-efc-summary-card-deselect.spec-16', async () => expect(dashboard.floatingConfigsCard).toHaveAttribute('aria-pressed', 'false'));
  });
});
