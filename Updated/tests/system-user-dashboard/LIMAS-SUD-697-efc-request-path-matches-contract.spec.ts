import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-697: request path matches flconfig expiration contract', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const [response] = await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-697-efc-request-path-matches-contract.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);
    const url = new URL(response.url());
    await recordEvidence('assert-toMatch-LIMAS-SUD-697-efc-request-path-matches-contract.spec-17', async () => expect(url.pathname).toMatch(/\/limas\/api\/flconfig\/e\//));
    await recordEvidence('assert-toBe-LIMAS-SUD-697-efc-request-path-matches-contract.spec-18', async () => expect(url.searchParams.has('page')).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-697-efc-request-path-matches-contract.spec-19', async () => expect(url.searchParams.has('size')).toBe(true));
  });
});
