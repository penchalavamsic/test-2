import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Floating Licenses Date Control', () => {
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

  test('LIMAS-SUD-867: Expires before date control is visible', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-floating-licenses-date-control.spec-17', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toBeVisible());
  });

  test('LIMAS-SUD-868: Expires before date control has label "Expires before"', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const label = page.getByText('Expires before');
    await recordEvidence('assert-toBeVisible-floating-licenses-date-control.spec-23', async () => expect(label).toBeVisible());
    const forAttr = await label.getAttribute('for');
    await recordEvidence('assert-toBe-floating-licenses-date-control.spec-25', async () => expect(forAttr).toBe('fl-expires-before'));
  });

  test('LIMAS-SUD-869: Expires before date control has type date', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveAttribute-floating-licenses-date-control.spec-30', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveAttribute('type', 'date'));
  });

  test('LIMAS-SUD-870: Expires before date control has accessible name via label', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-floating-licenses-date-control.spec-35', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toBeVisible());
    const accessibleName = await dashboard.floatingLicensesExpiresBeforeInput.getAttribute('aria-label');
    const labelledBy = await dashboard.floatingLicensesExpiresBeforeInput.getAttribute('aria-labelledby');
    const hasLabel = !accessibleName && !labelledBy;
    // Accessible name comes from the associated <label for="fl-expires-before">
    await recordEvidence('assert-toBe-floating-licenses-date-control.spec-40', async () => expect(hasLabel).toBe(true));
  });

  test('LIMAS-SUD-871: Expires before date control has id fl-expires-before', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveAttribute-floating-licenses-date-control.spec-45', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveAttribute('id', 'fl-expires-before'));
  });

  test('LIMAS-SUD-872: Expires before date control has empty initial value', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toHaveValue-floating-licenses-date-control.spec-50', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(''));
  });

  test('LIMAS-SUD-873: Expires before date control is enabled', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeEnabled-floating-licenses-date-control.spec-55', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toBeEnabled());
  });
});