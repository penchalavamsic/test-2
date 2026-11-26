import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-860: tab order from date input through button to search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('action-click-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-17', async () => dateInput.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-18', async () => expect(dateInput).toBeFocused());

    await recordEvidence('action-tab-out-of-native-date-segments', async () => {
      // Edge exposes multiple keyboard segments inside a native date input.
      for (let segment = 0; segment < 4; segment++) {
        await page.keyboard.press('Tab');
        if (!(await dateInput.evaluate(el => el === document.activeElement))) break;
      }
    });

    const floatingConfigsButton = page.getByRole('button', { name: 'Floating License Configurations' });
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-23', async () => expect(floatingConfigsButton).toBeFocused());

    await recordEvidence('action-press-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-25', async () => page.keyboard.press('Tab'));

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec-28', async () => expect(searchInput).toBeFocused());
  });
});