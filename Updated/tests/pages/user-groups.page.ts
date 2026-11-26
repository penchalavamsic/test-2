import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';

export class UserGroupsPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly addGroupButton: Locator;

  // Controls
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly searchInput: Locator;

  // Table
  readonly table: Locator;
  readonly tableBody: Locator;
  readonly groupRows: Locator;
  readonly columnHeaderGroups: Locator;
  readonly columnHeaderActions: Locator;
  readonly tableContainer: Locator;

  // Row-level accessors (row-scoped)
  readonly rowToggle: (row: Locator) => Locator;
  readonly rowName: (row: Locator) => Locator;
  readonly rowAddSubgroup: (row: Locator) => Locator;
  readonly rowEdit: (row: Locator) => Locator;
  readonly rowDelete: (row: Locator) => Locator;
  readonly rowIndentation: (row: Locator) => Locator;

  // Add Group dialog
  readonly addGroupDialog: Locator;
  readonly addGroupHeading: Locator;
  readonly addGroupDescription: Locator;
  readonly addGroupNameInput: Locator;
  readonly addGroupCommentInput: Locator;
  readonly addGroupCancelButton: Locator;
  readonly addGroupSaveButton: Locator;
  readonly addGroupCloseButton: Locator;

  // Add Subgroup dialog
  readonly addSubgroupDialog: Locator;
  readonly addSubgroupHeading: Locator;
  readonly addSubgroupDescription: Locator;
  readonly addSubgroupNameInput: Locator;
  readonly addSubgroupCommentInput: Locator;
  readonly addSubgroupCancelButton: Locator;
  readonly addSubgroupSaveButton: Locator;
  readonly addSubgroupCloseButton: Locator;

  // Edit dialog
  readonly editDialog: Locator;
  readonly editHeading: Locator;
  readonly editDescription: Locator;
  readonly editNameInput: Locator;
  readonly editCommentInput: Locator;
  readonly editCancelButton: Locator;
  readonly editSaveButton: Locator;
  readonly editCloseButton: Locator;

  // Delete confirmation dialog
  readonly deleteDialog: Locator;
  readonly deleteHeading: Locator;
  readonly deleteWarning: Locator;
  readonly deleteCancelButton: Locator;
  readonly deleteConfirmButton: Locator;

  // Empty state
  readonly emptyState: Locator;

  // Row locator by runtime name (table-row scoped within the tbody)
  readonly rowByName: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'User Groups', level: 1 });
    this.addGroupButton = page.getByRole('button', { name: 'Add Group' });

    // Add Group dialog
    this.addGroupDialog = page.getByRole('dialog', { name: 'Add Group' });
    this.addGroupHeading = this.addGroupDialog.getByRole('heading', { name: 'Add Group', level: 2 });
    this.addGroupDescription = this.addGroupDialog.locator('p').first();
    this.addGroupNameInput = this.addGroupDialog.getByRole('textbox', { name: /Group Name/i });
    this.addGroupCommentInput = this.addGroupDialog.getByRole('textbox', { name: 'Comment' });
    this.addGroupCancelButton = this.addGroupDialog.getByRole('button', { name: 'Cancel' });
    this.addGroupSaveButton = this.addGroupDialog.getByRole('button', { name: 'Save' });
    this.addGroupCloseButton = this.addGroupDialog.getByRole('button', { name: 'Close' });

    // Add Subgroup dialog (same structure as Add Group, different name/description)
    this.addSubgroupDialog = page.getByRole('dialog', { name: 'Add Subgroup' });
    this.addSubgroupHeading = this.addSubgroupDialog.getByRole('heading', { name: 'Add Subgroup', level: 2 });
    this.addSubgroupDescription = this.addSubgroupDialog.locator('p').first();
    this.addSubgroupNameInput = this.addSubgroupDialog.getByRole('textbox', { name: /Group Name/i });
    this.addSubgroupCommentInput = this.addSubgroupDialog.getByRole('textbox', { name: 'Comment' });
    this.addSubgroupCancelButton = this.addSubgroupDialog.getByRole('button', { name: 'Cancel' });
    this.addSubgroupSaveButton = this.addSubgroupDialog.getByRole('button', { name: 'Save' });
    this.addSubgroupCloseButton = this.addSubgroupDialog.getByRole('button', { name: 'Close' });

    // Edit dialog
    this.editDialog = page.getByRole('dialog', { name: 'Edit' });
    this.editHeading = this.editDialog.getByRole('heading', { name: 'Edit', level: 2 });
    this.editDescription = this.editDialog.locator('p').first();
    this.editNameInput = this.editDialog.getByRole('textbox', { name: /Group Name/i });
    this.editCommentInput = this.editDialog.getByRole('textbox', { name: 'Comment' });
    this.editCancelButton = this.editDialog.getByRole('button', { name: 'Cancel' });
    this.editSaveButton = this.editDialog.getByRole('button', { name: 'Save' });
    this.editCloseButton = this.editDialog.getByRole('button', { name: 'Close' });

    // Delete confirmation dialog
    this.deleteDialog = page.getByRole('alertdialog', { name: 'Delete Group?' });
    this.deleteHeading = this.deleteDialog.getByRole('heading', { name: 'Delete Group?', level: 2 });
    this.deleteWarning = this.deleteDialog.locator('p');
    this.deleteCancelButton = this.deleteDialog.getByRole('button', { name: 'Cancel' });
    this.deleteConfirmButton = this.deleteDialog.getByRole('button', { name: 'Delete' });

    this.expandAllButton = page.getByRole('button', { name: 'Expand All' });
    this.collapseAllButton = page.getByRole('button', { name: 'Collapse All' });
    this.searchInput = page.getByRole('textbox', { name: 'Search' });

    this.table = page.locator('table');
    this.tableBody = this.table.locator('tbody');
    this.groupRows = this.tableBody.locator('tr');
    this.columnHeaderGroups = page.getByRole('columnheader', { name: 'User Groups' });
    this.columnHeaderActions = page.getByRole('columnheader', { name: 'Actions' });
    this.tableContainer = this.table.locator('..'); // scrollable wrapper

    // Row-level accessors — each "row" is a <tr> in the tbody
    this.rowToggle = (row: Locator) => row.locator('td').first().locator('button').first();
    this.rowName = (row: Locator) => row.locator('td').first().locator('p');
    this.rowAddSubgroup = (row: Locator) => row.getByRole('button', { name: 'Add Subgroup' });
    this.rowEdit = (row: Locator) => row.getByRole('button', { name: 'Edit' });
    this.rowDelete = (row: Locator) => row.locator('button:has(svg.lucide-trash2)');
    this.rowIndentation = (row: Locator) => row.locator('td').first().locator('.flex.items-center');

    this.emptyState = page.getByText('No data available');

    this.rowByName = (name: string) =>
      this.groupRows.filter({ has: this.groupRows.locator('td').first().locator('p', { hasText: name }) });
  }

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-user-groups.page-143', async () => this.page.goto('/groups'));
    await this.heading.waitFor({ state: 'visible' });
  }

  async getRowCount(): Promise<number> {
    return this.groupRows.count();
  }

  async getVisibleRowCount(): Promise<number> {
    const count = await this.groupRows.count();
    let visible = 0;
    for (let i = 0; i < count; i++) {
      const display = await this.groupRows.nth(i).evaluate((el) => getComputedStyle(el).display);
      if (display !== 'none') visible++;
    }
    return visible;
  }

  async getRowName(row: Locator): Promise<string> {
    const text = await this.rowName(row).textContent();
    return (text || '').trim();
  }

  async search(text: string): Promise<void> {
    await recordEvidence('action-fill-user-groups.page-167', async () => this.searchInput.fill(text));
  }

  async clearSearch(): Promise<void> {
    await recordEvidence('action-clear-user-groups.page-171', async () => this.searchInput.clear());
  }

  async isRowExpanded(row: Locator): Promise<boolean> {
    const svgClass = await this.rowToggle(row).locator('svg').getAttribute('class');
    return svgClass?.includes('chevron-down') ?? false;
  }

  async expandRow(row: Locator): Promise<void> {
    await recordEvidence('action-click-user-groups.page-180', async () => this.rowToggle(row).click());
  }

  async collapseRow(row: Locator): Promise<void> {
    await recordEvidence('action-click-user-groups.page-184', async () => this.rowToggle(row).click());
  }

  async expandAll(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-188', async () => this.expandAllButton.click());
  }

  async collapseAll(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-192', async () => this.collapseAllButton.click());
  }

  async openAddGroupDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-196', async () => this.addGroupButton.click());
    await this.addGroupDialog.waitFor({ state: 'visible' });
  }

  async closeAddGroupDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-201', async () => this.addGroupCloseButton.click());
    await this.addGroupDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async dismissAddGroupDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-206', async () => this.addGroupCancelButton.click());
    await this.addGroupDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async openAddSubgroupDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-user-groups.page-211', async () => this.rowAddSubgroup(row).click());
    await this.addSubgroupDialog.waitFor({ state: 'visible' });
  }

  async closeAddSubgroupDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-216', async () => this.addSubgroupCloseButton.click());
    await this.addSubgroupDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async dismissAddSubgroupDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-221', async () => this.addSubgroupCancelButton.click());
    await this.addSubgroupDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async openEditDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-user-groups.page-226', async () => this.rowEdit(row).click());
    await this.editDialog.waitFor({ state: 'visible' });
  }

  async closeEditDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-231', async () => this.editCloseButton.click());
    await this.editDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async dismissEditDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-236', async () => this.editCancelButton.click());
    await this.editDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async openDeleteDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-user-groups.page-241', async () => this.rowDelete(row).click());
    await this.deleteDialog.waitFor({ state: 'visible' });
  }

  async cancelDeleteDialog(): Promise<void> {
    await recordEvidence('action-click-user-groups.page-246', async () => this.deleteCancelButton.click());
    await this.deleteDialog.waitFor({ state: 'hidden' }).catch(() => {});
  }

  async getRowIndentation(row: Locator): Promise<string> {
    return this.rowIndentation(row).getAttribute('style').then((s) => {
      const match = s?.match(/padding-left:\s*([^;]+)/);
      return match?.[1]?.trim() ?? '';
    });
  }
}