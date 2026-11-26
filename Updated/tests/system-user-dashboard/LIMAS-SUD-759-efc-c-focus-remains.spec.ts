import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-759: focus remains on radio group after arrow selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-759-efc-c-focus-remains.spec-9', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('action-focus-LIMAS-SUD-759-efc-c-focus-remains.spec-17', async () => efcExpirationRadio.focus());

    const maintResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/m/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-press-LIMAS-SUD-759-efc-c-focus-remains.spec-23', async () => page.keyboard.press('ArrowRight'));
    await maintResponse;

    // Verify document.activeElement is a radio input within the group
    const activeElementTag = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, type: (el as HTMLInputElement).type } : null;
    });
    await recordEvidence('assert-toBe-LIMAS-SUD-759-efc-c-focus-remains.spec-31', async () => expect(activeElementTag?.tag?.toLowerCase()).toBe('input'));
    await recordEvidence('assert-toBe-LIMAS-SUD-759-efc-c-focus-remains.spec-32', async () => expect(activeElementTag?.type).toBe('radio'));

    // Restore Expiration
    const expResponse = page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-LIMAS-SUD-759-efc-c-focus-remains.spec-39', async () => efcExpirationRadio.click());
    await expResponse;
  });
});