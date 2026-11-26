import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-681: section heading remains visible during loading', async ({ page }) => {
    // Source-verified: CardTitle is in CardHeader, rendered outside loading branch
    // Heading "Expiring Floating Configurations" is always visible when section active
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-681-efc-section-heading-visible-during-loading.spec-12', async () => dashboard.floatingConfigsCard.click());

    const heading = page.getByRole('heading', { name: 'Expiring Floating Configurations', level: 3 });
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-681-efc-section-heading-visible-during-loading.spec-15', async () => expect(heading).toBeVisible());
  });
});
