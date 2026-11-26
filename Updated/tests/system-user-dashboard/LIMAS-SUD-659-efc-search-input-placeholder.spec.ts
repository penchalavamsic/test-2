import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-659: efc search placeholder is correct', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-659-efc-search-input-placeholder.spec-9', async () => dashboard.floatingConfigsCard.click());

    const search = page.getByPlaceholder('Search by User Group or Profile…');
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-659-efc-search-input-placeholder.spec-12', async () => expect(search).toHaveAttribute('placeholder', 'Search by User Group or Profile…'));
  });
});
