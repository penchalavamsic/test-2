import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-710: no error message after successful empty response', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const [response] = await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-710-efc-no-error-message-on-success.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);
    await recordEvidence('assert-toBe-LIMAS-SUD-710-efc-no-error-message-on-success.spec-16', async () => expect(response.status()).toBe(200));

    // No destructive/error UI should be visible
    const errorText = page.getByText('Unable to load this section');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-710-efc-no-error-message-on-success.spec-20', async () => expect(errorText).not.toBeVisible());
    const retryButton = page.getByRole('button', { name: 'Retry' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-710-efc-no-error-message-on-success.spec-22', async () => expect(retryButton).not.toBeVisible());
  });
});
