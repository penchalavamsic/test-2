import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class FloatingLicenseConfigurationsPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Group-selection panel
  readonly groupSelectionPanel: Locator;
  readonly groupSelectionHeading: Locator;
  readonly groupSelectionInstruction: Locator;
  readonly groupSearchInput: Locator;
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly groupTreeContainer: Locator;

  // Configuration-page shell
  readonly backButton: Locator;
  readonly userGroupSummaryPanel: Locator;
  readonly selectedGroupName: Locator;
  readonly includeSubgroupsCheckbox: Locator;
  readonly changeGroupButton: Locator;
  readonly configurationCountText: Locator;
  readonly configurationSearchButton: Locator;
  readonly filtersButton: Locator;
  readonly refreshButton: Locator;
  readonly createConfigurationButton: Locator;
  readonly loadedStatusText: Locator;

  // FLC-B: Inline search bar (opens when Search button clicked)
  readonly configSearchInput: Locator;
  readonly configSearchCloseButton: Locator;

  // FLC-B: Filters panel (inline, not dialog)
  readonly filtersPanelHeading: Locator;
  readonly filtersCloseButton: Locator;
  readonly filtersProductProfileButton: Locator;
  readonly filtersProfileRoleButton: Locator;
  readonly filtersExpirationInput: Locator;
  readonly filtersMaintenanceInput: Locator;
  readonly filtersCheckoutAllRadio: Locator;
  readonly filtersCheckoutAvailableRadio: Locator;
  readonly filtersCheckoutUnavailableRadio: Locator;
  readonly filtersResetButton: Locator;
  readonly filtersCancelButton: Locator;
  readonly filtersApplyButton: Locator;

  // FLC-B: Applied filter chips
  readonly filterChips: Locator;
  readonly clearAllFiltersButton: Locator;

  // FLC-B: Configuration cards
  readonly configurationCards: Locator;
  readonly configurationCardCheckboxes: Locator;

  // FLC-C: Card field accessors (dynamic)
  readonly cardCheckbox: (name: string) => Locator;
  readonly cardActionsButton: (name: string) => Locator;

  // FLC-C: Selection toolbar
  readonly selectionToolbar: Locator;
  readonly selectionCountText: Locator;
  readonly selectLoadedButton: Locator;
  readonly clearSelectionButton: Locator;
  readonly selectionDatesButton: Locator;
  readonly selectionCapacityButton: Locator;
  readonly selectionDeleteButton: Locator;

  // FLC-C: Card action menu
  readonly cardMenu: Locator;
  readonly cardMenuViewDetails: Locator;
  readonly cardMenuEdit: Locator;
  readonly cardMenuDelete: Locator;

  // FLC-D: Dates inline panel
  readonly datesPanelHeading: Locator;
  readonly datesExpirationInput: Locator;
  readonly datesMaintenanceInput: Locator;
  readonly datesUseExpirationForMaintenanceCheckbox: Locator;
  readonly datesCancelButton: Locator;
  readonly datesApplyButton: Locator;

  // FLC-D: Capacity inline panel
  readonly capacityPanelHeading: Locator;
  readonly capacityNumberOfLicensesInput: Locator;
  readonly capacityMaxCheckoutInput: Locator;
  readonly capacityCancelButton: Locator;
  readonly capacityApplyButton: Locator;

  // FLC-D: Delete state
  readonly deleteExecutingButton: Locator;

  // FLC-H: Delete action
  readonly cardDeleteMenuItem: Locator;

  // FLC-F: View Details panel
  readonly viewDetailsMenu: Locator;
  readonly detailsPanel: (name: string) => Locator;
  readonly detailsPanelHeading: Locator;
  readonly detailsCloseButton: (name: string) => Locator;
  readonly detailsField: (fieldLabel: string) => Locator;
  readonly detailsFeatureNote: Locator;
  readonly detailsConfigurationId: Locator;
  readonly detailsVersionId: Locator;
  readonly detailsSystemUserId: Locator;

  // FLC-G: Edit Configuration form
  readonly editFormHeading: Locator;
  readonly editCancelButton: Locator;
  readonly editUserGroupCombo: Locator;
  readonly editProductProfileCombo: Locator;
  readonly editProfileRoleCombo: Locator;
  readonly editNumberOfLicensesInput: Locator;
  readonly editMaxCheckoutInput: Locator;
  readonly editAvailableRadio: Locator;
  readonly editUnavailableRadio: Locator;
  readonly editExpirationDateInput: Locator;
  readonly editMaintenanceDateInput: Locator;
  readonly editResetButton: Locator;
  readonly editSaveButton: Locator;

  // FLC-E: Create Configuration form
  readonly createFormHeading: Locator;
  readonly createFormCancelButton: Locator;
  readonly createUserGroupCombo: Locator;
  readonly createProductProfileCombo: Locator;
  readonly createProfileRoleCombo: Locator;
  readonly createNumberOfLicensesInput: Locator;
  readonly createMaxCheckoutInput: Locator;
  readonly createAvailableRadio: Locator;
  readonly createUnavailableRadio: Locator;
  readonly createExpirationDateInput: Locator;
  readonly createMaintenanceDateInput: Locator;
  readonly createResetButton: Locator;
  readonly createSaveButton: Locator;

  // FLC-B: Empty state
  readonly emptyStateMessage: Locator;
  readonly emptyStateDescription: Locator;

  // Sidebar navigation
  readonly sidebarFloatingLicenseConfigsLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Floating License Configurations', level: 1 });
    this.mainContent = page.locator('main');
    this.footer = page.getByText('© KPIT Technologies Ltd. All rights reserved.');

    // Group-selection panel
    this.groupSelectionPanel = page.locator('[class*="rounded"], .border').filter({ hasText: 'Select a User Group' });
    this.groupSelectionHeading = page.getByText('Select a User Group', { exact: true });
    this.groupSelectionInstruction = page.getByText('Choose a group to view its Floating License Configurations.', { exact: true });
    this.groupSearchInput = page.getByPlaceholder(/Search groups/i);
    this.expandAllButton = page.getByRole('button', { name: /Expand All/i });
    this.collapseAllButton = page.getByRole('button', { name: /Collapse All/i });
    this.groupTreeContainer = page.getByRole('tree', { name: 'User Groups' });

    // Configuration-page shell
    this.backButton = page.getByRole('button', { name: /Back/i });
    this.userGroupSummaryPanel = page.getByText('User Group', { exact: true }).locator('..');
    this.selectedGroupName = this.userGroupSummaryPanel.locator('p').nth(1);
    this.includeSubgroupsCheckbox = page.getByRole('checkbox', { name: /Include subgroups/i });
    this.changeGroupButton = page.getByRole('button', { name: /Change Group/i });
    this.configurationCountText = page.getByText(/\d+\s*configuration/i).first();

    // Search: button that toggles an inline search bar
    this.configurationSearchButton = page.getByRole('button', { name: 'Search' });
    this.configSearchInput = page.getByRole('textbox', { name: /Search loaded configurations/i });
    this.configSearchCloseButton = page.getByRole('button', { name: 'Close' });

    // Filters: inline panel (not a dialog)
    this.filtersButton = page.getByRole('button', { name: 'Filters' });
    this.filtersPanelHeading = page.getByText('Configuration Filters');
    this.filtersCloseButton = page.getByRole('button', { name: /Close filters/i });
    this.filtersProductProfileButton = page.getByRole('button', { name: /All profiles/i });
    this.filtersProfileRoleButton = page.getByRole('button', { name: /All roles/i });
    this.filtersExpirationInput = page.getByRole('textbox', { name: /Expiration \(on or before\)/i });
    this.filtersMaintenanceInput = page.getByRole('textbox', { name: /Maintenance \(on or before\)/i });
    this.filtersCheckoutAllRadio = page.getByRole('radio', { name: 'All', exact: true });
    this.filtersCheckoutAvailableRadio = page.getByRole('radio', { name: 'Available', exact: true });
    this.filtersCheckoutUnavailableRadio = page.getByRole('radio', { name: 'Unavailable', exact: true });
    this.filtersResetButton = page.getByRole('button', { name: 'Reset' });
    this.filtersCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.filtersApplyButton = page.getByRole('button', { name: 'Apply Filters' });

    // Applied filter chips
    this.filterChips = page.getByText(/Checkout:|Profile:|Role:|Expiration:|Maintenance:/i);
    this.clearAllFiltersButton = page.getByRole('button', { name: /Clear all/i });

    this.refreshButton = page.getByRole('button', { name: /Refresh/i });
    this.createConfigurationButton = page.getByRole('button', { name: /Create Configuration/i });

    // Configuration cards: located by checkbox inside card
    this.configurationCards = page.locator('[class*="rounded"]').filter({ has: page.getByText(/Capacity|Checkout/) });
    this.configurationCardCheckboxes = page.getByRole('checkbox').filter({ has: page.locator('[class*="rounded"]') });

    // FLC-C: Card field accessors
    this.cardCheckbox = (name: string) => page.getByRole('checkbox', { name: `Select ${name}` });
    this.cardActionsButton = (name: string) => page.getByRole('button', { name: `Actions for ${name}` });

    // FLC-C: Selection toolbar
    this.selectionToolbar = page.getByText(/\d+\s*selected/i);
    this.selectionCountText = page.getByText(/\d+\s*selected/i).first();
    this.selectLoadedButton = page.getByRole('button', { name: /Select loaded/i });
    this.clearSelectionButton = page.getByRole('button', { name: 'Clear' });
    this.selectionDatesButton = page.getByRole('button', { name: 'Dates' });
    this.selectionCapacityButton = page.getByRole('button', { name: 'Capacity' });
    this.selectionDeleteButton = page.getByRole('button', { name: 'Delete' });

    // FLC-C: Card action menu
    this.cardMenu = page.getByRole('menu');
    this.cardMenuViewDetails = page.getByRole('menuitem', { name: /View details/i });
    this.cardMenuEdit = page.getByRole('menuitem', { name: 'Edit' });
    this.cardMenuDelete = page.getByRole('menuitem', { name: 'Delete' });

    // FLC-D: Dates inline panel
    this.datesPanelHeading = page.getByRole('heading', { name: 'Update Dates' });
    this.datesExpirationInput = page.getByRole('textbox', { name: 'Expiration Date' });
    this.datesMaintenanceInput = page.getByRole('textbox', { name: 'Maintenance Date' });
    this.datesUseExpirationForMaintenanceCheckbox = page.getByRole('checkbox', { name: /Use expiration date for maintenance/i });
    this.datesCancelButton = page.getByRole('button', { name: 'Cancel' }).first();
    this.datesApplyButton = page.getByRole('button', { name: 'Update Dates' });

    // FLC-D: Capacity inline panel
    this.capacityPanelHeading = page.getByRole('heading', { name: 'Update Capacity' });
    this.capacityNumberOfLicensesInput = page.getByRole('spinbutton', { name: 'Number of Licenses' });
    this.capacityMaxCheckoutInput = page.getByRole('spinbutton', { name: /Maximum Checkout Time/i });
    this.capacityCancelButton = page.getByRole('button', { name: 'Cancel' }).first();
    this.capacityApplyButton = page.getByRole('button', { name: 'Update Capacity' });

    // FLC-D: Delete state
    this.deleteExecutingButton = page.getByRole('button', { name: /Deleting/i });

    // FLC-H: Delete action
    this.cardDeleteMenuItem = page.getByRole('menuitem', { name: 'Delete' });
    this.selectionDeleteButton = page.getByRole('button', { name: 'Delete' });

    // FLC-F: View Details panel
    this.viewDetailsMenu = page.getByRole('menuitem', { name: /View details/i });
    this.detailsPanel = (name: string) => page.getByRole('region', { name: `Details for ${name}` });
    this.detailsPanelHeading = page.getByText('Configuration Details').first();
    this.detailsCloseButton = (name: string) => page.getByRole('button', { name: `Close details for ${name}` });
    this.detailsField = (fieldLabel: string) => page.getByText(fieldLabel, { exact: true }).first();
    this.detailsFeatureNote = page.getByText('Feature information is not available in this view.');
    this.detailsConfigurationId = page.getByText(/Configuration ID:/);
    this.detailsVersionId = page.getByText(/Version ID:/);
    this.detailsSystemUserId = page.getByText(/System User ID:/);

    // FLC-G: Edit Configuration form
    this.editFormHeading = page.getByRole('heading', { name: /Edit Floating License Configuration/i });
    this.editCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.editUserGroupCombo = page.getByRole('combobox', { name: 'User Group' });
    this.editProductProfileCombo = page.getByRole('combobox', { name: 'Product Profile' });
    this.editProfileRoleCombo = page.getByRole('combobox', { name: 'Profile Role' });
    this.editNumberOfLicensesInput = page.getByRole('spinbutton', { name: 'Number of Licenses' });
    this.editMaxCheckoutInput = page.getByRole('spinbutton', { name: /Max Checkout Time/i });
    this.editAvailableRadio = page.getByRole('radio', { name: 'Available', exact: true });
    this.editUnavailableRadio = page.getByRole('radio', { name: 'Unavailable' });
    this.editExpirationDateInput = page.getByRole('textbox', { name: 'Expiration Date' });
    this.editMaintenanceDateInput = page.getByRole('textbox', { name: 'Maintenance Date' });
    this.editResetButton = page.getByRole('button', { name: 'Reset' });
    this.editSaveButton = page.getByRole('button', { name: 'Save Configuration' });

    // FLC-E: Create Configuration form
    this.createFormHeading = page.getByRole('heading', { name: /Create Floating License Configuration/i });
    this.createFormCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.createUserGroupCombo = page.getByRole('combobox', { name: 'User Group' });
    this.createProductProfileCombo = page.getByRole('combobox', { name: 'Product Profile' });
    this.createProfileRoleCombo = page.getByRole('combobox', { name: 'Profile Role' });
    this.createNumberOfLicensesInput = page.getByRole('spinbutton', { name: 'Number of Licenses' });
    this.createMaxCheckoutInput = page.getByRole('spinbutton', { name: /Max Checkout Time/i });
    this.createAvailableRadio = page.getByRole('radio', { name: 'Available', exact: true });
    this.createUnavailableRadio = page.getByRole('radio', { name: 'Unavailable' });
    this.createExpirationDateInput = page.getByRole('textbox', { name: 'Expiration Date' });
    this.createMaintenanceDateInput = page.getByRole('textbox', { name: 'Maintenance Date' });
    this.createResetButton = page.getByRole('button', { name: 'Reset' });
    this.createSaveButton = page.getByRole('button', { name: 'Save Configuration' });

    this.loadedStatusText = page.getByText(/configurations loaded/i).first();

    // Empty state
    this.emptyStateMessage = page.getByText(/No Floating License Configurations/i).first();
    this.emptyStateDescription = page.getByText(/No Floating License Configurations are available/i).first();

    // Sidebar navigation
    this.sidebarFloatingLicenseConfigsLink = page.getByRole('link').filter({ has: page.locator('svg') }).nth(3);
  }

  // ─── Navigation ──────────────────────────────────────────────

  async navigateToFloatingLicenseConfigurations(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-298', async () => this.page.locator('[data-sidebar="sidebar"] a[href="/floating-license-configurations"]').click());
    await this.page.waitForURL('**/floating-license-configurations');
    await this.heading.waitFor();
    await this.groupTreeContainer.waitFor({ state: 'visible' });
    await expect(this.groupTreeContainer.getByText('Loading User Groups…', { exact: true })).toBeHidden({ timeout: 60000 });
    await expect(this.getTreeItems().first()).toBeVisible({ timeout: 60000 });
  }

  async waitForGroupSelectionView(): Promise<void> {
    await this.heading.waitFor();
    await this.groupSelectionHeading.waitFor();
    await this.groupSearchInput.waitFor();
  }

  async waitForConfigurationView(): Promise<void> {
    await this.heading.waitFor();
    await this.userGroupSummaryPanel.waitFor();
  }

  // ─── Group Selection ─────────────────────────────────────────

  async getSearchInputValue(): Promise<string> {
    return this.groupSearchInput.inputValue();
  }

  async setGroupSearch(value: string): Promise<void> {
    await recordEvidence('action-fill-floating-license-configurations.page-321', async () => this.groupSearchInput.fill(value));
  }

  async clearGroupSearch(): Promise<void> {
    const val = await this.groupSearchInput.inputValue();
    if (val) {
      await recordEvidence('action-fill-floating-license-configurations.page-327', async () => this.groupSearchInput.fill(''));
    }
  }

  async isSearchInputEmpty(): Promise<boolean> {
    const val = await this.groupSearchInput.inputValue();
    return val === '';
  }

  async expandAll(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-337', async () => this.expandAllButton.click());
  }

  async collapseAll(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-341', async () => this.collapseAllButton.click());
  }

  // ─── Group Tree ──────────────────────────────────────────────

  getTreeItems(): Locator {
    return this.groupTreeContainer.locator('button[type="button"]');
  }

  async getTreeItemCount(): Promise<number> {
    return this.getTreeItems().count();
  }

  getTreeItemByName(name: string): Locator {
    return this.getTreeItems().filter({ has: this.page.getByText(name, { exact: true }) }).first();
  }

  async getTreeItemTexts(): Promise<string[]> {
    return this.getTreeItems().locator('span.truncate').allTextContents();
  }

  async selectTreeItem(name: string): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-363', async () => this.getTreeItemByName(name).click());
  }

  async treeItemHasExpandControl(name: string): Promise<boolean> {
    const item = this.getTreeItemByName(name);
    const chevron = item.locator('[role="button"][aria-label]').first();
    return chevron.isVisible().catch(() => false);
  }

  async expandTreeItem(name: string): Promise<void> {
    const item = this.getTreeItemByName(name);
    const chevron = item.locator('[role="button"][aria-label]').first();
    await recordEvidence('action-click-floating-license-configurations.page-375', async () => chevron.click());
  }

  async collapseTreeItem(name: string): Promise<void> {
    const item = this.getTreeItemByName(name);
    const chevron = item.locator('[role="button"][aria-label]').first();
    await recordEvidence('action-click-floating-license-configurations.page-381', async () => chevron.click());
  }

  async isTreeItemExpanded(name: string): Promise<boolean> {
    const item = this.getTreeItemByName(name);
    return await item.locator('[role="button"][aria-label="Collapse"]').count() > 0;
  }

  getChildTreeItems(parentName: string): Locator {
    const parent = this.getTreeItemByName(parentName);
    return parent.locator('..').locator(':scope > div button[type="button"]');
  }

  async hasSelectedTreeItem(): Promise<boolean> {
    const items = this.getTreeItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const sel = await items.nth(i).getAttribute('aria-selected');
      if (sel === 'true') return true;
    }
    return false;
  }

  async hasNoSelectedTreeItem(): Promise<boolean> {
    return !(await this.hasSelectedTreeItem());
  }

  async getSelectedTreeItemText(): Promise<string> {
    const items = this.getTreeItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const sel = await items.nth(i).getAttribute('aria-selected');
      if (sel === 'true') {
        return (await items.nth(i).textContent())?.trim() ?? '';
      }
    }
    return '';
  }

  async hasExactlyOneSelected(): Promise<boolean> {
    const items = this.getTreeItems();
    const count = await items.count();
    let selectedCount = 0;
    for (let i = 0; i < count; i++) {
      const sel = await items.nth(i).getAttribute('aria-selected');
      if (sel === 'true') selectedCount++;
    }
    return selectedCount === 1;
  }

  async discoverRuntimeLeafGroup(): Promise<string> {
    const items = this.getTreeItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const chevron = item.locator('[role="button"] svg').first();
      const hasChevron = await chevron.isVisible().catch(() => false);
      if (!hasChevron) {
        return (await item.locator('span.truncate').textContent())?.trim() ?? '';
      }
    }
    return '';
  }

  async discoverRuntimeParentGroup(): Promise<string> {
    const items = this.getTreeItems();
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const chevron = item.locator('[role="button"] svg').first();
      const hasChevron = await chevron.isVisible().catch(() => false);
      if (hasChevron) {
        return (await item.locator('span.truncate').textContent())?.trim() ?? '';
      }
    }
    return '';
  }

  async discoverRuntimeSearchFragment(): Promise<string> {
    const texts = await this.getTreeItemTexts();
    if (texts.length === 0) return '';
    const first = texts[0].trim();
    return first.substring(0, Math.min(3, first.length));
  }

  // ─── Configuration Page ──────────────────────────────────────

  async getConfigurationSelectedGroupName(): Promise<string> {
    return (await this.selectedGroupName.textContent())?.trim() ?? '';
  }

  async getConfigurationCount(): Promise<number> {
    const text = await this.configurationCountText.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async clickBack(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-480', async () => this.backButton.click());
    await this.groupSelectionHeading.waitFor();
  }

  async clickChangeGroup(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-485', async () => this.changeGroupButton.click());
    await this.groupSelectionHeading.waitFor();
  }

  // ─── FLC-B: Configuration Search ─────────────────────────────

  async openConfigSearch(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-492', async () => this.configurationSearchButton.click());
    await this.configSearchInput.waitFor();
  }

  async closeConfigSearch(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-497', async () => this.configSearchCloseButton.click());
  }

  async setConfigSearch(value: string): Promise<void> {
    await recordEvidence('action-fill-floating-license-configurations.page-501', async () => this.configSearchInput.fill(value));
  }

  async clearConfigSearch(): Promise<void> {
    const val = await this.configSearchInput.inputValue();
    if (val) {
      await recordEvidence('action-fill-floating-license-configurations.page-507', async () => this.configSearchInput.fill(''));
    }
  }

  async getConfigSearchValue(): Promise<string> {
    return this.configSearchInput.inputValue();
  }

  // ─── FLC-B: Filters ──────────────────────────────────────────

  async openFilters(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-518', async () => this.filtersButton.click());
    await this.filtersPanelHeading.waitFor();
  }

  async closeFilters(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-523', async () => this.filtersCancelButton.click());
  }

  async applyFilters(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-527', async () => this.filtersApplyButton.click());
  }

  async resetFilters(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-531', async () => this.filtersResetButton.click());
  }

  async clearAllFilters(): Promise<void> {
    const visible = await this.clearAllFiltersButton.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-floating-license-configurations.page-537', async () => this.clearAllFiltersButton.click());
    }
  }

  async areFiltersOpen(): Promise<boolean> {
    return this.filtersPanelHeading.isVisible().catch(() => false);
  }

  async hasAppliedFilterChips(): Promise<boolean> {
    return this.filterChips.first().isVisible().catch(() => false);
  }

  // ─── FLC-B: Include Subgroups ────────────────────────────────

  async isIncludeSubgroupsChecked(): Promise<boolean> {
    return this.includeSubgroupsCheckbox.isChecked();
  }

  async isIncludeSubgroupsEnabled(): Promise<boolean> {
    return this.includeSubgroupsCheckbox.isEnabled();
  }

  async toggleIncludeSubgroups(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-560', async () => this.includeSubgroupsCheckbox.click());
  }

  // ─── FLC-B: Configuration Cards ──────────────────────────────

  async getVisibleCardCount(): Promise<number> {
    return this.configurationCards.count();
  }

  async getVisibleCardTitles(): Promise<string[]> {
    const cards = this.configurationCards;
    const count = await cards.count();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      const titleEl = cards.nth(i).locator('p, h3, h4').first();
      const text = await titleEl.textContent();
      if (text) titles.push(text.trim());
    }
    return titles;
  }

  // ─── FLC-B: Refresh ──────────────────────────────────────────

  async clickRefresh(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-584', async () => this.refreshButton.click());
  }

  // ─── FLC-B: Safe Restoration ─────────────────────────────────

  async restoreGroupSelectionState(): Promise<void> {
    const backVisible = await this.backButton.isVisible().catch(() => false);
    if (backVisible) {
      await this.clickBack();
    }
    await this.clearGroupSearch();
    const collapseVisible = await this.collapseAllButton.isVisible().catch(() => false);
    if (collapseVisible) {
      await recordEvidence('action-click-floating-license-configurations.page-597', async () => this.collapseAllButton.click());
    }
  }

  async verifyCleanGroupSelectionState(): Promise<void> {
    await recordEvidence('assert-toBeVisible-floating-license-configurations.page-602', async () => expect(this.heading).toBeVisible());
    await recordEvidence('assert-toBeVisible-floating-license-configurations.page-603', async () => expect(this.groupSelectionHeading).toBeVisible());
    await recordEvidence('assert-toBeVisible-floating-license-configurations.page-604', async () => expect(this.groupSearchInput).toBeVisible());
    const searchEmpty = await this.isSearchInputEmpty();
    await recordEvidence('assert-toBe-floating-license-configurations.page-606', async () => expect(searchEmpty).toBe(true));
    const hasSelected = await this.hasSelectedTreeItem();
    await recordEvidence('assert-toBe-floating-license-configurations.page-608', async () => expect(hasSelected).toBe(false));
  }

  /**
   * Restore the configuration view to its default clean state:
   * search closed and empty, filters cleared and closed,
   * Include Subgroups unchecked, original group selected.
   */
  async restoreConfigurationListState(originalGroupName: string): Promise<void> {
    // Close search if open
    const searchOpen = await this.configSearchCloseButton.isVisible().catch(() => false);
    if (searchOpen) {
      await this.clearConfigSearch();
      await this.closeConfigSearch();
    }

    // Clear applied filter chips
    const chipsVisible = await this.hasAppliedFilterChips();
    if (chipsVisible) {
      await this.clearAllFilters();
    }

    // Ensure filters panel is closed
    const filtersOpen = await this.areFiltersOpen();
    if (filtersOpen) {
      await this.closeFilters();
    }

    // Uncheck Include Subgroups if checked
    const checked = await this.isIncludeSubgroupsChecked();
    if (checked) {
      await this.toggleIncludeSubgroups();
    }
  }

  /**
   * Navigate to configuration view for a runtime group.
   * Discovers a leaf group, selects it, and verifies the config view loads.
   * Returns the selected group name.
   */
  async navigateToRuntimeGroupConfiguration(): Promise<string> {
    await this.navigateToFloatingLicenseConfigurations();
    let groupName = await this.discoverRuntimeLeafGroup();
    if (!groupName) {
      groupName = await this.discoverRuntimeParentGroup();
    }
    if (!groupName) return '';
    await this.selectTreeItem(groupName);
    await this.page.waitForTimeout(500);
    await this.userGroupSummaryPanel.waitFor();
    return groupName;
  }

  // ─── FLC-C: Card Selection ───────────────────────────────────

  async selectCardByName(name: string): Promise<void> {
    await recordEvidence('action-check-floating-license-configurations.page-664', async () => this.cardCheckbox(name).check());
  }

  async deselectCardByName(name: string): Promise<void> {
    await recordEvidence('action-uncheck-floating-license-configurations.page-668', async () => this.cardCheckbox(name).uncheck());
  }

  async isCardSelected(name: string): Promise<boolean> {
    return this.cardCheckbox(name).isChecked();
  }

  async clearAllCardSelections(): Promise<void> {
    const visible = await this.clearSelectionButton.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-floating-license-configurations.page-678', async () => this.clearSelectionButton.click());
    }
  }

  async getSelectionCount(): Promise<number> {
    const visible = await this.selectionCountText.isVisible().catch(() => false);
    if (!visible) return 0;
    const text = await this.selectionCountText.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async isSelectionToolbarVisible(): Promise<boolean> {
    return this.selectionCountText.isVisible().catch(() => false);
  }

  // ─── FLC-C: Card Menu ────────────────────────────────────────

  async openCardMenu(name: string): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-697', async () => this.cardActionsButton(name).click());
    await this.cardMenu.waitFor();
  }

  async closeCardMenu(): Promise<void> {
    await recordEvidence('action-press-floating-license-configurations.page-702', async () => this.page.keyboard.press('Escape'));
  }

  async isCardMenuVisible(): Promise<boolean> {
    return this.cardMenu.isVisible().catch(() => false);
  }

  async getCardMenuItems(): Promise<string[]> {
    const items = this.cardMenu.getByRole('menuitem');
    const texts = await items.allTextContents();
    return texts.map((t) => t.trim());
  }

  // ─── FLC-C: Card Fields ──────────────────────────────────────

  async getCardFieldValue(cardName: string, fieldLabel: string): Promise<string> {
    const card = this.page.locator('[class*="rounded"]').filter({ has: this.cardCheckbox(cardName) }).first();
    const field = card.locator('p').filter({ hasText: fieldLabel }).first();
    const valueEl = field.locator('..').locator('p').last();
    return (await valueEl.textContent())?.trim() ?? '';
  }

  async getFirstCardName(): Promise<string> {
    const cards = this.configurationCards;
    const count = await cards.count();
    if (count === 0) return '';
    const checkbox = cards.first().locator('[role="checkbox"]');
    const label = await checkbox.getAttribute('aria-label');
    return label?.replace('Select ', '') ?? '';
  }

  // ─── FLC-D: Selection Toolbar Bulk Actions ────────────────────

  async isSelectLoadedEnabled(): Promise<boolean> {
    return this.selectLoadedButton.isEnabled().catch(() => false);
  }

  async openDatesPanel(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-740', async () => this.selectionDatesButton.click());
    await this.datesPanelHeading.waitFor();
  }

  async closeDatesPanel(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-745', async () => this.datesCancelButton.click());
  }

  async isDatesPanelVisible(): Promise<boolean> {
    return this.datesPanelHeading.isVisible().catch(() => false);
  }

  async openCapacityPanel(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-753', async () => this.selectionCapacityButton.click());
    await this.capacityPanelHeading.waitFor();
  }

  async closeCapacityPanel(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-758', async () => this.capacityCancelButton.click());
  }

  async isCapacityPanelVisible(): Promise<boolean> {
    return this.capacityPanelHeading.isVisible().catch(() => false);
  }

  async isDeleteExecuting(): Promise<boolean> {
    return this.deleteExecutingButton.isVisible().catch(() => false);
  }

  /**
   * Full end-state restoration: deselect all, close panels, clear search/filters,
   * restore Include Subgroups, and return to original config list view.
   */
  async restoreFully(groupName: string): Promise<void> {
    await this.clearAllCardSelections();
    await this.restoreConfigurationListState(groupName);
  }

  // ─── FLC-E: Create Configuration Form ───────────────────────

  async openCreateForm(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-781', async () => this.createConfigurationButton.click());
    await this.createFormHeading.waitFor();
  }

  async cancelCreateForm(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-786', async () => this.createFormCancelButton.click());
  }

  async resetCreateForm(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-790', async () => this.createResetButton.click());
  }

  async closeCreateFormByEscape(): Promise<void> {
    await recordEvidence('action-press-floating-license-configurations.page-794', async () => this.page.keyboard.press('Escape'));
  }

  async isCreateFormVisible(): Promise<boolean> {
    return this.createFormHeading.isVisible().catch(() => false);
  }

  async isCreateButtonDisabled(): Promise<boolean> {
    const btn = this.createConfigurationButton;
    const disabled = await btn.getAttribute('disabled');
    return disabled !== null;
  }

  async isSaveButtonDisabled(): Promise<boolean> {
    const btn = this.createSaveButton;
    const disabled = await btn.getAttribute('disabled');
    return disabled !== null;
  }

  async fillCreateFormRequired(productProfileName: string, profileRoleName: string, numberOfLicenses: string, maxCheckout: string): Promise<void> {
    await recordEvidence('action-selectOption-floating-license-configurations.page-814', async () => this.createProductProfileCombo.selectOption({ label: productProfileName }));
    await this.createProfileRoleCombo.waitFor();
    await recordEvidence('action-selectOption-floating-license-configurations.page-816', async () => this.createProfileRoleCombo.selectOption({ label: profileRoleName }));
    await recordEvidence('action-fill-floating-license-configurations.page-817', async () => this.createNumberOfLicensesInput.fill(numberOfLicenses));
    await recordEvidence('action-fill-floating-license-configurations.page-818', async () => this.createMaxCheckoutInput.fill(maxCheckout));
  }

  async getCreateFormUserGroup(): Promise<string> {
    const opt = this.createUserGroupCombo.locator('option:checked').first();
    return (await opt.textContent())?.trim() ?? '';
  }

  // ─── FLC-F: View Details ────────────────────────────────────

  /**
   * Open the View Details panel for a runtime card.
   * @param cardName - the configuration name (e.g. "DatabaseDesigner").
   */
  async openViewDetails(cardName: string): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-833', async () => this.cardActionsButton(cardName).click());
    await this.cardMenu.waitFor();
    await recordEvidence('action-click-floating-license-configurations.page-835', async () => this.viewDetailsMenu.click());
    await this.detailsPanel(cardName).waitFor();
  }

  async closeViewDetailsByButton(cardName: string): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-840', async () => this.detailsCloseButton(cardName).click());
  }

  async closeViewDetailsByEscape(): Promise<void> {
    await recordEvidence('action-press-floating-license-configurations.page-844', async () => this.page.keyboard.press('Escape'));
  }

  async isDetailsPanelVisible(cardName: string): Promise<boolean> {
    return this.detailsPanel(cardName).isVisible().catch(() => false);
  }

  async getDetailsFieldValue(fieldLabel: string): Promise<string> {
    const fieldContainer = this.detailsField(fieldLabel).locator('..').locator('p').last();
    return (await fieldContainer.textContent())?.trim() ?? '';
  }

  // ─── FLC-G: Edit Configuration ──────────────────────────────

  /**
   * Open Edit form for a runtime card via the three-dot menu.
   */
  async openEditForm(cardName: string): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-862', async () => this.cardActionsButton(cardName).click());
    await this.cardMenu.waitFor();
    await recordEvidence('action-click-floating-license-configurations.page-864', async () => this.page.getByRole('menuitem', { name: 'Edit' }).click());
    await this.editFormHeading.waitFor();
  }

  async cancelEditForm(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-869', async () => this.editCancelButton.click());
  }

  async resetEditForm(): Promise<void> {
    await recordEvidence('action-click-floating-license-configurations.page-873', async () => this.editResetButton.click());
  }

  async closeEditFormByEscape(): Promise<void> {
    await recordEvidence('action-press-floating-license-configurations.page-877', async () => this.page.keyboard.press('Escape'));
  }

  async isEditFormVisible(): Promise<boolean> {
    return this.editFormHeading.isVisible().catch(() => false);
  }

  async isEditSaveDisabled(): Promise<boolean> {
    const btn = this.editSaveButton;
    const disabled = await btn.getAttribute('disabled');
    return disabled !== null;
  }

  async getEditFormProfileRole(): Promise<string> {
    const opt = this.editProfileRoleCombo.locator('option:checked').first();
    return (await opt.textContent())?.trim() ?? '';
  }

  async getEditFormNumberOfLicenses(): Promise<string> {
    return this.editNumberOfLicensesInput.inputValue();
  }

  async getEditFormMaxCheckout(): Promise<string> {
    return this.editMaxCheckoutInput.inputValue();
  }

  async getEditFormExpirationDate(): Promise<string> {
    return this.editExpirationDateInput.inputValue();
  }
}
