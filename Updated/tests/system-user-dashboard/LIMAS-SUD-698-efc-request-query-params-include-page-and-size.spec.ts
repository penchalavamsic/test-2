import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-698: query params include page and size', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const [response] = await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-698-efc-request-query-params-include-page-and-size.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);
    const params = new URL(response.url()).searchParams;
    await recordEvidence('assert-toBe-LIMAS-SUD-698-efc-request-query-params-include-page-and-size.spec-17', async () => expect(params.get('page')).toBe('0'));
    await recordEvidence('assert-toBe-LIMAS-SUD-698-efc-request-query-params-include-page-and-size.spec-18', async () => expect(params.get('size')).toBe('5'));
  });
});
