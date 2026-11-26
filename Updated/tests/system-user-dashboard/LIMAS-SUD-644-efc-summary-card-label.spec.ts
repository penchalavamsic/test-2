import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Floating Configurations Section Shell', () => {
  test('LIMAS-SUD-644: efc summary card label is correct', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toContainText-LIMAS-SUD-644-efc-summary-card-label.spec-9', async () => expect(dashboard.floatingConfigsCard).toContainText('Expiring Floating Configurations'));
  });
});
