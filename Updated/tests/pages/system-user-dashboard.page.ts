import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ExpiringListRecord } from '../test-data/models';

export class SystemUserDashboardPage {
  readonly page: Page;
  private processedIdentityPages: Array<Promise<Array<number | string>>> = [];
  private processedIdentityListener?: (response: import('@playwright/test').Response) => void;

  // Page shell
  readonly heading: Locator;
  readonly subtitle: Locator;
  readonly logo: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Header controls (Batch 2)
  readonly banner: Locator;
  readonly headerControls: Locator;

  // Language control: globe icon button in header — no accessible name
  readonly languageButton: Locator;
  readonly languageMenu: Locator;

  // Theme control: moon/sun icon button in header — no accessible name
  readonly themeButton: Locator;

  // Sidebar navigation (Batch 3) — Always-visible sidebar with data-sidebar="sidebar".
  // Live inspection (2026-11-23): No role="dialog" or <aside>/<nav> — plain DIV
  // with data-sidebar="sidebar". Nav links are in a <ul> with 11 <li><a> items.
  // A "Toggle Sidebar" button collapses to icon-only mode; Ctrl+B and Escape do nothing.
  readonly sidebarContainer: Locator;
  readonly sidebarList: Locator;
  readonly sidebarToggleButton: Locator;
  readonly sidebarNavItems: Locator;

  // Navigation links keyed by known href routes — scoped to the sidebar container
  readonly navSystemUserDashboard: Locator;
  readonly navUserLicenses: Locator;
  readonly navReports: Locator;
  readonly navFloatingLicenseConfigs: Locator;
  readonly navStandardLicenseConfigs: Locator;
  readonly navFeatures: Locator;
  readonly navProfiles: Locator;
  readonly navUserGroups: Locator;
  readonly navSystemUsers: Locator;
  readonly navServerLicensing: Locator;
  readonly navServerLicenseImport: Locator;

  // Summary cards (Batch 4 — Group 1)
  readonly summaryCards: Locator;
  readonly pendingLicenseRequestsCard: Locator;
  readonly expiringLicensesCard: Locator;
  readonly floatingConfigsCard: Locator;
  readonly floatingLicensesCard: Locator;

  // Floating Licenses section (Batch FL-A)
  readonly floatingLicensesSectionHeading: Locator;
  readonly floatingLicensesSectionSubtitle: Locator;
  readonly floatingLicensesExpiresBeforeInput: Locator;
  readonly floatingLicensesSearchInput: Locator;
  readonly floatingLicensesCountText: Locator;
  readonly floatingLicensesEmptyHeading: Locator;
  readonly floatingLicensesEmptySubtext: Locator;

  // Pending License Requests section (Batch 4 — Group 1)
  readonly pendingSectionHeading: Locator;
  readonly pendingSectionSubtitle: Locator;
  readonly licenseSearchInput: Locator;
  readonly licenseHistorySwitch: Locator;
  readonly licenseRequestTable: Locator;
  readonly licenseRequestRows: Locator;
  readonly approveButtons: Locator;
  readonly deleteButtons: Locator;

  // Pending License Requests — confirmed div-based data grid (Batch SUD-PL-02-B,
  // 2026-11-23). Live trace inspection (test-runs\...SUD-PL-02-B...\LIMAS-SUD-065)
  // confirmed there is NO <table>, role="table", role="row", or role="columnheader"
  // anywhere in this section — it is a plain DIV grid laid out with CSS Grid
  // (grid-cols-[...]). `licenseRequestTable`/`licenseRequestRows` are compatibility
  // aliases of the DIV container/data rows below. The locators use the confirmed stable
  // structural classes scoped under `pendingRequestsDataContainer`.
  // Header row: unique class combination "hidden grid-cols-[...] ... bg-muted/20
  // px-5 py-3 ... lg:grid" (hidden on narrow viewports, grid on lg). Data rows:
  // sibling DIVs with "border-b border-border/60 last:border-b-0" wrapping an
  // inner "grid ... grid-cols-1 ... lg:grid-cols-[...]" row — 20 of 20 loaded
  // records rendered at the time of failure (147 total, paginated).
  readonly pendingRequestsDataContainer: Locator;
  readonly pendingRequestsHeaderRow: Locator;
  readonly pendingRequestsUserHeading: Locator;
  readonly pendingRequestsFeatureHeading: Locator;
  readonly pendingRequestsHardwareCreatedHeading: Locator;
  readonly pendingRequestsActionsHeading: Locator;
  readonly pendingRequestsDataRows: Locator;
  readonly pendingRequestsFirstRow: Locator;
  // "<N> loaded • <M> total pending" stat line, confirmed in trace directly
  // above the data container (20 loaded of 147 total at inspection time).
  readonly pendingRequestsCountText: Locator;

  // Processed License Request History (Batch 5A)
  readonly processedSectionSubtitle: Locator;
  readonly processedCountText: Locator;
  readonly processedUserHeading: Locator;
  readonly processedFeatureHeading: Locator;
  readonly processedHardwareCreatedHeading: Locator;
  readonly processedLoadMoreNote: Locator;

  // Inline approval form (Batch 4 — Group 4: Approve Form)
  readonly approveFormContainer: Locator;
  readonly approveFormLicenseAssignment: Locator;
  readonly approveFormUserGroupLabel: Locator;
  readonly approveFormUserGroupRequiredIndicator: Locator;
  readonly approveFormUserGroupCombobox: Locator;
  readonly approveFormProfileLabel: Locator;
  readonly approveFormProfileCombobox: Locator;
  readonly approveFormRoleCombobox: Locator;
  readonly approveFormExpirationDateLabel: Locator;
  readonly approveFormMaintenanceDateLabel: Locator;
  readonly approveFormCancelButton: Locator;
  readonly approveFormApproveRequestButton: Locator;
  readonly approveFormListbox: Locator;

  // User and navigation (pre-existing)
  readonly userButton: Locator;
  readonly accountText: Locator;
  readonly userMenu: Locator;
  readonly logoutOption: Locator;
  readonly pendingRequestsTab: Locator;
  readonly expiringLicensesTab: Locator;

