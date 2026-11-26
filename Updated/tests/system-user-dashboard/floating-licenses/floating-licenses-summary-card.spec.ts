import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Floating Licenses Summary Card', () => {
  test('LIMAS-SUD-861: Floating Licenses summary card is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-floating-licenses-summary-card.spec-9', async () => expect(dashboard.floatingLicensesCard).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-floating-licenses-summary-card.spec-10', async () => expect(dashboard.floatingLicensesCard).toHaveRole('button'));
  });

  test('LIMAS-SUD-862: Floating Licenses summary card has correct accessible name', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-floating-licenses-summary-card.spec-17', async () => expect(dashboard.floatingLicensesCard).toBeVisible());
    const text = await dashboard.floatingLicensesCard.textContent();
    await recordEvidence('assert-toMatch-floating-licenses-summary-card.spec-19', async () => expect(text).toMatch(/Floating Licenses/));
  });

  test('LIMAS-SUD-863: Floating Licenses summary card is keyboard-focusable with pressed state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeEnabled-floating-licenses-summary-card.spec-26', async () => expect(dashboard.floatingLicensesCard).toBeEnabled());
    const tabIndex = await dashboard.floatingLicensesCard.evaluate(el => (el as HTMLElement).tabIndex);
    await recordEvidence('assert-toBe-floating-licenses-summary-card.spec-28', async () => expect(tabIndex).toBe(0));
    await recordEvidence('assert-toHaveAttribute-floating-licenses-summary-card.spec-29', async () => expect(dashboard.floatingLicensesCard).toHaveAttribute('aria-pressed'));
  });
});