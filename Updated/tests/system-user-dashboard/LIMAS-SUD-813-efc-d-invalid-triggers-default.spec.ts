import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-813: invalid date text triggers default-date flconfig request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-813-efc-d-invalid-triggers-default.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    // Enter invalid text and observe the resulting request
    const respPromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    );

    await recordEvidence('action-type-invalid-date', async () => {
      const input = page.getByRole('textbox', { name: 'Expires until' });
      await input.focus();
      await input.pressSequentially('not-a-date');
      await input.press('Tab');
    });

    const response = await respPromise;
    await recordEvidence('assert-toBe-LIMAS-SUD-813-efc-d-invalid-triggers-default.spec-32', async () => expect(response.status()).toBe(200));

    // Restore: clear input
    await recordEvidence('action-fill-LIMAS-SUD-813-efc-d-invalid-triggers-default.spec-35', async () => page.getByRole('textbox', { name: 'Expires until' }).fill(''));
  });
});