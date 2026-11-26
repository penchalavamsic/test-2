import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-723: Space on already-checked expiration radio sends no request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Expiration is already checked; press Space on it
    let requestCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET')
        requestCount++;
    });

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-24', async () => efcExpirationRadio.focus());
    await recordEvidence('action-press-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-25', async () => page.keyboard.press('Space'));

    // Verify no request was triggered by racing against a response promise
    const noRequestCheck = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 2000 }
    ).then(() => false).catch(() => true);
    const noFlconfigRequest = await noRequestCheck;
    await recordEvidence('assert-toBe-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-33', async () => expect(noFlconfigRequest).toBe(true));
    await recordEvidence('assert-toBe-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-34', async () => expect(requestCount).toBe(0));
    await recordEvidence('assert-toBeChecked-LIMAS-SUD-723-efc-c-expiration-space-on-checked-no-request.spec-35', async () => expect(efcExpirationRadio).toBeChecked());
  });
});