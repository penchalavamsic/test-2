import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-812: invalid text value is rejected by native date input', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-812-efc-d-invalid-text-rejected.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-evaluate-LIMAS-SUD-812-efc-d-invalid-text-rejected.spec-19', async () => page.evaluate(() => {
      const el = document.querySelector('#floating-expires-before') as HTMLInputElement;
      if (el) {
        el.value = 'not-a-date';
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }));

    await page.waitForTimeout(200);
    const val = await expiresUntilInput.inputValue();
    await recordEvidence('assert-toBe-LIMAS-SUD-812-efc-d-invalid-text-rejected.spec-28', async () => expect(val).not.toBe('not-a-date'));
  });
});