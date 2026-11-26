import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-049: should display a numeric count badge in each summary card', async ({ page }) => {
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
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-049-summary-card-count-badge.spec-18', async () => expect(card).toBeVisible());

      // Each card's accessible name is "{count} {label}" — extract the leading number
      const accessibleName = await card.getAttribute('aria-label');
      const cardText = await card.textContent();

      // The card text contains a number followed by the label text
      const numberMatch = cardText?.match(/^\s*(\d+)/);
      if (numberMatch) {
        const count = parseInt(numberMatch[1], 10);
        await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-049-summary-card-count-badge.spec-28', async () => expect(count).toBeGreaterThanOrEqual(0));
      }

      // Fallback: verify that the card contains at least one numeric character
      await recordEvidence('assert-toMatch-LIMAS-SUD-049-summary-card-count-badge.spec-32', async () => expect(cardText).toMatch(/\d+/));
    }
  });
});