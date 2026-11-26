import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-647: efc section heading is visible after card click', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-647-efc-heading-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const heading = page.getByRole('heading', { name: 'Expiring Floating Configurations', level: 3 });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-647-efc-heading-visible.spec-12', async () => expect(heading).toBeVisible());
  });
});
