import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-663: efc empty state date criteria message visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-663-efc-empty-state-match-criteria.spec-9', async () => dashboard.floatingConfigsCard.click());

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await responsePromise;

    const criteriaMsg = page.getByText('No floating license configurations match the selected date criteria.');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-663-efc-empty-state-match-criteria.spec-18', async () => expect(criteriaMsg).toBeVisible());
  });
});
