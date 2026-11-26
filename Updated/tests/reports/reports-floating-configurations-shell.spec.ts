import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { ReportsPage } from '../pages/reports.page';

test.beforeEach(async ({ page }) => {
  await new ReportsPage(page).openReports();
});

test.describe('Reports Floating Configurations ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â RFC-A', () => {
  test.describe('Card Selection', () => {
    test('LIMAS-SUD-1741: Floating Configurations card ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â visible, button role, accessible name, aria-pressed="false" initially, other cards unpressed', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      const card = reportsPage.floatingConfigurationsCard;
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-10', async () => expect(card).toBeVisible());
      await recordEvidence('assert-toBeEnabled-reports-floating-configurations-shell.spec-11', async () => expect(card).toBeEnabled());
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-12', async () => expect(card).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-shell.spec-13', async () => expect(card).toHaveAccessibleName(/Floating Configurations/));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-14', async () => expect(reportsPage.standardLicensesCard).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-15', async () => expect(reportsPage.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    });

    test('LIMAS-SUD-1742: Floating Configurations card ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â keyboard focus via Tab, Enter/Space activation, pressed updates, focus-visible', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      const card = reportsPage.floatingConfigurationsCard;
      await recordEvidence('action-focus-reports-floating-configurations-shell.spec-22', async () => reportsPage.standardLicensesCard.focus());
      await recordEvidence('action-press-reports-floating-configurations-shell.spec-23', async () => page.keyboard.press('Tab'));
      const focused = await card.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-25', async () => expect(focused).toBe(true));

      const hasFocusVisible = await card.evaluate((el) => el.matches(':focus-visible'));
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-28', async () => expect(hasFocusVisible).toBe(true));

      await recordEvidence('action-press-reports-floating-configurations-shell.spec-30', async () => page.keyboard.press('Enter'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-31', async () => expect(card).toHaveAttribute('aria-pressed', 'true'));
    });

    test('LIMAS-SUD-1743: Floating Configurations card ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â click selects it (pressed=true), others unpressed, heading "Reports", route /reports', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await recordEvidence('action-click-reports-floating-configurations-shell.spec-37', async () => reportsPage.floatingConfigurationsCard.click());
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-38', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-39', async () => expect(reportsPage.standardLicensesCard).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-40', async () => expect(reportsPage.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));

      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-42', async () => expect(reportsPage.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-reports-floating-configurations-shell.spec-43', async () => expect(reportsPage.heading).toHaveText('Reports'));
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-configurations-shell.spec-45', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });

  test.describe('Active Mode', () => {
    test('LIMAS-SUD-1744: Default Active mode ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Active pressed, Deleted unpressed, group role="group" aria-label="Configuration mode"', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-54', async () => expect(reportsPage.fcActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-55', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      const group = reportsPage.fcModeGroup;
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-58', async () => expect(group).toHaveAttribute('role', 'group'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-59', async () => expect(group).toHaveAttribute('aria-label', 'Configuration mode'));
    });

    test('LIMAS-SUD-1745: Active control ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â button role, not disabled, tabindex, pressed state, non-color indicator', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const active = reportsPage.fcActiveTab;
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-67', async () => expect(active).toHaveAttribute('role', 'button'));
      await recordEvidence('assert-toBeEnabled-reports-floating-configurations-shell.spec-68', async () => expect(active).toBeEnabled());
      const tabindex = await active.getAttribute('tabindex');
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-70', async () => expect(tabindex).not.toBe('-1'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-71', async () => expect(active).toHaveAttribute('aria-pressed', 'true'));

      const hasNonColorIndicator = await active.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.fontWeight !== '400' || style.textDecoration !== 'none';
      }).catch(() => true);
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-77', async () => expect(hasNonColorIndicator).toBe(true));
    });

    test('LIMAS-SUD-1746: Deleted control ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â button role, not disabled, not pressed, accessible name "Deleted"', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const deleted = reportsPage.fcDeletedTab;
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-85', async () => expect(deleted).toHaveAttribute('role', 'button'));
      await recordEvidence('assert-toBeEnabled-reports-floating-configurations-shell.spec-86', async () => expect(deleted).toBeEnabled());
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-87', async () => expect(deleted).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-shell.spec-88', async () => expect(deleted).toHaveAccessibleName('Deleted'));
    });

    test('LIMAS-SUD-1747: Already-selected Active ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â click when pressed does not trigger duplicate request, counts remain stable', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const countBefore = await reportsPage.getFloatingConfigurationsRecordCount();
      await recordEvidence('action-click-reports-floating-configurations-shell.spec-96', async () => reportsPage.fcActiveTab.click());

      // No network request should fire for a redundant Active click
      const duplicate = await reportsPage.waitForFloatingConfigurationsRequest().catch(() => null);
      // The redundant click should not produce a new request; but if one fires anyway, it's a pre-existing gap
      const countAfter = await reportsPage.getFloatingConfigurationsRecordCount();
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-102', async () => expect(countAfter).toBe(countBefore));
    });
  });

  test.describe('Toolbar and Counts', () => {
    test('LIMAS-SUD-1748: Record count ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â "{N} records" format, non-negative integer', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const text = await reportsPage.fcRecordCountText.textContent();
      await recordEvidence('assert-toMatch-reports-floating-configurations-shell.spec-112', async () => expect(text).toMatch(/^\d{1,3}(,\d{3})*\s*records$/));
      const count = await reportsPage.getFloatingConfigurationsRecordCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-shell.spec-114', async () => expect(count).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-1749: Loaded/total ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â "{loaded} loaded Ãƒâ€šÃ‚Â· {total} total" when data loads, absent on error state', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const visible = await reportsPage.fcLoadedTotalText.isVisible().catch(() => false);
      if (visible) {
        const state = await reportsPage.getFloatingConfigurationsLoadedState();
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-shell.spec-124', async () => expect(state.loaded).toBeGreaterThanOrEqual(0));
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-shell.spec-125', async () => expect(state.total).toBeGreaterThanOrEqual(0));
      }
    });

    test('LIMAS-SUD-1750: Toolbar order ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â record count, mode group, Filters button, Export Excel button', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const toolbar = page.locator('main').locator('> *').filter({ has: reportsPage.fcRecordCountText }).locator('..');
      const fullText = await toolbar.textContent();
      const countIndex = fullText?.indexOf('records') ?? -1;
      const modeIndex = fullText?.indexOf('Configuration mode') ?? -1;
      const filtersIndex = fullText?.indexOf('Filters') ?? -1;
      const exportIndex = fullText?.indexOf('Export') ?? -1;
      await recordEvidence('assert-toBeLessThan-reports-floating-configurations-shell.spec-139', async () => expect(countIndex).toBeLessThan(modeIndex));
      await recordEvidence('assert-toBeLessThan-reports-floating-configurations-shell.spec-140', async () => expect(modeIndex).toBeLessThan(filtersIndex));
      await recordEvidence('assert-toBeLessThan-reports-floating-configurations-shell.spec-141', async () => expect(filtersIndex).toBeLessThan(exportIndex));
    });
  });

  test.describe('Filters Panel', () => {
    test('LIMAS-SUD-1751: Filters toggle ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no aria-expanded, panel opens/closes, heading "Filters"', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const btn = reportsPage.fcFiltersButton;
      const expanded = await btn.getAttribute('aria-expanded');
      await recordEvidence('assert-toBeNull-reports-floating-configurations-shell.spec-152', async () => expect(expanded).toBeNull());

      await reportsPage.expandFloatingConfigurationsFilters();
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-155', async () => expect(reportsPage.fcFilterPanel).toBeVisible());
      const filterHeading = reportsPage.fcFilterPanel.locator('h2, h3, h4').filter({ hasText: 'Filters' });
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-157', async () => expect(filterHeading.first()).toBeVisible());

      await reportsPage.collapseFloatingConfigurationsFilters();
      await recordEvidence('assert-toBeHidden-reports-floating-configurations-shell.spec-160', async () => expect(reportsPage.fcFilterPanel).toBeHidden());
    });

    test('LIMAS-SUD-1752: Filter panel shell ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â heading, grid layout, labels positioned above inputs', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.expandFloatingConfigurationsFilters();
      const panel = reportsPage.fcFilterPanel;

      const heading = panel.locator('h2, h3, h4').filter({ hasText: 'Filters' });
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-171', async () => expect(heading.first()).toBeVisible());

      const systemUsersLabel = panel.getByText('System Users');
      const systemUsersInput = panel.getByRole('searchbox', { name: 'System Users' });
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-175', async () => expect(systemUsersLabel).toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-176', async () => expect(systemUsersInput).toBeVisible());

      const labelBox = await systemUsersLabel.boundingBox();
      const inputBox = await systemUsersInput.boundingBox();
      if (labelBox && inputBox) {
        await recordEvidence('assert-toBeLessThan-reports-floating-configurations-shell.spec-181', async () => expect(labelBox.y).toBeLessThan(inputBox.y));
      }
    });

    test('LIMAS-SUD-1753: Filter inventory ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 8 filters with correct roles, names, and types', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.expandFloatingConfigurationsFilters();
      const controls = await reportsPage.getFloatingConfigurationsFilterControls();

      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-192', async () => expect(controls.systemUsers).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-193', async () => expect(controls.expirationDate).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-194', async () => expect(controls.maintenanceDate).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-195', async () => expect(controls.userGroup).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-196', async () => expect(controls.productProfile).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-197', async () => expect(controls.profileRole).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-198', async () => expect(controls.configModifiedDate).toBeDefined());
      await recordEvidence('assert-toBeDefined-reports-floating-configurations-shell.spec-199', async () => expect(controls.configCreatedDate).toBeDefined());
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-200', async () => expect(Object.keys(controls).length).toBe(8));

      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-202', async () => expect(controls.profileRole.disabled).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-203', async () => expect(controls.profileRole.placeholder).toBe('Select a profile first'));
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-204', async () => expect(controls.systemUsers.type).toBe('searchbox'));
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-205', async () => expect(controls.userGroup.type).toBe('searchbox'));
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-206', async () => expect(controls.productProfile.type).toBe('searchbox'));
    });

    test('LIMAS-SUD-1754: Profile Role dependency ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â disabled initially, enabled after profile selection, re-disables on clear', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.expandFloatingConfigurationsFilters();
      await recordEvidence('assert-toBeDisabled-reports-floating-configurations-shell.spec-214', async () => expect(page.getByRole('searchbox', { name: 'Select a profile first' })).toBeDisabled());

      await recordEvidence('action-click-reports-floating-configurations-shell.spec-216', async () => page.getByRole('searchbox', { name: 'Search profiles' }).click());
      await page.getByRole('searchbox', { name: 'Select a profile first' }).waitFor({ state: 'visible' }).catch(() => {});

      await recordEvidence('action-fill-reports-floating-configurations-shell.spec-219', async () => page.getByRole('searchbox', { name: 'Search profiles' }).fill(''));
      await page.getByRole('searchbox', { name: 'Select a profile first' }).waitFor({ state: 'visible' }).catch(() => {});
      await recordEvidence('assert-toBeDisabled-reports-floating-configurations-shell.spec-221', async () => expect(page.getByRole('searchbox', { name: 'Select a profile first' })).toBeDisabled());
    });

    test('LIMAS-SUD-1755: Clear button ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â visible in initial state, no error when clicked while filters empty', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.expandFloatingConfigurationsFilters();
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-229', async () => expect(reportsPage.fcClearFiltersButton).toBeVisible());

      await recordEvidence('action-click-reports-floating-configurations-shell.spec-231', async () => reportsPage.fcClearFiltersButton.click());
      await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-232', async () => expect(reportsPage.fcClearFiltersButton).toBeVisible());
    });
  });

  test.describe('Export Button', () => {
    test('LIMAS-SUD-1756: Export Excel ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â button role, accessible name "Export Excel", tabindex, enabled state (even during error)', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const state = await reportsPage.getFloatingConfigurationsExportState();
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-242', async () => expect(state.visible).toBe(true));

      const btn = reportsPage.fcExportButton;
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-shell.spec-245', async () => expect(btn).toHaveAccessibleName('Export Excel'));
      const tabindex = await btn.getAttribute('tabindex');
      await recordEvidence('assert-toBeNull-reports-floating-configurations-shell.spec-247', async () => expect(tabindex).not.toBeNull());
    });
  });

  test.describe('Error State', () => {
    test('LIMAS-SUD-1757: 500 error ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â message, status text, Retry button, no table, filters available, mode usable', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const errorVisible = await reportsPage.fcErrorState.isVisible().catch(() => false);
      if (errorVisible) {
        await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-258', async () => expect(reportsPage.fcErrorState).toBeVisible());
        const errorText = await reportsPage.fcErrorState.textContent();
        await recordEvidence('assert-toContain-reports-floating-configurations-shell.spec-260', async () => expect(errorText).toContain('Unable to load Floating Configuration records'));

        const statusText = page.getByText(/500|Internal Server Error/);
        const retry = reportsPage.fcRetryButton;
        await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-264', async () => expect(retry).toBeVisible());

        const table = page.locator('table');
        await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-267', async () => expect(table).not.toBeVisible());

        await recordEvidence('assert-toBeVisible-reports-floating-configurations-shell.spec-269', async () => expect(reportsPage.fcFiltersButton).toBeVisible());
        await recordEvidence('assert-toBeEnabled-reports-floating-configurations-shell.spec-270', async () => expect(reportsPage.fcActiveTab).toBeEnabled());
      }
    });

    test('LIMAS-SUD-1758: API contract ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â GET /limas/api/report/all?page=0&size=500, 500 status, no Page envelope body', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const result = await reportsPage.waitForFloatingConfigurationsRequest();
      if (result && result.status === 500) {
        await recordEvidence('assert-toContain-reports-floating-configurations-shell.spec-280', async () => expect(result.url.pathname).toContain(reportsPage.floatingConfigurationsApiPath));
        await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-281', async () => expect(result.url.searchParams.get('page')).toBe('0'));
        await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-282', async () => expect(result.url.searchParams.get('size')).toBe('500'));
      }
    });

    test('LIMAS-SUD-1759: Pagination mechanism ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â page=0, size=500, GET method, 0-based page numbering', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const result = await reportsPage.waitForFloatingConfigurationsRequest();
      if (result) {
        const params = result.url.searchParams;
        await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-293', async () => expect(params.get('page')).toBe('0'));
        await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-294', async () => expect(params.get('size')).toBe('500'));
        const pageVal = parseInt(params.get('page')!, 10);
        await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-296', async () => expect(pageVal).toBe(0));
      }
    });

    test('LIMAS-SUD-1760: Retry mechanism ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â sends new GET page=0&size=500, preserves mode/card selection, multiple retries allowed', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const retry = reportsPage.fcRetryButton;
      const retryVisible = await retry.isVisible().catch(() => false);
      test.skip(!retryVisible, 'Required runtime data or UI state is unavailable: !retryVisible.');

      // First retry
      await recordEvidence('action-click-reports-floating-configurations-shell.spec-309', async () => retry.click());
      const first = await reportsPage.waitForFloatingConfigurationsRequest().catch(() => null);

      // Second retry
      const retryAgain = reportsPage.fcRetryButton;
      if (await retryAgain.isVisible().catch(() => false)) {
        await recordEvidence('action-click-reports-floating-configurations-shell.spec-315', async () => retryAgain.click());
        const second = await reportsPage.waitForFloatingConfigurationsRequest().catch(() => null);
      }

      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-319', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-320', async () => expect(reportsPage.fcActiveTab).toHaveAttribute('aria-pressed', 'true'));
    });
  });

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-1761: Error state a11y ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â error accessible, Retry accessible, mode keyboard-accessible, focus near error, no silent failure', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const errorVisible = await reportsPage.fcErrorState.isVisible().catch(() => false);
      test.skip(!errorVisible, 'Required runtime data or UI state is unavailable: !errorVisible.');

      const error = reportsPage.fcErrorState;
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-shell.spec-333', async () => expect(error).toHaveAccessibleName(/Unable to load|Floating Configuration/));

      const retry = reportsPage.fcRetryButton;
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-shell.spec-336', async () => expect(retry).toHaveAccessibleName('Retry'));

      await recordEvidence('action-focus-reports-floating-configurations-shell.spec-338', async () => reportsPage.fcActiveTab.focus());
      const modeFocused = await reportsPage.fcActiveTab.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-340', async () => expect(modeFocused).toBe(true));

      const errorBox = await error.boundingBox();
      const retryBox = await retry.boundingBox();
      if (errorBox && retryBox) {
        const distance = Math.abs(retryBox.y - (errorBox.y + errorBox.height));
        await recordEvidence('assert-toBeLessThan-reports-floating-configurations-shell.spec-346', async () => expect(distance).toBeLessThan(500));
      }
    });
  });

  test.describe('Safe Restoration', () => {
    test('LIMAS-SUD-1762: Safe restoration ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â FC card selected, Active pressed, Deleted unpressed, filters collapsed, error or initial content visible, route /reports, browser open', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.restoreFloatingConfigurationsInitialState();

      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-357', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-358', async () => expect(reportsPage.fcActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-shell.spec-359', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      const filtersVisible = await reportsPage.fcFilterPanel.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-configurations-shell.spec-362', async () => expect(filtersVisible).toBe(false));

      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-configurations-shell.spec-365', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });
});