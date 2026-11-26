import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-153: Delete button accessible name format', () => {
  test('should follow "Delete LR-XXXXX" naming pattern for delete buttons', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-153-delete-button-accessible-name-format.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-153-delete-button-accessible-name-format.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const deleteButtons = dashboard.deleteButtons;
    const count = await deleteButtons.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-153-delete-button-accessible-name-format.spec-13', async () => expect(count).toBeGreaterThan(0));

    const pattern = /^Delete LR-\d+$/;

    for (let i = 0; i < count; i++) {
      const button = deleteButtons.nth(i);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-153-delete-button-accessible-name-format.spec-19', async () => expect(button).toBeVisible());

      const accessibleName = await button.getAttribute('aria-label')
        ?? await button.textContent()
        ?? '';

      await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-153-delete-button-accessible-name-format.spec-25', async () => expect(button).toHaveAccessibleName(pattern));
    }
  });
});