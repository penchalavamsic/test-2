import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-658: efc search input is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-658-efc-search-input-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const search = page.getByPlaceholder('Search by User Group or Profile…');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-658-efc-search-input-visible.spec-12', async () => expect(search).toBeVisible());
  });
});
