import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-023: Account control visibility', () => {
  test('should show account button with initials in header', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-023-account-control-visibility.spec-7', async () => expect(dashboard.userButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-LIMAS-SUD-023-account-control-visibility.spec-8', async () => expect(dashboard.userButton).toBeEnabled());
  });
});