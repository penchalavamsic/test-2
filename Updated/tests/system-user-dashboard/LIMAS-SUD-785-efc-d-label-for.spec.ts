import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-785: label for attribute references floating-expires-before', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-785-efc-d-label-for.spec-9', async () => dashboard.floatingConfigsCard.click());

    const label = page.locator('label[for="floating-expires-before"]');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-785-efc-d-label-for.spec-12', async () => expect(label).toBeVisible());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-785-efc-d-label-for.spec-13', async () => expect(label).toHaveText('Expires until'));
  });
});