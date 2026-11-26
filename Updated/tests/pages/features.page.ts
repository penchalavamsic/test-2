import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';

export class FeaturesPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly addRootFeatureButton: Locator;
  readonly mainContent: Locator;

  // Controls
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly searchInput: Locator;

  // Table
  readonly featureTable: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;

  // Row-level accessors
  readonly featureNameCell: (row: Locator) => Locator;
  readonly featureIdCell: (row: Locator) => Locator;
  readonly versionsCell: (row: Locator) => Locator;
  readonly accessLevelsCell: (row: Locator) => Locator;
  readonly usedInProfilesCell: (row: Locator) => Locator;
  readonly usedInProfilesBadge: (row: Locator) => Locator;
  readonly descriptionCell: (row: Locator) => Locator;
  readonly actionsCell: (row: Locator) => Locator;

  // Row actions
  readonly rowAddChildFeatureButton: (row: Locator) => Locator;
  readonly rowEditButton: (row: Locator) => Locator;
  readonly rowDeleteButton: (row: Locator) => Locator;

  // Expand/collapse per row
  readonly rowExpandButton: (row: Locator) => Locator;

  // Profiles dialog
  readonly profilesDialog: Locator;
  readonly profilesDialogHeading: Locator;
  readonly profilesDialogCloseButton: Locator;
  readonly profilesDialogCards: Locator;

  // Profile card in dialog
  readonly profileCardByName: (name: string) => Locator;

  // FTR-B: Add Root Feature dialog
  readonly addRootDialog: Locator;
  readonly addRootDialogHeading: Locator;
  readonly addRootDialogDescription: Locator;
  readonly addRootFeatureNameInput: Locator;
  readonly addRootFeatureIdInput: Locator;
  readonly addRootDescriptionInput: Locator;
  readonly addRootDescriptionCounter: Locator;
  readonly addRootVersionsInput: Locator;
  readonly addRootVersionsAddButton: Locator;
  readonly addRootAccessLevelsInput: Locator;
  readonly addRootAccessLevelsAddButton: Locator;
  readonly addRootCancelButton: Locator;
  readonly addRootSaveButton: Locator;
  readonly addRootCloseButton: Locator;

  // FTR-C: Add Child Feature dialog
  readonly addChildDialog: Locator;
  readonly addChildDialogHeading: Locator;
  readonly addChildDialogDescription: Locator;
  readonly addChildFeatureNameInput: Locator;
  readonly addChildFeatureIdInput: Locator;
  readonly addChildDescriptionInput: Locator;
  readonly addChildDescriptionCounter: Locator;
  readonly addChildVersionsInput: Locator;
  readonly addChildVersionsAddButton: Locator;
  readonly addChildAccessLevelsInput: Locator;
  readonly addChildAccessLevelsAddButton: Locator;
  readonly addChildAccessLevelsInherited: Locator;
  readonly addChildAccessLevelsInfoText: Locator;
  readonly addChildCancelButton: Locator;
  readonly addChildSaveButton: Locator;
  readonly addChildCloseButton: Locator;

  // FTR-D: Edit Feature dialog
  readonly editDialog: Locator;
  readonly editDialogHeading: Locator;
  readonly editDialogDescription: Locator;
  readonly editFeatureNameInput: Locator;
  readonly editFeatureIdInput: Locator;
  readonly editDescriptionInput: Locator;
  readonly editDescriptionCounter: Locator;
  readonly editVersionsInput: Locator;
  readonly editVersionsAddButton: Locator;
  readonly editAccessLevelsInput: Locator;
  readonly editAccessLevelsAddButton: Locator;
  readonly editCancelButton: Locator;
  readonly editSaveButton: Locator;
  readonly editCloseButton: Locator;

  // FTR-E: Delete Feature confirmation dialog
  readonly deleteConfirmDialog: Locator;
  readonly deleteConfirmHeading: Locator;
  readonly deleteConfirmWarning: Locator;
  readonly deleteConfirmCancelButton: Locator;
  readonly deleteConfirmDeleteButton: Locator;

  // FTR-F: Feature Update Management dialog
  readonly updateDialog: Locator;
  readonly updateDialogHeading: Locator;
  readonly updateDialogSubtitle: Locator;
  readonly updateFileUploadLabel: Locator;
  readonly updateFileInput: Locator;
  readonly updateCommentsTextarea: Locator;
  readonly updateCancelButton: Locator;
  readonly updateSaveButton: Locator;
  readonly updateCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Features', level: 1 });
    this.addRootFeatureButton = page.getByRole('button', { name: 'Add Root Feature' });
    this.mainContent = page.locator('main');

    this.expandAllButton = page.getByRole('button', { name: 'Expand All' });
    this.collapseAllButton = page.getByRole('button', { name: 'Collapse All' });
    this.searchInput = page.getByPlaceholder('Search by name or ID');

    this.featureTable = page.getByRole('table', { includeHidden: true });
    this.tableHeaders = this.featureTable.locator('thead th');
    this.tableRows = this.featureTable.locator('tbody tr').filter({ has: page.locator('td:nth-child(6)') });

    this.featureNameCell = (row: Locator) => row.locator('td').nth(0).locator('p').first();
    this.featureIdCell = (row: Locator) => row.locator('td').nth(0).locator('p').last();
    this.versionsCell = (row: Locator) => row.locator('td').nth(1);
    this.accessLevelsCell = (row: Locator) => row.locator('td').nth(2);
    this.usedInProfilesCell = (row: Locator) => row.locator('td').nth(3);
    this.usedInProfilesBadge = (row: Locator) => row.locator('td').nth(3).locator('.inline-flex');
    this.descriptionCell = (row: Locator) => row.locator('td').nth(4);
    this.actionsCell = (row: Locator) => row.locator('td').nth(5);

    this.rowAddChildFeatureButton = (row: Locator) =>
      row.locator('td').nth(5).getByRole('button', { name: 'Add Child Feature' });
    this.rowEditButton = (row: Locator) =>
      row.locator('td').nth(5).getByRole('button', { name: 'Edit' });
    this.rowDeleteButton = (row: Locator) =>
      row.locator('td').nth(5).getByRole('button', { name: 'Delete' });

    this.rowExpandButton = (row: Locator) =>
      row.locator('td').first().getByRole('button');

    this.profilesDialog = page.getByRole('dialog');
    this.profilesDialogHeading = page.getByRole('heading', { name: /Profiles Using This Feature/i });
    this.profilesDialogCloseButton = this.profilesDialog.getByRole('button', { name: /close/i });
    this.profilesDialogCards = this.profilesDialog.locator('div.cursor-pointer').filter({ has: page.locator('div.font-medium') });

    this.profileCardByName = (name: string) =>
      this.profilesDialog.locator(`text=${name}`).first();

    // FTR-B: Add Root Feature dialog
    this.addRootDialog = page.getByRole('dialog', { name: 'Add Root Feature' });
    this.addRootDialogHeading = page.getByRole('heading', { name: 'Add Root Feature', level: 2 });
    this.addRootDialogDescription = page.getByText('Add a new root feature');
    this.addRootFeatureNameInput = page.getByRole('textbox', { name: 'Feature Name *' });
    this.addRootFeatureIdInput = page.getByRole('textbox', { name: 'e.g., FEAT-001' });
    this.addRootDescriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.addRootDescriptionCounter = page.getByText(/\/ 1000$/);
    this.addRootVersionsInput = page.getByRole('textbox', { name: 'e.g., 1.0, 2.0' });
    this.addRootVersionsAddButton = this.addRootDialog.getByRole('button', { name: 'Add' }).first();
    this.addRootAccessLevelsInput = page.getByRole('textbox', { name: 'e.g., Basic, Premium' });
    this.addRootAccessLevelsAddButton = this.addRootDialog.getByRole('button', { name: 'Add' }).last();
    this.addRootCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.addRootSaveButton = page.getByRole('button', { name: 'Save' });
    this.addRootCloseButton = page.getByRole('button', { name: 'Close' });

    // FTR-C: Add Child Feature dialog
    this.addChildDialog = page.getByRole('dialog', { name: 'Add Child Feature' });
    this.addChildDialogHeading = page.getByRole('heading', { name: 'Add Child Feature', level: 2 });
    this.addChildDialogDescription = page.getByText('Add a child feature');
    this.addChildFeatureNameInput = page.getByRole('textbox', { name: 'Feature Name *' });
    this.addChildFeatureIdInput = page.getByRole('textbox', { name: 'e.g., FEAT-001' });
    this.addChildDescriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.addChildDescriptionCounter = page.getByText(/\/ 1000$/);
    this.addChildVersionsInput = page.getByRole('textbox', { name: 'e.g., 1.0, 2.0' });
    this.addChildVersionsAddButton = this.addChildDialog.getByRole('button', { name: 'Add' }).first();
    this.addChildAccessLevelsInput = page.getByRole('textbox', { name: 'e.g., Basic, Premium' });
    this.addChildAccessLevelsAddButton = this.addChildDialog.getByRole('button', { name: 'Add' }).last();
    this.addChildAccessLevelsInherited = this.addChildDialog.locator('text=ℹ️');
    this.addChildAccessLevelsInfoText = this.addChildDialog.getByText(/Access levels are inherited/);
    this.addChildCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.addChildSaveButton = page.getByRole('button', { name: 'Save' });
    this.addChildCloseButton = page.getByRole('button', { name: 'Close' });

    // FTR-D: Edit Feature dialog
    this.editDialog = page.getByRole('dialog', { name: 'Edit' });
    this.editDialogHeading = page.getByRole('heading', { name: 'Edit', level: 2 });
    this.editDialogDescription = page.getByText('Edit feature details');
    this.editFeatureNameInput = page.getByRole('textbox', { name: 'Feature Name *' });
    this.editFeatureIdInput = page.getByRole('textbox', { name: 'e.g., FEAT-001' });
    this.editDescriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.editDescriptionCounter = page.getByText(/\/ 1000$/);
    this.editVersionsInput = page.getByRole('textbox', { name: 'e.g., 1.0, 2.0' });
    this.editVersionsAddButton = this.editDialog.getByRole('button', { name: 'Add' }).first();
    this.editAccessLevelsInput = page.getByRole('textbox', { name: 'e.g., Basic, Premium' });
    this.editAccessLevelsAddButton = this.editDialog.getByRole('button', { name: 'Add' }).last();
    this.editCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.editSaveButton = page.getByRole('button', { name: 'Save' });
    this.editCloseButton = page.getByRole('button', { name: 'Close' });

    // FTR-E: Delete Feature confirmation dialog
    this.deleteConfirmDialog = page.getByRole('alertdialog', { name: 'Are you sure?' });
    this.deleteConfirmHeading = page.getByRole('heading', { name: 'Are you sure?', level: 2 });
    this.deleteConfirmWarning = page.getByText(/permanently delete/i);
    this.deleteConfirmCancelButton = this.deleteConfirmDialog.getByRole('button', { name: 'Cancel' });
    this.deleteConfirmDeleteButton = this.deleteConfirmDialog.getByRole('button', { name: 'Delete' });

    // FTR-F: Feature Update Management dialog
    this.updateDialog = page.getByRole('dialog', { name: 'Feature Update Management' });
    this.updateDialogHeading = page.getByRole('heading', { name: 'Feature Update Management', level: 2 });
    this.updateDialogSubtitle = this.updateDialog.locator('p').first();
    this.updateFileUploadLabel = this.updateDialog.getByText(/Upload Update File/);
    this.updateFileInput = this.updateDialog.locator('input[type="file"]');
    this.updateCommentsTextarea = this.updateDialog.getByRole('textbox', { name: /Update Comments|update comments/i });
    this.updateCancelButton = this.updateDialog.getByRole('button', { name: 'Cancel' });
    this.updateSaveButton = this.updateDialog.getByRole('button', { name: 'Save' });
    this.updateCloseButton = this.updateDialog.getByRole('button', { name: 'Close' });
  }

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-features.page-228', async () => this.page.goto('/features'));
    await this.heading.waitFor({ state: 'visible' });
  }

  async getRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async getFeatureName(row: Locator): Promise<string> {
    const text = await this.featureNameCell(row).textContent();
    return (text || '').trim();
  }

  async getFeatureId(row: Locator): Promise<string> {
    const text = await this.featureIdCell(row).textContent();
    return (text || '').trim();
  }

  async getRowByName(name: string): Promise<Locator | null> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const rowName = await this.getFeatureName(row);
      if (rowName === name) return row;
    }
    return null;
  }

  async getFirstRowWithProfiles(): Promise<Locator | null> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const badge = this.usedInProfilesBadge(row);
      const badgeCount = await badge.count();
      if (badgeCount > 0) return row;
    }
    return null;
  }

  getFirstVersion(): Locator | null {
    // Return the first clickable version chip in the table
    // Versions are inside td:nth(1) as generic elements with cursor=pointer
    const versions = this.featureTable.locator('tbody td:nth-child(2) div.cursor-pointer');
    return versions.first();
  }

  async getFirstRowWithNoProfiles(): Promise<Locator | null> {
    const count = await this.getRowCount();
    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const profileCount = await this.getProfileCount(row);
      if (profileCount === 0) {
        // Also verify Delete is actually enabled (not disabled for another reason)
        const deleteBtn = this.rowDeleteButton(row);
        if (await deleteBtn.isEnabled()) return row;
      }
    }
    return null;
  }

  async getProfileCount(row: Locator): Promise<number> {
    const badge = this.usedInProfilesBadge(row);
    const count = await badge.count();
    if (count === 0) return 0;
    const text = await badge.textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async search(searchText: string): Promise<void> {
    await recordEvidence('action-fill-features.page-299', async () => this.searchInput.fill(searchText));
  }

  async clearSearch(): Promise<void> {
    await recordEvidence('action-clear-features.page-303', async () => this.searchInput.clear());
  }

  async expandAll(): Promise<void> {
    await recordEvidence('action-click-features.page-307', async () => this.expandAllButton.click());
  }

  async collapseAll(): Promise<void> {
    await recordEvidence('action-click-features.page-311', async () => this.collapseAllButton.click());
  }

  async openProfilesDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-features.page-315', async () => this.usedInProfilesBadge(row).click());
    await this.profilesDialog.waitFor({ state: 'visible' });
  }

  async closeProfilesDialog(): Promise<void> {
    await recordEvidence('action-press-features.page-320', async () => this.page.keyboard.press('Escape'));
  }

  // FTR-B: Add Root Feature dialog methods
  async openAddRootDialog(): Promise<void> {
    await recordEvidence('action-click-features.page-325', async () => this.addRootFeatureButton.click());
    await this.addRootDialog.waitFor({ state: 'visible' });
  }

  async closeAddRootDialog(): Promise<void> {
    await recordEvidence('action-click-features.page-330', async () => this.addRootCancelButton.click());
  }

  async addVersion(version: string): Promise<void> {
    await recordEvidence('action-fill-features.page-334', async () => this.addRootVersionsInput.fill(version));
    await recordEvidence('action-click-features.page-335', async () => this.addRootVersionsAddButton.click());
  }

  async addAccessLevel(level: string): Promise<void> {
    await recordEvidence('action-fill-features.page-339', async () => this.addRootAccessLevelsInput.fill(level));
    await recordEvidence('action-click-features.page-340', async () => this.addRootAccessLevelsAddButton.click());
  }

  getVersionChip(version: string): Locator {
    return this.addRootVersionsInput.locator('../..').locator('div.inline-flex:has(svg.lucide-x)').filter({ hasText: version });
  }

  // FTR-C: Add Child Feature dialog methods
  async openAddChildDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-features.page-349', async () => this.rowAddChildFeatureButton(row).click());
    await this.addChildDialog.waitFor({ state: 'visible' });
  }

  async closeAddChildDialog(): Promise<void> {
    await recordEvidence('action-click-features.page-354', async () => this.addChildCancelButton.click());
  }

  async addChildVersion(version: string): Promise<void> {
    await recordEvidence('action-fill-features.page-358', async () => this.addChildVersionsInput.fill(version));
    await recordEvidence('action-click-features.page-359', async () => this.addChildVersionsAddButton.click());
  }

  async getInheritedAccessLevels(): Promise<string[]> {
    const chips = this.addChildDialog.locator('[ref]').filter({ hasText: /^(Standard|Floating|Viewer|Read|Write|None|EOL|Read\/Write)$/ });
    const count = await chips.count();
    const levels: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await chips.nth(i).textContent();
      if (text) levels.push(text.trim());
    }
    return levels;
  }

  // FTR-D: Edit Feature dialog methods
  async openEditDialog(row: Locator): Promise<void> {
    await recordEvidence('action-click-features.page-375', async () => this.rowEditButton(row).click());
    await this.editDialog.waitFor({ state: 'visible' });
  }

  async closeEditDialog(): Promise<void> {
    await recordEvidence('action-click-features.page-380', async () => this.editCancelButton.click());
  }

  async getEditChipValues(section: 'versions' | 'accessLevels'): Promise<string[]> {
    const input = section === 'versions' ? this.editVersionsInput : this.editAccessLevelsInput;
    const chips = input.locator('../..').locator('div.inline-flex:has(svg.lucide-x)');
    return (await chips.allTextContents()).map(value => value.trim()).filter(Boolean);
  }
}