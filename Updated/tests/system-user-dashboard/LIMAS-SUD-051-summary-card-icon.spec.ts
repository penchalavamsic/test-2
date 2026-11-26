import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-051: should display a Lucide SVG icon in each summary card', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const summaryCardNames = [
      /Pending License Requests/,
      /Expiring Licenses/,
      /Expiring Floating Configurations/,
      /Floating Licenses/,
    ];

    for (const name of summaryCardNames) {
      const card = page.getByRole('button', { name });
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-051-summary-card-icon.spec-18', async () => expect(card).toBeVisible());

      const svg = card.locator('svg');
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-051-summary-card-icon.spec-21', async () => expect(svg).toBeVisible());
    }
  });
});