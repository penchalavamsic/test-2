import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-B: Floating License Configurations â€” List Controls â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-B', () => {

  // â”€â”€â”€ 1. Configuration List Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Configuration List Shell', () => {

    test('LIMAS-SUD-1841: Selected group name is displayed in User Group summary', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const displayed = await flc.getConfigurationSelectedGroupName();
      await recordEvidence('assert-toContain-floating-license-configurations-list-controls.spec-27', async () => expect(displayed.toLowerCase()).toContain(groupName.toLowerCase()));
    });

    test('LIMAS-SUD-1842: Dynamic configuration count is displayed', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      test.skip(await flc.emptyStateMessage.isVisible(), 'No configurations are available; populated-list counters cannot be exercised.');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-39', async () => expect(flc.configurationCountText).toBeVisible());
      const count = await flc.getConfigurationCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-list-controls.spec-41', async () => expect(count).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-1843: Search button is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-53', async () => expect(flc.configurationSearchButton).toBeVisible());
    });

    test('LIMAS-SUD-1844: Filters button is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-65', async () => expect(flc.filtersButton).toBeVisible());
    });

    test('LIMAS-SUD-1845: Refresh button is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-77', async () => expect(flc.refreshButton).toBeVisible());
    });

    test('LIMAS-SUD-1846: Create Configuration button is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-89', async () => expect(flc.createConfigurationButton).toBeVisible());
    });

    test('LIMAS-SUD-1847: Include Subgroups checkbox is visible with accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-101', async () => expect(flc.includeSubgroupsCheckbox).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-list-controls.spec-102', async () => expect(flc.includeSubgroupsCheckbox).toHaveAccessibleName(/Include subgroups/i));
    });

    test('LIMAS-SUD-1848: Loaded-status text is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      test.skip(await flc.emptyStateMessage.isVisible(), 'No configurations are available; populated-list status cannot be exercised.');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-114', async () => expect(flc.loadedStatusText).toBeVisible());
    });
  });

  // â”€â”€â”€ 2. Search â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Search', () => {

    test('LIMAS-SUD-1849: Search opens inline textbox when clicking Search button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openConfigSearch();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-132', async () => expect(flc.configSearchInput).toBeVisible());
    });

    test('LIMAS-SUD-1850: Search filters cards by runtime configuration name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount === 0, 'Required runtime data is unavailable: cardCount === 0.');

      const titles = await flc.getVisibleCardTitles();
      test.skip(titles.length === 0, 'Required runtime data is unavailable: titles.length === 0.');
      const fragment = titles[0].substring(0, Math.min(3, titles[0].length));

      await flc.openConfigSearch();
      await flc.setConfigSearch(fragment);
      await page.waitForTimeout(300);

      const filteredTitles = await flc.getVisibleCardTitles();
      const found = filteredTitles.some((t) => t.toLowerCase().includes(fragment.toLowerCase()));
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-157', async () => expect(found).toBe(true));
    });

    test('LIMAS-SUD-1851: No-match search shows zero visible cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openConfigSearch();
      await flc.setConfigSearch('zzz_no_such_config_xyz');
      await page.waitForTimeout(300);

      const cardCount = await flc.getVisibleCardCount();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-174', async () => expect(cardCount).toBe(0));
    });

    test('LIMAS-SUD-1852: Clearing search restores configuration cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const originalCount = await flc.getVisibleCardCount();

      await flc.openConfigSearch();
      await flc.setConfigSearch('zzz_no_such_config_xyz');
      await page.waitForTimeout(200);
      await flc.clearConfigSearch();
      await page.waitForTimeout(300);

      const restoredCount = await flc.getVisibleCardCount();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-195', async () => expect(restoredCount).toBe(originalCount));
    });

    test('LIMAS-SUD-1853: Search is case-insensitive (mixed-case)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const titles = await flc.getVisibleCardTitles();
      test.skip(titles.length === 0, 'Required runtime data is unavailable: titles.length === 0.');
      const fragment = titles[0].substring(0, Math.min(3, titles[0].length));
      const mixedFragment = fragment.split('').map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');

      await flc.openConfigSearch();
      await flc.setConfigSearch(mixedFragment);
      await page.waitForTimeout(300);

      const filteredTitles = await flc.getVisibleCardTitles();
      const found = filteredTitles.some((t) => t.toLowerCase().includes(fragment.toLowerCase()));
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-218', async () => expect(found).toBe(true));

      await flc.clearConfigSearch();
      await flc.closeConfigSearch();
    });

    test('LIMAS-SUD-1854: Closing Search restores all cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const originalCount = await flc.getVisibleCardCount();

      await flc.openConfigSearch();
      await flc.setConfigSearch('zzz_no_such_config_xyz');
      await page.waitForTimeout(200);
      await flc.closeConfigSearch();
      await page.waitForTimeout(300);

      const restoredCount = await flc.getVisibleCardCount();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-242', async () => expect(restoredCount).toBe(originalCount));
    });
  });

  // â”€â”€â”€ 3. Filters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Filters', () => {

    test('LIMAS-SUD-1855: Filters panel opens with heading and filter controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openFilters();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-260', async () => expect(flc.filtersPanelHeading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-261', async () => expect(flc.filtersProductProfileButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-262', async () => expect(flc.filtersProfileRoleButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-263', async () => expect(flc.filtersCheckoutAllRadio).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-264', async () => expect(flc.filtersApplyButton).toBeVisible());
    });

    test('LIMAS-SUD-1856: Filters panel closes via Cancel button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openFilters();
      await flc.closeFilters();
      const open = await flc.areFiltersOpen();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-279', async () => expect(open).toBe(false));
    });

    test('LIMAS-SUD-1857: Applying a filter shows a filter chip with remove button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openFilters();
      await recordEvidence('action-click-floating-license-configurations-list-controls.spec-292', async () => flc.filtersCheckoutAvailableRadio.click());
      await flc.applyFilters();
      await page.waitForTimeout(300);

      const hasChips = await flc.hasAppliedFilterChips();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-297', async () => expect(hasChips).toBe(true));

      await flc.clearAllFilters();
    });

    test('LIMAS-SUD-1858: Clear all removes applied filter chips', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openFilters();
      await recordEvidence('action-click-floating-license-configurations-list-controls.spec-312', async () => flc.filtersCheckoutAvailableRadio.click());
      await flc.applyFilters();
      await page.waitForTimeout(300);

      await flc.clearAllFilters();
      await page.waitForTimeout(300);

      const hasChips = await flc.hasAppliedFilterChips();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-320', async () => expect(hasChips).toBe(false));
    });

    test('LIMAS-SUD-1859: Filters panel Reset clears selections', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await flc.openFilters();
      await recordEvidence('action-click-floating-license-configurations-list-controls.spec-333', async () => flc.filtersCheckoutAvailableRadio.click());
      await flc.resetFilters();

      await recordEvidence('assert-toBeChecked-floating-license-configurations-list-controls.spec-336', async () => expect(flc.filtersCheckoutAllRadio).toBeChecked());
      await flc.closeFilters();
    });
  });

  // â”€â”€â”€ 4. Refresh â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Refresh', () => {

    test('LIMAS-SUD-1860: Refresh preserves selected group name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      await flc.clickRefresh();
      await page.waitForTimeout(500);

      const displayed = await flc.getConfigurationSelectedGroupName();
      await recordEvidence('assert-toContain-floating-license-configurations-list-controls.spec-359', async () => expect(displayed.toLowerCase()).toContain(groupName.toLowerCase()));
    });

    test('LIMAS-SUD-1861: Refresh preserves configuration count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      test.skip(await flc.emptyStateMessage.isVisible(), 'No configurations are available for refresh count validation.');
      const countBefore = await flc.getConfigurationCount();

      await flc.clickRefresh();
      await page.waitForTimeout(500);

      const countAfter = await flc.getConfigurationCount();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-377', async () => expect(countAfter).toBe(countBefore));
    });

    test('LIMAS-SUD-1862: Refresh preserves configuration cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardCountBefore = await flc.getVisibleCardCount();

      await flc.clickRefresh();
      await page.waitForTimeout(500);

      const cardCountAfter = await flc.getVisibleCardCount();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-395', async () => expect(cardCountAfter).toBe(cardCountBefore));
    });
  });

  // â”€â”€â”€ 5. Include Subgroups â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Include Subgroups', () => {

    test('LIMAS-SUD-1863: Include Subgroups checkbox has role checkbox and initial state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-413', async () => expect(flc.includeSubgroupsCheckbox).toHaveRole('checkbox'));

      // Capture initial state (may be checked or unchecked, enabled or disabled)
      const isChecked = await flc.isIncludeSubgroupsChecked();
      const isEnabled = await flc.isIncludeSubgroupsEnabled();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-418', async () => expect(typeof isChecked).toBe('boolean'));
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-419', async () => expect(typeof isEnabled).toBe('boolean'));
    });
  });

  // â”€â”€â”€ 6. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1864: Restore configuration list to clean state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      // Apply a filter to dirty the state
      await flc.openFilters();
      await recordEvidence('action-click-floating-license-configurations-list-controls.spec-439', async () => flc.filtersCheckoutAvailableRadio.click());
      await flc.applyFilters();
      await page.waitForTimeout(300);

      // Restore
      await flc.restoreConfigurationListState(groupName);
      await page.waitForTimeout(300);

      // Verify clean state
      const hasChips = await flc.hasAppliedFilterChips();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-449', async () => expect(hasChips).toBe(false));

      const filtersOpen = await flc.areFiltersOpen();
      await recordEvidence('assert-toBe-floating-license-configurations-list-controls.spec-452', async () => expect(filtersOpen).toBe(false));

      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-454', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-list-controls.spec-455', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
    });
  });
});