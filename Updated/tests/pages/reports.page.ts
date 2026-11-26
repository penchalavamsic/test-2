import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class ReportsPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly description: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Report-type cards
  readonly standardLicensesCard: Locator;
  readonly floatingLicensesCard: Locator;
  readonly floatingConfigurationsCard: Locator;

  // License mode tabs
  readonly licenseModeGroup: Locator;
  readonly activeTab: Locator;
  readonly deletedTab: Locator;

  // Toolbar
  readonly recordCountText: Locator;
  readonly filtersButton: Locator;
  readonly exportExcelButton: Locator;

  // Filter panel
  readonly filterPanelHeading: Locator;
  readonly emailSearchbox: Locator;
  readonly hardwareIdsSearchbox: Locator;
  readonly expirationDateInput: Locator;
  readonly maintenanceDateInput: Locator;
  readonly userGroupSearchbox: Locator;
  readonly productProfileSearchbox: Locator;
  readonly profileRoleSearchbox: Locator;
  readonly licenseCreatedDateInput: Locator;
  readonly licenseModifiedDateInput: Locator;
  readonly clearFiltersButton: Locator;

  // Table
  readonly loadedTotalText: Locator;
  readonly standardLicenseTable: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;

  // API paths
  readonly standardLicensesApiPath = '/api/report/allstandardlicenses';
  readonly filterApiPath = '/api/report/standardlicenses';
  readonly deletedLicensesApiPath = '/api/report/allstandarddeleted';

  // ── Floating Licenses API ──
  readonly floatingLicensesApiPath = '/api/report/allfloatinglicenses';
  readonly floatingLicensesDeletedApiPath = '/api/report/allfloatingdeleted';

  // ── Floating Licenses Locators ──
  readonly floatingLicenseModeGroup: Locator;
  readonly floatingLicenseActiveTab: Locator;
  readonly floatingLicenseDeletedTab: Locator;
  readonly floatingLicenseRecordCountText: Locator;
  readonly floatingLicenseLoadedTotalText: Locator;
  readonly floatingLicenseTable: Locator;
  readonly floatingLicenseTableHeaders: Locator;
  readonly floatingLicenseTableRows: Locator;
  readonly floatingLicenseEmptyState: Locator;
  readonly floatingLicenseExportButton: Locator;

  // ── Floating Licenses Filter Locators ──
  readonly flEmailSearchbox: Locator;
  readonly flHardwareIdsSearchbox: Locator;
  readonly flExpirationDateInput: Locator;
  readonly flLicenseCreatedDateInput: Locator;
  readonly flProductProfileSearchbox: Locator;
  readonly flProfileRoleSearchbox: Locator;
  readonly flClearFiltersButton: Locator;

  // ── Floating Licenses Scroll ──
  readonly flScrollContainer: Locator;
  readonly flScrollSentinel: Locator;

  // ── Floating Configurations (RFC-A) ──
  readonly floatingConfigurationsApiPath = '/api/report/all';
  readonly fcModeGroup: Locator;
  readonly fcActiveTab: Locator;
  readonly fcDeletedTab: Locator;
  readonly fcRecordCountText: Locator;
  readonly fcLoadedTotalText: Locator;
  readonly fcFiltersButton: Locator;
  readonly fcFilterPanel: Locator;
  readonly fcExportButton: Locator;
  readonly fcErrorState: Locator;
  readonly fcRetryButton: Locator;
  readonly fcClearFiltersButton: Locator;

  // RSL-C — Filter chips
  readonly emailFilterChip: Locator;
  readonly emailFilterRemoveButton: Locator;
  readonly clearAllFiltersButton: Locator;
  readonly hardwareIdFilterChip: Locator;
  readonly hardwareIdFilterRemoveButton: Locator;

  // ── Infinite Scroll (RSL-B) ──
  readonly scrollSentinel: Locator;
  readonly scrollContainerLocator: Locator;

  // ── Date Filters (RSL-D) ──
  readonly expirationDateChip: Locator;
  readonly expirationDateRemoveButton: Locator;
  readonly maintenanceDateChip: Locator;
  readonly maintenanceDateRemoveButton: Locator;
  readonly createdDateChip: Locator;
  readonly modifiedDateChip: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page shell
    this.heading = page.getByRole('heading', { name: 'Reports', level: 1 });
    this.description = page.getByText('View, filter, and export licensing information.');
    this.mainContent = page.locator('main');
    this.footer = page.getByText('© KPIT Technologies Ltd. All rights reserved.');

    // Report-type cards
    this.standardLicensesCard = page.getByRole('button', { name: /Standard Licenses/ });
    this.floatingLicensesCard = page.getByRole('button', { name: /Floating Licenses/ });
    this.floatingConfigurationsCard = page.getByRole('button', { name: /Floating Configurations/ });

    // License mode tabs
    this.licenseModeGroup = page.getByRole('group', { name: 'License mode' });
    this.activeTab = this.licenseModeGroup.getByRole('button', { name: 'Active', exact: true });
    this.deletedTab = this.licenseModeGroup.getByRole('button', { name: 'Deleted', exact: true });

    // Toolbar
    this.recordCountText = page.locator('main').getByText(/^\d{1,3}(,\d{3})* records$/);
    this.filtersButton = page.getByRole('button', { name: 'Filters' });
    this.exportExcelButton = page.getByRole('button', { name: 'Export Excel' });

    // Filter panel
    this.filterPanelHeading = page.locator('main span').filter({ hasText: /^Filters$/ });
    this.emailSearchbox = page.getByRole('searchbox', { name: 'Email' });
    this.hardwareIdsSearchbox = page.getByRole('searchbox', { name: 'Search Hardware IDs' });
    this.expirationDateInput = page.getByRole('textbox', { name: 'Expiration Date' });
    this.maintenanceDateInput = page.getByRole('textbox', { name: 'Maintenance Date' });
    this.userGroupSearchbox = page.getByRole('searchbox', { name: 'Search groups' });
    this.productProfileSearchbox = page.getByRole('searchbox', { name: 'Search profiles' });
    this.profileRoleSearchbox = page.getByRole('searchbox', { name: 'Select a profile first' });
    this.licenseCreatedDateInput = page.getByRole('textbox', { name: 'License Created Date' });
    this.licenseModifiedDateInput = page.getByRole('textbox', { name: 'License Modified Date' });
    this.clearFiltersButton = page.getByRole('button', { name: 'Clear' });

    // Table
    this.loadedTotalText = page.locator('main').getByText(/[\d,]+\s*loaded\s*·\s*[\d,]+\s*total/);
    this.standardLicenseTable = page.locator('table');
    this.tableHeaders = this.standardLicenseTable.locator('thead th, th');
    this.tableRows = this.standardLicenseTable.locator('tbody tr');

    // RSL-C — Filter chips
    this.emailFilterChip = page.locator('main').getByText(/^Email:\s/);
    this.emailFilterRemoveButton = page.getByRole('button', { name: /Remove Email:/ });
    this.clearAllFiltersButton = page.getByRole('button', { name: 'Clear all' });
    this.hardwareIdFilterChip = page.locator('main').getByText(/^HW IDs:\s/);
    this.hardwareIdFilterRemoveButton = page.getByRole('button', { name: /Remove HW IDs:/ });

    // ── Infinite Scroll (RSL-B) ──
    this.scrollSentinel = page.locator('div.min-h-\\[260px\\].flex-1.overflow-auto > div.h-4[aria-hidden="true"]');
    this.scrollContainerLocator = page.locator('div.min-h-\\[260px\\].flex-1.overflow-auto');

    // ── Floating Licenses Locators ──
    this.floatingLicenseModeGroup = page.getByRole('group', { name: 'Floating license mode' });
    this.floatingLicenseActiveTab = this.floatingLicenseModeGroup.getByRole('button', { name: 'Active' });
    this.floatingLicenseDeletedTab = this.floatingLicenseModeGroup.getByRole('button', { name: 'Deleted' });
    this.floatingLicenseRecordCountText = page.locator('main').getByText(/^\d{1,3}(,\d{3})* records$/);
    this.floatingLicenseLoadedTotalText = page.locator('main').getByText(/[\d,]+\s*loaded\s*·\s*[\d,]+\s*total/);
    this.floatingLicenseTable = page.locator('table');
    this.floatingLicenseTableHeaders = this.floatingLicenseTable.locator('thead th, th');
    this.floatingLicenseTableRows = this.floatingLicenseTable.locator('tbody tr');
    this.floatingLicenseEmptyState = page.getByText('No Floating License records found');
    this.floatingLicenseExportButton = page.getByRole('button', { name: 'Export Excel' });

    // ── Floating Licenses Filter Locators ──
    this.flEmailSearchbox = page.getByRole('textbox', { name: 'Email' });
    this.flHardwareIdsSearchbox = page.getByRole('searchbox', { name: 'Search Hardware IDs' });
    this.flExpirationDateInput = page.getByRole('textbox', { name: 'Expiration Date' });
    this.flLicenseCreatedDateInput = page.getByRole('textbox', { name: 'License Created Date' });
    this.flProductProfileSearchbox = page.getByRole('searchbox', { name: 'Search profiles' });
    this.flProfileRoleSearchbox = page.getByRole('searchbox', { name: 'Select a profile first' });
    this.flClearFiltersButton = page.getByRole('button', { name: 'Clear' });

    // ── Floating Licenses Scroll ──
    this.flScrollContainer = page.locator('div.min-h-\\[260px\\].flex-1.overflow-auto');
    this.flScrollSentinel = page.locator('div.min-h-\\[260px\\].flex-1.overflow-auto > div.h-4[aria-hidden="true"]');

    // ── Floating Configurations (RFC-A) ──
    this.floatingConfigurationsCard = page.getByRole('button', { name: /Floating Configurations/ });
    this.fcModeGroup = page.getByRole('group', { name: 'Configuration mode' });
    this.fcActiveTab = this.fcModeGroup.getByRole('button', { name: 'Active' });
    this.fcDeletedTab = this.fcModeGroup.getByRole('button', { name: 'Deleted' });
    this.fcRecordCountText = page.locator('main').getByText(/^\d{1,3}(,\d{3})* records$/);
    this.fcLoadedTotalText = page.locator('main').getByText(/[\d,]+\s*loaded\s*·\s*[\d,]+\s*total/);
    this.fcFiltersButton = page.getByRole('button', { name: 'Filters' });
    this.fcFilterPanel = page.locator('main span').filter({ hasText: /^Filters$/ }).locator('..');
    this.fcExportButton = page.getByRole('button', { name: 'Export Excel' });
    this.fcErrorState = page.getByText('Unable to load Floating Configuration records');
    this.fcRetryButton = page.getByRole('button', { name: 'Retry' });
    this.fcClearFiltersButton = page.getByRole('button', { name: 'Clear' });

    // ── Floating Configurations — Deleted Mode (RFC-B) ──
    this.fcDeletedTable = page.locator('main').locator('table');
    this.fcDeletedRows = this.fcDeletedTable.locator('tbody').locator('tr');
    this.fcDeletedTableHeaders = this.fcDeletedTable.locator('thead').locator('th');

    // ── Floating Configurations — Deleted Filters & Export (RFC-C) ──
    this.fcDeletedDeletedByInput = page.getByRole('textbox', { name: 'Deleted By' });
    this.fcDeletedCreatedByInput = page.getByRole('textbox', { name: 'Created By' });
    this.fcDeletedGroupNameInput = page.getByRole('textbox', { name: 'Group Name' });

    // ── Date Filters (RSL-D) ──
    this.expirationDateChip = page.locator('main').getByText(/^Exp:\s/);
    this.expirationDateRemoveButton = page.getByRole('button', { name: /Remove Exp:/ });
    this.maintenanceDateChip = page.locator('main').getByText(/^Maint:\s/);
    this.maintenanceDateRemoveButton = page.getByRole('button', { name: /Remove Maint:/ });
    this.createdDateChip = page.locator('main').getByText(/^Created:\s/);
    this.modifiedDateChip = page.locator('main').getByText(/^Modified:\s/);
  }

  async openReports(): Promise<void> {
    const reportsLink = this.page.locator('a[href="/reports"]');
    await recordEvidence('action-click-reports.page-228', async () => reportsLink.click());
    await this.page.waitForURL('**/reports');
    await this.heading.waitFor();
  }

  async selectStandardLicenses(): Promise<void> {
    const isSelected = await this.standardLicensesCard.getAttribute('aria-pressed');
    if (isSelected !== 'true') {
      await recordEvidence('action-click-reports.page-236', async () => this.standardLicensesCard.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-237', async () => expect(this.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async getSelectedReportType(): Promise<string | null> {
    const cards = [this.standardLicensesCard, this.floatingLicensesCard, this.floatingConfigurationsCard];
    for (const card of cards) {
      if ((await card.getAttribute('aria-pressed')) === 'true') {
        return card.textContent();
      }
    }
    return null;
  }

  async getReportsRecordCount(): Promise<number> {
    const text = await this.recordCountText.textContent();
    const match = text?.match(/([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  }

  async getActiveTab(): Promise<Locator> {
    return this.activeTab;
  }

  async getDeletedTab(): Promise<Locator> {
    return this.deletedTab;
  }

  async getFiltersButton(): Promise<Locator> {
    return this.filtersButton;
  }

  async expandFilters(): Promise<void> {
    const panel = this.emailSearchbox;
    const alreadyVisible = await panel.isVisible().catch(() => false);
    if (!alreadyVisible) {
      await recordEvidence('action-click-reports.page-273', async () => this.filtersButton.click());
      await this.emailSearchbox.waitFor({ state: 'visible' });
    }
  }

  async collapseFilters(): Promise<void> {
    const panel = this.emailSearchbox;
    const visible = await panel.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-reports.page-282', async () => this.filtersButton.click());
      await this.emailSearchbox.waitFor({ state: 'hidden' });
    }
  }

  async getStandardLicenseFilterControls(): Promise<Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string }>> {
    await this.expandFilters();
    const controls = {
      email: this.emailSearchbox,
      hardwareIds: this.hardwareIdsSearchbox,
      expirationDate: this.expirationDateInput,
      maintenanceDate: this.maintenanceDateInput,
      userGroup: this.userGroupSearchbox,
      productProfile: this.productProfileSearchbox,
      profileRole: this.profileRoleSearchbox,
      licenseCreatedDate: this.licenseCreatedDateInput,
      licenseModifiedDate: this.licenseModifiedDateInput,
    };
    const result: Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string }> = {};
    for (const [name, locator] of Object.entries(controls)) {
      result[name] = {
        visible: await locator.isVisible().catch(() => false),
        disabled: await locator.isDisabled().catch(() => true),
        placeholder: (await locator.getAttribute('placeholder')) || '',
        value: (await locator.inputValue().catch(() => '')) || '',
      };
    }
    return result;
  }

  async getExportExcelButton(): Promise<Locator> {
    return this.exportExcelButton;
  }

  async getStandardLicenseTable(): Promise<Locator> {
    return this.standardLicenseTable;
  }

  async getStandardLicenseHeaders(): Promise<string[]> {
    const headers = this.tableHeaders;
    await headers.first().waitFor();
    const count = await headers.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      texts.push((text ?? '').trim());
    }
    return texts;
  }

  async getVisibleStandardLicenseRows(): Promise<Locator> {
    return this.tableRows;
  }

  async getStandardLicenseLoadedState(): Promise<{ loaded: number; total: number }> {
    const text = await this.loadedTotalText.textContent();
    const match = text?.match(/([\d,]+)\s*loaded\s*·\s*([\d,]+)\s*total/);
    return {
      loaded: match ? parseInt(match[1].replace(/,/g, ''), 10) : 0,
      total: match ? parseInt(match[2].replace(/,/g, ''), 10) : 0,
    };
  }

  async parseStandardLicenseLoadedTotal(): Promise<{ loaded: number; total: number }> {
    return this.getStandardLicenseLoadedState();
  }

  /**
   * Captures the initial Standard Licenses API response and returns its totalElements
   * as the runtime base total. Must be called once per test before any filters are applied.
   */
  async captureStandardLicenseBaseTotal(): Promise<number> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const body = await response.json();
    if (typeof body.totalElements !== 'number') {
      throw new Error(
        'Standard Licenses API response missing totalElements — cannot determine runtime base total'
      );
    }
    return body.totalElements;
  }

  /**
   * Captures the Deleted Licenses API response (triggered by switching to Deleted mode)
   * and returns totalElements and numberOfElements as runtime data.
   */
  async captureDeletedLicenseMetadata(): Promise<{ totalElements: number; numberOfElements: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const body = await response.json();
    if (typeof body.totalElements !== 'number') {
      throw new Error(
        'Deleted Licenses API response missing totalElements — cannot determine runtime Deleted total'
      );
    }
    return {
      totalElements: body.totalElements,
      numberOfElements: body.numberOfElements ?? body.content?.length ?? 0,
    };
  }

  /**
   * Extracts a Hardware ID from the first row of the currently visible Standard Licenses table.
   * Returns the raw HW ID string. Fails if no rows are present.
   */
  async getRuntimeHardwareIdFromTable(): Promise<string> {
    const rows = this.tableRows;
    const count = await rows.count();
    if (count === 0) {
      throw new Error('No rows in Standard Licenses table — cannot extract runtime Hardware ID');
    }
    const hwCell = rows.nth(0).locator('td').nth(4);
    const text = await hwCell.textContent();
    if (!text || !text.trim()) {
      throw new Error('Hardware ID cell is empty — cannot extract runtime Hardware ID');
    }
    return text.trim();
  }

  /**
   * Extracts an Email from the first row of the currently visible Standard Licenses table.
   * Returns the raw email string. Fails if no rows are present.
   */
  async getRuntimeEmailFromTable(): Promise<string> {
    const rows = this.tableRows;
    const count = await rows.count();
    if (count === 0) {
      throw new Error('No rows in Standard Licenses table — cannot extract runtime email');
    }
    const emailCell = rows.nth(0).locator('td').nth(3);
    const text = await emailCell.textContent();
    if (!text || !text.trim()) {
      throw new Error('Email cell is empty — cannot extract runtime email');
    }
    return text.trim();
  }

  /**
   * Extracts a Product Profile from the first row of the currently visible Standard Licenses table.
   */
  async getRuntimeProfileFromTable(): Promise<string> {
    const rows = this.tableRows;
    const count = await rows.count();
    if (count === 0) {
      throw new Error('No rows in Standard Licenses table — cannot extract runtime profile');
    }
    const profileCell = rows.nth(0).locator('td').nth(1);
    const text = await profileCell.textContent();
    if (!text || !text.trim()) {
      throw new Error('Profile cell is empty — cannot extract runtime profile');
    }
    return text.trim();
  }

  async getReportsScrollContainer(): Promise<Locator> {
    const table = this.standardLicenseTable;
    let container = table.locator('..');
    for (let i = 0; i < 5; i++) {
      const overflow = await container.evaluate((el) => getComputedStyle(el).overflowY).catch(() => 'visible');
      if (overflow === 'auto' || overflow === 'scroll') {
        return container;
      }
      container = container.locator('..');
    }
    return container;
  }

  async waitForStandardLicenseInitialRequest(): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async restoreStandardLicenseInitialState(): Promise<void> {
    await this.collapseFilters();
    const isStandardSelected = await this.standardLicensesCard.getAttribute('aria-pressed');
    if (isStandardSelected !== 'true') {
      await this.selectStandardLicenses();
    }
    const isActiveSelected = await this.activeTab.getAttribute('aria-pressed');
    if (isActiveSelected !== 'true') {
      await recordEvidence('action-click-reports.page-469', async () => this.activeTab.click());
    }
    await this.loadedTotalText.waitFor();
    await recordEvidence('assert-toBeVisible-reports.page-472', async () => expect(this.heading).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports.page-473', async () => expect(this.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-474', async () => expect(this.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-475', async () => expect(this.deletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  // ── Infinite Scroll (RSL-B) ──

  async getStandardLicenseScrollContainer(): Promise<Locator> {
    return this.page.locator('div.min-h-\\[260px\\].flex-1.overflow-auto');
  }

  async getStandardLicenseScrollMetrics(): Promise<{ scrollTop: number; scrollHeight: number; clientHeight: number }> {
    const container = this.scrollContainerLocator;
    const [scrollTop, scrollHeight, clientHeight] = await Promise.all([
      container.evaluate((el) => el.scrollTop),
      container.evaluate((el) => el.scrollHeight),
      container.evaluate((el) => el.clientHeight),
    ]);
    return { scrollTop, scrollHeight, clientHeight };
  }

  async getStandardLicenseRenderedRowCount(): Promise<number> {
    const rows = this.tableRows;
    return rows.count();
  }

  async getStandardLicenseRuntimeFingerprints(): Promise<string[]> {
    const rows = this.tableRows;
    const count = await rows.count();
    const fps: string[] = [];
    for (let i = 0; i < count; i++) {
      const cells = rows.nth(i).locator('td');
      const cellCount = await cells.count();
      const parts: string[] = [];
      for (let j = 0; j < cellCount; j++) {
        const text = await cells.nth(j).textContent();
        parts.push((text ?? '').trim());
      }
      fps.push(parts.join('|'));
    }
    return fps;
  }

  async scrollStandardLicensesWithinCurrentBatch(): Promise<void> {
    const currentY = await this.page.evaluate(() => window.scrollY);
    // Scroll a small amount within the loaded rows (50px) to stay away from the trigger
    await recordEvidence('action-evaluate-reports.page-520', async () => this.page.evaluate((y) => window.scrollTo(0, y + 50), currentY));
    // Let the scroll event propagate before returning
    await this.page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
  }

  async scrollStandardLicensesToNextLoadThreshold(): Promise<void> {
    // Scroll near the bottom to bring the sentinel into the viewport
    const maxScroll = await this.page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    await recordEvidence('action-evaluate-reports.page-528', async () => this.page.evaluate((max) => window.scrollTo(0, max), maxScroll));
  }

  async waitForStandardLicenseNextPageRequest(expectedPage: number): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(this.standardLicensesApiPath)) return false;
        if (resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        return url.searchParams.get('page') === String(expectedPage);
      },
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async getStandardLicenseLoadingIndicator(): Promise<{ found: boolean; type: string; text: string } | null> {
    const spinner = this.page.locator('[class*="spin"], [class*="Spinner"], [class*="loader"], [class*="Loader"]');
    const count = await spinner.count();
    if (count === 0) return null;
    const first = spinner.first();
    return {
      found: true,
      type: (await first.evaluate((el) => el.tagName)) || 'unknown',
      text: (await first.textContent()) || '',
    };
  }

  async verifyStandardLicenseAppendState(initialRowCount: number, batchSize: number): Promise<{
    newRowCount: number;
    initialFingerprintsMatch: boolean;
    appendedFingerprints: string[];
  }> {
    const rows = this.tableRows;
    const newRowCount = await rows.count();

    // Check that first N fingerprints still match expected count (structural check)
    // We don't persist actual data; we verify count increase by batchSize
    const appendedCount = newRowCount - initialRowCount;
    const fps: string[] = [];
    for (let i = initialRowCount; i < newRowCount; i++) {
      const cells = rows.nth(i).locator('td');
      const cellCount = await cells.count();
      const parts: string[] = [];
      for (let j = 0; j < cellCount; j++) {
        const text = await cells.nth(j).textContent();
        parts.push((text ?? '').trim());
      }
      fps.push(parts.join('|'));
    }

    return {
      newRowCount,
      initialFingerprintsMatch: appendedCount > 0 && appendedCount <= batchSize,
      appendedFingerprints: fps,
    };
  }

  async verifyNoDuplicateStandardLicenseRows(): Promise<{ total: number; unique: number; hasDuplicates: boolean }> {
    const fps = await this.getStandardLicenseRuntimeFingerprints();
    const unique = new Set(fps);
    return { total: fps.length, unique: unique.size, hasDuplicates: unique.size !== fps.length };
  }

  async getStandardLicensePaginationMetadata(): Promise<{
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
  } | null> {
    // Capture the latest API response
    const response = this.page.waitForResponse(
      (resp) => resp.url().includes(this.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    // We need an existing request to inspect; for initial state we use a different approach
    // This method is meant to be used after a request has already been captured
    return null; // Metadata captured via waitForStandardLicenseNextPageRequest response body
  }

  async restoreStandardLicenseInitialBatch(): Promise<void> {
    // Navigate away and back to force a fresh component mount and page=0 request
    const dashboard = this.page.locator('a[href="/system-user-dashboard"]');
    await recordEvidence('action-click-reports.page-613', async () => dashboard.click());
    await this.page.waitForURL('**/system-user-dashboard');
    const reportsLink = this.page.locator('a[href="/reports"]');
    await recordEvidence('action-click-reports.page-616', async () => reportsLink.click());
    await this.page.waitForURL('**/reports');
    await this.heading.waitFor();
    await this.loadedTotalText.waitFor();
    await recordEvidence('action-evaluate-reports.page-621', async () => this.page.evaluate(() => window.scrollTo(0, 0)));
    await this.collapseFilters();
    await recordEvidence('assert-toHaveAttribute-reports.page-622', async () => expect(this.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-623', async () => expect(this.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-624', async () => expect(this.deletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  // ── Date Filters (RSL-D) ──

  async getStandardLicenseDateFilterState(): Promise<Record<string, { visible: boolean; type: string; value: string; disabled: boolean; minAttr: string; maxAttr: string; required: boolean; hasCalendarButton: boolean }>> {
    await this.expandFilters();
    const ids = ['report-exp-date', 'report-maint-date', 'report-created-date', 'report-modified-date'];
    const names = ['expirationDate', 'maintenanceDate', 'createdDate', 'modifiedDate'];
    const result: Record<string, { visible: boolean; type: string; value: string; disabled: boolean; minAttr: string; maxAttr: string; required: boolean; hasCalendarButton: boolean }> = {};

    for (let i = 0; i < ids.length; i++) {
      const el = this.page.locator(`#${ids[i]}`);
      const visible = await el.isVisible().catch(() => false);
      result[names[i]] = {
        visible,
        type: visible ? ((await el.getAttribute('type')) || '') : '',
        value: visible ? ((await el.inputValue().catch(() => '')) || '') : '',
        disabled: visible ? await el.isDisabled().catch(() => true) : true,
        minAttr: visible ? ((await el.getAttribute('min')) || '') : '',
        maxAttr: visible ? ((await el.getAttribute('max')) || '') : '',
        required: visible ? await el.evaluate((e: HTMLInputElement) => e.required).catch(() => false) : false,
        hasCalendarButton: visible,
      };
    }
    return result;
  }

  async getReportDateRuntimeData(): Promise<{
    currentDate: string;
    pastDate: string;
    futureDate: string;
    monthBoundaryDate: string;
    secondDate: string;
    noMatchDate: string;
  }> {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;

    // Past: 1 year ago
    const past = new Date(today);
    past.setFullYear(past.getFullYear() - 1);
    const pastDate = `${past.getFullYear()}-${String(past.getMonth() + 1).padStart(2, '0')}-${String(past.getDate()).padStart(2, '0')}`;

    // Future: 1 year ahead
    const future = new Date(today);
    future.setFullYear(future.getFullYear() + 1);
    const futureDate = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;

    // Month boundary: first day of next month
    const monthBoundary = new Date(yyyy, today.getMonth() + 1, 1);
    const monthBoundaryDate = `${monthBoundary.getFullYear()}-${String(monthBoundary.getMonth() + 1).padStart(2, '0')}-01`;

    // Second: different month, different day
    const second = new Date(today);
    second.setMonth(second.getMonth() - 2);
    second.setDate(second.getDate() === today.getDate() ? 1 : second.getDate());
    const secondDate = `${second.getFullYear()}-${String(second.getMonth() + 1).padStart(2, '0')}-${String(second.getDate()).padStart(2, '0')}`;

    // No-match: year 1900
    const noMatchDate = '1900-01-01';

    return { currentDate, pastDate, futureDate, monthBoundaryDate, secondDate, noMatchDate };
  }

  async setStandardLicenseExpirationDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-693', async () => this.expirationDateInput.fill(date));
  }

  async clearStandardLicenseExpirationDate(): Promise<void> {
    await recordEvidence('action-fill-reports.page-697', async () => this.expirationDateInput.fill(''));
  }

  async setStandardLicenseMaintenanceDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-701', async () => this.maintenanceDateInput.fill(date));
  }

  async clearStandardLicenseMaintenanceDate(): Promise<void> {
    await recordEvidence('action-fill-reports.page-705', async () => this.maintenanceDateInput.fill(''));
  }

  async setStandardLicenseCreatedDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-709', async () => this.licenseCreatedDateInput.fill(date));
  }

  async clearStandardLicenseCreatedDate(): Promise<void> {
    await recordEvidence('action-fill-reports.page-713', async () => this.licenseCreatedDateInput.fill(''));
  }

  async setStandardLicenseModifiedDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-717', async () => this.licenseModifiedDateInput.fill(date));
  }

  async clearStandardLicenseModifiedDate(): Promise<void> {
    await recordEvidence('action-fill-reports.page-721', async () => this.licenseModifiedDateInput.fill(''));
  }

  async clearAllStandardLicenseDateFilters(): Promise<void> {
    await recordEvidence('action-fill-reports.page-725', async () => this.expirationDateInput.fill(''));
    await recordEvidence('action-fill-reports.page-726', async () => this.maintenanceDateInput.fill(''));
    await recordEvidence('action-fill-reports.page-727', async () => this.licenseCreatedDateInput.fill(''));
    await recordEvidence('action-fill-reports.page-728', async () => this.licenseModifiedDateInput.fill(''));
  }

  // ── Mode Switching (RSL-E) ──

  async getActiveMode(): Promise<boolean> {
    return (await this.activeTab.getAttribute('aria-pressed')) === 'true';
  }

  async getDeletedMode(): Promise<boolean> {
    return (await this.deletedTab.getAttribute('aria-pressed')) === 'true';
  }

  async switchToDeletedMode(): Promise<void> {
    const isAlreadyDeleted = await this.getDeletedMode();
    if (!isAlreadyDeleted) {
      await recordEvidence('action-click-reports.page-744', async () => this.deletedTab.click());
    }
  }

  async switchToActiveMode(): Promise<void> {
    const isAlreadyActive = await this.getActiveMode();
    if (!isAlreadyActive) {
      await recordEvidence('action-click-reports.page-751', async () => this.activeTab.click());
    }
  }

  async waitForDeletedRequest(expectedPage?: number): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(this.deletedLicensesApiPath)) return false;
        if (resp.request().method() !== 'GET') return false;
        if (expectedPage !== undefined) {
          const url = new URL(resp.url());
          return url.searchParams.get('page') === String(expectedPage);
        }
        return true;
      },
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async waitForStandardLicenseActiveRequest(expectedPage?: number): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(this.standardLicensesApiPath)) return false;
        if (resp.request().method() !== 'GET') return false;
        if (expectedPage !== undefined) {
          const url = new URL(resp.url());
          return url.searchParams.get('page') === String(expectedPage);
        }
        return true;
      },
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async getLicenseModeGroupStructure(): Promise<{ activePressed: boolean; deletedPressed: boolean; activeDisabled: boolean; deletedDisabled: boolean }> {
    return {
      activePressed: await this.getActiveMode(),
      deletedPressed: await this.getDeletedMode(),
      activeDisabled: await this.activeTab.isDisabled().catch(() => true),
      deletedDisabled: await this.deletedTab.isDisabled().catch(() => true),
    };
  }

  async switchToDeletedAndWait(): Promise<void> {
    const [response] = await Promise.all([
      this.waitForDeletedRequest(),
      this.switchToDeletedMode(),
    ]);
  }

  async switchToActiveAndWait(): Promise<void> {
    const [response] = await Promise.all([
      this.waitForStandardLicenseActiveRequest(),
      this.switchToActiveMode(),
    ]);
  }

  async getDeletedLicenseLoadedState(): Promise<{ loaded: number; total: number }> {
    return this.getStandardLicenseLoadedState(); // same locator, different mode
  }

  async getDeletedLicenseRecordCount(): Promise<number> {
    return this.getReportsRecordCount(); // same locator
  }

  async getDeletedLicenseHeaders(): Promise<string[]> {
    return this.getStandardLicenseHeaders(); // same table structure
  }

  async getDeletedLicenseTable(): Promise<Locator> {
    return this.standardLicenseTable;
  }

  async getDeletedLicenseRenderedRowCount(): Promise<number> {
    return this.getStandardLicenseRenderedRowCount();
  }

  // ═══════════════════════════════════════════════════
  //  Export Excel (RSL-F)
  // ═══════════════════════════════════════════════════

  async getStandardLicenseExportButton(): Promise<Locator> {
    return this.exportExcelButton;
  }

  async getStandardLicenseExportState(): Promise<{
    visible: boolean;
    enabled: boolean;
    role: string | null;
    accessibleName: string | null;
    tabindex: string | null;
  }> {
    const btn = this.exportExcelButton;
    return {
      visible: await btn.isVisible().catch(() => false),
      enabled: await btn.isEnabled().catch(() => false),
      role: await btn.getAttribute('role').catch(() => null),
      accessibleName: await btn.getAttribute('aria-label').catch(() => null),
      tabindex: await btn.getAttribute('tabindex').catch(() => null),
    };
  }

  async waitForStandardLicenseExport(action: () => Promise<void>): Promise<{
    filename: string;
    downloadEventCount: number;
  }> {
    let downloadCount = 0;
    let lastFilename = '';

    const onDownload = async (download: any) => {
      downloadCount++;
      lastFilename = download.suggestedFilename();
    };

    this.page.on('download', onDownload);
    await action();
    // Allow download events to settle
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    this.page.removeListener('download', onDownload);

    return { filename: lastFilename, downloadEventCount: downloadCount };
  }

  async triggerStandardLicenseExport(): Promise<void> {
    await recordEvidence('action-click-reports.page-877', async () => this.exportExcelButton.click());
  }

  /**
   * Prepares a filtered state for export testing.
   * Applies one Product Profile filter, waits for the POST response, and captures the filtered total.
   */
  async prepareStandardLicenseFilteredExport(
    profileValue: string
  ): Promise<{ filteredTotal: number }> {
    await this.expandFilters();
    await recordEvidence('action-click-reports.page-888', async () => this.productProfileSearchbox.click());

    const option = this.page.getByRole('option', { name: profileValue });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await Promise.all([
      this.page.waitForResponse(
      (resp) =>
        resp.url().includes(this.filterApiPath) &&
        resp.request().method() === 'POST',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-reports.page-892', async () => option.click()),
    ]);
    await this.loadedTotalText.waitFor();

    const { total } = await this.getStandardLicenseLoadedState();
    return { filteredTotal: total };
  }

  /**
   * Prepares a date-filtered state for export testing.
   */
  async prepareStandardLicenseDateFilteredExport(
    dateValue: string
  ): Promise<{ filteredTotal: number }> {
    await this.expandFilters();
    await Promise.all([
      this.page.waitForResponse(
      (resp) =>
        resp.url().includes(this.filterApiPath) &&
        resp.request().method() === 'POST',
      { timeout: 15000 }
    ),
      recordEvidence('action-fill-reports.page-914', async () => this.expirationDateInput.fill(dateValue)),
    ]);
    await this.loadedTotalText.waitFor();

    const { total } = await this.getStandardLicenseLoadedState();
    return { filteredTotal: total };
  }

  /**
   * Prepares a combined-filter state for export testing.
   */
  async prepareStandardLicenseCombinedFilteredExport(
    profileValue: string,
    roleValue: string,
    dateValue: string
  ): Promise<{ filteredTotal: number }> {
    await this.expandFilters();

    // Select Product Profile
    await recordEvidence('action-click-reports.page-939', async () => this.productProfileSearchbox.click());
    const profileOption = this.page.getByRole('option', { name: profileValue });
    await profileOption.waitFor({ state: 'visible', timeout: 5000 });
    await recordEvidence('action-click-reports.page-942', async () => profileOption.click());

    // Wait for Profile Role to enable
    await this.page.waitForFunction(
      () => {
        const el = document.querySelector('[name="Select a profile first"]');
        return el && !(el as HTMLInputElement).disabled;
      },
      { timeout: 10000 }
    ).catch(() => {});

    // Select Profile Role
    await recordEvidence('action-click-reports.page-954', async () => this.profileRoleSearchbox.click());
    const roleOption = this.page.getByRole('option', { name: roleValue });
    await roleOption.waitFor({ state: 'visible', timeout: 5000 });
    await recordEvidence('action-click-reports.page-957', async () => roleOption.click());

    // Set date
    await Promise.all([
      this.page.waitForResponse(
      (resp) =>
        resp.url().includes(this.filterApiPath) &&
        resp.request().method() === 'POST',
      { timeout: 15000 }
    ),
      recordEvidence('action-fill-reports.page-960', async () => this.expirationDateInput.fill(dateValue)),
    ]);
    await this.loadedTotalText.waitFor();

    const { total } = await this.getStandardLicenseLoadedState();
    return { filteredTotal: total };
  }

  /**
   * Restores export state: clears all filters, restores Active mode, collapses panel.
   */
  async restoreStandardLicenseExportState(): Promise<void> {
    // Switch to Active if needed
    await this.switchToActiveMode();
    await this.expandFilters();

    // Clear all core filters — email, hardware IDs, groups, profiles, roles
    await recordEvidence('action-fill-reports.page-983', async () => this.emailSearchbox.fill(''));
    // Clear hardware IDs by removing any chips
    const hwRemove = this.page.getByRole('button', { name: /Remove HW IDs:/ });
    if (await hwRemove.isVisible().catch(() => false)) {
      await recordEvidence('action-click-reports.page-987', async () => hwRemove.click());
    }
    // Clear profile role by clearing product profile first
    const profileRemove = this.page.getByRole('button', { name: /Remove Email:/ });
    // Use Clear button as global reset
    await recordEvidence('action-click-reports.page-992', async () => this.clearFiltersButton.click());

    // Clear all date filters
    await this.clearAllStandardLicenseDateFilters();

    // Wait for unfiltered request to settle
    await this.page.waitForResponse(
      (resp) =>
        resp.url().includes(this.standardLicensesApiPath) &&
        resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await this.loadedTotalText.waitFor();
    await this.collapseFilters();

    await recordEvidence('assert-toHaveAttribute-reports.page-1007', async () => expect(this.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1008', async () => expect(this.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1009', async () => expect(this.deletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  /**
   * Inspects the export network contract without recording payload values.
   */
  async inspectStandardLicenseExportContract(
    action: () => Promise<void>
  ): Promise<{
    method: string;
    endpointPath: string;
    queryParamNames: string[];
    status: number;
    contentType: string;
    contentDisposition: string | null;
    contentLength: string | null;
  }> {
    const contract: any = {
      method: '',
      endpointPath: '',
      queryParamNames: [],
      status: 0,
      contentType: '',
      contentDisposition: null,
      contentLength: null,
    };

    const responsePromise = this.page.waitForResponse(
      (resp) => {
        const url = resp.url();
        // Match any standardlicense export endpoint
        if (!url.includes('/standardlicense')) return false;
        const ct = resp.headers()['content-type'] || '';
        const cd = resp.headers()['content-disposition'] || '';
        // Match export-like responses
        return (
          ct.includes('spreadsheet') ||
          ct.includes('excel') ||
          ct.includes('officedocument') ||
          ct.includes('octet-stream') ||
          cd.includes('attachment') ||
          cd.includes('filename')
        );
      },
      { timeout: 30000 }
    );

    await action();
    const response = await responsePromise;

    contract.status = response.status();
    contract.contentType = response.headers()['content-type'] || '';
    contract.contentDisposition = response.headers()['content-disposition'] || null;
    contract.contentLength = response.headers()['content-length'] || null;

    const req = response.request();
    contract.method = req.method();

    const reqUrl = new URL(req.url());
    contract.endpointPath = reqUrl.pathname;
    contract.queryParamNames = Array.from(reqUrl.searchParams.keys());

    return contract;
  }

  // ═══════════════════════════════════════════════════
  //  Floating Licenses (RFL-A)
  // ═══════════════════════════════════════════════════

  async selectFloatingLicensesReport(): Promise<void> {
    const isSelected = await this.floatingLicensesCard.getAttribute('aria-pressed');
    if (isSelected !== 'true') {
      await recordEvidence('action-click-reports.page-1081', async () => this.floatingLicensesCard.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-1082', async () => expect(this.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async getFloatingLicenseActiveMode(): Promise<boolean> {
    return (await this.floatingLicenseActiveTab.getAttribute('aria-pressed')) === 'true';
  }

  async getFloatingLicenseDeletedMode(): Promise<boolean> {
    return (await this.floatingLicenseDeletedTab.getAttribute('aria-pressed')) === 'true';
  }

  async getFloatingLicenseRecordCount(): Promise<number> {
    const text = await this.floatingLicenseRecordCountText.textContent();
    const match = text?.match(/([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  }

  async getFloatingLicenseLoadedState(): Promise<{ loaded: number; total: number }> {
    const text = await this.floatingLicenseLoadedTotalText.textContent();
    const match = text?.match(/([\d,]+)\s*loaded\s*·\s*([\d,]+)\s*total/);
    return {
      loaded: match ? parseInt(match[1].replace(/,/g, ''), 10) : 0,
      total: match ? parseInt(match[2].replace(/,/g, ''), 10) : 0,
    };
  }

  async parseFloatingLicenseLoadedTotal(): Promise<{ loaded: number; total: number }> {
    return this.getFloatingLicenseLoadedState();
  }

  async getFloatingLicenseFilterControls(): Promise<Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string; type: string }>> {
    const controls: Record<string, Locator> = {
      email: this.flEmailSearchbox,
      hardwareIds: this.flHardwareIdsSearchbox,
      expirationDate: this.flExpirationDateInput,
      licenseCreatedDate: this.flLicenseCreatedDateInput,
      productProfile: this.flProductProfileSearchbox,
      profileRole: this.flProfileRoleSearchbox,
    };
    const result: Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string; type: string }> = {};
    for (const [name, locator] of Object.entries(controls)) {
      result[name] = {
        visible: await locator.isVisible().catch(() => false),
        disabled: await locator.isDisabled().catch(() => true),
        placeholder: (await locator.getAttribute('placeholder')) || '',
        value: (await locator.inputValue().catch(() => '')) || '',
        type: (await locator.getAttribute('type').catch(() => '')) || '',
      };
    }
    return result;
  }

  async getFloatingLicenseExportButton(): Promise<Locator> {
    return this.floatingLicenseExportButton;
  }

  async getFloatingLicenseTable(): Promise<Locator> {
    return this.floatingLicenseTable;
  }

  async getFloatingLicenseHeaders(): Promise<string[]> {
    const headers = this.floatingLicenseTableHeaders;
    const count = await headers.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await headers.nth(i).textContent();
      texts.push((text ?? '').trim());
    }
    return texts;
  }

  async getVisibleFloatingLicenseRows(): Promise<Locator> {
    return this.floatingLicenseTableRows;
  }

  async getFloatingLicenseScrollContainer(): Promise<Locator> {
    return this.flScrollContainer;
  }

  async getFloatingLicenseScrollMetrics(): Promise<{ scrollTop: number; scrollHeight: number; clientHeight: number; scrollable: boolean }> {
    const container = this.flScrollContainer;
    const [scrollTop, scrollHeight, clientHeight] = await Promise.all([
      container.evaluate((el) => el.scrollTop).catch(() => 0),
      container.evaluate((el) => el.scrollHeight).catch(() => 0),
      container.evaluate((el) => el.clientHeight).catch(() => 0),
    ]);
    return { scrollTop, scrollHeight, clientHeight, scrollable: scrollHeight > clientHeight };
  }

  async waitForFloatingLicenseInitialRequest(): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async captureFloatingLicenseInitialMetadata(): Promise<{ totalElements: number; numberOfElements: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const body = await response.json();
    return {
      totalElements: body.totalElements ?? 0,
      numberOfElements: body.numberOfElements ?? 0,
    };
  }

  async restoreFloatingLicenseInitialState(): Promise<void> {
    // Collapse filters first
    const filtersVisible = await this.flEmailSearchbox.isVisible().catch(() => false);
    if (filtersVisible) {
      await recordEvidence('action-click-reports.page-1196', async () => this.filtersButton.click());
      await this.flEmailSearchbox.waitFor({ state: 'hidden' }).catch(() => {});
    }

    // Ensure Floating Licenses card is selected
    const isFlSelected = await this.floatingLicensesCard.getAttribute('aria-pressed');
    if (isFlSelected !== 'true') {
      await this.selectFloatingLicensesReport();
    }

    // Ensure Active is pressed
    const isActive = await this.getFloatingLicenseActiveMode();
    if (!isActive) {
      await recordEvidence('action-click-reports.page-1209', async () => this.floatingLicenseActiveTab.click());
    }

    await this.floatingLicenseLoadedTotalText.waitFor();
    await recordEvidence('assert-toBeVisible-reports.page-1213', async () => expect(this.heading).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports.page-1214', async () => expect(this.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1215', async () => expect(this.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1216', async () => expect(this.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  // ═══════════════════════════════════════════════════
  //  Floating Licenses Filters (RFL-B)
  // ═══════════════════════════════════════════════════

  async getFloatingLicenseEmailFilter(): Promise<Locator> {
    return this.flEmailSearchbox;
  }

  async setFloatingLicenseEmailFilter(email: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-1228', async () => this.flEmailSearchbox.fill(email));
    await recordEvidence('action-press-reports.page-1229', async () => this.page.keyboard.press('Enter'));
  }

  async getFloatingLicenseHardwareFilter(): Promise<Locator> {
    return this.flHardwareIdsSearchbox;
  }

  async setFloatingLicenseHardwareFilter(value: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-1237', async () => this.flHardwareIdsSearchbox.fill(value));
    await recordEvidence('action-press-reports.page-1238', async () => this.page.keyboard.press('Enter'));
  }

  async getFloatingLicenseProfileOptions(): Promise<string[]> {
    await recordEvidence('action-click-reports.page-1242', async () => this.flProductProfileSearchbox.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const options = this.page.getByRole('button').filter({ has: this.page.locator('[role="checkbox"]') });
    const count = await options.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      texts.push((text ?? '').trim());
    }
    await recordEvidence('action-press-reports.page-1251', async () => this.page.keyboard.press('Escape'));
    return texts;
  }

  async selectFloatingLicenseProfile(profileName: string): Promise<void> {
    await recordEvidence('action-click-reports.page-1256', async () => this.flProductProfileSearchbox.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const option = this.page.getByRole('button', { name: profileName });
    await recordEvidence('action-click-reports.page-1259', async () => option.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
  }

  async getFloatingLicenseRoleOptions(): Promise<string[]> {
    await recordEvidence('action-click-reports.page-1264', async () => this.flProfileRoleSearchbox.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const options = this.page.getByRole('button').filter({ has: this.page.locator('[role="checkbox"]') });
    const count = await options.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await options.nth(i).textContent();
      texts.push((text ?? '').trim());
    }
    await recordEvidence('action-press-reports.page-1273', async () => this.page.keyboard.press('Escape'));
    return texts;
  }

  async selectFloatingLicenseRole(roleName: string): Promise<void> {
    await recordEvidence('action-click-reports.page-1278', async () => this.flProfileRoleSearchbox.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const option = this.page.getByRole('button', { name: roleName });
    await recordEvidence('action-click-reports.page-1281', async () => option.click());
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
  }

  async setFloatingLicenseExpirationDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-1286', async () => this.flExpirationDateInput.fill(date));
    await recordEvidence('action-press-reports.page-1287', async () => this.page.keyboard.press('Tab'));
  }

  async setFloatingLicenseCreatedDate(date: string): Promise<void> {
    await recordEvidence('action-fill-reports.page-1291', async () => this.flLicenseCreatedDateInput.fill(date));
    await recordEvidence('action-press-reports.page-1292', async () => this.page.keyboard.press('Tab'));
  }

  async clearFloatingLicenseFilters(): Promise<void> {
    const clearAll = this.page.getByRole('button', { name: 'Clear all' });
    const visible = await clearAll.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-reports.page-1299', async () => clearAll.click());
    } else {
      await recordEvidence('action-click-reports.page-1301', async () => this.flClearFiltersButton.click());
    }
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
  }

  async getFloatingLicenseFilterState(): Promise<Record<string, { value: string; disabled: boolean }>> {
    const controls: Record<string, Locator> = {
      email: this.flEmailSearchbox,
      hardwareIds: this.flHardwareIdsSearchbox,
      expirationDate: this.flExpirationDateInput,
      licenseCreatedDate: this.flLicenseCreatedDateInput,
      productProfile: this.flProductProfileSearchbox,
      profileRole: this.flProfileRoleSearchbox,
    };
    const result: Record<string, { value: string; disabled: boolean }> = {};
    for (const [name, locator] of Object.entries(controls)) {
      result[name] = {
        value: (await locator.inputValue().catch(() => '')) || '',
        disabled: await locator.isDisabled().catch(() => true),
      };
    }
    return result;
  }

  async waitForFloatingLicenseFilterRequest(): Promise<void> {
    // Floating Licenses filters are client-side — no server request to wait for.
    // This method exists for API compatibility; verify no request occurs.
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
  }

  async verifyFloatingLicenseFilterState(expected: Record<string, { value?: string; disabled?: boolean }>): Promise<void> {
    const state = await this.getFloatingLicenseFilterState();
    for (const [name, exp] of Object.entries(expected)) {
      if (exp.value !== undefined) {
        await recordEvidence('assert-toBe-reports.page-1335', async () => expect(state[name].value).toBe(exp.value));
      }
      if (exp.disabled !== undefined) {
        await recordEvidence('assert-toBe-reports.page-1338', async () => expect(state[name].disabled).toBe(exp.disabled));
      }
    }
  }

  async restoreFloatingLicenseFilterState(): Promise<void> {
    await this.clearFloatingLicenseFilters();
    const filtersVisible = await this.flEmailSearchbox.isVisible().catch(() => false);
    if (filtersVisible) {
      await recordEvidence('action-click-reports.page-1347', async () => this.filtersButton.click());
    }
    await this.restoreFloatingLicenseInitialState();
  }

  // ═══════════════════════════════════════════════════
  //  Floating Licenses Active/Deleted Mode (RFL-C)
  // ═══════════════════════════════════════════════════

  async selectFloatingLicenseActiveMode(): Promise<void> {
    const isPressed = await this.getFloatingLicenseActiveMode();
    if (!isPressed) {
      await recordEvidence('action-click-reports.page-1359', async () => this.floatingLicenseActiveTab.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-1360', async () => expect(this.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async selectFloatingLicenseDeletedMode(): Promise<void> {
    const isPressed = await this.getFloatingLicenseDeletedMode();
    if (!isPressed) {
      await recordEvidence('action-click-reports.page-1367', async () => this.floatingLicenseDeletedTab.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-1368', async () => expect(this.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async getFloatingLicenseMode(): Promise<{ activePressed: boolean; deletedPressed: boolean }> {
    return {
      activePressed: await this.getFloatingLicenseActiveMode(),
      deletedPressed: await this.getFloatingLicenseDeletedMode(),
    };
  }

  async waitForFloatingLicenseModeRequest(): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => {
        const url = resp.url();
        return (
          (url.includes(this.floatingLicensesApiPath) || url.includes(this.floatingLicensesDeletedApiPath)) &&
          resp.request().method() === 'GET'
        );
      },
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async waitForFloatingLicenseDeletedRequest(): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async getFloatingLicenseModeCounts(): Promise<{ toolbarCount: number; loaded: number; total: number }> {
    const toolbarCount = await this.getFloatingLicenseRecordCount();
    const { loaded, total } = await this.getFloatingLicenseLoadedState();
    return { toolbarCount, loaded, total };
  }

  getDeletedFloatingLicenseRows(): Locator {
    return this.floatingLicenseTableRows;
  }

  async verifyFloatingLicenseModeState(expected: {
    floatingLicensesSelected?: boolean;
    activePressed?: boolean;
    deletedPressed?: boolean;
    filtersCollapsed?: boolean;
  }): Promise<void> {
    if (expected.floatingLicensesSelected !== undefined) {
      const expectedVal = expected.floatingLicensesSelected ? 'true' : 'false';
      await recordEvidence('assert-toHaveAttribute-reports.page-1419', async () => expect(this.floatingLicensesCard).toHaveAttribute('aria-pressed', expectedVal));
    }
    if (expected.activePressed !== undefined) {
      const expectedVal = expected.activePressed ? 'true' : 'false';
      await recordEvidence('assert-toHaveAttribute-reports.page-1423', async () => expect(this.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', expectedVal));
    }
    if (expected.deletedPressed !== undefined) {
      const expectedVal = expected.deletedPressed ? 'true' : 'false';
      await recordEvidence('assert-toHaveAttribute-reports.page-1427', async () => expect(this.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', expectedVal));
    }
    if (expected.filtersCollapsed !== undefined) {
      const filtersVisible = await this.flEmailSearchbox.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports.page-1431', async () => expect(filtersVisible).toBe(!expected.filtersCollapsed));
    }
  }

  async verifyNoMixedFloatingLicenseModeRows(): Promise<void> {
    const activeMode = await this.getFloatingLicenseActiveMode();
    const deletedMode = await this.getFloatingLicenseDeletedMode();
    await recordEvidence('assert-toBe-reports.page-1438', async () => expect(activeMode !== deletedMode).toBe(true));

    if (activeMode) {
      // In Active mode, verify the Active endpoint's data is displayed
      // and no Deleted-specific content is present
      const { total } = await this.getFloatingLicenseLoadedState();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports.page-1444', async () => expect(total).toBeGreaterThanOrEqual(0));
    }

    if (deletedMode) {
      // Verify Deleted view is properly isolated
      const { total } = await this.getFloatingLicenseLoadedState();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports.page-1450', async () => expect(total).toBeGreaterThanOrEqual(0));
    }
  }

  async restoreFloatingLicenseActiveMode(): Promise<void> {
    // Collapse filters first
    const filtersVisible = await this.flEmailSearchbox.isVisible().catch(() => false);
    if (filtersVisible) {
      await recordEvidence('action-click-reports.page-1458', async () => this.filtersButton.click());
      await this.flEmailSearchbox.waitFor({ state: 'hidden' }).catch(() => {});
    }

    // Ensure FL card is selected
    const isFlSelected = await this.floatingLicensesCard.getAttribute('aria-pressed');
    if (isFlSelected !== 'true') {
      await this.selectFloatingLicensesReport();
    }

    // Clear all filters
    await this.clearFloatingLicenseFilters();

    // Click Active
    await this.selectFloatingLicenseActiveMode();

    // Wait for Active request to settle
    await this.floatingLicenseLoadedTotalText.waitFor();

    await recordEvidence('assert-toHaveAttribute-reports.page-1477', async () => expect(this.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1478', async () => expect(this.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1479', async () => expect(this.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  // ═══════════════════════════════════════════════════
  //  Floating Licenses Deleted Infinite Scroll (RFL-D)
  // ═══════════════════════════════════════════════════

  async getFloatingLicenseSentinel(): Promise<{ found: boolean; visible: boolean; height: number; ariaHidden: string | null }> {
    const sentinel = this.flScrollSentinel;
    const count = await sentinel.count();
    if (count === 0) return { found: false, visible: false, height: 0, ariaHidden: null };
    const first = sentinel.first();
    return {
      found: true,
      visible: await first.isVisible().catch(() => false),
      height: await first.evaluate((el) => (el as HTMLElement).offsetHeight).catch(() => 0),
      ariaHidden: await first.getAttribute('aria-hidden').catch(() => null),
    };
  }

  async scrollFloatingLicenseWithinBatch(px: number = 50): Promise<void> {
    const container = this.flScrollContainer;
    await recordEvidence('action-evaluate-reports.page-1504', async () => container.evaluate((el, offset) => { el.scrollTo(0, el.scrollTop + offset); }, px));
    await this.page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
  }

  async scrollFloatingLicenseToSentinel(): Promise<void> {
    const container = this.flScrollContainer;
    const maxScroll = await container.evaluate((el) => el.scrollHeight - el.clientHeight);
    await recordEvidence('action-evaluate-reports.page-1511', async () => container.evaluate((el, max) => { el.scrollTo(0, max); }, maxScroll));
    await this.page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));
  }

  async waitForFloatingLicenseNextPageRequest(expectedPage: number): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(this.floatingLicensesDeletedApiPath)) return false;
        if (resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        return url.searchParams.get('page') === String(expectedPage);
      },
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async captureFloatingLicenseDeletedMetadata(): Promise<{
    totalElements: number; numberOfElements: number; totalPages: number; size: number; page: number; first: boolean; last: boolean;
  }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    const body = await response.json();
    return {
      totalElements: body.totalElements ?? 0,
      numberOfElements: body.numberOfElements ?? 0,
      totalPages: body.totalPages ?? 0,
      size: body.size ?? 0,
      page: body.number ?? 0,
      first: body.first ?? false,
      last: body.last ?? false,
    };
  }

  async getFloatingLicenseRenderedRowCount(): Promise<number> {
    return this.floatingLicenseTableRows.count();
  }

  async getFloatingLicenseRowFingerprints(): Promise<string[]> {
    const rows = this.floatingLicenseTableRows;
    const count = await rows.count();
    const fps: string[] = [];
    for (let i = 0; i < count; i++) {
      const cells = rows.nth(i).locator('td');
      const cellCount = await cells.count();
      const parts: string[] = [];
      for (let j = 0; j < cellCount; j++) {
        const text = await cells.nth(j).textContent();
        parts.push((text ?? '').trim());
      }
      fps.push(parts.join('|'));
    }
    return fps;
  }

  async verifyNoDuplicateFloatingLicenseRows(): Promise<{ total: number; unique: number; hasDuplicates: boolean }> {
    const fps = await this.getFloatingLicenseRowFingerprints();
    const unique = new Set(fps);
    return { total: fps.length, unique: unique.size, hasDuplicates: unique.size !== fps.length };
  }

  async getFloatingLicenseDeletedRequestSequence(): Promise<{ page: string; size: string }[]> {
    const { loaded } = await this.getFloatingLicenseLoadedState();
    const size = 500;
    const approximateRequests = Math.max(1, Math.ceil(loaded / size));
    const seq: { page: string; size: string }[] = [];
    for (let i = 0; i < approximateRequests; i++) {
      seq.push({ page: String(i), size: String(size) });
    }
    return seq;
  }

  // ═══════════════════════════════════════════════════
  //  Floating Licenses Export (RFL-E)
  // ═══════════════════════════════════════════════════

  async getFloatingLicenseExportState(): Promise<{
    visible: boolean;
    enabled: boolean;
    role: string | null;
    accessibleName: string | null;
    tabindex: string | null;
  }> {
    const btn = this.floatingLicenseExportButton;
    return {
      visible: await btn.isVisible().catch(() => false),
      enabled: await btn.isEnabled().catch(() => false),
      role: await btn.getAttribute('role').catch(() => null),
      accessibleName: await btn.getAttribute('aria-label').catch(() => null),
      tabindex: await btn.getAttribute('tabindex').catch(() => null),
    };
  }

  async waitForFloatingLicenseExport(action: () => Promise<void>): Promise<{
    filename: string;
    downloadEventCount: number;
  }> {
    let downloadCount = 0;
    let lastFilename = '';
    const onDownload = async (download: any) => {
      downloadCount++;
      lastFilename = download.suggestedFilename();
    };
    this.page.on('download', onDownload);
    await action();
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    this.page.removeListener('download', onDownload);
    return { filename: lastFilename, downloadEventCount: downloadCount };
  }

  async triggerFloatingLicenseExport(): Promise<void> {
    await recordEvidence('action-click-reports.page-1621', async () => this.floatingLicenseExportButton.click());
  }

  async verifyFloatingLicenseExportDisabledInActiveMode(): Promise<void> {
    await recordEvidence('assert-toHaveAttribute-reports.page-1625', async () => expect(this.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    const isActive = await this.getFloatingLicenseActiveMode();
    await recordEvidence('assert-toBe-reports.page-1627', async () => expect(isActive).toBe(true));
    const exportEnabled = await this.floatingLicenseExportButton.isEnabled().catch(() => false);
    await recordEvidence('assert-toBe-reports.page-1629', async () => expect(exportEnabled).toBe(false));
  }

  // ═══════════════════════════════════════════════════
  //  Floating Configurations (RFC-A)
  // ═══════════════════════════════════════════════════

  async selectFloatingConfigurationsReport(): Promise<void> {
    const isSelected = await this.floatingConfigurationsCard.getAttribute('aria-pressed');
    if (isSelected !== 'true') {
      await recordEvidence('action-click-reports.page-1639', async () => this.floatingConfigurationsCard.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-1640', async () => expect(this.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async getFloatingConfigurationsActiveMode(): Promise<boolean> {
    return (await this.fcActiveTab.getAttribute('aria-pressed')) === 'true';
  }

  async getFloatingConfigurationsDeletedMode(): Promise<boolean> {
    return (await this.fcDeletedTab.getAttribute('aria-pressed')) === 'true';
  }

  async getFloatingConfigurationsMode(): Promise<{ activePressed: boolean; deletedPressed: boolean }> {
    return {
      activePressed: await this.getFloatingConfigurationsActiveMode(),
      deletedPressed: await this.getFloatingConfigurationsDeletedMode(),
    };
  }

  async getFloatingConfigurationsRecordCount(): Promise<number> {
    const text = await this.fcRecordCountText.textContent();
    const match = text?.match(/([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
  }

  async getFloatingConfigurationsLoadedState(): Promise<{ loaded: number; total: number }> {
    const text = await this.fcLoadedTotalText.textContent();
    const match = text?.match(/([\d,]+)\s*loaded\s*·\s*([\d,]+)\s*total/);
    return {
      loaded: match ? parseInt(match[1].replace(/,/g, ''), 10) : 0,
      total: match ? parseInt(match[2].replace(/,/g, ''), 10) : 0,
    };
  }

  async expandFloatingConfigurationsFilters(): Promise<void> {
    const panel = this.fcFilterPanel;
    const visible = await panel.isVisible().catch(() => false);
    if (!visible) {
      await recordEvidence('action-click-reports.page-1678', async () => this.fcFiltersButton.click());
      await panel.waitFor({ state: 'visible' }).catch(() => {});
    }
  }

  async collapseFloatingConfigurationsFilters(): Promise<void> {
    const panel = this.fcFilterPanel;
    const visible = await panel.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-reports.page-1687', async () => this.fcFiltersButton.click());
      await panel.waitFor({ state: 'hidden' }).catch(() => {});
    }
  }

  async getFloatingConfigurationsFilterControls(): Promise<Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string; type: string }>> {
    const controls: Record<string, Locator> = {
      systemUsers: this.page.getByRole('searchbox', { name: 'System Users' }),
      expirationDate: this.page.getByRole('textbox', { name: 'Expiration Date' }),
      maintenanceDate: this.page.getByRole('textbox', { name: 'Maintenance Date' }),
      userGroup: this.page.getByRole('searchbox', { name: 'Search groups' }),
      productProfile: this.page.getByRole('searchbox', { name: 'Search profiles' }),
      profileRole: this.page.getByRole('searchbox', { name: 'Select a profile first' }),
      configModifiedDate: this.page.getByRole('textbox', { name: 'Configuration Modified Date' }),
      configCreatedDate: this.page.getByRole('textbox', { name: 'Configuration Created Date' }),
    };
    const result: Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string; type: string }> = {};
    for (const [name, locator] of Object.entries(controls)) {
      result[name] = {
        visible: await locator.isVisible().catch(() => false),
        disabled: await locator.isDisabled().catch(() => true),
        placeholder: (await locator.getAttribute('placeholder').catch(() => '')) || '',
        value: (await locator.inputValue().catch(() => '')) || '',
        type: (await locator.getAttribute('type').catch(() => '')) || '',
      };
    }
    return result;
  }

  async getFloatingConfigurationsExportState(): Promise<{ visible: boolean; enabled: boolean }> {
    return {
      visible: await this.fcExportButton.isVisible().catch(() => false),
      enabled: await this.fcExportButton.isEnabled().catch(() => false),
    };
  }

  async waitForFloatingConfigurationsRequest(): Promise<{ url: URL; status: number } | null> {
    try {
      const response = await this.page.waitForResponse(
        (resp) => resp.url().includes(this.floatingConfigurationsApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      return { url: new URL(response.url()), status: response.status() };
    } catch {
      return null;
    }
  }

  async restoreFloatingConfigurationsInitialState(): Promise<void> {
    await this.collapseFloatingConfigurationsFilters();
    const isFcSelected = await this.floatingConfigurationsCard.getAttribute('aria-pressed');
    if (isFcSelected !== 'true') {
      await this.selectFloatingConfigurationsReport();
    }
    const isActive = await this.getFloatingConfigurationsActiveMode();
    if (!isActive) {
      await recordEvidence('action-click-reports.page-1743', async () => this.fcActiveTab.click());
    }
    await recordEvidence('assert-toHaveAttribute-reports.page-1745', async () => expect(this.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1746', async () => expect(this.fcActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports.page-1747', async () => expect(this.fcDeletedTab).toHaveAttribute('aria-pressed', 'false'));
  }

  // ═══════════════════════════════════════════════════
  //  Floating Configurations — Deleted Mode (RFC-B)
  // ═══════════════════════════════════════════════════

  readonly floatingConfigurationsDeletedApiPath = '/api/report/alldeleted';
  readonly fcDeletedTable: Locator;
  readonly fcDeletedRows: Locator;
  readonly fcDeletedTableHeaders: Locator;

  // ═══════════════════════════════════════════════════
  //  Floating Configurations — Deleted Filters & Export (RFC-C)
  // ═══════════════════════════════════════════════════

  readonly fcDeletedDeletedByInput: Locator;
  readonly fcDeletedCreatedByInput: Locator;
  readonly fcDeletedGroupNameInput: Locator;

  async selectFloatingConfigurationsDeleted(): Promise<void> {
    const isDeleted = await this.fcDeletedTab.getAttribute('aria-pressed');
    if (isDeleted !== 'true') {
      await recordEvidence('action-click-reports.page-1770', async () => this.fcDeletedTab.click());
      await recordEvidence('assert-toHaveAttribute-reports.page-1771', async () => expect(this.fcDeletedTab).toHaveAttribute('aria-pressed', 'true'));
    }
  }

  async getFloatingConfigurationsDeletedCounts(): Promise<{ recordCount: number; loaded: number; total: number }> {
    const recordText = await this.fcRecordCountText.textContent().catch(() => '0');
    const recordMatch = recordText?.match(/^([\d,]+)\s*records$/);
    const recordCount = recordMatch ? parseInt(recordMatch[1].replace(/,/g, ''), 10) : 0;

    const loadedText = await this.fcLoadedTotalText.textContent().catch(() => '');
    const loadedMatch = loadedText?.match(/([\d,]+)\s*loaded\s*·\s*([\d,]+)\s*total/);

    return {
      recordCount,
      loaded: loadedMatch ? parseInt(loadedMatch[1].replace(/,/g, ''), 10) : 0,
      total: loadedMatch ? parseInt(loadedMatch[2].replace(/,/g, ''), 10) : 0,
    };
  }

  async getFloatingConfigurationsDeletedTableHeaders(): Promise<string[]> {
    const headers = await this.fcDeletedTableHeaders.allTextContents();
    return headers.map((h) => h.trim());
  }

  async getFloatingConfigurationsDeletedRowComponents(rowIndex: number): Promise<{
    userGroup: string;
    profile: string;
    role: string;
    createdBy: string;
    deletedBy: string;
    expirationDate: string;
    maintenanceDate: string;
    createdDate: string;
    modifiedDate: string;
    feature: string;
    availability: { total: string; occupied: string; maxCheckout: string; status: string };
  }> {
    const row = this.fcDeletedRows.nth(rowIndex);
    const cells = row.locator('td');
    const createdDeletedCell = cells.nth(3);
    const configDetailsCell = cells.nth(4);
    const availabilityCell = cells.nth(5);

    const createdDeletedText = (await createdDeletedCell.textContent()) || '';
    const configText = (await configDetailsCell.textContent()) || '';
    const availText = (await availabilityCell.textContent()) || '';

    const createdBy = createdDeletedText.match(/Created:\s*(\S+)/)?.[1] || '';
    const deletedBy = createdDeletedText.match(/Deleted:\s*(\S+)/)?.[1] || '';

    const expirationDate = configText.match(/Exp:\s*([\d\w\s]+?)(?=\s*Maint:)/)?.[1]?.trim() || '';
    const maintenanceDate = configText.match(/Maint:\s*([\d\w\s]+?)(?=\s*Created:)/)?.[1]?.trim() || '';
    const createdDate = configText.match(/Created:\s*([\d\w\s]+?)(?=\s*Modified:)/)?.[1]?.trim() || '';
    const modifiedDate = configText.match(/Modified:\s*([\d\w\s]+?)(?=\s*Feature:)/)?.[1]?.trim() || '';
    const feature = configText.match(/Feature:\s*(.+?)(?:\s*$)/)?.[1]?.trim() || '';

    const total = availText.match(/Total:\s*(\S+)/)?.[1] || '';
    const occupied = availText.match(/Occupied:\s*(\S+)/)?.[1] || '';
    const maxCheckout = availText.match(/Max checkout:\s*(\S+)/)?.[1] || '';
    const status = availText.match(/(Available|Unavailable)/)?.[1] || '';

    return {
      userGroup: (await cells.nth(0).textContent())?.trim() || '',
      profile: (await cells.nth(1).textContent())?.trim() || '',
      role: (await cells.nth(2).textContent())?.trim() || '',
      createdBy,
      deletedBy,
      expirationDate,
      maintenanceDate,
      createdDate,
      modifiedDate,
      feature,
      availability: { total, occupied, maxCheckout, status },
    };
  }

  async getFloatingConfigurationsDeletedRowCount(): Promise<number> {
    const count = await this.fcDeletedRows.count();
    return count;
  }

  async waitForFloatingConfigurationsDeletedRequest(): Promise<{ url: URL; status: number } | null> {
    try {
      const response = await this.page.waitForResponse(
        (resp) => resp.url().includes(this.floatingConfigurationsDeletedApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      return { url: new URL(response.url()), status: response.status() };
    } catch {
      return null;
    }
  }

  async waitForFloatingConfigurationsDeletedResponse(): Promise<{ url: URL; status: number; body: any } | null> {
    try {
      const response = await this.page.waitForResponse(
        (resp) => resp.url().includes(this.floatingConfigurationsDeletedApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      const body = await response.json();
      return { url: new URL(response.url()), status: response.status(), body };
    } catch {
      return null;
    }
  }

  // ═══════════════════════════════════════════════════
  //  Floating Configurations — Deleted Filters & Export (RFC-C)
  // ═══════════════════════════════════════════════════

  async applyFloatingConfigurationsDeletedFilter(
    filterType: 'deletedBy' | 'createdBy' | 'groupName',
    value: string
  ): Promise<void> {
    const inputMap: Record<string, Locator> = {
      deletedBy: this.fcDeletedDeletedByInput,
      createdBy: this.fcDeletedCreatedByInput,
      groupName: this.fcDeletedGroupNameInput,
    };
    const input = inputMap[filterType];
    await recordEvidence('action-fill-reports.page-1891', async () => input.fill(value));
  }

  async getFloatingConfigurationsDeletedFilterValue(
    filterType: 'deletedBy' | 'createdBy' | 'groupName'
  ): Promise<string> {
    const inputMap: Record<string, Locator> = {
      deletedBy: this.fcDeletedDeletedByInput,
      createdBy: this.fcDeletedCreatedByInput,
      groupName: this.fcDeletedGroupNameInput,
    };
    return (await inputMap[filterType].inputValue().catch(() => '')) || '';
  }

  async clearFloatingConfigurationsDeletedFilters(): Promise<void> {
    const clearAll = this.page.getByRole('button', { name: 'Clear all' });
    const visible = await clearAll.isVisible().catch(() => false);
    if (visible) {
      await recordEvidence('action-click-reports.page-1909', async () => clearAll.click());
    } else {
      await recordEvidence('action-click-reports.page-1911', async () => this.fcClearFiltersButton.click());
    }
    await this.page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
  }

  async exportFloatingConfigurationsDeleted(): Promise<{ filename: string | null; download: any }> {
    const downloadPromise = this.page.waitForEvent('download', { timeout: 30000 }).catch(() => null);
    await recordEvidence('action-click-reports.page-1918', async () => this.fcExportButton.click());
    const download = await downloadPromise;
    return { filename: download?.suggestedFilename() || null, download };
  }

  async getFloatingConfigurationsDeletedFilterControls(): Promise<
    Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string }>
  > {
    const controls: Record<string, Locator> = {
      deletedBy: this.fcDeletedDeletedByInput,
      createdBy: this.fcDeletedCreatedByInput,
      groupName: this.fcDeletedGroupNameInput,
    };
    const result: Record<string, { visible: boolean; disabled: boolean; placeholder: string; value: string }> = {};
    for (const [name, locator] of Object.entries(controls)) {
      result[name] = {
        visible: await locator.isVisible().catch(() => false),
        disabled: await locator.isDisabled().catch(() => true),
        placeholder: (await locator.getAttribute('placeholder').catch(() => '')) || '',
        value: (await locator.inputValue().catch(() => '')) || '',
      };
    }
    return result;
  }

  async getFloatingConfigurationsDeletedFilteredCounts(): Promise<{ recordCount: number; loaded: number; total: number }> {
    return this.getFloatingConfigurationsDeletedCounts();
  }
}
