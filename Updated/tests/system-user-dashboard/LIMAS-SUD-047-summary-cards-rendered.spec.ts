import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-047: should render exactly 4 summary cards with role=button and aria-pressed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Locate summary card buttons — they have role=button, contain an SVG, and have aria-pressed
    const cards = dashboard.summaryCards;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-047-summary-cards-rendered.spec-11', async () => expect(cards.first()).toBeVisible());

    await recordEvidence('assert-summary-card-count', async () => expect(cards).toHaveCount(4));

    // Verify all summary-specific cards exist and have aria-pressed
    const summaryCardNames = [
      /Pending License Requests/,
      /Expiring Licenses/,
      /Expiring Floating Configurations/,
      /Floating Licenses/,
    ];

    for (const name of summaryCardNames) {
      const card = page.getByRole('button', { name });
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-047-summary-cards-rendered.spec-27', async () => expect(card).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-047-summary-cards-rendered.spec-28', async () => expect(card).toHaveAttribute('aria-pressed', /true|false/));
    }

    // The 4 named cards should all have aria-pressed
    const pressedCount = await cards.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-047-summary-cards-rendered.spec-33', async () => expect(pressedCount).toBeGreaterThanOrEqual(4));
  });
});