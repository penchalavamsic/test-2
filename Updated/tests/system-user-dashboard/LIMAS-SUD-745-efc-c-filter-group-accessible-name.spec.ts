import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-745: filter group has accessible name Filter by', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-745-efc-c-filter-group-accessible-name.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcFilterGroup = page.getByRole('group', { name: 'Filter by' });
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-745-efc-c-filter-group-accessible-name.spec-12', async () => expect(efcFilterGroup).toHaveAccessibleName('Filter by'));
  });
});