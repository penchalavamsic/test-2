import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-784: expires until input has id floating-expires-before', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-784-efc-d-id.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.locator('#floating-expires-before');
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-784-efc-d-id.spec-12', async () => expect(expiresUntilInput).toHaveAttribute('id', 'floating-expires-before'));
  });
});