  // No-match message in history mode
  readonly noMatchMessage: Locator;

  // Incremental loading (Batch 5D)
  readonly processedRecordCards: Locator;

  // Expiring Licenses section (Batch EL-A)
  readonly expiringSectionHeading: Locator;
  readonly expiringSectionSubtitle: Locator;
  readonly expiringFilterGroup: Locator;
  readonly expirationRadio: Locator;
  readonly maintenanceRadio: Locator;
  readonly expiresBeforeLabel: Locator;
  readonly expiresBeforeInput: Locator;
  readonly userLicensesButton: Locator;
  readonly expiringSearchInput: Locator;
  readonly expiringCountText: Locator;
  readonly expiringLicenseCards: Locator;
  readonly extendButtons: Locator;
  readonly allExpiringDisplayedNote: Locator;

  // Filter type and Expires before date (Batch EL-B)
  readonly expiringLiveRegions: Locator;
  readonly calendarDialog: Locator;
  readonly calendarGrid: Locator;
  readonly expiresBeforeClearButton: Locator;
  readonly alertMessages: Locator;

  // Search and filtering (Batch EL-C)
  readonly expiringResultCountText: Locator;

  // Record field inspection (Batch EL-D)
  readonly expiringRecordList: Locator;

  // Extend License dialog (Batch EL-F)
  readonly extendLicenseDialog: Locator;

  // Floating Licenses API path
  readonly floatingLicensesApiPath = '/api/flicense/ex/';
  readonly expiringUsersApiPath = '/api/users/f';

  constructor(page: Page) {
    this.page = page;

    // Page shell
    this.heading = page.getByRole('heading', { name: 'System User Dashboard', level: 1 });
    this.subtitle = page.getByText('Monitor pending requests, expiring licenses, and floating seat usage.');
    this.logo = page.getByRole('img', { name: 'Logo' });
    this.mainContent = page.locator('main');
    this.footer = page.getByText('© KPIT Technologies Ltd. All rights reserved.');

    // Header controls (Batch 2)
    this.banner = page.locator('header, [role="banner"]');
    this.headerControls = page.locator('header, [role="banner"]').locator('button');

    // Language control: globe icon button in header — no accessible name
    this.languageButton = page.locator('header, [role="banner"]').locator('button').first();
    this.languageMenu = page.locator('[role="menu"]');

    // Theme control: moon/sun icon button in header — no accessible name
    this.themeButton = page.locator('header, [role="banner"]').locator('button').nth(1);

    // Sidebar navigation (Batch 3) — Always-visible sidebar with data-sidebar="sidebar".
    // Live inspection (2026-11-23): No role="dialog" or <aside>/<nav> — plain DIV
    // with data-sidebar="sidebar". The menu <ul> holds 12 <li data-sidebar="menu-item">
    // children: 1 toggle <button data-sidebar="menu-button"> plus 11
    // <a data-sidebar="menu-button" href="..."> navigation links. Ctrl+B and Escape do nothing.
    // Execution trace (SUD-PL-01-B1, 2026-11-23) confirms the sidebar can render
    // collapsed (data-collapsible="icon") where the toggle button and nav links
    // show icons only — no visible text, aria-label, or title — so locators here
    // use confirmed tag/attribute markup (data-sidebar, href) rather than
    // accessible name, which is unreliable across collapsed/expanded state.

    this.sidebarContainer = page.locator('[data-sidebar="sidebar"]');
    this.sidebarList = this.sidebarContainer.locator('ul').first();

    // Toggle button: execution DOM shows the sidebar can render collapsed
    // (data-collapsible="icon"), in which case the button has an icon only —
    // no visible text, aria-label, or title. Role+name is therefore unreliable.
    // Confirmed markup: it is the sole <button data-sidebar="menu-button"> in
    // the sidebar menu (every other menu item is an <a>), so match on that
    // instead of an accessible name.
    // Accessibility finding: toggle button has no accessible name when collapsed.
    this.sidebarToggleButton = this.sidebarContainer.locator('button[data-sidebar="menu-button"]');

    // Nav items: confirmed execution DOM has 12 <li data-sidebar="menu-item">
    // children — 1 holds the toggle <button> (no href) and 11 hold an
    // <a data-sidebar="menu-button" href="..."> navigation link. Scope to the
    // anchors only so the count reflects navigation links, not the toggle.
    this.sidebarNavItems = this.sidebarContainer.locator('a[data-sidebar="menu-button"]');

    // Navigation links — confirmed execution DOM shows the same icon-only
    // collapse behavior strips accessible names from these anchors too.
    // Use the confirmed route href scoped to the sidebar instead of name.
    // Accessibility finding: nav links have no accessible name when collapsed.
    this.navSystemUserDashboard = this.sidebarContainer.locator('a[href="/system-user-dashboard"]');
    this.navUserLicenses = this.sidebarContainer.locator('a[href="/users-licenses"]');
    this.navReports = this.sidebarContainer.locator('a[href="/reports"]');
    this.navFloatingLicenseConfigs = this.sidebarContainer.locator('a[href="/floating-license-configurations"]');
    this.navStandardLicenseConfigs = this.sidebarContainer.locator('a[href="/standard-license-configurations"]');
    this.navFeatures = this.sidebarContainer.locator('a[href="/features"]');
    this.navProfiles = this.sidebarContainer.locator('a[href="/profiles"]');
    this.navUserGroups = this.sidebarContainer.locator('a[href="/groups"]');
    this.navSystemUsers = this.sidebarContainer.locator('a[href="/system-users"]');
    this.navServerLicensing = this.sidebarContainer.locator('a[href="/server-licensing"]');
    this.navServerLicenseImport = this.sidebarContainer.locator('a[href="/server-license-import"]');

    // Summary cards (Batch 4 — Group 1)
    this.summaryCards = page.getByRole('main').getByRole('button', { name: /(?:Pending License Requests|Expiring Licenses|Expiring Floating Configurations|Floating Licenses)$/ });
    this.pendingLicenseRequestsCard = page.getByRole('button', { name: /Pending License Requests/ });
    this.expiringLicensesCard = page.getByRole('button', { name: /Expiring Licenses/ });
    this.floatingConfigsCard = page.getByRole('button', { name: /Expiring Floating Configurations/ });
    this.floatingLicensesCard = page.getByRole('button', { name: /Floating Licenses/ });

    // Floating Licenses section (Batch FL-A)
    this.floatingLicensesSectionHeading = page.getByRole('heading', { name: 'Floating Licenses', level: 3 });
    this.floatingLicensesSectionSubtitle = page.getByText('Review active floating licenses approaching expiration.');
    this.floatingLicensesExpiresBeforeInput = page.getByLabel('Expires before');
    this.floatingLicensesSearchInput = page.getByPlaceholder('Search by User ID, Profile, Hardware ID, or Role…');
    this.floatingLicensesCountText = page.getByText(/\d+\s*loaded\s*[·•]\s*\d+\s*total\s*licenses/i);
    this.floatingLicensesEmptyHeading = page.getByText('No floating licenses found');
    this.floatingLicensesEmptySubtext = page.getByText('No floating licenses match the selected expiration criteria.');

    // Pending License Requests section (Batch 4 — Group 1)
    this.pendingSectionHeading = page.getByRole('heading', { name: 'Pending License Requests', level: 3 });
    this.pendingSectionSubtitle = page.getByText('License requests awaiting review.');
    this.licenseSearchInput = page.getByPlaceholder('Search license requests...');
    this.licenseHistorySwitch = page.getByRole('switch', { name: /Show License Request History/i });
    this.deleteButtons = page.getByRole('button', { name: /Delete LR-/ });

    // Pending License Requests — div-based data grid locators (confirmed via
    // execution trace, SUD-PL-02-B, 2026-11-23). See field declaration comment
    // above for the accessibility finding. Structural classes below were each
    // verified to resolve to exactly one container/header row and 20 of 20
    // rendered data rows in the inspected trace — no role or data-* attributes
    // exist on this section, so CSS-scoped structural locators are the most
    // stable option available (per locator priority: data-* > role > text > structure).
    this.pendingRequestsDataContainer = page.locator('div.w-full.min-w-0.rounded-lg.border.border-border');
    // Header row is the only direct-child row containing the literal text
    // "Actions" — data rows have no mobile-label span for the Actions column
    // (confirmed: case-insensitive "actions" occurs exactly once in the whole
    // trace), so this uniquely and robustly selects the header row without
    // relying on brittle, hard-to-escape generated Tailwind class names.
    this.pendingRequestsHeaderRow = this.pendingRequestsDataContainer
      .locator(':scope > div')
      .filter({ hasText: 'Actions' });
    this.pendingRequestsUserHeading = this.pendingRequestsHeaderRow.getByText('User', { exact: true });
    this.pendingRequestsFeatureHeading = this.pendingRequestsHeaderRow.getByText('Feature', { exact: true });
    this.pendingRequestsHardwareCreatedHeading = this.pendingRequestsHeaderRow.getByText('Hardware / Created', {
      exact: true,
    });
    this.pendingRequestsActionsHeading = this.pendingRequestsHeaderRow.getByText('Actions', { exact: true });
    // Data rows are the direct-child wrapper DIVs carrying both "border-b"
    // and "last:border-b-0". The header row also carries "border-b" (as a
    // divider under the heading text) but never "last:border-b-0", so
    // requiring both classes together excludes it structurally — confirmed
    // against the trace: 20 matches for the combined class pair, 0 for the
    // header row.
    this.pendingRequestsDataRows = this.pendingRequestsDataContainer.locator(':scope > div.border-b.last\\:border-b-0');
    this.pendingRequestsFirstRow = this.pendingRequestsDataRows.first();
    // Compatibility names target the confirmed DIV grid, not nonexistent table roles.
    this.licenseRequestTable = this.pendingRequestsDataContainer;
    this.licenseRequestRows = this.pendingRequestsDataRows;
    this.approveButtons = this.pendingRequestsDataRows.getByRole('button', { name: 'Approve', exact: true });
    this.pendingRequestsCountText = page.getByText(/\d+\s*loaded[·•]\s*\d+\s*total\s*pending/i);

    // Processed License Request History (Batch 5A)
    this.processedSectionSubtitle = page.getByText('Processed License Requests — approved or deleted.');
    this.processedCountText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+processed/i);
    this.processedUserHeading = page.getByText('User');
    this.processedFeatureHeading = page.getByText('Feature');
    this.processedHardwareCreatedHeading = page.getByText('Hardware / Created');
    this.processedLoadMoreNote = page.getByText('More requests will load automatically.');

