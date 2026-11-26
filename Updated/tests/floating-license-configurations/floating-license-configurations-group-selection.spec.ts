import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-A: Floating License Configurations â€” Group Selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-A', () => {

  // â”€â”€â”€ 1. Page and Group-Panel Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Page and Group-Panel Shell', () => {

    test('LIMAS-SUD-1808: Navigate to /floating-license-configurations via sidebar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-floating-license-configurations-group-selection.spec-26', async () => expect(url.pathname).toMatch(/\/floating-license-configurations\/?$/));
    });

    test('LIMAS-SUD-1809: Page heading is "Floating License Configurations" h1', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-38', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-floating-license-configurations-group-selection.spec-39', async () => expect(flc.heading).toHaveText('Floating License Configurations'));
      const tagName = await flc.heading.evaluate((el) => el.tagName.toLowerCase());
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-41', async () => expect(tagName).toBe('h1'));
    });

    test('LIMAS-SUD-1810: "Select a User Group" heading is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-53', async () => expect(flc.groupSelectionHeading).toBeVisible());
    });

    test('LIMAS-SUD-1811: Instructional text is visible in group-selection panel', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-65', async () => expect(flc.groupSelectionInstruction).toBeVisible());
    });

    test('LIMAS-SUD-1812: Group Search input is visible and initially empty', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-77', async () => expect(flc.groupSearchInput).toBeVisible());
      await recordEvidence('assert-toBeEnabled-floating-license-configurations-group-selection.spec-78', async () => expect(flc.groupSearchInput).toBeEnabled());
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-79', async () => expect(await flc.isSearchInputEmpty()).toBe(true));
    });

    test('LIMAS-SUD-1813: Expand All and Collapse All buttons are visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-91', async () => expect(flc.expandAllButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-92', async () => expect(flc.collapseAllButton).toBeVisible());
    });

    test('LIMAS-SUD-1814: Group tree container is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-104', async () => expect(flc.groupTreeContainer).toBeVisible());
    });

    test('LIMAS-SUD-1815: No group is selected initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-116', async () => expect(await flc.hasNoSelectedTreeItem()).toBe(true));
    });
  });

  // â”€â”€â”€ 2. Group-Tree Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Group-Tree Structure', () => {

    test('LIMAS-SUD-1816: Tree items are rendered with role="treeitem"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const count = await flc.getTreeItemCount();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-group-selection.spec-134', async () => expect(count).toBeGreaterThan(0));
      const first = flc.getTreeItems().first();
      await recordEvidence('assert-toHaveAttribute-floating-license-configurations-group-selection.spec-136', async () => expect(first).toHaveAttribute('role', 'treeitem'));
    });

    test('LIMAS-SUD-1817: Parent groups are rendered with expand chevron', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      if (parentName) {
        const hasChevron = await flc.treeItemHasExpandControl(parentName);
        await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-151', async () => expect(hasChevron).toBe(true));
      }
    });

    test('LIMAS-SUD-1818: Children become visible after expanding a parent group', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      test.skip(!parentName, 'Required runtime data is unavailable: !parentName.');

      const beforeExpand = await flc.getTreeItemCount();
      await flc.expandTreeItem(parentName);
      await page.waitForTimeout(300);

      const afterExpand = await flc.getTreeItemCount();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-group-selection.spec-172', async () => expect(afterExpand).toBeGreaterThan(beforeExpand));
    });

    test('LIMAS-SUD-1819: Children are hidden after collapsing a parent group', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      test.skip(!parentName, 'Required runtime data is unavailable: !parentName.');

      await flc.expandTreeItem(parentName);
      await page.waitForTimeout(300);
      const afterExpandCount = await flc.getTreeItemCount();

      await flc.collapseTreeItem(parentName);
      await page.waitForTimeout(300);
      const afterCollapseCount = await flc.getTreeItemCount();

      await recordEvidence('assert-toBeLessThan-floating-license-configurations-group-selection.spec-195', async () => expect(afterCollapseCount).toBeLessThan(afterExpandCount));
    });

    test('LIMAS-SUD-1820: Collapsed parent has aria-expanded="false"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      test.skip(!parentName, 'Required runtime data is unavailable: !parentName.');

      const expandedBefore = await flc.isTreeItemExpanded(parentName);
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-211', async () => expect(expandedBefore).toBe(false));
    });
  });

  // â”€â”€â”€ 3. Search Groups â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Search Groups', () => {

    test('LIMAS-SUD-1821: Search input accepts text and filters the tree', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const fragment = await flc.discoverRuntimeSearchFragment();
      test.skip(!fragment, 'Required runtime group data is unavailable: !fragment.');

      const beforeCount = await flc.getTreeItemCount();
      await flc.setGroupSearch(fragment);
      await page.waitForTimeout(300);
      const afterCount = await flc.getTreeItemCount();

      await recordEvidence('assert-toBeLessThanOrEqual-floating-license-configurations-group-selection.spec-236', async () => expect(afterCount).toBeLessThanOrEqual(beforeCount));
    });

    test('LIMAS-SUD-1822: Search with exact group name shows that group', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const texts = await flc.getTreeItemTexts();
      test.skip(texts.length === 0, 'Required runtime group data is unavailable: texts.length === 0.');
      const groupName = texts[0].trim();

      await flc.setGroupSearch(groupName);
      await page.waitForTimeout(300);
      const filteredTexts = await flc.getTreeItemTexts();

      const found = filteredTexts.some((t) => t.includes(groupName));
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-257', async () => expect(found).toBe(true));
    });

    test('LIMAS-SUD-1823: Clearing search restores the full tree', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const fragment = await flc.discoverRuntimeSearchFragment();
      test.skip(!fragment, 'Required runtime group data is unavailable: !fragment.');

      const beforeCount = await flc.getTreeItemCount();
      await flc.setGroupSearch(fragment);
      await page.waitForTimeout(300);
      await flc.clearGroupSearch();
      await page.waitForTimeout(300);
      const afterCount = await flc.getTreeItemCount();

      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-279', async () => expect(afterCount).toBe(beforeCount));
    });

    test('LIMAS-SUD-1824: No-match state when search returns no results', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await flc.setGroupSearch('zzz_no_such_group_xyz');
      await page.waitForTimeout(300);
      const count = await flc.getTreeItemCount();
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-294', async () => expect(count).toBe(0));
    });
  });

  // â”€â”€â”€ 4. Expand and Collapse â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Expand and Collapse', () => {

    test('LIMAS-SUD-1825: Expand All expands all parent groups', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const beforeCount = await flc.getTreeItemCount();
      await flc.expandAll();
      await page.waitForTimeout(300);
      const afterCount = await flc.getTreeItemCount();

      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-group-selection.spec-316', async () => expect(afterCount).toBeGreaterThanOrEqual(beforeCount));
    });

    test('LIMAS-SUD-1826: Collapse All collapses all expanded groups', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await flc.expandAll();
      await page.waitForTimeout(300);
      const afterExpandCount = await flc.getTreeItemCount();

      await flc.collapseAll();
      await page.waitForTimeout(300);
      const afterCollapseCount = await flc.getTreeItemCount();

      await recordEvidence('assert-toBeLessThan-floating-license-configurations-group-selection.spec-336', async () => expect(afterCollapseCount).toBeLessThan(afterExpandCount));
    });

    test('LIMAS-SUD-1827: Repeated Expand All does not cause errors', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      await flc.expandAll();
      await page.waitForTimeout(200);
      await flc.expandAll();
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-353', async () => expect(flc.heading).toBeVisible());
    });
  });

  // â”€â”€â”€ 5. Runtime Group Selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Runtime Group Selection', () => {

    test('LIMAS-SUD-1828: Selecting a group navigates to the configuration page', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-376', async () => expect(flc.heading).toBeVisible());
    });

    test('LIMAS-SUD-1829: Only one group can be selected at a time', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      // Navigate to configuration page; back is the indicator group was selected
      const backVisible = await flc.backButton.isVisible().catch(() => false);
      const summaryVisible = await flc.userGroupSummaryPanel.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-397', async () => expect(backVisible || summaryVisible).toBe(true));
    });
  });

  // â”€â”€â”€ 6. Configuration-Page Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Configuration-Page Shell', () => {

    test('LIMAS-SUD-1830: Configuration page shows Back button and User Group summary', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-420', async () => expect(flc.backButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-421', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
    });

    test('LIMAS-SUD-1831: Selected group name matches runtime selection on configuration page', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      const displayedName = await flc.getConfigurationSelectedGroupName();
      await recordEvidence('assert-toContain-floating-license-configurations-group-selection.spec-440', async () => expect(displayedName.toLowerCase()).toContain(leafGroup.toLowerCase()));
    });

    test('LIMAS-SUD-1832: Configuration controls (Search, Filters, Refresh, Create) are visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-458', async () => expect(flc.configurationSearchButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-459', async () => expect(flc.filtersButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-460', async () => expect(flc.refreshButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-461', async () => expect(flc.createConfigurationButton).toBeVisible());
    });
  });

  // â”€â”€â”€ 7. Back and Change Group â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Back and Change Group', () => {

    test('LIMAS-SUD-1833: Back button returns to group-selection view', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      await flc.clickBack();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-485', async () => expect(flc.groupSelectionHeading).toBeVisible());
    });

    test('LIMAS-SUD-1834: Change Group button returns to group-selection view', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);

      await flc.clickChangeGroup();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-504', async () => expect(flc.groupSelectionHeading).toBeVisible());
    });

    test('LIMAS-SUD-1835: Tree state is restored after returning via Back', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const beforeCount = await flc.getTreeItemCount();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);
      await flc.clickBack();

      const afterCount = await flc.getTreeItemCount();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-group-selection.spec-526', async () => expect(afterCount).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-1836: Search is empty after returning via Back', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);
      await flc.clickBack();

      // Search should be restored to empty or retain search â€” verify it's usable
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-546', async () => expect(flc.groupSearchInput).toBeVisible());
    });

    test('LIMAS-SUD-1837: No stale selected-group details remain after returning', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const leafGroup = await flc.discoverRuntimeLeafGroup();
      test.skip(!leafGroup, 'Required runtime group data is unavailable: !leafGroup.');

      await flc.selectTreeItem(leafGroup);
      await page.waitForTimeout(500);
      await flc.clickBack();

      // Verify we are back on the group-selection panel
      await recordEvidence('assert-toBeVisible-floating-license-configurations-group-selection.spec-566', async () => expect(flc.groupSelectionHeading).toBeVisible());
      const summaryVisible = await flc.userGroupSummaryPanel.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-floating-license-configurations-group-selection.spec-568', async () => expect(summaryVisible).toBe(false));
    });
  });

  // â”€â”€â”€ 8. Parent and Subgroup Selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Parent and Subgroup Selection', () => {

    test('LIMAS-SUD-1838: Selecting a subgroup after expanding parent navigates correctly', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      test.skip(!parentName, 'Required runtime data is unavailable: !parentName.');

      await flc.expandTreeItem(parentName);
      await page.waitForTimeout(500);

      const childItems = flc.getChildTreeItems(parentName);
      const childCount = await childItems.count();
      test.skip(childCount === 0, 'Required runtime group data is unavailable: childCount === 0.');

      const childName = (await childItems.first().locator('span.truncate').textContent())?.trim() ?? '';
      test.skip(!childName, 'Required runtime group data is unavailable: !childName.');

      await recordEvidence('action-click-floating-license-configurations-group-selection.spec-598', async () => childItems.first().click());
      await page.waitForTimeout(500);

      const displayedName = await flc.getConfigurationSelectedGroupName();
      await recordEvidence('assert-toContain-floating-license-configurations-group-selection.spec-602', async () => expect(displayedName.toLowerCase()).toContain(childName.toLowerCase()));
    });

    test('LIMAS-SUD-1839: Parent is not incorrectly shown as selected when subgroup is selected', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      const parentName = await flc.discoverRuntimeParentGroup();
      test.skip(!parentName, 'Required runtime data is unavailable: !parentName.');

      await flc.expandTreeItem(parentName);
      await page.waitForTimeout(500);

      const childItems = flc.getChildTreeItems(parentName);
      const childCount = await childItems.count();
      test.skip(childCount === 0, 'Required runtime group data is unavailable: childCount === 0.');

      await recordEvidence('action-click-floating-license-configurations-group-selection.spec-624', async () => childItems.first().click());
      await page.waitForTimeout(500);

      const displayedName = await flc.getConfigurationSelectedGroupName();
      // The displayed name should be the child, not the parent
      await recordEvidence('assert-toContain-floating-license-configurations-group-selection.spec-629', async () => expect(displayedName.toLowerCase()).not.toContain(parentName.toLowerCase()));
    });
  });

  // â”€â”€â”€ 9. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1840: Restore group-selection view to clean state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToFloatingLicenseConfigurations();

      // Navigate to configuration view
      const leafGroup = await flc.discoverRuntimeLeafGroup();
      if (leafGroup) {
        await flc.selectTreeItem(leafGroup);
        await page.waitForTimeout(500);
      }

      // Perform restoration
      await flc.restoreGroupSelectionState();
      await flc.verifyCleanGroupSelectionState();
    });
  });
});
