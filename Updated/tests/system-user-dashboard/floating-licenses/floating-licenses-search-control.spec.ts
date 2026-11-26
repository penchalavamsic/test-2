import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Floating Licenses Search Control', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      dashboard.selectFloatingLicenses(),
    ]);
  });

  test('LIMAS-SUD-874: Search control is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-floating-licenses-search-control.spec-17', async () => expect(dashboard.floatingLicensesSearchInput).toBeVisible());
  });

  test('LIMAS-SUD-875: Search control has type search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveAttribute-floating-licenses-search-control.spec-22', async () => expect(dashboard.floatingLicensesSearchInput).toHaveAttribute('type', 'search'));
  });

  test('LIMAS-SUD-876: Search control has correct placeholder', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveAttribute-floating-licenses-search-control.spec-27', async () => expect(dashboard.floatingLicensesSearchInput).toHaveAttribute(
      'placeholder',
      'Search by User ID, Profile, Hardware ID, or Role…'
    ));
  });

  test('LIMAS-SUD-877: Search control has no id, aria-label, or aria-labelledby', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const input = dashboard.floatingLicensesSearchInput;
    const id = await input.getAttribute('id');
    const ariaLabel = await input.getAttribute('aria-label');
    const ariaLabelledBy = await input.getAttribute('aria-labelledby');

    await recordEvidence('assert-toBeNull-floating-licenses-search-control.spec-40', async () => expect(id).toBeNull());
    await recordEvidence('assert-toBeNull-floating-licenses-search-control.spec-41', async () => expect(ariaLabel).toBeNull());
    await recordEvidence('assert-toBeNull-floating-licenses-search-control.spec-42', async () => expect(ariaLabelledBy).toBeNull());
  });

  test('LIMAS-SUD-878: Search control has empty initial value', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveValue-floating-licenses-search-control.spec-47', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(''));
  });

  test('LIMAS-SUD-879: Search control is enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeEnabled-floating-licenses-search-control.spec-52', async () => expect(dashboard.floatingLicensesSearchInput).toBeEnabled());
  });

  test('LIMAS-SUD-880: Search icon is present and decorative', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const searchIcon = dashboard.floatingLicensesSearchInput.locator('..').locator('svg').first();
    await recordEvidence('assert-toBeVisible-floating-licenses-search-control.spec-58', async () => expect(searchIcon).toBeVisible());
    const tabIndex = await searchIcon.evaluate(el => (el as SVGElement).tabIndex);
    await recordEvidence('assert-toBe-floating-licenses-search-control.spec-60', async () => expect(tabIndex).toBe(-1));
  });
});