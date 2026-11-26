import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProfilesPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly createProfileButton: Locator;

  // Controls
  readonly searchInput: Locator;
  readonly sortFieldCombo: Locator;
  readonly sortDirectionCombo: Locator;

  // Cards
  readonly cardGrid: Locator;
  readonly profileCards: Locator;

  // Card structure (card-scoped)
  readonly cardHeading: (card: Locator) => Locator;
  readonly cardEditButton: (card: Locator) => Locator;
  readonly cardDeleteButton: (card: Locator) => Locator;
  readonly cardUserLicensesValue: (card: Locator) => Locator;
  readonly cardFloatingValue: (card: Locator) => Locator;
  readonly cardAssignedValue: (card: Locator) => Locator;
  readonly cardRolesCount: (card: Locator) => Locator;
  readonly cardRoleBadges: (card: Locator) => Locator;
  readonly cardRoleOverflowBadge: (card: Locator) => Locator;
  readonly cardManageButton: (card: Locator) => Locator;

  // Manage dialog — opened via card Manage button
  readonly manageDialog: (profileName: string) => Locator;
  readonly manageDialogHeading: Locator;
  readonly manageDialogDescription: Locator;
  readonly manageDialogTabOverview: Locator;
  readonly manageDialogTabRoles: Locator;
  readonly manageDialogTabFeatures: Locator;
  readonly manageDialogTabpanel: Locator;
  readonly manageDialogCloseButton: Locator;
  readonly manageOverviewLicenses: Locator;
  readonly manageOverviewFloating: Locator;
  readonly manageOverviewAssigned: Locator;
  readonly manageOverviewDetailName: Locator;
  readonly manageOverviewDetailDescription: Locator;
  readonly manageOverviewDetailTotalRoles: Locator;
  readonly manageRolesHeading: Locator;
  readonly manageRolesAddButton: Locator;
  readonly manageRolesTable: Locator;
  readonly manageRolesEmpty: Locator;

  // Role row accessors (row-scoped — use inside Role tab panel only)
  readonly manageRolesRowName: (row: Locator) => Locator;
  readonly manageRolesRowValue: (row: Locator) => Locator;
  readonly manageRolesRowEdit: (row: Locator) => Locator;
  readonly manageRolesRowDelete: (row: Locator) => Locator;

  // Add Role dialog
  readonly addRoleDialog: Locator;
  readonly addRoleHeading: Locator;
  readonly addRoleDescription: Locator;
  readonly addRoleNameInput: Locator;
  readonly addRoleValueInput: Locator;
  readonly addRoleCancelButton: Locator;
  readonly addRoleSaveButton: Locator;
  readonly addRoleCloseButton: Locator;

  readonly manageFeaturesHeading: Locator;
  readonly manageFeaturesAddCombo: Locator;
  readonly manageFeaturesTable: Locator;
  readonly manageFeaturesCreateButton: Locator;
  readonly manageFeaturesSaveButton: Locator;

  // Add Feature popover
  readonly manageFeaturesAddPopover: Locator;
  readonly manageFeaturesAddSearch: Locator;
  readonly manageFeaturesAddOptions: Locator;

  // Feature row accessors (row-scoped — use inside Features tab panel only)
  readonly manageFeaturesRowVersion: (row: Locator) => Locator;
  readonly manageFeaturesRowAccess: (row: Locator) => Locator;
  readonly manageFeaturesRowRemove: (row: Locator) => Locator;
  readonly manageFeaturesRowByName: (name: string) => Locator;
  readonly manageFeaturesRowCount: () => Promise<number>;

  // Create Profile dialog
  readonly createProfileDialog: Locator;
  readonly createProfileHeading: Locator;
  readonly createProfileDescription: Locator;
  readonly createProfileNameInput: Locator;
  readonly createProfileDescriptionInput: Locator;
  readonly createProfileDescriptionCounter: Locator;
  readonly createProfileCancelButton: Locator;
  readonly createProfileSaveButton: Locator;
  readonly createProfileCloseButton: Locator;

  // Edit Profile dialog
  readonly editDialog: Locator;
  readonly editHeading: Locator;
  readonly editDescription: Locator;
  readonly editNameInput: Locator;
  readonly editDescriptionInput: Locator;
  readonly editDescriptionCounter: Locator;
  readonly editCancelButton: Locator;
  readonly editSaveButton: Locator;
  readonly editCloseButton: Locator;

  // Delete confirmation dialog
  readonly deleteConfirmDialog: Locator;
  readonly deleteConfirmHeading: Locator;
  readonly deleteConfirmWarning: Locator;
  readonly deleteConfirmCancelButton: Locator;
  readonly deleteConfirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Profiles', level: 1 });
    this.createProfileButton = page.getByRole('button', { name: 'Create Profile' });

    this.searchInput = page.getByPlaceholder('Search');
    this.sortFieldCombo = page.getByRole('combobox').first();
    this.sortDirectionCombo = page.getByRole('combobox').last();

    // Card grid: the container under main that holds all cards
    this.cardGrid = page.locator('main div.grid').filter({ has: page.locator('h3') }).first();
    this.profileCards = page.locator('main div.bg-card').filter({ has: page.locator('h3') }); // card wrapper

    // Card-level accessors — card is the wrapper div containing the h3 + stats
    this.cardHeading = (card: Locator) => card.locator('h3');
    this.cardEditButton = (card: Locator) => card.locator('button').first();
    this.cardDeleteButton = (card: Locator) => card.locator('button').nth(1);
    this.cardUserLicensesValue = (card: Locator) => card.getByText('User Licenses', { exact: true }).locator('..').locator('div').first();
    this.cardFloatingValue = (card: Locator) => card.getByText('Floating', { exact: true }).locator('..').locator('div').first();
    this.cardAssignedValue = (card: Locator) => card.getByText('Assigned', { exact: true }).locator('..').locator('div').first();
    this.cardRolesCount = (card: Locator) => card.locator('text=/\\d+ Roles/');
    this.cardRoleBadges = (card: Locator) => card.locator('div.flex-wrap > div.rounded-full');
    this.cardRoleOverflowBadge = (card: Locator) => card.getByText(/^\+\d+$/);
    this.cardManageButton = (card: Locator) => card.getByRole('button', { name: 'Manage' });

    // Manage dialog
    this.manageDialog = (profileName: string) => page.getByRole('dialog', { name: profileName });
    this.manageDialogHeading = page.getByRole('heading', { level: 2 });
    this.manageDialogDescription = page.locator('[role="dialog"] p').first();
    this.manageDialogTabOverview = page.getByRole('tab', { name: 'Overview' });
    this.manageDialogTabRoles = page.getByRole('tab', { name: 'Roles' });
    this.manageDialogTabFeatures = page.getByRole('tab', { name: 'Features' });
    this.manageDialogTabpanel = page.getByRole('tabpanel');
    this.manageDialogCloseButton = page.getByRole('button', { name: 'Close' });
    this.manageOverviewLicenses = page.locator('[role="tabpanel"]').first().locator('text=/User Licenses/').locator('..').locator('> :first-child');
    this.manageOverviewFloating = page.locator('[role="tabpanel"]').first().locator('text=/Floating/').locator('..').locator('> :first-child');
    this.manageOverviewAssigned = page.locator('[role="tabpanel"]').first().locator('text=/Assigned/').locator('..').locator('> :first-child');
    this.manageOverviewDetailName = page.getByRole('tabpanel', { name: 'Overview' }).getByText('Name', { exact: true }).locator('..').locator('> :last-child');
    this.manageOverviewDetailDescription = page.getByRole('tabpanel', { name: 'Overview' }).getByText('Description', { exact: true }).locator('..').locator('> :last-child');
    this.manageOverviewDetailTotalRoles = page.getByRole('tabpanel', { name: 'Overview' }).getByText('Total Roles', { exact: true }).locator('..').locator('> :last-child');
    this.manageRolesHeading = page.getByRole('heading', { name: 'Manage Roles' });
    this.manageRolesAddButton = page.getByRole('button', { name: 'Add Role' });
    this.manageRolesTable = page.getByRole('tabpanel', { name: 'Roles' }).locator('.space-y-2');
    this.manageRolesEmpty = page.getByRole('tabpanel', { name: 'Roles' }).locator('text=/No roles|No role entries|empty/i');

    // Role row accessors — scoped to a single row within the Roles tab
    // Rows are div.border.rounded-lg containers, not <table>/<tr>
    this.manageRolesRowName = (row: Locator) => row.locator(':scope > div:first-child > div:first-child');
    this.manageRolesRowValue = (row: Locator) => row.locator(':scope > div:first-child > div:last-child');
    this.manageRolesRowEdit = (row: Locator) => row.locator('button:has(svg.lucide-square-pen)');
    this.manageRolesRowDelete = (row: Locator) => row.locator('button:has(svg.lucide-trash2)');

    // Add Role dialog
    this.addRoleDialog = page.getByRole('dialog', { name: 'Add Role' });
    this.addRoleHeading = this.addRoleDialog.getByRole('heading', { name: 'Add Role', level: 2 });
    this.addRoleDescription = this.addRoleDialog.locator('p').first();
    this.addRoleNameInput = this.addRoleDialog.getByRole('textbox', { name: /Role Name/i });
    this.addRoleValueInput = this.addRoleDialog.getByRole('spinbutton', { name: /Value/i });
    this.addRoleCancelButton = this.addRoleDialog.getByRole('button', { name: 'Cancel' });
    this.addRoleSaveButton = this.addRoleDialog.getByRole('button', { name: 'Save' });
    this.addRoleCloseButton = this.addRoleDialog.getByRole('button', { name: 'Close' });

    this.manageFeaturesHeading = page.getByRole('heading', { name: 'Manage Features' });
    this.manageFeaturesAddCombo = page.getByRole('tabpanel', { name: 'Features' }).getByRole('combobox').filter({ hasText: /Add feature/i });
    this.manageFeaturesTable = page.getByRole('tabpanel', { name: 'Features' }).locator('table');
    this.manageFeaturesCreateButton = page.getByRole('button', { name: 'Create Feature' });
    this.manageFeaturesSaveButton = page.getByRole('button', { name: 'Save' });

    // Add Feature popover: a role="dialog" (not a listbox) with search and options
    this.manageFeaturesAddPopover = page.getByRole('dialog').filter({ has: page.getByRole('option') });
    this.manageFeaturesAddSearch = this.manageFeaturesAddPopover.getByRole('textbox').or(
      this.manageFeaturesAddPopover.getByPlaceholder(/search/i)
    );
    this.manageFeaturesAddOptions = this.manageFeaturesAddPopover.getByRole('option');

    // Feature row accessors — Version and Access Level are comboboxes in the second cell
    this.manageFeaturesRowVersion = (row: Locator) => row.locator('td').nth(1).getByRole('combobox').first();
    this.manageFeaturesRowAccess = (row: Locator) => row.locator('td').nth(1).getByRole('combobox').last();
    this.manageFeaturesRowRemove = (row: Locator) => row.locator('td').first().locator('button');

    // Get a feature row by the feature name displayed in the first cell
    this.manageFeaturesRowByName = (name: string) =>
      this.manageFeaturesTable.locator('tbody tr').filter({
        has: this.manageFeaturesTable.locator('td').first().filter({ hasText: name }),
      });
    this.manageFeaturesRowCount = async () => {
      const allRows = this.manageFeaturesTable.locator('tbody tr');
      const addRow = this.manageFeaturesTable.locator('tbody tr td[colspan]');
      return allRows.count().then(async (c) => c - (await addRow.count()));
    };

    // Create Profile dialog
    this.createProfileDialog = page.getByRole('dialog', { name: 'Create Profile' });
    this.createProfileHeading = this.createProfileDialog.getByRole('heading', { name: 'Create Profile', level: 2 });
    this.createProfileDescription = this.createProfileDialog.locator('p').first();
    this.createProfileNameInput = this.createProfileDialog.getByRole('textbox', { name: /Profile Name/i });
    this.createProfileDescriptionInput = this.createProfileDialog.getByRole('textbox', { name: 'Description' });
    this.createProfileDescriptionCounter = this.createProfileDialog.getByText(/^\d+\s*\/\s*1000$/);
    this.createProfileCancelButton = this.createProfileDialog.getByRole('button', { name: 'Cancel' });
    this.createProfileSaveButton = this.createProfileDialog.getByRole('button', { name: 'Save' });
    this.createProfileCloseButton = this.createProfileDialog.getByRole('button', { name: 'Close' });

    // Edit Profile dialog
    this.editDialog = page.getByRole('dialog', { name: 'Edit' });
    this.editHeading = this.editDialog.getByRole('heading', { name: 'Edit', level: 2 });
    this.editDescription = this.editDialog.locator('p').first();
    this.editNameInput = this.editDialog.getByRole('textbox', { name: /Profile Name/i });
    this.editDescriptionInput = this.editDialog.getByRole('textbox', { name: 'Description' });
    this.editDescriptionCounter = this.editDialog.locator('span.text-sm.text-muted-foreground').or(
      this.editDialog.locator('text=/\\d+\\s*\\/\\s*1000/')
    );
    this.editCancelButton = this.editDialog.getByRole('button', { name: 'Cancel' });
    this.editSaveButton = this.editDialog.getByRole('button', { name: 'Save' });
    this.editCloseButton = this.editDialog.getByRole('button', { name: 'Close' });

    // Delete confirmation dialog
    this.deleteConfirmDialog = page.getByRole('alertdialog');
    this.deleteConfirmHeading = this.deleteConfirmDialog.getByRole('heading', { name: 'Are you sure?' });
    this.deleteConfirmWarning = this.deleteConfirmDialog.locator('p');
    this.deleteConfirmCancelButton = this.deleteConfirmDialog.getByRole('button', { name: 'Cancel' });
    this.deleteConfirmDeleteButton = this.deleteConfirmDialog.getByRole('button', { name: 'Delete' });
  }

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-profiles.page-239', async () => this.page.goto('/profiles'));
    await this.heading.waitFor({ state: 'visible' });
    await expect(this.profileCards.first().or(this.page.getByText(/No profiles|No results/i).first()).first()).toBeVisible({ timeout: 60000 });
  }

  async getCardCount(): Promise<number> {
    return this.profileCards.count();
  }

  async getCardByName(name: string): Promise<Locator | null> {
    const count = await this.getCardCount();
    for (let i = 0; i < count; i++) {
      const card = this.profileCards.nth(i);
      const heading = await this.cardHeading(card).textContent();
      if (heading?.trim() === name) return card;
    }
    return null;
  }

  async getCardHeading(card: Locator): Promise<string> {
    const text = await this.cardHeading(card).textContent();
    return (text || '').trim();
  }

  async getFirstProfileName(): Promise<string> {
    const count = await this.getCardCount();
    if (count === 0) return '';
    return this.getCardHeading(this.profileCards.first());
  }

  async search(searchText: string): Promise<void> {
    await recordEvidence('action-fill-profiles.page-269', async () => this.searchInput.fill(searchText));
  }

  async clearSearch(): Promise<void> {
    await recordEvidence('action-clear-profiles.page-273', async () => this.searchInput.clear());
  }

  async getSortField(): Promise<string> {
    const text = await this.sortFieldCombo.textContent();
    return (text || '').trim();
  }

  async getSortDirection(): Promise<string> {
    const text = await this.sortDirectionCombo.textContent();
    return (text || '').trim();
  }

  async getRoleBadgeTexts(card: Locator): Promise<string[]> {
    const badges = this.cardRoleBadges(card);
    const count = await badges.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await badges.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async getRoleCount(card: Locator): Promise<number> {
    const text = await this.cardRolesCount(card).textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)\s+Roles/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async openManageDialog(card: Locator, expectedProfileName: string): Promise<void> {
    await recordEvidence('action-click-profiles.page-305', async () => this.cardManageButton(card).click());
    await this.manageDialog(expectedProfileName).waitFor({ state: 'visible' });
  }

  async closeManageDialog(): Promise<void> {
    await recordEvidence('action-click-profiles.page-310', async () => this.manageDialogCloseButton.click());
    await this.manageDialogTabOverview.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async openEditDialog(card: Locator): Promise<void> {
    await recordEvidence('action-click-profiles.page-315', async () => this.cardEditButton(card).click());
    await this.editDialog.waitFor({ state: 'visible' });
  }

  async closeEditDialog(): Promise<void> {
    await recordEvidence('action-click-profiles.page-320', async () => this.editCloseButton.click());
    await this.editDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async getManageRoleRowByName(name: string): Promise<Locator | null> {
    const rows = this.manageRolesTable.locator('> div');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const nameText = await this.manageRolesRowName(row).textContent();
      if (nameText?.trim() === name) return row;
    }
    return null;
  }

  async getManageRoleCount(): Promise<number> {
    const rows = this.manageRolesTable.locator('> div');
    return rows.count();
  }

  async deleteProfileById(id: string): Promise<void> {
    // Placeholder — profile deletion is not yet implemented
    // This method exists for synthetic lifecycle cleanup
    void id;
  }

  async deleteProfileByName(name: string): Promise<void> {
    // Placeholder — profile deletion is not yet implemented
    // This method exists for synthetic lifecycle cleanup
    void name;
  }
}