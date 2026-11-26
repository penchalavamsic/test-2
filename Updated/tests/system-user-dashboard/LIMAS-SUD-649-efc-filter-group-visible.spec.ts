import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-649: filter by group is visible with two radios', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-649-efc-filter-group-visible.spec-9', async () => dashboard.floatingConfigsCard.click());

    const filterGroup = page.getByRole('group', { name: 'Filter by' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-649-efc-filter-group-visible.spec-12', async () => expect(filterGroup).toBeVisible());
    const expRadio = filterGroup.getByRole('radio', { name: 'Expiration' });
    const maintRadio = filterGroup.getByRole('radio', { name: 'Maintenance' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-649-efc-filter-group-visible.spec-15', async () => expect(expRadio).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-649-efc-filter-group-visible.spec-16', async () => expect(maintRadio).toBeVisible());
  });
});
