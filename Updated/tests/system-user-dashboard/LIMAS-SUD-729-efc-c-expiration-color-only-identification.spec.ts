import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-C', () => {
  test('LIMAS-SUD-729: expiration radio is not identified by color alone', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-729-efc-c-expiration-color-only-identification.spec-9', async () => dashboard.floatingConfigsCard.click());

    const efcExpirationRadio = page.getByRole('group', { name: 'Filter by' }).getByRole('radio', { name: 'Expiration' });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-729-efc-c-expiration-color-only-identification.spec-12', async () => expect(efcExpirationRadio).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-729-efc-c-expiration-color-only-identification.spec-13', async () => expect(efcExpirationRadio).toHaveAccessibleName('Expiration'));

    // Verify the radio has a visible text label adjacent to it (not purely color-based)
    const labelText = page.getByRole('group', { name: 'Filter by' }).getByText('Expiration');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-729-efc-c-expiration-color-only-identification.spec-17', async () => expect(labelText).toBeVisible());
  });
});