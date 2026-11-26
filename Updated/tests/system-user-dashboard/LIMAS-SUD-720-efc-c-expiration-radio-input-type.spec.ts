import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-720: expiration radio DOM input type is radio', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-720-efc-c-expiration-radio-input-type.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    const inputType = await efcExpirationRadio.getAttribute('type');
    await recordEvidence('assert-toBe-LIMAS-SUD-720-efc-c-expiration-radio-input-type.spec-13', async () => expect(inputType).toBe('radio'));
  });
});