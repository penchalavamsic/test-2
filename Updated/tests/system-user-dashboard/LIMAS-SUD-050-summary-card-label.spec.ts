import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-050: should display label text on each summary card', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Each card is locatable by role=button with its label text in the accessible name
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-050-summary-card-label.spec-10', async () => expect(dashboard.pendingLicenseRequestsCard).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-050-summary-card-label.spec-11', async () => expect(dashboard.expiringLicensesCard).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-050-summary-card-label.spec-12', async () => expect(dashboard.floatingConfigsCard).toBeVisible());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-050-summary-card-label.spec-13', async () => expect(dashboard.floatingLicensesCard).toBeVisible());

    // Verify each card contains non-empty text (label paragraph) beyond just the count
    const cards = [
      dashboard.pendingLicenseRequestsCard,
      dashboard.expiringLicensesCard,
      dashboard.floatingConfigsCard,
      dashboard.floatingLicensesCard,
    ];

    for (const card of cards) {
      const text = await card.textContent();
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-050-summary-card-label.spec-25', async () => expect(text).toBeTruthy());
      // Text must contain at least one letter (label, not just a number)
      await recordEvidence('assert-toMatch-LIMAS-SUD-050-summary-card-label.spec-27', async () => expect(text).toMatch(/[A-Za-z]/));
    }
  });
});