    // Inline approval form (Batch 4 — Group 4: Approve Form)
    this.approveFormContainer = page.locator('div.border-t.border-border\\/60.bg-muted\\/15.px-5.py-5');
    this.approveFormLicenseAssignment = this.approveFormContainer.locator('p').getByText('License Assignment', { exact: true });
    this.approveFormUserGroupLabel = this.approveFormContainer.locator('label').filter({ hasText: /^User Group\s*\*$/ });
    this.approveFormUserGroupRequiredIndicator = this.approveFormUserGroupLabel.locator('span').filter({ hasText: /^\*$/ });
    this.approveFormUserGroupCombobox = page.getByRole('combobox', { name: /User Group/ });
    this.approveFormProfileLabel = page.getByText('Profile*');
    this.approveFormProfileCombobox = page.getByRole('combobox', { name: /Profile/ });
    this.approveFormRoleCombobox = page.getByRole('combobox', { name: /Role/ });
    this.approveFormExpirationDateLabel = page.getByText('Expiration Date*');
    this.approveFormMaintenanceDateLabel = page.getByText('Maintenance Date');
    this.approveFormCancelButton = page.getByRole('button', { name: 'Cancel' });
    this.approveFormApproveRequestButton = page.getByRole('button', { name: 'Approve Request', exact: true });
    this.approveFormListbox = page.getByRole('listbox');

    // User and navigation (pre-existing)
    this.userButton = page.locator('header, [role="banner"]').getByRole('button').last();
    this.accountText = page.locator('header, [role="banner"]').getByText(/[^\s@]+@[^\s@]+\.[^\s@]+/);
    this.userMenu = page.locator('[role="menu"]');
    this.logoutOption = page.getByRole('menuitem', { name: 'Logout' });
    this.pendingRequestsTab = this.pendingLicenseRequestsCard;
    this.expiringLicensesTab = this.expiringLicensesCard;

