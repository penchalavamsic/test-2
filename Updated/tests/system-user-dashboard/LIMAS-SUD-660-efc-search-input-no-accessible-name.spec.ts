import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-660: efc search has no aria-label or labelledby', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-660-efc-search-input-no-accessible-name.spec-9', async () => dashboard.floatingConfigsCard.click());

    const search = page.getByPlaceholder('Search by User Group or Profile…');
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-660-efc-search-input-no-accessible-name.spec-12', async () => expect(search).not.toHaveAttribute('aria-label'));
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-660-efc-search-input-no-accessible-name.spec-13', async () => expect(search).not.toHaveAttribute('aria-labelledby'));
  });
});
