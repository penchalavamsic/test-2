import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ServerLicensingPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly description: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Server License selector
  readonly serverLicenseSelector: Locator;
  readonly serverLicenseSelectorLabel: Locator;

  // Filters
  readonly filtersButton: Locator;
  readonly filtersPanel: Locator;

  // Add Customer button
  readonly addCustomerButton: Locator;

  // Customer cards collection
  readonly customerCards: Locator;
  readonly customerCardByName: (name: string) => Locator;

  // Card structure (dynamic — scoped to runtime card name)
  readonly cardName: (name: string) => Locator;
  readonly cardDescription: (name: string) => Locator;
  readonly cardLicenseStatusBadge: (name: string) => Locator;
  readonly cardExpandToggle: (name: string) => Locator;
  readonly cardCreateServerLicenseButton: (name: string) => Locator;
  readonly cardEditButton: (name: string) => Locator;
  readonly cardDeleteButton: (name: string) => Locator;

  // Server-license sub-cards inside an expanded customer card
  readonly serverLicenseCards: (customerName: string) => Locator;

  // Top-level expand/collapse controls
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;

  // Scroll container
  readonly cardScrollContainer: Locator;

  // Count badge
  readonly customerCountText: Locator;

  // States
  readonly loadingIndicator: Locator;
  readonly emptyStateMessage: Locator;
  readonly errorStateMessage: Locator;

  // Create Server License dialog (Batch SVL-B)
  readonly createServerLicenseDialog: Locator;
  readonly createServerLicenseDialogHeading: Locator;
  readonly createServerLicenseCloseButton: Locator;
  readonly createServerLicenseFilenameInput: Locator;
  readonly createServerLicenseCancelButton: Locator;
  readonly createServerLicenseApplyButton: Locator;

  // Edit Customer dialog (Batch SVL-C)
  readonly editCustomerDialog: Locator;
  readonly editCustomerDialogHeading: Locator;
  readonly editCustomerCloseButton: Locator;
  readonly editCustomerNameInput: Locator;
  readonly editCustomerHardwareIdInput: Locator;
  readonly editCustomerServerTypeGroup: Locator;
  readonly editCustomerServerTypeStandard: Locator;
  readonly editCustomerServerTypeFullLicense: Locator;
  readonly editCustomerServerTypeHybrid: Locator;
  readonly editCustomerCancelButton: Locator;
  readonly editCustomerApplyButton: Locator;
  // User Groups
  readonly editCustomerUserGroupsAddButton: Locator;
  readonly editCustomerNewGroupNameInput: Locator;
  readonly editCustomerAddGroupAddButton: Locator;
  readonly editCustomerGroupEditButton: (groupName: string) => Locator;
  readonly editCustomerGroupDeleteButton: (groupName: string) => Locator;
  // System User
  readonly editCustomerCreateSystemUserButton: Locator;
  readonly editCustomerEditSystemUserButton: Locator;
  readonly editCustomerDeleteSystemUserButton: Locator;

  // Delete Customer (Batch SVL-D)
  readonly deleteCustomerDialog: Locator;
  readonly deleteCustomerDialogHeading: Locator;
  readonly deleteCustomerWarningText: Locator;
  readonly deleteCustomerCloseButton: Locator;
  readonly deleteCustomerCancelButton: Locator;
  readonly deleteCustomerConfirmButton: Locator;

  // Standard Licenses section (Batch SVL-D)
  readonly standardLicensesHeading: Locator;
  readonly standardLicensesDescription: Locator;
  readonly standardLicenseCountBadge: Locator;
  readonly standardLicensesEmptyState: Locator;
  readonly floatingLicensesEmptyState: Locator;
  // Tabs
  readonly standardTab: Locator;
  readonly floatingTab: Locator;
  readonly createStandardLicenseButton: Locator;
  readonly createFloatingLicenseButton: Locator;
  // Standard License cards
  readonly getStandardLicenseCards: () => Locator;
  readonly standardLicenseTypeLabel: Locator;
  readonly standardLicenseHeading: Locator;
  readonly standardLicenseEditButton: (cardIndex?: number) => Locator;
  readonly firstStandardLicenseDeleteButton: Locator;
  // Card-level field value locators (within a card)
  readonly standardLicenseRoleText: Locator;
  readonly standardLicenseQuantityText: Locator;
  readonly standardLicenseMaintenanceText: Locator;
  readonly standardLicenseExpirationText: Locator;

  // Edit Standard License dialog (Batch SVL-D)
  readonly editStandardLicenseDialog: Locator;
  readonly editStandardLicenseHeading: Locator;
  readonly editStandardLicenseSubtitle: Locator;
  readonly editStandardLicenseCloseButton: Locator;
  readonly editStandardLicenseMaintenanceInput: Locator;
  readonly editStandardLicenseExpirationInput: Locator;
  readonly editStandardLicenseDaysInput: Locator;
  readonly editStandardLicenseQuantityInput: Locator;
  readonly editStandardLicenseSyncCheckbox: Locator;
  readonly editStandardLicenseCancelButton: Locator;
  readonly editStandardLicenseApplyButton: Locator;

  // Floating Licenses (Batch SVL-E)
  // Floating License cards
  readonly getFloatingLicenseCards: () => Locator;
  readonly floatingLicenseTypeLabel: Locator;
  readonly floatingLicenseHeading: Locator;
  readonly firstFloatingLicenseEditButton: Locator;
  readonly firstFloatingLicenseDeleteButton: Locator;
  // Floating card fields
  readonly floatingLicenseProfileRoleText: Locator;
  readonly floatingLicenseGroupText: Locator;
  readonly floatingLicenseQuantityText: Locator;
  readonly floatingLicenseMaxCheckoutText: Locator;
  readonly floatingLicenseCheckoutStatus: Locator;
  readonly floatingLicenseMaintenanceText: Locator;
  readonly floatingLicenseExpirationText: Locator;

  // Edit Floating License dialog (Batch SVL-E)
  readonly editFloatingLicenseDialog: Locator;
  readonly editFloatingLicenseHeading: Locator;
  readonly editFloatingLicenseSubtitle: Locator;
  readonly editFloatingLicenseCloseButton: Locator;
  readonly editFloatingLicenseMaintenanceInput: Locator;
  readonly editFloatingLicenseExpirationInput: Locator;
  readonly editFloatingLicenseDaysInput: Locator;
  readonly editFloatingLicenseQuantityInput: Locator;
  readonly editFloatingLicenseMaxCheckoutInput: Locator;
  readonly editFloatingLicenseSyncCheckbox: Locator;
  readonly editFloatingLicenseCancelButton: Locator;
  readonly editFloatingLicenseApplyButton: Locator;

  // Create Floating License form (Batch SVL-E)
  readonly createFloatingLicenseDialog: Locator;
  readonly createFloatingLicenseHeading: Locator;
  readonly createFloatingLicenseCloseButton: Locator;
  readonly createFloatingLicenseGroupCombobox: Locator;
  readonly createFloatingLicenseProductProfileCombobox: Locator;
  readonly createFloatingLicenseProfileRoleCombobox: Locator;
  readonly createFloatingLicenseLicensesInput: Locator;
  readonly createFloatingLicenseDefaultCheckoutInput: Locator;
  readonly createFloatingLicenseCheckoutTimeInput: Locator;
  readonly createFloatingLicenseAddCheckoutButton: Locator;
  readonly createFloatingLicenseAvailableCheckbox: Locator;
  readonly createFloatingLicenseMaintenanceInput: Locator;
  readonly createFloatingLicenseExpirationInput: Locator;
  readonly createFloatingLicenseCancelButton: Locator;
  readonly createFloatingLicenseApplyButton: Locator;

  // Create Standard License form (Batch SVL-E)
  readonly createStandardLicenseDialog: Locator;
  readonly createStandardLicenseHeading: Locator;
  readonly createStandardLicenseCloseButton: Locator;
  readonly createStandardLicenseProductProfileCombobox: Locator;
  readonly createStandardLicenseProfileRoleCombobox: Locator;
  readonly createStandardLicenseLicensesInput: Locator;
  readonly createStandardLicenseMaintenanceInput: Locator;
  readonly createStandardLicenseExpirationInput: Locator;
  readonly createStandardLicenseCancelButton: Locator;
  readonly createStandardLicenseApplyButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page shell
    this.heading = page.getByRole('heading', { name: 'Server License Management', level: 1 });
    this.description = page.getByText(/manage server licenses and customer assignments/i).first();
    this.mainContent = page.locator('main');
    this.footer = page.locator('footer');

    // Server License selector
    this.serverLicenseSelector = page.getByRole('combobox', { name: /server license/i });
    this.serverLicenseSelectorLabel = page.getByText(/server license/i).first();

    // Filters
    this.filtersButton = page.getByRole('button', { name: 'Filters' });
    this.filtersPanel = page.locator('[class*="filter"], [class*="Filter"]').first();

    // Add Customer button
    this.addCustomerButton = page.getByRole('button', { name: /add customer/i });

    // Customer cards collection
    this.customerCards = page.locator('[class*="rounded"], [class*="card"]').filter({ has: page.getByRole('button', { name: /edit|delete|create server license/i }) });

    // Dynamic card lookup by runtime name
    this.customerCardByName = (name: string) =>
      this.customerCards.filter({ hasText: name }).first();

    // Card structure
    this.cardName = (name: string) =>
      this.customerCardByName(name).locator('h2, h3, h4, p').filter({ hasText: name }).first();
    this.cardDescription = (name: string) =>
      this.customerCardByName(name).locator('p').filter({ hasText: /.+/ }).nth(1);
    this.cardLicenseStatusBadge = (name: string) =>
      this.customerCardByName(name).locator('[class*="badge"], [class*="Badge"], [class*="status"]').first();
    this.cardExpandToggle = (name: string) =>
      this.customerCardByName(name).locator('button, [role="button"]').filter({ has: page.locator('svg') }).first();
    this.cardCreateServerLicenseButton = (name: string) =>
      this.customerCardByName(name).getByRole('button', { name: /create server license|file-plus/i });
    this.cardEditButton = (name: string) =>
      this.customerCardByName(name).getByRole('button', { name: /edit/i }).first();
    this.cardDeleteButton = (name: string) =>
      this.customerCardByName(name).getByRole('button', { name: /delete/i }).first();

    // Server-license sub-cards inside expanded customer
    this.serverLicenseCards = (customerName: string) =>
      this.customerCardByName(customerName).locator('[class*="rounded"], [class*="card"]');

    // Top-level controls
    this.expandAllButton = page.getByRole('button', { name: /expand all/i });
    this.collapseAllButton = page.getByRole('button', { name: /collapse all/i });

    // Scroll container
    this.cardScrollContainer = page.locator('[class*="overflow"], [class*="scroll"]').first();

    // Count badge
    this.customerCountText = page.getByText(/\d+\s*(customer|customers|entries)/i).first();

    // States
    this.loadingIndicator = page.locator('[class*="loading"], [class*="spinner"], [class*="skeleton"]').first();
    this.emptyStateMessage = page.getByText(/no customers|no server licenses|no data/i).first();
    this.errorStateMessage = page.getByText(/error|failed|unavailable/i).first();

    // Create Server License dialog (Batch SVL-B)
    this.createServerLicenseDialog = page.getByRole('region', { name: /create server license/i });
    this.createServerLicenseDialogHeading = this.createServerLicenseDialog.getByRole('heading', { name: 'Create Server License', level: 2 });
    this.createServerLicenseCloseButton = this.createServerLicenseDialog.getByRole('button', { name: /close create server license/i });
    this.createServerLicenseFilenameInput = this.createServerLicenseDialog.getByRole('textbox', { name: 'File name' });
    this.createServerLicenseCancelButton = this.createServerLicenseDialog.getByRole('button', { name: 'Cancel' });
    this.createServerLicenseApplyButton = this.createServerLicenseDialog.getByRole('button', { name: 'Apply' });

    // Edit Customer dialog (Batch SVL-C)
    this.editCustomerDialog = page.getByRole('region', { name: /edit customer/i });
    this.editCustomerDialogHeading = this.editCustomerDialog.getByRole('heading', { name: 'Edit Customer', level: 2 });
    this.editCustomerCloseButton = this.editCustomerDialog.getByRole('button', { name: /close edit customer/i });
    this.editCustomerNameInput = this.editCustomerDialog.getByRole('textbox', { name: 'Customer name' });
    this.editCustomerHardwareIdInput = this.editCustomerDialog.getByRole('textbox', { name: 'Hardware ID' });
    this.editCustomerServerTypeGroup = this.editCustomerDialog.getByRole('radiogroup', { name: 'Server type' });
    this.editCustomerServerTypeStandard = this.editCustomerDialog.getByRole('radio', { name: 'Standard' });
    this.editCustomerServerTypeFullLicense = this.editCustomerDialog.getByRole('radio', { name: 'Full License' });
    this.editCustomerServerTypeHybrid = this.editCustomerDialog.getByRole('radio', { name: 'Hybrid' });
    this.editCustomerCancelButton = this.editCustomerDialog.getByRole('button', { name: 'Cancel' });
    this.editCustomerApplyButton = this.editCustomerDialog.getByRole('button', { name: 'Apply' });
    // User Groups
    this.editCustomerUserGroupsAddButton = this.editCustomerDialog.getByRole('button', { name: 'Add Group' });
    this.editCustomerNewGroupNameInput = this.editCustomerDialog.getByRole('textbox', { name: 'New group name' });
    this.editCustomerAddGroupAddButton = this.editCustomerDialog.getByRole('button', { name: 'Add', exact: true });
    this.editCustomerGroupEditButton = (groupName: string) =>
      this.editCustomerDialog.getByRole('button', { name: new RegExp(`edit group ${groupName}`, 'i') });
    this.editCustomerGroupDeleteButton = (groupName: string) =>
      this.editCustomerDialog.getByRole('button', { name: new RegExp(`delete group ${groupName}`, 'i') });
    // System User
    this.editCustomerCreateSystemUserButton = this.editCustomerDialog.getByRole('button', { name: 'Create System User' });
    this.editCustomerEditSystemUserButton = this.editCustomerDialog.getByRole('button', { name: /edit system user/i });
    this.editCustomerDeleteSystemUserButton = this.editCustomerDialog.getByRole('button', { name: /delete system user/i });

    // Delete Customer (Batch SVL-D)
    this.deleteCustomerDialog = page.getByRole('region', { name: /delete customer/i });
    this.deleteCustomerDialogHeading = this.deleteCustomerDialog.getByRole('heading');
    this.deleteCustomerWarningText = this.deleteCustomerDialog.getByText(/permanently|warning|delete|confirm|cannot be undone/i);
    this.deleteCustomerCloseButton = this.deleteCustomerDialog.getByRole('button', { name: /close/i });
    this.deleteCustomerCancelButton = this.deleteCustomerDialog.getByRole('button', { name: 'Cancel' });
    this.deleteCustomerConfirmButton = this.deleteCustomerDialog.getByRole('button', { name: /delete|confirm/i });

    // Standard Licenses section (Batch SVL-D)
    this.standardLicensesHeading = page.getByRole('heading', { name: 'Standard Licenses', level: 2 });
    this.standardLicensesDescription = page.getByText(/standard licenses assigned to this server/i);
    this.standardLicenseCountBadge = page.getByText(/^\d+\s+license/i).first();
    this.standardLicensesEmptyState = page.getByText('No Standard Licenses');
    this.floatingLicensesEmptyState = page.getByText('No Floating Licenses');
    // Tabs
    this.standardTab = page.getByRole('button', { name: /^Standard/i });
    this.floatingTab = page.getByRole('button', { name: /^Floating/i });
    this.createStandardLicenseButton = page.getByRole('button', { name: 'Create Standard License' });
    this.createFloatingLicenseButton = page.getByRole('button', { name: 'Create Floating License' });
    // Standard License cards
    this.getStandardLicenseCards = () => page.locator('[class*="rounded"], [class*="card"]').filter({ hasText: /standard license/i }).filter({ has: page.getByRole('heading', { level: 3 }) });
    this.standardLicenseTypeLabel = page.getByText('Standard License');
    this.standardLicenseHeading = page.getByRole('heading', { level: 3 });
    this.standardLicenseEditButton = (cardIndex = 0) => this.getStandardLicenseCards().nth(cardIndex).getByRole('button', { name: /edit standard license/i });
    this.firstStandardLicenseDeleteButton = this.getStandardLicenseCards().first().getByRole('button', { name: /delete standard license/i });
    // Card-level fields
    this.standardLicenseRoleText = page.getByText(/^Profile Role$/i);
    this.standardLicenseQuantityText = page.getByText(/^Licenses$/i);
    this.standardLicenseMaintenanceText = page.getByText(/^Maintenance$/i);
    this.standardLicenseExpirationText = page.getByText(/^Expiration$/i);

    // Edit Standard License dialog (Batch SVL-D)
    this.editStandardLicenseDialog = page.getByRole('region', { name: /edit standard license/i });
    this.editStandardLicenseHeading = this.editStandardLicenseDialog.getByRole('heading', { name: 'Edit Standard License', level: 3 });
    this.editStandardLicenseSubtitle = this.editStandardLicenseDialog.locator('p').filter({ hasText: /·/ }).first();
    this.editStandardLicenseCloseButton = this.editStandardLicenseDialog.getByRole('button', { name: /close edit standard license/i });
    this.editStandardLicenseMaintenanceInput = this.editStandardLicenseDialog.getByRole('textbox', { name: 'Maintenance Date' });
    this.editStandardLicenseExpirationInput = this.editStandardLicenseDialog.getByRole('textbox', { name: 'Expiration Date' });
    this.editStandardLicenseDaysInput = this.editStandardLicenseDialog.getByRole('spinbutton', { name: 'Number of Days' });
    this.editStandardLicenseQuantityInput = this.editStandardLicenseDialog.getByRole('spinbutton', { name: 'Number of Standard Licenses' });
    this.editStandardLicenseSyncCheckbox = this.editStandardLicenseDialog.getByRole('checkbox', { name: /synchronize maintenance and expiration dates/i });
    this.editStandardLicenseCancelButton = this.editStandardLicenseDialog.getByRole('button', { name: 'Cancel' });
    this.editStandardLicenseApplyButton = this.editStandardLicenseDialog.getByRole('button', { name: /apply standard license changes/i });

    // Floating License cards (Batch SVL-E)
    this.getFloatingLicenseCards = () => page.locator('[class*="rounded"], [class*="card"]').filter({ hasText: /floating license/i }).filter({ has: page.getByRole('heading', { level: 3 }) });
    this.floatingLicenseTypeLabel = page.getByText('Floating License');
    this.floatingLicenseHeading = page.getByRole('heading', { level: 3 });
    this.firstFloatingLicenseEditButton = this.getFloatingLicenseCards().first().getByRole('button', { name: /edit floating license/i });
    this.firstFloatingLicenseDeleteButton = this.getFloatingLicenseCards().first().getByRole('button', { name: /delete floating license/i });
    // Floating card fields
    this.floatingLicenseProfileRoleText = page.getByText(/^Profile Role$/i);
    this.floatingLicenseGroupText = page.getByText(/^Group$/i);
    this.floatingLicenseQuantityText = page.getByText(/^Licenses$/i);
    this.floatingLicenseMaxCheckoutText = page.getByText(/^Max Checkout$/i);
    this.floatingLicenseCheckoutStatus = page.getByText(/checkout/i);
    this.floatingLicenseMaintenanceText = page.getByText(/^Maintenance$/i);
    this.floatingLicenseExpirationText = page.getByText(/^Expiration$/i);

    // Edit Floating License dialog (Batch SVL-E)
    this.editFloatingLicenseDialog = page.getByRole('region', { name: /edit floating license/i });
    this.editFloatingLicenseHeading = this.editFloatingLicenseDialog.getByRole('heading', { name: 'Edit Floating License', level: 3 });
    this.editFloatingLicenseSubtitle = this.editFloatingLicenseDialog.locator('p').filter({ hasText: /·/ }).first();
    this.editFloatingLicenseCloseButton = this.editFloatingLicenseDialog.getByRole('button', { name: /close edit floating license/i });
    this.editFloatingLicenseMaintenanceInput = this.editFloatingLicenseDialog.getByRole('textbox', { name: 'Maintenance Date' });
    this.editFloatingLicenseExpirationInput = this.editFloatingLicenseDialog.getByRole('textbox', { name: 'Expiration Date' });
    this.editFloatingLicenseDaysInput = this.editFloatingLicenseDialog.getByRole('spinbutton', { name: 'Number of Days' });
    this.editFloatingLicenseQuantityInput = this.editFloatingLicenseDialog.getByRole('spinbutton', { name: 'Floating Licenses' });
    this.editFloatingLicenseMaxCheckoutInput = this.editFloatingLicenseDialog.getByRole('spinbutton', { name: 'Max Checkout (hours)' });
    this.editFloatingLicenseSyncCheckbox = this.editFloatingLicenseDialog.getByRole('checkbox', { name: /synchronize maintenance and expiration dates/i });
    this.editFloatingLicenseCancelButton = this.editFloatingLicenseDialog.getByRole('button', { name: 'Cancel' });
    this.editFloatingLicenseApplyButton = this.editFloatingLicenseDialog.getByRole('button', { name: /apply floating license changes/i });

    // Create Floating License form (Batch SVL-E)
    this.createFloatingLicenseDialog = page.getByRole('region', { name: /create floating license/i });
    this.createFloatingLicenseHeading = this.createFloatingLicenseDialog.getByRole('heading', { name: 'Create Floating License', level: 3 });
    this.createFloatingLicenseCloseButton = this.createFloatingLicenseDialog.getByRole('button', { name: /close create floating license/i });
    this.createFloatingLicenseGroupCombobox = this.createFloatingLicenseDialog.getByRole('combobox', { name: 'Group' });
    this.createFloatingLicenseProductProfileCombobox = this.createFloatingLicenseDialog.getByRole('combobox', { name: 'Product Profile' });
    this.createFloatingLicenseProfileRoleCombobox = this.createFloatingLicenseDialog.getByRole('combobox', { name: 'Profile Role' });
    this.createFloatingLicenseLicensesInput = this.createFloatingLicenseDialog.getByRole('spinbutton', { name: 'Licenses' });
    this.createFloatingLicenseDefaultCheckoutInput = this.createFloatingLicenseDialog.getByRole('spinbutton', { name: 'Default Checkout (h)' });
    this.createFloatingLicenseCheckoutTimeInput = this.createFloatingLicenseDialog.getByRole('spinbutton', { name: /e\.g\. 6/i });
    this.createFloatingLicenseAddCheckoutButton = this.createFloatingLicenseDialog.getByRole('button', { name: 'Add' });
    this.createFloatingLicenseAvailableCheckbox = this.createFloatingLicenseDialog.getByRole('checkbox', { name: /available for checkout/i });
    this.createFloatingLicenseMaintenanceInput = this.createFloatingLicenseDialog.getByRole('textbox', { name: 'Maintenance Date' });
    this.createFloatingLicenseExpirationInput = this.createFloatingLicenseDialog.getByRole('textbox', { name: 'Expiration Date' });
    this.createFloatingLicenseCancelButton = this.createFloatingLicenseDialog.getByRole('button', { name: 'Cancel' });
    this.createFloatingLicenseApplyButton = this.createFloatingLicenseDialog.getByRole('button', { name: 'Apply' });

    // Create Standard License form (Batch SVL-E)
    this.createStandardLicenseDialog = page.getByRole('region', { name: /create standard license/i });
    this.createStandardLicenseHeading = this.createStandardLicenseDialog.getByRole('heading', { name: 'Create Standard License', level: 3 });
    this.createStandardLicenseCloseButton = this.createStandardLicenseDialog.getByRole('button', { name: /close create standard license/i });
    this.createStandardLicenseProductProfileCombobox = this.createStandardLicenseDialog.getByRole('combobox', { name: 'Product Profile' });
    this.createStandardLicenseProfileRoleCombobox = this.createStandardLicenseDialog.getByRole('combobox', { name: 'Profile Role' });
    this.createStandardLicenseLicensesInput = this.createStandardLicenseDialog.getByRole('spinbutton', { name: 'Number of Licenses' });
    this.createStandardLicenseMaintenanceInput = this.createStandardLicenseDialog.getByRole('textbox', { name: 'Maintenance Date' });
    this.createStandardLicenseExpirationInput = this.createStandardLicenseDialog.getByRole('textbox', { name: 'Expiration Date' });
    this.createStandardLicenseCancelButton = this.createStandardLicenseDialog.getByRole('button', { name: 'Cancel' });
    this.createStandardLicenseApplyButton = this.createStandardLicenseDialog.getByRole('button', { name: 'Apply' });
  }

  // ─── Navigation ──────────────────────────────────────────────

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-server-licensing.page-390', async () => this.page.goto('/server-licensing'));
    await this.heading.waitFor({ state: 'visible' });
  }

  // ─── Server License Selector ─────────────────────────────────

  async getServerLicenseSelectorOptions(): Promise<string[]> {
    const options = this.serverLicenseSelector.locator('option');
    const count = await options.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async getSelectedServerLicense(): Promise<string> {
    return (await this.serverLicenseSelector.evaluate((el: HTMLSelectElement) => {
      return el.selectedOptions[0]?.textContent ?? '';
    })) as string;
  }

  async selectServerLicense(label: string): Promise<void> {
    await recordEvidence('action-selectOption-server-licensing.page-414', async () => this.serverLicenseSelector.selectOption({ label }));
  }

  // ─── Filters ─────────────────────────────────────────────────

  async openFilters(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-420', async () => this.filtersButton.click());
  }

  async isFiltersExpanded(): Promise<boolean> {
    return this.filtersPanel.isVisible().catch(() => false);
  }

  async closeFilters(): Promise<void> {
    await recordEvidence('action-press-server-licensing.page-428', async () => this.page.keyboard.press('Escape'));
  }

  // ─── Cards ───────────────────────────────────────────────────

  async getVisibleCardCount(): Promise<number> {
    return this.customerCards.count();
  }

  async getCardNames(): Promise<string[]> {
    const count = await this.customerCards.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const nameEl = this.customerCards.nth(i).locator('h2, h3, h4, p').first();
      const text = await nameEl.textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async discoverFirstCardName(): Promise<string> {
    const names = await this.getCardNames();
    return names.length > 0 ? names[0] : '';
  }

  async discoverSecondCardName(): Promise<string> {
    const names = await this.getCardNames();
    return names.length > 1 ? names[1] : '';
  }

  async getCustomerCount(): Promise<number> {
    const text = await this.customerCountText.textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // ─── Card Expand/Collapse ────────────────────────────────────

  async expandCard(name: string): Promise<void> {
    const toggle = this.cardExpandToggle(name);
    const expanded = await this.isCardExpanded(name);
    if (!expanded) {
      await recordEvidence('action-click-server-licensing.page-471', async () => toggle.click());
    }
  }

  async collapseCard(name: string): Promise<void> {
    const toggle = this.cardExpandToggle(name);
    const expanded = await this.isCardExpanded(name);
    if (expanded) {
      await recordEvidence('action-click-server-licensing.page-479', async () => toggle.click());
    }
  }

  async isCardExpanded(name: string): Promise<boolean> {
    const toggle = this.cardExpandToggle(name);
    const expanded = await toggle.getAttribute('aria-expanded');
    return expanded === 'true';
  }

  async getServerLicenseCountForCustomer(customerName: string): Promise<number> {
    return this.serverLicenseCards(customerName).count();
  }

  // ─── Top-Level Expand/Collapse ───────────────────────────────

  async expandAll(): Promise<void> {
    const visible = await this.expandAllButton.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-server-licensing.page-498', async () => this.expandAllButton.click());
    }
  }

  async collapseAll(): Promise<void> {
    const visible = await this.collapseAllButton.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-server-licensing.page-505', async () => this.collapseAllButton.click());
    }
  }

  async areAllCardsExpanded(): Promise<boolean> {
    const names = await this.getCardNames();
    if (names.length === 0) return true;
    for (const name of names) {
      if (!(await this.isCardExpanded(name))) return false;
    }
    return true;
  }

  async areAllCardsCollapsed(): Promise<boolean> {
    const names = await this.getCardNames();
    if (names.length === 0) return true;
    for (const name of names) {
      if (await this.isCardExpanded(name)) return false;
    }
    return true;
  }

  // ─── Scrolling ───────────────────────────────────────────────

  async isScrollable(): Promise<boolean> {
    return this.cardScrollContainer.evaluate((el: HTMLElement) => {
      return el.scrollHeight > el.clientHeight;
    }).catch(() => false);
  }

  async scrollToBottom(): Promise<void> {
    await recordEvidence('action-evaluate-server-licensing.page-537', async () => this.cardScrollContainer.evaluate((el: HTMLElement) => {
      el.scrollTop = el.scrollHeight;
    }));
  }

  async scrollToTop(): Promise<void> {
    await recordEvidence('action-evaluate-server-licensing.page-543', async () => this.cardScrollContainer.evaluate((el: HTMLElement) => {
      el.scrollTop = 0;
    }));
  }

  async getScrollPosition(): Promise<number> {
    return this.cardScrollContainer.evaluate((el: HTMLElement) => el.scrollTop);
  }

  // ─── States ──────────────────────────────────────────────────

  async isLoadingVisible(): Promise<boolean> {
    return this.loadingIndicator.isVisible().catch(() => false);
  }

  async isEmptyStateVisible(): Promise<boolean> {
    return this.emptyStateMessage.isVisible().catch(() => false);
  }

  async isErrorStateVisible(): Promise<boolean> {
    return this.errorStateMessage.isVisible().catch(() => false);
  }

  // ─── Safe Restoration ────────────────────────────────────────

  async restoreToInitialState(originalLicenseLabel: string): Promise<void> {
    // Restore server license selector
    const current = await this.getSelectedServerLicense();
    if (current !== originalLicenseLabel) {
      await this.selectServerLicense(originalLicenseLabel);
    }

    // Close filters if open
    const filtersOpen = await this.isFiltersExpanded();
    if (filtersOpen) {
      await this.closeFilters();
    }

    // Collapse all cards
    const allCollapsed = await this.areAllCardsCollapsed();
    if (!allCollapsed) {
      await this.collapseAll();
    }

    // Scroll to top
    await this.scrollToTop();
  }

  async verifyCleanState(headingVisible: boolean): Promise<void> {
    await recordEvidence('assert-toBeVisible-server-licensing.page-591', async () => expect(this.heading).toBeVisible({ visible: headingVisible }));
    await recordEvidence('assert-toBeVisible-server-licensing.page-592', async () => expect(this.serverLicenseSelector).toBeVisible());
    const filtersOpen = await this.isFiltersExpanded();
    await recordEvidence('assert-toBe-server-licensing.page-594', async () => expect(filtersOpen).toBe(false));
  }

  // ─── Create Server License Dialog (Batch SVL-B) ──────────────

  async openCreateServerLicenseDialog(customerName: string): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-600', async () => this.cardCreateServerLicenseButton(customerName).click());
    await this.createServerLicenseDialog.waitFor({ state: 'visible' });
  }

  async closeCreateServerLicenseDialog(): Promise<void> {
    const visible = await this.createServerLicenseDialog.isVisible().catch(() => false);
    if (!visible) return;

    // Try Escape first
    await recordEvidence('action-press-server-licensing.page-609', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.createServerLicenseDialog.isVisible().catch(() => false);
    if (stillVisible) {
      // Fallback to Close button
      await recordEvidence('action-click-server-licensing.page-613', async () => this.createServerLicenseCloseButton.click());
    }
    await this.createServerLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelCreateServerLicenseDialog(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-619', async () => this.createServerLicenseCancelButton.click());
    await this.createServerLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  // ─── Edit Customer Dialog (Batch SVL-C) ──────────────────────

  async openEditCustomerDialog(customerName: string): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-626', async () => this.cardEditButton(customerName).click());
    await this.editCustomerDialog.waitFor({ state: 'visible' });
  }

  async closeEditCustomerDialog(): Promise<void> {
    const visible = await this.editCustomerDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-633', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.editCustomerDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-636', async () => this.editCustomerCloseButton.click());
    }
    await this.editCustomerDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelEditCustomerDialog(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-642', async () => this.editCustomerCancelButton.click());
    await this.editCustomerDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async getSelectedServerType(): Promise<string> {
    if (await this.editCustomerServerTypeStandard.isChecked()) return 'Standard';
    if (await this.editCustomerServerTypeFullLicense.isChecked()) return 'Full License';
    if (await this.editCustomerServerTypeHybrid.isChecked()) return 'Hybrid';
    return '';
  }

  async discoverFirstUserGroupName(): Promise<string> {
    // Find group rows inside the edit customer dialog — look for buttons with "Edit group" pattern
    const editButtons = this.editCustomerDialog.getByRole('button', { name: /edit group/i });
    const count = await editButtons.count();
    if (count === 0) return '';
    const fullName = await editButtons.first().getAttribute('aria-label');
    if (!fullName) return '';
    const match = fullName.match(/edit group\s+(.+)/i);
    return match ? match[1] : '';
  }

  // ─── Delete Customer Dialog (Batch SVL-D) ────────────────────

  async openDeleteCustomerDialog(customerName: string): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-667', async () => this.cardDeleteButton(customerName).click());
    await this.deleteCustomerDialog.waitFor({ state: 'visible' });
  }

  async closeDeleteCustomerDialog(): Promise<void> {
    const visible = await this.deleteCustomerDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-674', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.deleteCustomerDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-677', async () => this.deleteCustomerCloseButton.click());
    }
    await this.deleteCustomerDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelDeleteCustomerDialog(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-683', async () => this.deleteCustomerCancelButton.click());
    await this.deleteCustomerDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  // ─── Standard Licenses Tabs (Batch SVL-D) ────────────────────

  async isStandardTabActive(): Promise<boolean> {
    const attr = await this.standardTab.getAttribute('aria-pressed');
    return attr === 'true';
  }

  async getStandardTabCount(): Promise<number> {
    const text = await this.standardTab.textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getFloatingTabCount(): Promise<number> {
    const text = await this.floatingTab.textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async hasAnyStandardLicense(): Promise<boolean> {
    return (await this.getStandardTabCount()) > 0;
  }

  async hasAnyFloatingLicense(): Promise<boolean> {
    return (await this.getFloatingTabCount()) > 0;
  }

  async switchToStandardTab(): Promise<void> {
    if (await this.isStandardTabActive()) return;
    await recordEvidence('action-click-server-licensing.page-718', async () => this.standardTab.click());
  }

  async switchToFloatingTab(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-722', async () => this.floatingTab.click());
  }

  // ─── Standard License Card Helpers (Batch SVL-D) ────────────

  async getFirstStandardLicenseHeading(): Promise<string> {
    const cards = this.getStandardLicenseCards();
    const count = await cards.count();
    if (count === 0) return '';
    const heading = await cards.first().locator('h3').textContent();
    return heading?.trim() ?? '';
  }

  async getFirstStandardLicenseRole(): Promise<string> {
    const cards = this.getStandardLicenseCards();
    if ((await cards.count()) === 0) return '';
    const roleContainer = cards.first().locator('p').filter({ hasText: /profile role/i }).locator('..');
    const paras = roleContainer.locator('p');
    if ((await paras.count()) >= 2) {
      return (await paras.nth(1).textContent())?.trim() ?? '';
    }
    return '';
  }

  async getFirstStandardLicenseQuantity(): Promise<string> {
    const cards = this.getStandardLicenseCards();
    if ((await cards.count()) === 0) return '0';
    const qtyContainer = cards.first().locator('p').filter({ hasText: /^licenses$/i }).locator('..');
    const paras = qtyContainer.locator('p');
    if ((await paras.count()) >= 2) {
      return (await paras.nth(1).textContent())?.trim() ?? '0';
    }
    return '0';
  }

  async getFirstStandardMaintenanceDate(): Promise<string> {
    const cards = this.getStandardLicenseCards();
    if ((await cards.count()) === 0) return '';
    const maintContainer = cards.first().locator('p').filter({ hasText: /^Maintenance$/ }).locator('..');
    const paras = maintContainer.locator('p');
    if ((await paras.count()) >= 2) {
      return (await paras.nth(1).textContent())?.trim() ?? '';
    }
    return '';
  }

  async getFirstStandardExpirationDate(): Promise<string> {
    const cards = this.getStandardLicenseCards();
    if ((await cards.count()) === 0) return '';
    const expContainer = cards.first().locator('p').filter({ hasText: /^Expiration$/ }).locator('..');
    const paras = expContainer.locator('p');
    if ((await paras.count()) >= 2) {
      return (await paras.nth(1).textContent())?.trim() ?? '';
    }
    return '';
  }

  // ─── Edit Standard License Dialog (Batch SVL-D) ──────────────

  async openEditStandardLicenseDialog(): Promise<void> {
    const cards = this.getStandardLicenseCards();
    await recordEvidence('action-click-server-licensing.page-783', async () => cards.first().getByRole('button', { name: /edit standard license/i }).click());
    await this.editStandardLicenseDialog.waitFor({ state: 'visible' });
  }

  async closeEditStandardLicenseDialog(): Promise<void> {
    const visible = await this.editStandardLicenseDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-790', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.editStandardLicenseDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-793', async () => this.editStandardLicenseCloseButton.click());
    }
    await this.editStandardLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelEditStandardLicenseDialog(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-799', async () => this.editStandardLicenseCancelButton.click());
    await this.editStandardLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  // ─── Edit Floating License Dialog (Batch SVL-E) ──────────────

  async openEditFloatingLicenseDialog(): Promise<void> {
    const cards = this.getFloatingLicenseCards();
    await recordEvidence('action-click-server-licensing.page-807', async () => cards.first().getByRole('button', { name: /edit floating license/i }).click());
    await this.editFloatingLicenseDialog.waitFor({ state: 'visible' });
  }

  async closeEditFloatingLicenseDialog(): Promise<void> {
    const visible = await this.editFloatingLicenseDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-814', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.editFloatingLicenseDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-817', async () => this.editFloatingLicenseCloseButton.click());
    }
    await this.editFloatingLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelEditFloatingLicenseDialog(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-823', async () => this.editFloatingLicenseCancelButton.click());
    await this.editFloatingLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  // ─── Create Floating License Form (Batch SVL-E) ──────────────

  async openCreateFloatingLicenseForm(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-830', async () => this.createFloatingLicenseButton.click());
    await this.createFloatingLicenseDialog.waitFor({ state: 'visible' });
  }

  async closeCreateFloatingLicenseForm(): Promise<void> {
    const visible = await this.createFloatingLicenseDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-837', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.createFloatingLicenseDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-840', async () => this.createFloatingLicenseCloseButton.click());
    }
    await this.createFloatingLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelCreateFloatingLicenseForm(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-846', async () => this.createFloatingLicenseCancelButton.click());
    await this.createFloatingLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  // ─── Create Standard License Form (Batch SVL-E) ──────────────

  async openCreateStandardLicenseForm(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-853', async () => this.createStandardLicenseButton.click());
    await this.createStandardLicenseDialog.waitFor({ state: 'visible' });
  }

  async closeCreateStandardLicenseForm(): Promise<void> {
    const visible = await this.createStandardLicenseDialog.isVisible().catch(() => false);
    if (!visible) return;
    await recordEvidence('action-press-server-licensing.page-860', async () => this.page.keyboard.press('Escape'));
    const stillVisible = await this.createStandardLicenseDialog.isVisible().catch(() => false);
    if (stillVisible) {
      await recordEvidence('action-click-server-licensing.page-863', async () => this.createStandardLicenseCloseButton.click());
    }
    await this.createStandardLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelCreateStandardLicenseForm(): Promise<void> {
    await recordEvidence('action-click-server-licensing.page-869', async () => this.createStandardLicenseCancelButton.click());
    await this.createStandardLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }
}