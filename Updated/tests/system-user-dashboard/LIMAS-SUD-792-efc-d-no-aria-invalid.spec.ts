import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-792: expires until input has no aria-invalid attribute', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('action-click-LIMAS-SUD-792-efc-d-no-aria-invalid.spec-9', async () => dashboard.floatingConfigsCard.click());

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-792-efc-d-no-aria-invalid.spec-12', async () => expect(expiresUntilInput).not.toHaveAttribute('aria-invalid'));
  });
});