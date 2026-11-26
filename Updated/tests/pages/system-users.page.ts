import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class SystemUsersPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly mainContent: Locator;

  // Sidebar
  readonly sidebarSystemUsersLink: Locator;

  // Controls
  readonly searchInput: Locator;
  readonly clearSearchButton: Locator;
  readonly profilesFilterCombobox: Locator;
  readonly userGroupsFilterCombobox: Locator;
  readonly clearAllButton: Locator;
  readonly countText: Locator;

  // Filter dialogs
  readonly profilesFilterDialog: Locator;
  readonly profilesFilterListbox: Locator;
  readonly profilesFilterOptions: Locator;
  readonly profilesFilterSelectAll: Locator;
  readonly profilesFilterClearAll: Locator;
  readonly profilesFilterDone: Locator;
  readonly profilesFilterSelectedCount: Locator;
  readonly profilesFilterSearchInput: Locator;

  readonly userGroupsFilterDialog: Locator;
  readonly userGroupsFilterSearchInput: Locator;
  readonly userGroupsFilterExpandAll: Locator;
  readonly userGroupsFilterCollapseAll: Locator;
  readonly userGroupsFilterSelectAll: Locator;
  readonly userGroupsFilterClearSelection: Locator;
  readonly userGroupsFilterDone: Locator;
  readonly userGroupsFilterSelectedCount: Locator;
  readonly userGroupsFilterTreeItems: Locator;

  // Table
  readonly table: Locator;
  readonly tableBody: Locator;
  readonly rows: Locator;
  readonly columnHeaderName: Locator;
  readonly columnHeaderEmail: Locator;
  readonly columnHeaderUserGroups: Locator;
  readonly columnHeaderProfiles: Locator;
  readonly columnHeaderActions: Locator;

  // Row-level accessors
  readonly rowName: (row: Locator) => Locator;
  readonly rowEmail: (row: Locator) => Locator;
  readonly rowUserGroupChips: (row: Locator) => Locator;
  readonly rowProfileChips: (row: Locator) => Locator;
  readonly rowEditButton: (row: Locator) => Locator;
  readonly rowUserGroupOverflow: (row: Locator) => Locator;
  readonly rowProfileOverflow: (row: Locator) => Locator;

  // Overflow expansion
  readonly expandedUserGroupChips: (row: Locator) => Locator;
  readonly expandedProfileChips: (row: Locator) => Locator;
  readonly showFewerUserGroupsButton: (row: Locator) => Locator;
  readonly showFewerProfilesButton: (row: Locator) => Locator;

  // Edit Assignments dialog
  readonly editAssignmentsDialog: Locator;
  readonly editAssignmentsHeading: Locator;
  readonly editAssignmentsDescription: Locator;
  readonly editAssignmentsProfilesSection: Locator;
  readonly editAssignmentsProfilesCombobox: Locator;
  readonly editAssignmentsProfilesChipContainer: Locator;
  readonly editAssignmentsProfileChips: Locator;
  readonly editAssignmentsUserGroupsSection: Locator;
  readonly editAssignmentsUserGroupsCombobox: Locator;
  readonly editAssignmentsUserGroupsChipContainer: Locator;
  readonly editAssignmentsUserGroupChips: Locator;
  readonly editAssignmentsCancelButton: Locator;
  readonly editAssignmentsUpdateButton: Locator;
  readonly editAssignmentsCloseButton: Locator;

  // Edit Assignments — nested selection dialogs
  readonly editAssignmentsSelectionDialog: Locator;
  readonly editAssignmentsSelectionListbox: Locator;
  readonly editAssignmentsSelectionOptions: Locator;
  readonly editAssignmentsSelectionSelectAll: Locator;
  readonly editAssignmentsSelectionClearAll: Locator;
  readonly editAssignmentsSelectionDone: Locator;
  readonly editAssignmentsSelectionCount: Locator;
  readonly editAssignmentsSelectionSearch: Locator;

  // States
  readonly loadingText: Locator;
  readonly emptyState: Locator;
  readonly scrollbarWrapper: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page shell
    this.heading = page.getByRole('heading', { name: 'System Users', level: 1 });
    this.mainContent = page.locator('main');

    // Sidebar
    this.sidebarSystemUsersLink = page.locator('a[href="/system-users"]');

    // Controls
    this.searchInput = page.getByPlaceholder('Search system users...');
    this.clearSearchButton = page.getByRole('button', { name: 'Clear search' });
    this.profilesFilterCombobox = page.getByRole('combobox').filter({ hasText: 'Profiles' });
    this.userGroupsFilterCombobox = page.getByRole('combobox', { name: 'Filter by user groups' });
    this.clearAllButton = page.getByRole('button', { name: 'Clear All' });
    this.countText = page.getByText(/Showing\s+\d+\s+of\s+\d+\s+system users/);

    // Profiles filter dialog
    this.profilesFilterDialog = page.getByRole('dialog');
    this.profilesFilterListbox = page.getByRole('listbox', { name: 'Suggestions' });
    this.profilesFilterOptions = page.getByRole('option');
    this.profilesFilterSelectAll = page.getByRole('button', { name: 'Select All' });
    this.profilesFilterClearAll = page.getByRole('button', { name: 'Clear All' });
    this.profilesFilterDone = page.getByRole('button', { name: 'Done' });
    this.profilesFilterSelectedCount = page.getByText(/^\d+\s+selected$/);
    this.profilesFilterSearchInput = page.getByRole('combobox').filter({ has: page.getByRole('listbox') });

    // User Groups filter dialog
    this.userGroupsFilterDialog = page.getByRole('dialog');
    this.userGroupsFilterSearchInput = page.getByPlaceholder('Search user groups...');
    this.userGroupsFilterExpandAll = page.getByRole('button', { name: 'Expand All' });
    this.userGroupsFilterCollapseAll = page.getByRole('button', { name: 'Collapse All' });
    this.userGroupsFilterSelectAll = page.getByRole('button', { name: 'Select All' });
    this.userGroupsFilterClearSelection = page.getByRole('button', { name: 'Clear Selection' });
    this.userGroupsFilterDone = page.getByRole('button', { name: 'Done' });
    this.userGroupsFilterSelectedCount = page.getByText(/^\d+\s+selected$/);
    this.userGroupsFilterTreeItems = page.locator('[role="dialog"] [role="checkbox"]');

    // Table
    this.table = page.getByRole('table');
    this.tableBody = this.table.locator('tbody');
    this.rows = this.tableBody.locator('tr');
    this.columnHeaderName = page.getByRole('columnheader', { name: 'Name' });
    this.columnHeaderEmail = page.getByRole('columnheader', { name: 'Email' });
    this.columnHeaderUserGroups = page.getByRole('columnheader', { name: 'User Groups' });
    this.columnHeaderProfiles = page.getByRole('columnheader', { name: 'Profiles' });
    this.columnHeaderActions = page.getByRole('columnheader', { name: 'Actions' });
    this.scrollbarWrapper = this.table.locator('..');

    // Row-level accessors
    this.rowName = (row: Locator) => row.locator('td').nth(0);
    this.rowEmail = (row: Locator) => row.locator('td').nth(1);
    this.rowUserGroupChips = (row: Locator) => row.locator('td').nth(2).locator('> * > *');
    this.rowProfileChips = (row: Locator) => row.locator('td').nth(3).locator('> * > *');
    this.rowEditButton = (row: Locator) => row.getByRole('button', { name: /^Edit / });
    this.rowUserGroupOverflow = (row: Locator) =>
      row.locator('td').nth(2).getByRole('button', { name: /Show \d+ more user groups/ });
    this.rowProfileOverflow = (row: Locator) =>
      row.locator('td').nth(3).getByRole('button', { name: /Show \d+ more profiles/ });

    // Overflow expansion
    this.expandedUserGroupChips = (row: Locator) => row.locator('td').nth(2).locator('> * > *');
    this.expandedProfileChips = (row: Locator) => row.locator('td').nth(3).locator('> * > *');
    this.showFewerUserGroupsButton = (row: Locator) =>
      row.locator('td').nth(2).getByRole('button', { name: /Show fewer user groups/ });
    this.showFewerProfilesButton = (row: Locator) =>
      row.locator('td').nth(3).getByRole('button', { name: /Show fewer profiles/ });

    // Edit Assignments dialog
    this.editAssignmentsDialog = page.getByRole('dialog', { name: 'Edit Assignments' });
    this.editAssignmentsHeading = page.getByRole('heading', { name: 'Edit Assignments', level: 2 });
    this.editAssignmentsDescription = this.editAssignmentsDialog.locator('p').first();
    this.editAssignmentsProfilesSection = this.editAssignmentsDialog.locator('.space-y-5 > .space-y-2').first();
    this.editAssignmentsProfilesCombobox = this.editAssignmentsProfilesSection.getByRole('combobox');
    this.editAssignmentsProfilesChipContainer = this.editAssignmentsProfilesSection.locator('.flex-wrap');
    this.editAssignmentsProfileChips = this.editAssignmentsProfilesChipContainer.locator('> div');
    this.editAssignmentsUserGroupsSection = this.editAssignmentsDialog.locator('.space-y-5 > .space-y-2').nth(1);
    this.editAssignmentsUserGroupsCombobox = this.editAssignmentsUserGroupsSection.getByRole('combobox');
    this.editAssignmentsUserGroupsChipContainer = this.editAssignmentsUserGroupsSection.locator('.flex-wrap');
    this.editAssignmentsUserGroupChips = this.editAssignmentsUserGroupsChipContainer.locator('> div');
    this.editAssignmentsCancelButton = this.editAssignmentsDialog.getByRole('button', { name: 'Cancel' });
    this.editAssignmentsUpdateButton = this.editAssignmentsDialog.getByRole('button', { name: 'Update' });
    this.editAssignmentsCloseButton = this.editAssignmentsDialog.getByRole('button', { name: 'Close' });

    // Edit Assignments — nested selection dialog (the popover that opens from either combobox)
    this.editAssignmentsSelectionDialog = page.locator('[role="dialog"]').last();
    this.editAssignmentsSelectionListbox = page.getByRole('listbox', { name: 'Suggestions' });
    this.editAssignmentsSelectionOptions = page.getByRole('option');
    this.editAssignmentsSelectionSelectAll = page.getByRole('button', { name: 'Select All' });
    this.editAssignmentsSelectionClearAll = page.getByRole('button', { name: 'Clear All' });
    this.editAssignmentsSelectionDone = page.getByRole('button', { name: 'Done' });
    this.editAssignmentsSelectionCount = page.getByText(/^\d+\s+selected$/);
    this.editAssignmentsSelectionSearch = page.locator('[role="dialog"] [role="combobox"]').last();

    // States
    this.loadingText = page.getByText('Loading System Users...');
    this.emptyState = page.getByText(/No (system users|results|matching)/i);
  }

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-system-users.page-199', async () => this.page.goto('/system-users'));
    await this.heading.waitFor({ state: 'visible' });
  }

  async waitForLoad(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.countText.waitFor({ state: 'visible' });
  }

  async waitForTableStable(): Promise<void> {
    await this.countText.waitFor({ state: 'visible' });
    await recordEvidence('assert-toBeVisible-system-users.page-210', async () => expect(this.rows.first()).toBeVisible());
  }

  // ── Count helpers ────────────────────────────────────────────────

  async getVisibleCount(): Promise<number> {
    const text = await this.countText.textContent();
    const match = text?.match(/Showing\s+(\d+)\s+of\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : -1;
  }

  async getTotalCount(): Promise<number> {
    const text = await this.countText.textContent();
    const match = text?.match(/of\s+(\d+)\s+system users/i);
    return match ? parseInt(match[1], 10) : -1;
  }

  async getRowCount(): Promise<number> {
    return this.rows.count();
  }

  async getLoadedTableRows(): Promise<{ names: string[]; emails: string[] }> {
    const count = await this.rows.count();
    const names: string[] = [];
    const emails: string[] = [];
    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      names.push(((await this.rowName(row).textContent()) ?? '').trim());
      emails.push(((await this.rowEmail(row).textContent()) ?? '').trim());
    }
    return { names, emails };
  }

  // ── Search ───────────────────────────────────────────────────────

  async search(value: string): Promise<void> {
    await recordEvidence('action-fill-system-users.page-246', async () => this.searchInput.fill(value));
  }

  async clearSearch(): Promise<void> {
    const hasClear = await this.clearSearchButton.isVisible().catch(() => false);
    if (hasClear) {
      await recordEvidence('action-click-system-users.page-252', async () => this.clearSearchButton.click());
    } else {
      await recordEvidence('action-fill-system-users.page-254', async () => this.searchInput.fill(''));
    }
  }

  async getSearchValue(): Promise<string> {
    return this.searchInput.inputValue();
  }

  // ── Profiles filter ──────────────────────────────────────────────

  async openProfilesFilter(): Promise<void> {
    await recordEvidence('action-click-system-users.page-265', async () => this.profilesFilterCombobox.click());
    await this.profilesFilterListbox.waitFor({ state: 'visible' });
  }

  async closeProfilesFilter(): Promise<void> {
    await recordEvidence('action-press-system-users.page-270', async () => this.page.keyboard.press('Escape'));
    await this.profilesFilterListbox.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async getProfilesFilterAvailableOptions(): Promise<string[]> {
    const options = this.profilesFilterOptions;
    const count = await options.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async selectProfileOption(optionName: string): Promise<void> {
    await recordEvidence('action-click-system-users.page-286', async () => this.profilesFilterOptions.filter({ hasText: optionName }).click());
  }

  async selectAllProfiles(): Promise<void> {
    await recordEvidence('action-click-system-users.page-290', async () => this.profilesFilterSelectAll.click());
  }

  async clearProfilesSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-294', async () => this.profilesFilterClearAll.click());
  }

  async doneProfilesFilter(): Promise<void> {
    await recordEvidence('action-click-system-users.page-298', async () => this.profilesFilterDone.click());
  }

  async getProfilesSelectedCount(): Promise<number> {
    const text = await this.profilesFilterSelectedCount.textContent();
    const match = text?.match(/(\d+)\s+selected/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // ── User Groups filter ───────────────────────────────────────────

  async openUserGroupsFilter(): Promise<void> {
    await recordEvidence('action-click-system-users.page-310', async () => this.userGroupsFilterCombobox.click());
    await this.userGroupsFilterSearchInput.waitFor({ state: 'visible' });
  }

  async closeUserGroupsFilter(): Promise<void> {
    await recordEvidence('action-press-system-users.page-315', async () => this.page.keyboard.press('Escape'));
    await this.userGroupsFilterSearchInput.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async selectUserGroupCheckbox(groupName: string): Promise<void> {
    await recordEvidence('action-check-system-users.page-320', async () => this.userGroupsFilterTreeItems.filter({ hasText: groupName }).check());
  }

  async selectAllUserGroups(): Promise<void> {
    await recordEvidence('action-click-system-users.page-324', async () => this.userGroupsFilterSelectAll.click());
  }

  async clearUserGroupSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-328', async () => this.userGroupsFilterClearSelection.click());
  }

  async doneUserGroupsFilter(): Promise<void> {
    await recordEvidence('action-click-system-users.page-332', async () => this.userGroupsFilterDone.click());
  }

  async getUserGroupsSelectedCount(): Promise<number> {
    const text = await this.userGroupsFilterSelectedCount.textContent();
    const match = text?.match(/(\d+)\s+selected/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // ── Clear All ────────────────────────────────────────────────────

  async clickClearAll(): Promise<void> {
    await recordEvidence('action-click-system-users.page-344', async () => this.clearAllButton.click());
  }

  async isClearAllEnabled(): Promise<boolean> {
    return this.clearAllButton.isEnabled();
  }

  // ── Overflow expansion ───────────────────────────────────────────

  async isUserGroupOverflowPresent(row: Locator): Promise<boolean> {
    return this.rowUserGroupOverflow(row).isVisible().catch(() => false);
  }

  async isProfileOverflowPresent(row: Locator): Promise<boolean> {
    return this.rowProfileOverflow(row).isVisible().catch(() => false);
  }

  async getUserGroupOverflowCount(row: Locator): Promise<number> {
    const name = await this.rowUserGroupOverflow(row).getAttribute('aria-label');
    const match = name?.match(/Show\s+(\d+)\s+more/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getProfileOverflowCount(row: Locator): Promise<number> {
    const name = await this.rowProfileOverflow(row).getAttribute('aria-label');
    const match = name?.match(/Show\s+(\d+)\s+more/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async expandUserGroups(row: Locator): Promise<void> {
    await recordEvidence('action-click-system-users.page-374', async () => this.rowUserGroupOverflow(row).click());
  }

  async expandProfiles(row: Locator): Promise<void> {
    await recordEvidence('action-click-system-users.page-378', async () => this.rowProfileOverflow(row).click());
  }

  async collapseUserGroups(row: Locator): Promise<void> {
    await recordEvidence('action-click-system-users.page-382', async () => this.showFewerUserGroupsButton(row).click());
  }

  async collapseProfiles(row: Locator): Promise<void> {
    await recordEvidence('action-click-system-users.page-386', async () => this.showFewerProfilesButton(row).click());
  }

  async isUserGroupExpanded(row: Locator): Promise<boolean> {
    return this.showFewerUserGroupsButton(row).isVisible().catch(() => false);
  }

  async isProfileExpanded(row: Locator): Promise<boolean> {
    return this.showFewerProfilesButton(row).isVisible().catch(() => false);
  }

  async getVisibleUserGroupChipCount(row: Locator): Promise<number> {
    return this.rowUserGroupChips(row).count();
  }

  async getVisibleProfileChipCount(row: Locator): Promise<number> {
    return this.rowProfileChips(row).count();
  }

  // ── Edit assignment ──────────────────────────────────────────────

  async openEditAssignments(row: Locator): Promise<void> {
    await recordEvidence('action-click-system-users.page-408', async () => this.rowEditButton(row).click());
    await this.editAssignmentsDialog.waitFor({ state: 'visible' });
  }

  async closeEditAssignments(): Promise<void> {
    await recordEvidence('action-click-system-users.page-413', async () => this.editAssignmentsCloseButton.click());
    await this.editAssignmentsDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async cancelEditAssignments(): Promise<void> {
    await recordEvidence('action-click-system-users.page-418', async () => this.editAssignmentsCancelButton.click());
    await this.editAssignmentsDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async dismissEditAssignmentsByEscape(): Promise<void> {
    await recordEvidence('action-press-system-users.page-423', async () => this.page.keyboard.press('Escape'));
    await this.editAssignmentsDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async isEditAssignmentsDialogVisible(): Promise<boolean> {
    return this.editAssignmentsDialog.isVisible().catch(() => false);
  }

  // ── Edit Assignments — profile chip helpers ───────────────────────

  async getDialogProfileChipNames(): Promise<string[]> {
    const count = await this.editAssignmentsProfileChips.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.editAssignmentsProfileChips.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async getDialogUserGroupChipNames(): Promise<string[]> {
    const count = await this.editAssignmentsUserGroupChips.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.editAssignmentsUserGroupChips.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async isUpdateButtonEnabled(): Promise<boolean> {
    return this.editAssignmentsUpdateButton.isEnabled();
  }

  // ── Edit Assignments — nested selection dialog helpers ────────────

  async openProfilesSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-460', async () => this.editAssignmentsProfilesCombobox.click());
    await this.editAssignmentsSelectionListbox.waitFor({ state: 'visible' });
  }

  async openUserGroupsSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-465', async () => this.editAssignmentsUserGroupsCombobox.click());
    await this.editAssignmentsSelectionListbox.waitFor({ state: 'visible' });
  }

  async closeSelectionDialog(): Promise<void> {
    await recordEvidence('action-press-system-users.page-470', async () => this.page.keyboard.press('Escape'));
    await this.editAssignmentsSelectionListbox.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async getSelectionAvailableOptions(): Promise<string[]> {
    const options = this.editAssignmentsSelectionOptions;
    const count = await options.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      if (text) names.push(text.trim());
    }
    return names;
  }

  async selectOptionInDialog(optionName: string): Promise<void> {
    await recordEvidence('action-click-system-users.page-486', async () => this.editAssignmentsSelectionOptions.filter({ hasText: optionName }).click());
  }

  async getSelectionSelectedCount(): Promise<number> {
    const text = await this.editAssignmentsSelectionCount.textContent();
    const match = text?.match(/(\d+)\s+selected/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async doneSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-496', async () => this.editAssignmentsSelectionDone.click());
  }

  async clearAllSelection(): Promise<void> {
    await recordEvidence('action-click-system-users.page-500', async () => this.editAssignmentsSelectionClearAll.click());
  }

  // ── Row by name ──────────────────────────────────────────────────

  rowByName(name: string): Locator {
    return this.rows.filter({ has: this.rows.locator('td').first().getByText(name, { exact: true }) });
  }

  rowByEmail(email: string): Locator {
    return this.rows.filter({ has: this.rows.locator('td').nth(1).getByText(email, { exact: true }) });
  }

  // ── Scroll ────────────────────────────────────────────────────────

  async getScrollTop(): Promise<number> {
    return this.scrollbarWrapper.evaluate((el) => el.scrollTop);
  }

  async scrollToTop(): Promise<void> {
    await recordEvidence('action-evaluate-system-users.page-521', async () => this.scrollbarWrapper.evaluate((el) => { el.scrollTop = 0; }));
  }

  async isScrollable(): Promise<boolean> {
    const overflowY = await this.scrollbarWrapper.evaluate(
      (el) => getComputedStyle(el).overflowY,
    );
    return overflowY === 'auto' || overflowY === 'scroll';
  }

  // ── Restore clean state ──────────────────────────────────────────

  async restoreCleanState(): Promise<void> {
    await this.clearSearch();
    // Close any open filter dialogs
    const dialogCount = await this.page.locator('[role="dialog"]').count();
    if (dialogCount > 0) {
      await recordEvidence('action-press-system-users.page-537', async () => this.page.keyboard.press('Escape'));
    }
    // Collapse any expanded overflows
    const showFewerButtons = this.page.getByRole('button', { name: /Show fewer/ });
    const fewerCount = await showFewerButtons.count();
    for (let i = 0; i < fewerCount; i++) {
      try {
        await recordEvidence('action-click-system-users.page-544', async () => showFewerButtons.first().click());
      } catch {
        break;
      }
    }
    // Scroll to top
    await this.scrollToTop();
    await this.countText.waitFor({ state: 'visible' });
  }
}