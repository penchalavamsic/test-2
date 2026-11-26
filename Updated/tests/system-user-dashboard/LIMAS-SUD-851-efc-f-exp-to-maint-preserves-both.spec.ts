import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { getEFCCombinedRuntimeData } from '../test-data/runtime-data';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-F', () => {
  test('LIMAS-SUD-851: switching from Expiration to Maintenance preserves date and search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 },
    ),
      recordEvidence('action-click-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-10', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const { TEST_EFC_COMBINATION_DATE } = getEFCCombinedRuntimeData();

    const searchInput = page.getByRole('searchbox', { name: 'Search by User Group or Profile…' });
    await recordEvidence('action-fill-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-20', async () => searchInput.fill('testquery'));

    const dateInput = page.getByRole('textbox', { name: 'Expires until' });
    let resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-fill-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-27', async () => dateInput.fill(TEST_EFC_COMBINATION_DATE));
    await resp;

    let reqCount = 0;
    page.on('request', (req) => {
      if (req.url().includes('/api/flconfig/') && req.method() === 'GET') reqCount++;
    });

    resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/m/') && r.request().method() === 'GET',
      { timeout: 15000 },
    );
    await recordEvidence('action-click-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-39', async () => page.getByRole('radio', { name: 'Maintenance' }).click());
    await resp;

    await recordEvidence('assert-toBe-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-42', async () => expect(reqCount).toBe(1));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-43', async () => expect(dateInput).toHaveValue(TEST_EFC_COMBINATION_DATE));
    await recordEvidence('assert-toHaveValue-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-44', async () => expect(searchInput).toHaveValue('testquery'));

    // Restore
    await recordEvidence('action-fill-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-47', async () => searchInput.fill(''));
    await recordEvidence('action-fill-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-48', async () => dateInput.fill(''));
    await recordEvidence('action-click-LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec-49', async () => page.getByRole('radio', { name: 'Expiration' }).click());
  });
});