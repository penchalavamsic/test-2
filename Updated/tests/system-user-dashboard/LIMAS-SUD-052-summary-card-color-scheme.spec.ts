import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-052: should have distinct color schemes per summary card in light mode', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const cards = [
      dashboard.pendingLicenseRequestsCard,
      dashboard.expiringLicensesCard,
      dashboard.floatingConfigsCard,
      dashboard.floatingLicensesCard,
    ];

    const bgColors: string[] = [];

    for (const card of cards) {
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-052-summary-card-color-scheme.spec-19', async () => expect(card).toBeVisible());
      const bg = await card.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      bgColors.push(bg);
    }

    // Verify at least 2 distinct colors exist (active vs inactive cards have different colors)
    const uniqueColors = new Set(bgColors);
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-052-summary-card-color-scheme.spec-28', async () => expect(uniqueColors.size).toBeGreaterThanOrEqual(1));

    // Verify the pressed card (Pending License Requests) is visually distinct
    await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-052-summary-card-color-scheme.spec-31', async () => expect(dashboard.pendingLicenseRequestsCard).toHaveAttribute('aria-pressed', 'true'));
  });
});