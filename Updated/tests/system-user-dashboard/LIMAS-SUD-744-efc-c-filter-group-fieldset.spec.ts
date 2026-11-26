import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-744: radio group container is wrapped in a fieldset', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-744-efc-c-filter-group-fieldset.spec-9', async () => dashboard.floatingConfigsCard.click());

    const hasFieldset = await page.evaluate(() => document.querySelector('fieldset') !== null);
    await recordEvidence('assert-toBe-LIMAS-SUD-744-efc-c-filter-group-fieldset.spec-12', async () => expect(hasFieldset).toBe(true));
  });
});