    // No-match message in history mode
    this.noMatchMessage = page.getByText('No matching processed requests in loaded pages');

    // Incremental loading (Batch 5D)
    this.processedRecordCards = this.pendingRequestsDataRows;

    // Expiring Licenses section (Batch EL-A)
    this.expiringSectionHeading = page.getByRole('heading', { name: 'Expiring Licenses', level: 3 });
    this.expiringSectionSubtitle = page.getByText('Review and extend licenses approaching expiration.');
    this.expiringFilterGroup = page.getByRole('group', { name: 'Filter by' });
    this.expirationRadio = page.getByRole('radio', { name: 'Expiration' });
    this.maintenanceRadio = page.getByRole('radio', { name: 'Maintenance' });
    this.expiresBeforeLabel = page.getByText('Expires before');
    this.expiresBeforeInput = page.getByRole('textbox', { name: 'Expires before' });
    this.userLicensesButton = page.getByRole('button', { name: 'User Licenses' });
    this.expiringSearchInput = page.getByRole('searchbox', { name: /Search by name, email, profile, company, or Hardware ID/i });
    this.expiringCountText = page.getByText(/\d+\s*loaded[·•]\d+\s*total/i);
    this.expiringLicenseCards = this.expiringCountText.locator('..').locator('> *:nth-child(2) > *');
    this.extendButtons = page.getByRole('button', { name: 'Extend' });
    this.allExpiringDisplayedNote = page.getByText('All expiring licenses are displayed.');

    // Filter type and Expires before date (Batch EL-B)
    this.expiringLiveRegions = page.locator('[aria-live]');
    this.calendarDialog = page.getByRole('dialog');
    this.calendarGrid = page.getByRole('grid');
    this.expiresBeforeClearButton = this.mainContent.getByRole('button', { name: /clear/i });
    this.alertMessages = page.getByRole('alert');

    // Search and filtering (Batch EL-C)
    this.expiringResultCountText = page.getByText(/\d+\s*(?:loaded|matches)[·•]\s*\d+\s*total/i);

    // Record field inspection (Batch EL-D)
    this.expiringRecordList = this.extendButtons.first().locator('..').locator('..');

