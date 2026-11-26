import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-666: efc section only renders after card click', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Before clicking EFC card, heading should not be visible
    const efcHeading = page.getByRole('heading', { name: 'Expiring Floating Configurations', level: 3 });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-666-efc-section-renders-after-card-click.spec-11', async () => expect(efcHeading).not.toBeVisible());

    // Click the EFC card
    await recordEvidence('action-click-LIMAS-SUD-666-efc-section-renders-after-card-click.spec-14', async () => dashboard.floatingConfigsCard.click());

    // Now heading should be visible
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-666-efc-section-renders-after-card-click.spec-17', async () => expect(efcHeading).toBeVisible());
  });
});