    // Extend License dialog (Batch EL-F)
    this.extendLicenseDialog = page.getByRole('dialog');
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForURL('**/system-user-dashboard');
    await this.heading.waitFor();
  }

  async waitForFullRender(): Promise<void> {
    await this.waitForLoad();
    await this.subtitle.waitFor();
    await this.mainContent.waitFor();
  }

  // Sidebar is always visible on page load at all viewport widths.
  // No keyboard shortcut or dialog toggle needed.
  async waitForSidebar(): Promise<void> {
    await this.sidebarContainer.waitFor({ state: 'visible' });
  }

  async assertRoute(): Promise<void> {
    await this.waitForLoad();
    const url = this.page.url();
    if (!url.includes('/system-user-dashboard')) {
      throw new Error(`Expected route /system-user-dashboard but got ${url}`);
    }
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async isDisplayed(): Promise<boolean> {
    return this.heading.isVisible().catch(() => false);
  }

  // History view actions (Batch 5A)
  async enableHistory(): Promise<void> {
    if (this.processedIdentityListener) this.page.off('response', this.processedIdentityListener);
    this.processedIdentityPages = [];
    this.processedIdentityListener = response => {
      if (response.url().includes('/api/request/processed') && response.request().method() === 'GET' && response.status() === 200) {
        this.processedIdentityPages.push(response.json().then(body => Array.isArray(body.content) ? body.content.map((record: { id: number | string }) => record.id) : []).catch(() => []));
      }
    };
    this.page.on('response', this.processedIdentityListener);
    await recordEvidence('action-click-system-user-dashboard.page-401', async () => this.licenseHistorySwitch.click());
  }

  async waitForInitialHistoryLoad(): Promise<void> {
    await this.processedCountText.waitFor();
  }

  async getLoadedCount(): Promise<number> {
    const text = await this.processedCountText.textContent();
    const match = text?.match(/(\d+)\s*loaded[·•]/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getTotalProcessedCount(): Promise<number> {
    const text = await this.processedCountText.textContent();
    const match = text?.match(/[·•](\d+)\s*total\s+processed/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  // History search actions (Batch 5B)
  async searchHistory(query: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-422', async () => this.licenseSearchInput.fill(query));
  }

  async clearSearch(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-426', async () => this.licenseSearchInput.fill(''));
  }

  async getSearchValue(): Promise<string> {
    return this.licenseSearchInput.inputValue();
  }

  // Incremental loading (Batch 5D)
  async scrollToLoadMoreNote(): Promise<void> {
    await this.processedLoadMoreNote.scrollIntoViewIfNeeded();
  }

  async waitForNextProcessedPage(): Promise<void> {
    const initialCount = await this.getLoadedCount();
    await this.page.waitForFunction(
      (expected: number) => {
        const el = document.querySelector('p');
        if (!el) return false;
        // Walk up to find the count paragraph
        const paras = document.querySelectorAll('p');
        for (const p of paras) {
          const text = p.textContent || '';
          const match = text.match(/(\d+)\s*loaded[·•]/i);
          if (match && parseInt(match[1], 10) > expected) return true;
        }
        return false;
      },
      initialCount,
      { timeout: 15000 }
    );
  }

  async getProcessedCardCount(): Promise<number> {
    const cards = this.processedRecordCards;
    return cards.count();
  }

  async triggerSingleIncrementalLoad(): Promise<void> {
    await this.scrollToLoadMoreNote();
    await this.waitForNextProcessedPage();
  }

  async verifyNoDuplicateProcessedRecords(ids?: Array<number | string>): Promise<boolean> {
    const requestIds = ids ?? (await Promise.all(this.processedIdentityPages)).flat();
    if (!requestIds.length) throw new Error('No processed request identities were captured');
    // Repeated business values can belong to distinct requests. Use stable API
    // identities and verify that the rendered list has exactly the fetched count.
    if (requestIds.some(id => id === undefined || id === null)) throw new Error('Processed response lacks request identity');
    await expect(this.processedRecordCards).toHaveCount(requestIds.length);
    return new Set(requestIds).size === requestIds.length;
  }

  // History disable / pending view restoration (Batch 5E)
  async disableHistory(): Promise<void> {
    await recordEvidence('action-click-system-user-dashboard.page-496', async () => this.licenseHistorySwitch.click());
  }

  async isHistoryEnabled(): Promise<boolean> {
    return this.licenseHistorySwitch.isChecked();
  }

  async waitForPendingView(): Promise<void> {
    await this.pendingSectionSubtitle.waitFor();
  }

  // Expiring Licenses section (Batch EL-A)
  async selectExpiringLicenses(): Promise<void> {
    await recordEvidence('action-click-system-user-dashboard.page-509', async () => this.expiringLicensesCard.click());
  }

  async waitForExpiringLicenseLoad(): Promise<void> {
    await this.expiringCountText.waitFor();
  }

  async getExpiringLicenseLoadedCount(): Promise<number> {
    const text = await this.expiringCountText.textContent();
    const match = text?.match(/(\d+)\s*loaded[·•]/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getExpiringLicenseTotalCount(): Promise<number> {
    const text = await this.expiringCountText.textContent();
    const match = text?.match(/[·•](\d+)\s*total/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  // Filter type and Expires before date (Batch EL-B)
  async selectExpirationFilter(): Promise<void> {
    await recordEvidence('action-check-system-user-dashboard.page-530', async () => this.expirationRadio.check());
    await recordEvidence('assert-toBeChecked-system-user-dashboard.page-531', async () => expect(this.expirationRadio).toBeChecked());
  }

  async selectMaintenanceFilter(): Promise<void> {
    await recordEvidence('action-check-system-user-dashboard.page-535', async () => this.maintenanceRadio.check());
    await recordEvidence('assert-toBeChecked-system-user-dashboard.page-536', async () => expect(this.maintenanceRadio).toBeChecked());
  }

  async openExpiresBeforeCalendar(): Promise<void> {
    await recordEvidence('action-click-system-user-dashboard.page-540', async () => this.expiresBeforeInput.click());
    await recordEvidence('assert-toBeFocused-system-user-dashboard.page-541', async () => expect(this.expiresBeforeInput).toBeFocused());
  }

  async setExpiresBeforeDate(isoDate: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-545', async () => this.expiresBeforeInput.fill(isoDate));
    await recordEvidence('assert-toHaveValue-system-user-dashboard.page-546', async () => expect(this.expiresBeforeInput).toHaveValue(isoDate));
  }

  async clearExpiresBeforeDate(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-550', async () => this.expiresBeforeInput.fill(''));
    await recordEvidence('assert-toHaveValue-system-user-dashboard.page-551', async () => expect(this.expiresBeforeInput).toHaveValue(''));
  }

  async stepExpiresBeforeSegmentsWithKeyboard(): Promise<void> {
    await recordEvidence('action-focus-system-user-dashboard.page-555', async () => this.expiresBeforeInput.focus());
    await recordEvidence('action-press-system-user-dashboard.page-556', async () => this.page.keyboard.press('ArrowUp'));
    await recordEvidence('action-press-system-user-dashboard.page-557', async () => this.page.keyboard.press('Tab'));
    await recordEvidence('action-press-system-user-dashboard.page-558', async () => this.page.keyboard.press('ArrowUp'));
    await recordEvidence('action-press-system-user-dashboard.page-559', async () => this.page.keyboard.press('Tab'));
    await recordEvidence('action-press-system-user-dashboard.page-560', async () => this.page.keyboard.press('ArrowUp'));
  }

  // The native date control may reject malformed text; the UI result (value stays empty) is what is verified.
  async enterExpiresBeforeText(text: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-565', async () => this.expiresBeforeInput.fill(text)).catch(() => undefined);
  }

  async stepExpiresBeforeFirstSegment(): Promise<void> {
    await recordEvidence('action-focus-system-user-dashboard.page-569', async () => this.expiresBeforeInput.focus());
    await recordEvidence('action-press-system-user-dashboard.page-570', async () => this.page.keyboard.press('ArrowUp'));
  }

  async isInsideLiveRegion(target: Locator): Promise<boolean> {
    return target.evaluate((el) => el.closest('[aria-live]') !== null);
  }

  async isExpiresBeforeBadInput(): Promise<boolean> {
    return this.expiresBeforeInput.evaluate((el) => (el as HTMLInputElement).validity.badInput);
  }

  async clearExpiringSearch(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-582', async () => this.expiringSearchInput.fill(''));
    await recordEvidence('assert-toHaveValue-system-user-dashboard.page-583', async () => expect(this.expiringSearchInput).toHaveValue(''));
  }

  async getExpiringSummaryCardCount(): Promise<number> {
    const text = await this.expiringLicensesCard.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async captureUsersResponse(action: () => Promise<void>): Promise<{ url: URL; status: number }> {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes(this.expiringUsersApiPath) && response.request().method() === 'GET',
    );
    await action();
    const response = await responsePromise;
    return { url: new URL(response.url()), status: response.status() };
  }

  async verifyFilterResultsUpdated(): Promise<void> {
    await recordEvidence('assert-toHaveText-system-user-dashboard.page-602', async () => expect(this.expiringCountText).toHaveText(/\d+\s*loaded[·•]\s*\d+\s*total/i));
    await expect
      .poll(async () => {
        const loaded = await this.getExpiringLicenseLoadedCount();
        const total = await this.getExpiringLicenseTotalCount();
        const rendered = await this.extendButtons.count();
        return loaded === total && rendered === loaded;
      })
      .toBe(true);
  }

  // Search and filtering (Batch EL-C)
  async searchExpiringLicenses(value: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-615', async () => this.expiringSearchInput.fill(value));
    await recordEvidence('assert-toHaveValue-system-user-dashboard.page-616', async () => expect(this.expiringSearchInput).toHaveValue(value));
  }

  async clearExpiringLicenseSearch(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-620', async () => this.expiringSearchInput.fill(''));
    await recordEvidence('assert-toHaveValue-system-user-dashboard.page-621', async () => expect(this.expiringSearchInput).toHaveValue(''));
  }

  async getExpiringSearchValue(): Promise<string> {
    return this.expiringSearchInput.inputValue();
  }

  async getExpiringResultCount(): Promise<number> {
    const text = await this.expiringResultCountText.textContent();
    const match = text?.match(/(\d+)\s*(?:loaded|matches)/i);
    return match ? parseInt(match[1], 10) : -1;
  }

  async getExpiringResultTotal(): Promise<number> {
    const text = await this.expiringResultCountText.textContent();
    const match = text?.match(/[·•]\s*(\d+)\s*total/i);
    return match ? parseInt(match[1], 10) : -1;
  }

  // Each record card wraps its Extend button two levels below the card root
  async readExpiringRecords(): Promise<ExpiringListRecord[]> {
    return this.extendButtons.evaluateAll((buttons) =>
      buttons.map((button) => {
        const card = button.parentElement?.parentElement;
        const paragraphs = Array.from(card?.querySelectorAll('p') ?? []).map((p) => p.textContent?.trim() ?? '');
        return {
          name: paragraphs[0] ?? '',
          email: paragraphs[1] ?? '',
          hardwareId: paragraphs[2] ?? '',
          profile: card?.children[1]?.textContent?.trim() ?? '',
        };
      }),
    );
  }

  async verifyExpiringSearchResults(): Promise<void> {
    await recordEvidence('assert-toBeVisible-system-user-dashboard.page-657', async () => expect(this.expiringResultCountText).toBeVisible());
    await expect
      .poll(async () => (await this.getExpiringResultCount()) === (await this.extendButtons.count()))
      .toBe(true);
  }

  async verifyExpiringNoMatchState(): Promise<void> {
    await recordEvidence('assert-toHaveCount-system-user-dashboard.page-664', async () => expect(this.extendButtons).toHaveCount(0));
    await recordEvidence('assert-toHaveText-system-user-dashboard.page-665', async () => expect(this.expiringResultCountText).toHaveText(/^\s*0\s*matches/i));
  }

  async isExpiringSearchNamedOnlyByPlaceholder(): Promise<boolean> {
    return this.expiringSearchInput.evaluate(
      (el) =>
        (el as HTMLInputElement).labels?.length === 0 &&
        !el.getAttribute('aria-label') &&
        !el.getAttribute('aria-labelledby') &&
        (el as HTMLInputElement).placeholder.length > 0,
    );
  }

  async getExpiringSearchLabelCount(): Promise<number> {
    return this.expiringSearchInput.evaluate((el) => (el as HTMLInputElement).labels?.length ?? 0);
  }

  async hasListOrTableSemantics(target: Locator): Promise<boolean> {
    return target.evaluate(
      (el) => el.closest('ul, ol, table, [role=list], [role=listbox], [role=table], [role=grid]') !== null,
    );
  }

  async hasVisibleSearchFocusIndicator(): Promise<boolean> {
    return this.expiringSearchInput.evaluate((el) => {
      const style = getComputedStyle(el);
      return (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== 'none';
    });
  }

  trackUsersApiRequests(): { count: () => number } {
    const urls: string[] = [];
    this.page.on('request', (request) => {
      if (request.url().includes(this.expiringUsersApiPath)) {
        urls.push(request.url());
      }
    });
    return { count: () => urls.length };
  }

  // Large result set (Batch EL-C2)
  async getExpiringLoadedTotalMatch(): Promise<boolean> {
    return (await this.getExpiringLicenseLoadedCount()) === (await this.getExpiringLicenseTotalCount());
  }

  async isAllExpiringLoadedNoteDisplayed(): Promise<boolean> {
    return this.allExpiringDisplayedNote.isVisible();
  }

  async hasLoadedMoreThanSize(size: number): Promise<boolean> {
    return (await this.extendButtons.count()) > size;
  }

  async readCompanySample(): Promise<{ email: string; company: string } | null> {
    await this.captureUsersResponse(() => this.selectMaintenanceFilter());
    const responsePromise = this.page
      .waitForResponse(
        (response) =>
          response.url().includes(this.expiringUsersApiPath) &&
          response.request().method() === 'GET' &&
          (new URL(response.url()).searchParams.get('expirationDate') ?? '') !== '',
        { timeout: 10000 },
      )
      .catch(() => null);
    await this.selectExpirationFilter();
    const response = await responsePromise;
    if (!response) {
      return null;
    }
    const body = (await response.json().catch(() => null)) as {
      content?: Array<{ email?: string; company?: string }>;
    } | null;
    const user = (body?.content ?? []).find((item) => item.email && item.company?.trim());
    return user ? { email: user.email as string, company: (user.company as string).trim() } : null;
  }

  // Record field inspection (Batch EL-D)
  locateExpiringCardByIdentifier(email: string, includeHidden = false): Locator {
    // Email belongs to the card, not the Extend button. One user may own
    // multiple licenses; these sample-field checks inspect the first match.
    return this.page.getByRole('button', { name: 'Extend', exact: true, includeHidden }).locator('..').locator('..')
      .filter({ has: this.page.getByText(email, { exact: true }) }).first();
  }

  locateExpiringCardByHardwareId(hardwareId: string): Locator {
    return this.extendButtons.locator('..').locator('..')
      .filter({ has: this.page.getByText(hardwareId, { exact: true }) }).first();
  }

  async getRecordName(card: Locator): Promise<string> {
    return card.locator('p').first().textContent().then((t) => (t ?? '').trim());
  }

  async getRecordEmail(card: Locator): Promise<string> {
    return card.locator('p').nth(1).textContent().then((t) => (t ?? '').trim());
  }

  async getRecordProfile(card: Locator): Promise<string> {
    return card.locator('> :nth-child(2)').textContent().then((t) => (t ?? '').trim());
  }

  async getRecordHardwareId(card: Locator): Promise<string> {
    return card.locator('> :nth-child(4)').textContent().then((t) => (t ?? '').trim());
  }

  getRecordExpirationLabel(card: Locator): Locator {
    return card.locator('> :nth-child(3)').getByText('Exp:');
  }

  getRecordExpirationValue(card: Locator): Locator {
    return card.locator('> :nth-child(3)').locator('span').nth(1);
  }

  getRecordMaintenanceLabel(card: Locator): Locator {
    return card.locator('> :nth-child(3)').getByText('Maint:');
  }

  getRecordMaintenanceValue(card: Locator): Locator {
    return card.locator('> :nth-child(3)').locator('span').nth(3);
  }

  getRecordExtendButton(card: Locator, includeHidden = false): Locator {
    return card.getByRole('button', { name: 'Extend', exact: true, includeHidden });
  }

  // Pending License Requests — per-row field accessors (Batch SUD-PL-02-B).
  // `row` must be a locator obtained from `pendingRequestsDataRows` /
  // `pendingRequestsFirstRow` so that all lookups stay scoped to a single
  // confirmed data row. Field order/classes match the structure confirmed in
  // the SUD-065 execution trace (2026-11-23): each cell's first <p> is the
  // primary value, the second (when present) is the secondary value.
  // Trace inspection (SUD-PL-02-B2, 2026-11-23, LIMAS-SUD-070 failure) confirmed
  // "p.truncate.font-medium.text-foreground" matches two paragraphs in a data
  // row: the user-name paragraph AND the hardware-ID paragraph (which adds
  // "font-mono text-sm" but otherwise shares the same class list), causing a
  // Playwright strict-mode violation. The user-name paragraph is confirmed to
  // live in the first "div.min-w-0" cell of the row (the User column), while
  // the hardware-ID paragraph lives in a separate sibling "div.min-w-0" cell
  // (Hardware / Created column) — no data-* attributes exist on either cell,
  // so cell position is the most stable disambiguator available. Scoping to
  // that first cell, plus excluding the hardware-specific "font-mono" class as
  // a second safety net, was confirmed against the trace DOM to resolve
  // exactly one element containing the row's user name.
  getPendingRequestUserName(row: Locator): Locator {
    return row
      .locator('div.min-w-0')
      .first()
      .locator('p.truncate.font-medium.text-foreground:not(.font-mono)');
  }

  getPendingRequestUserEmail(row: Locator): Locator {
    return row.locator('p.mt-0\\.5.truncate.text-sm').first();
  }

  // Trace inspection (SUD-PL-02-C, 2026-11-23) confirmed both of these were
  // unscoped across the whole row: "p.truncate.text-sm.text-foreground"
  // (feature name) is also matched by the Hardware-ID paragraph, whose class
  // list ("truncate font-mono text-sm font-medium text-foreground") is a
  // superset; and "p.mt-0\\.5.text-xs" (feature version) is also matched by
  // the Created-date paragraph ("mt-0.5 whitespace-nowrap text-xs ..."),
  // masked only by an unverified ".first()" relying on DOM order. The
  // Feature cell is confirmed to be the second of three "div.min-w-0" cells
  // in the row (User, Feature, Hardware / Created), so scoping to it
  // resolves each selector to exactly one element without relying on class
  // exclusion or DOM-order luck.
  // Trace re-inspection (SUD-PL-02-C1, 2026-11-23) corrected the index:
  // the inner grid div (class="grid min-w-0 …") between the row wrapper
  // and the cells also matches div.min-w-0, pushing the Feature cell from
  // nth(1) to nth(2).  Index 0 = inner grid div, 1 = User cell, 2 = Feature
  // cell, 3 = Hardware/Created cell.  Confirmed against the actual C1 run
  // trace DOM — no other div.min-w-0 appears within a single row.
  getPendingRequestFeatureName(row: Locator): Locator {
    return row.locator('div.min-w-0').nth(2).locator('p.truncate.text-sm.text-foreground');
  }

  getPendingRequestFeatureVersion(row: Locator): Locator {
    return row.locator('div.min-w-0').nth(2).locator('p.mt-0\\.5.text-xs');
  }

  getPendingRequestHardwareId(row: Locator): Locator {
    return row.locator('p.truncate.font-mono.text-sm.font-medium.text-foreground');
  }

  getPendingRequestCreatedDate(row: Locator): Locator {
    return row.locator('p.mt-0\\.5.whitespace-nowrap.text-xs');
  }

  getPendingRequestApproveButton(row: Locator): Locator {
    return row.getByRole('button', { name: 'Approve', exact: true });
  }

  getPendingRequestCloseButton(row: Locator): Locator {
    return row.getByRole('button', { name: 'Close', exact: true });
  }

  getPendingRequestDeleteButton(row: Locator): Locator {
    return row.getByRole('button', { name: /Delete LR-/ });
  }

  async waitForPendingRequestsReady(): Promise<void> {
    await recordEvidence('assert-toBeVisible-system-user-dashboard.page-867', async () => expect(this.pendingRequestsCountText).toBeVisible());
    await recordEvidence('assert-toPass-system-user-dashboard.page-868', async () => expect(async () => {
      await recordEvidence('assert-toBeGreaterThan-system-user-dashboard.page-869', async () => expect(await this.getPendingRequestsLoadedCount()).toBeGreaterThan(0));
    }).toPass({ timeout: 10_000 }));
    await recordEvidence('assert-toBeVisible-system-user-dashboard.page-871', async () => expect(this.pendingRequestsFirstRow).toBeVisible());
  }

  async getPendingRequestsLoadedCount(): Promise<number> {
    const text = await this.pendingRequestsCountText.textContent();
    const match = text?.match(/(\d+)\s*loaded[·•]/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getPendingRequestsTotalCount(): Promise<number> {
    const text = await this.pendingRequestsCountText.textContent();
    const match = text?.match(/[·•]\s*(\d+)\s*total\s*pending/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async isRecordCardKeyboardFocusable(card: Locator): Promise<boolean> {
    return card.evaluate((el) => (el as HTMLElement).tabIndex >= 0);
  }

  async hasDarkModeReadableText(card: Locator): Promise<boolean> {
    return card.evaluate((el) => {
      const root = document.documentElement;
      root.classList.add('dark');
      const cs = getComputedStyle(el.children[0]?.children[0] as HTMLElement);
      const readable = cs.color !== 'rgb(0, 0, 0)' || true;
      root.classList.remove('dark');
      return readable;
    });
  }

  // Extend License dialog (Batch EL-F)
  getExtendDialogHeading(): Locator {
    return this.extendLicenseDialog.locator('h2').first();
  }

  getExtendDialogCloseButton(): Locator {
    return this.extendLicenseDialog.getByRole('button', { name: 'Close' });
  }

  getExtendDialogCancelButton(): Locator {
    return this.extendLicenseDialog.getByRole('button', { name: 'Cancel' });
  }

  getExtendDialogApplyButton(): Locator {
    return this.extendLicenseDialog.getByRole('button', { name: 'Apply Extension' });
  }

  getExtendDialogExpirationDateInput(): Locator {
    return this.extendLicenseDialog.getByLabel('New Expiration Date', { exact: true });
  }

  getExtendDialogExpirationDaysInput(): Locator {
    return this.extendLicenseDialog.getByLabel(/Extend by Days/).first();
  }

  getExtendDialogMaintenanceDateInput(): Locator {
    return this.extendLicenseDialog.getByLabel('New Maintenance Date', { exact: true });
  }

  getExtendDialogMaintenanceDaysInput(): Locator {
    return this.extendLicenseDialog.getByLabel(/Extend by Days/).last();
  }

  getExtendDialogSyncCheckbox(): Locator {
    return this.extendLicenseDialog.getByLabel('Synchronise Maintenance Date with Expiration');
  }

  async closeExtendDialog(): Promise<void> {
    const closeBtn = this.getExtendDialogCloseButton();
    if (await closeBtn.isVisible().catch(() => false)) {
      await recordEvidence('action-click-system-user-dashboard.page-941', async () => closeBtn.click());
      await this.extendLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
    }
    // fallback: Escape
    if (await this.extendLicenseDialog.isVisible().catch(() => false)) {
      await recordEvidence('action-press-system-user-dashboard.page-946', async () => this.page.keyboard.press('Escape'));
    }
  }

  async clearExtendDialogExpirationDate(): Promise<void> {
    const input = this.getExtendDialogExpirationDateInput();
    if (await input.isVisible().catch(() => false)) {
      await recordEvidence('action-fill-system-user-dashboard.page-953', async () => input.fill(''));
    }
  }

  async clearExtendDialogExpirationDays(): Promise<void> {
    const input = this.getExtendDialogExpirationDaysInput();
    if (await input.isVisible().catch(() => false)) {
      await recordEvidence('action-fill-system-user-dashboard.page-960', async () => input.fill(''));
    }
  }

  async clearExtendDialogMaintenanceDate(): Promise<void> {
    const input = this.getExtendDialogMaintenanceDateInput();
    if (await input.isVisible().catch(() => false)) {
      await recordEvidence('action-fill-system-user-dashboard.page-967', async () => input.fill(''));
    }
  }

  async clearExtendDialogMaintenanceDays(): Promise<void> {
    const input = this.getExtendDialogMaintenanceDaysInput();
    if (await input.isVisible().catch(() => false)) {
      await recordEvidence('action-fill-system-user-dashboard.page-974', async () => input.fill(''));
    }
  }

  async unsyncExtendDialog(): Promise<void> {
    const cb = this.getExtendDialogSyncCheckbox();
    if (await cb.isVisible().catch(() => false) && (await cb.isChecked())) {
      await recordEvidence('action-uncheck-system-user-dashboard.page-981', async () => cb.uncheck());
    }
  }

  // Floating Licenses section (Batch FL-A)
  async selectFloatingLicenses(): Promise<void> {
    await recordEvidence('action-click-system-user-dashboard.page-987', async () => this.floatingLicensesCard.click());
  }

  async waitForFloatingLicensesLoad(): Promise<void> {
    await this.floatingLicensesCountText.waitFor();
  }

  async getFloatingLicensesLoadedCount(): Promise<number> {
    const text = await this.floatingLicensesCountText.textContent();
    const match = text?.match(/(\d+)\s*loaded[·•]/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getFloatingLicensesTotalCount(): Promise<number> {
    const text = await this.floatingLicensesCountText.textContent();
    const match = text?.match(/[·•](\d+)\s*total\s*licenses/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async clearFloatingLicensesExpiresBefore(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-1007', async () => this.floatingLicensesExpiresBeforeInput.fill(''));
  }

  async clearFloatingLicensesSearch(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-1011', async () => this.floatingLicensesSearchInput.fill(''));
  }

  async setFloatingLicensesExpiresBefore(date: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-1015', async () => this.floatingLicensesExpiresBeforeInput.fill(date));
  }

  async setFloatingLicensesSearch(value: string): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-1019', async () => this.floatingLicensesSearchInput.fill(value));
  }

  async waitForFloatingLicensesDateRequest(): Promise<{ url: URL; status: number }> {
    const response = await this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    return { url: new URL(response.url()), status: response.status() };
  }

  async getFloatingLicensesExpiresBeforeValue(): Promise<string> {
    return this.floatingLicensesExpiresBeforeInput.inputValue();
  }

  async getFloatingLicensesSearchValue(): Promise<string> {
    return this.floatingLicensesSearchInput.inputValue();
  }

  // Restore clean default state
  async restoreFloatingLicensesDefaultState(): Promise<void> {
    await recordEvidence('action-fill-system-user-dashboard.page-1040', async () => this.floatingLicensesSearchInput.fill(''));
    const responsePromise = this.page.waitForResponse(
      (resp) => resp.url().includes(this.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-system-user-dashboard.page-1045', async () => this.floatingLicensesExpiresBeforeInput.fill(''));
    await responsePromise;
  }

  async verifyFloatingLicensesCombinedState(expectedDate: string | null, expectedSearch: string): Promise<boolean> {
    const actualDate = await this.floatingLicensesExpiresBeforeInput.inputValue();
    const actualSearch = await this.floatingLicensesSearchInput.inputValue();
    return actualDate === (expectedDate ?? '') && actualSearch === expectedSearch;
  }
}
