import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class UserLicenseHubPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Two-panel layout
  readonly panelGrid: Locator;
  readonly userPanel: Locator;
  readonly licensePanel: Locator;

  // Header controls (same shell as System User Dashboard)
  readonly headerBanner: Locator;
  readonly logo: Locator;
  readonly languageButton: Locator;
  readonly themeButton: Locator;
  readonly accountButton: Locator;

  // User-side controls
  readonly userSearchInput: Locator;
  readonly userFiltersButton: Locator;
  readonly addUserButton: Locator;

  // User list
  readonly userCards: Locator;
  readonly userCardNames: Locator;
  readonly userCardEmails: Locator;
  readonly userCardEditButtons: Locator;
  readonly userCardDeleteButtons: Locator;

  // User pagination
  readonly paginationSummary: Locator;
  readonly rowsPerPageLabel: Locator;
  readonly rowsPerPageCombobox: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly pageInfoText: Locator;

  // License-side controls
  readonly hardwareSearchInput: Locator;
  readonly licenseFiltersButton: Locator;
  readonly downloadButton: Locator;
  readonly emailButton: Locator;
  readonly addLicenseButton: Locator;

  readonly licenseSearchInput: Locator;

  // License cards — locate cards by Profile label presence
  readonly licenseCards: Locator;

  // Sidebar navigation
  readonly userLicenseHubLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'User & License Hub', level: 1 });
    this.mainContent = page.locator('main');
    this.footer = page.getByText('© KPIT Technologies Ltd. All rights reserved.');

    this.panelGrid = this.mainContent.locator('div.grid').filter({ has: page.getByPlaceholder('Search by Name or Email') }).first();
    this.userPanel = this.panelGrid.locator(':scope > div').nth(0).locator('div.overflow-y-auto').first();
    this.licensePanel = this.panelGrid.locator(':scope > div').nth(1).locator('div.overflow-y-auto').first();

    this.headerBanner = page.locator('header, [role="banner"]');
    this.logo = page.getByRole('img', { name: 'Logo' });
    this.languageButton = this.headerBanner.locator('button').first();
    this.themeButton = this.headerBanner.locator('button').nth(1);
    this.accountButton = this.headerBanner.locator('button').nth(2);

    this.userSearchInput = page.getByPlaceholder('Search by Name or Email');
    this.userFiltersButton = page.getByRole('button', { name: 'Filters' }).first();
    this.addUserButton = page.getByRole('button', { name: 'Add User' });

    this.userCards = this.userPanel.locator('div.bg-card.cursor-pointer').filter({ has: page.locator('h3') });
    this.userCardNames = this.userCards.locator('h3');
    this.userCardEmails = this.userCards.locator('p').first();
    this.userCardEditButtons = this.userCards.getByRole('button', { name: /Edit/i });
    this.userCardDeleteButtons = this.userCards.getByRole('button', { name: /Delete/i });

    this.paginationSummary = page.getByText(/Showing \d+–\d+ of \d+/);
    this.rowsPerPageLabel = page.getByText(/Rows per page/);
    this.rowsPerPageCombobox = page.getByRole('combobox');
    this.previousPageButton = page.getByRole('button', { name: /Previous/i });
    this.nextPageButton = page.getByRole('button', { name: /Next/i });
    this.pageInfoText = page.getByText(/Page \d+ of \d+/);

    this.hardwareSearchInput = page.getByPlaceholder('Search by Hardware ID (comma separated)');
    this.licenseFiltersButton = page.getByRole('button', { name: 'Filters' }).last();
    this.downloadButton = page.getByRole('button', { name: /Download license file/i });
    this.emailButton = page.getByRole('button', { name: /Send license file by email/i });
    this.addLicenseButton = page.getByRole('button', { name: 'Add License' });

    this.licenseSearchInput = page.getByRole('textbox', { name: /Search by Hardware ID/i });

    this.licenseCards = this.licensePanel.locator('div.bg-card').filter({ has: page.getByText('Profile', { exact: true }) });

    this.userLicenseHubLink = page.locator('[href="/users-licenses"]').or(
      page.getByRole('link').filter({ hasText: /User.*License/i })
    );
  }

  async openUserLicenseHub(): Promise<void> {
    const link = this.userLicenseHubLink.first();
    await recordEvidence('action-click-user-license-hub.page-110', async () => link.click());
    await this.page.waitForURL('**/users-licenses');
    await this.heading.waitFor();
  }

  async goto(): Promise<void> {
    await recordEvidence('action-goto-user-license-hub.page-116', async () => this.page.goto('/users-licenses'));
    await this.waitForHubLoad();
  }

  async restoreDefaultUserListState(): Promise<void> {
    await this.restoreDefaultState();
  }

  getUserCards(): Locator { return this.userCards; }
  getAddUserDialog(): Locator { return this.page.getByRole('dialog', { name: 'Add User', exact: true }); }
  getEditUserDialog(): Locator { return this.page.getByRole('dialog', { name: 'Edit User', exact: true }); }
  private userField(dialog: Locator, label: string): Locator {
    // Archived MCP snapshot (2026-11-11) shows these three comboboxes have no
    // accessible names. Their order is Language, User Group, GDPR Consent.
    const index = ['Language', 'User Group *', 'GDPR Consent'].indexOf(label);
    return index < 0 ? dialog.getByLabel(label, { exact: true }) : dialog.getByRole('combobox').nth(index);
  }
  getAddUserField(label: string): Locator { return this.userField(this.getAddUserDialog(), label); }
  getEditUserField(label: string): Locator { return this.userField(this.getEditUserDialog(), label); }
  getAddUserSaveButton(): Locator { return this.getAddUserDialog().getByRole('button', { name: 'Save', exact: true }); }
  async isAddUserSaveEnabled(): Promise<boolean> { return this.getAddUserSaveButton().isEnabled(); }
  async isEditUserSaveEnabled(): Promise<boolean> { return this.getEditUserDialog().getByRole('button', { name: 'Save', exact: true }).isEnabled(); }
  async openAddUserDialog(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-139', async () => this.addUserButton.click());
    await this.getAddUserDialog().waitFor({ state: 'visible' });
  }
  async closeAddUserDialog(): Promise<void> {
    if (await this.getAddUserDialog().isVisible()) {
      await recordEvidence('action-click-user-license-hub.page-144', async () => this.getAddUserDialog().getByRole('button', { name: 'Close', exact: true }).click());
      await this.getAddUserDialog().waitFor({ state: 'hidden' });
    }
  }
  async closeEditUserDialog(): Promise<void> {
    if (await this.getEditUserDialog().isVisible()) {
      await recordEvidence('action-click-user-license-hub.page-150', async () => this.getEditUserDialog().getByRole('button', { name: 'Close', exact: true }).click());
      await this.getEditUserDialog().waitFor({ state: 'hidden' });
    }
  }
  async cancelAddUserDialog(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-155', async () => this.getAddUserDialog().getByRole('button', { name: 'Cancel', exact: true }).click());
    await this.getAddUserDialog().waitFor({ state: 'hidden' });
  }
  async cancelEditUser(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-159', async () => this.getEditUserDialog().getByRole('button', { name: 'Cancel', exact: true }).click());
    await this.getEditUserDialog().waitFor({ state: 'hidden' });
  }
  async dismissAddUserDialogViaEscape(): Promise<void> { await recordEvidence('action-press-user-license-hub.page-162', async () => this.page.keyboard.press('Escape')); }
  async dismissEditUserViaEscape(): Promise<void> { await recordEvidence('action-press-user-license-hub.page-163', async () => this.page.keyboard.press('Escape')); }
  async getAddUserDialogHeading(): Promise<string> { return this.getAddUserDialog().getByRole('heading').innerText(); }
  async getEditUserDialogHeading(): Promise<string> { return this.getEditUserDialog().getByRole('heading').innerText(); }
  private async dialogDescription(dialog: Locator): Promise<string> {
    return dialog.evaluate(el => (el.getAttribute('aria-describedby') || '').split(/\s+/)
      .map(id => document.getElementById(id)?.textContent?.trim() || '').filter(Boolean).join(' '));
  }
  async getAddUserDialogDescription(): Promise<string> { return this.dialogDescription(this.getAddUserDialog()); }
  async getEditUserDialogDescription(): Promise<string> { return this.dialogDescription(this.getEditUserDialog()); }
  async fillAddUserFirstName(value: string): Promise<void> { await recordEvidence('action-fill-user-license-hub.page-172', async () => this.getAddUserField('First Name *').fill(value)); }
  async fillAddUserLastName(value: string): Promise<void> { await recordEvidence('action-fill-user-license-hub.page-173', async () => this.getAddUserField('Last Name *').fill(value)); }
  async fillAddUserEmail(value: string): Promise<void> { await recordEvidence('action-fill-user-license-hub.page-174', async () => this.getAddUserField('Email *').fill(value)); }
  async fillEditUserFirstName(value: string): Promise<void> { await recordEvidence('action-fill-user-license-hub.page-175', async () => this.getEditUserField('First Name *').fill(value)); }
  async fillEditUserLastName(value: string): Promise<void> { await recordEvidence('action-fill-user-license-hub.page-176', async () => this.getEditUserField('Last Name *').fill(value)); }
  async getEditUserFieldValue(label: string): Promise<string> { return this.getEditUserField(label).inputValue(); }
  // Archived ULH-F inspection identifies an icon-only edit button; do not invent an accessible name.
  getEditButtonForFirstVisibleUser(): Locator {
    return this.userCards.first().locator('button:not([aria-label])').filter({ has: this.page.locator('svg') })
      .filter({ hasNotText: /.+/ }).first();
  }
  async openEditUserDialogForFirstVisibleUser(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-184', async () => this.getEditButtonForFirstVisibleUser().click());
    await this.getEditUserDialog().waitFor({ state: 'visible' });
  }
  private async userOptions(dialog: Locator, label: string): Promise<string[]> {
    const field = this.userField(dialog, label);
    if (await field.evaluate(el => el.tagName === 'SELECT')) return field.locator('option').allTextContents();
    await recordEvidence('action-click-user-license-hub.page-190', async () => field.click());
    const list = this.page.getByRole('listbox');
    await list.waitFor({ state: 'visible' });
    const values = await list.getByRole('option').allTextContents();
    await recordEvidence('action-press-user-license-hub.page-194', async () => this.page.keyboard.press('Escape'));
    return values.map(value => value.trim());
  }
  private async selectedUserOption(dialog: Locator, label: string): Promise<string> {
    const field = this.userField(dialog, label);
    return field.evaluate(el => el instanceof HTMLSelectElement
      ? el.selectedOptions[0]?.textContent?.trim() || '' : el.textContent?.trim() || '');
  }
  async getAddUserGroupOptions(): Promise<string[]> { return this.userOptions(this.getAddUserDialog(), 'User Group *'); }
  async getAddUserLanguageOptions(): Promise<string[]> { return this.userOptions(this.getAddUserDialog(), 'Language'); }
  async getEditUserGroupOptions(): Promise<string[]> { return this.userOptions(this.getEditUserDialog(), 'User Group *'); }
  async getEditUserLanguageOptions(): Promise<string[]> { return this.userOptions(this.getEditUserDialog(), 'Language'); }
  async getEditUserGdprOptions(): Promise<string[]> { return this.userOptions(this.getEditUserDialog(), 'GDPR Consent'); }
  async getAddUserGroupSelectedText(): Promise<string> { return this.selectedUserOption(this.getAddUserDialog(), 'User Group *'); }
  async getAddUserLanguageSelectedText(): Promise<string> { return this.selectedUserOption(this.getAddUserDialog(), 'Language'); }
  async getEditUserGroupSelectedText(): Promise<string> { return this.selectedUserOption(this.getEditUserDialog(), 'User Group *'); }
  async getEditUserLanguageSelectedText(): Promise<string> { return this.selectedUserOption(this.getEditUserDialog(), 'Language'); }
  async getEditUserGdprSelectedText(): Promise<string> { return this.selectedUserOption(this.getEditUserDialog(), 'GDPR Consent'); }
  async selectAddUserGroup(name: string): Promise<void> {
    const field = this.getAddUserField('User Group *');
    if (await field.evaluate(el => el.tagName === 'SELECT')) { await recordEvidence('action-selectOption-user-license-hub.page-214', async () => field.selectOption({ label: name })); return; }
    await recordEvidence('action-click-user-license-hub.page-215', async () => field.click());
    await recordEvidence('action-click-user-license-hub.page-216', async () => this.page.getByRole('listbox').getByRole('option', { name, exact: true }).click());
  }
  async prepareRuntimeUserForLicenseCreation(): Promise<void> {
    // Select runtime data only; creating a user would require a separate mutation contract.
    await recordEvidence('assert-toBeVisible-user-license-hub.page-220', async () => expect(this.userCards.first()).toBeVisible());
    await this.selectFirstVisibleUser();
    await recordEvidence('assert-toBeEnabled-user-license-hub.page-222', async () => expect(this.addLicenseButton).toBeEnabled());
  }

  async waitForHubLoad(): Promise<void> {
    await this.heading.waitFor();
    await this.mainContent.waitFor();
    await this.userSearchInput.waitFor();
    await this.hardwareSearchInput.waitFor();
    await this.paginationSummary.waitFor();
    // Initial Hub filters may issue a second fetch; wait for bootstrap traffic to settle.
    await this.page.waitForLoadState('networkidle');
    await expect(this.licensePanel.locator('.animate-pulse')).toHaveCount(0);
  }

  async getVisibleUserCount(): Promise<number> {
    return this.userCards.count();
  }

  async getVisibleLicenseCount(): Promise<number> {
    return this.licenseCards.count();
  }

  async getPaginationState(): Promise<{
    start: number;
    end: number;
    total: number;
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
  }> {
    const summaryText = await this.paginationSummary.textContent();
    const pageText = await this.pageInfoText.textContent();

    const showingMatch = summaryText?.match(/Showing\s+(\d+)[–-](\d+)\s+of\s+(\d+)/);
    const pageMatch = pageText?.match(/Page\s+(\d+)\s+of\s+(\d+)/);

    const start = showingMatch ? parseInt(showingMatch[1], 10) : 0;
    const end = showingMatch ? parseInt(showingMatch[2], 10) : 0;
    const total = showingMatch ? parseInt(showingMatch[3], 10) : 0;
    const currentPage = pageMatch ? parseInt(pageMatch[1], 10) : 0;
    const totalPages = pageMatch ? parseInt(pageMatch[2], 10) : 0;

    const rppText = await this.rowsPerPageCombobox.textContent();
    const rppMatch = rppText?.match(/(\d+)/);
    const rowsPerPage = rppMatch ? parseInt(rppMatch[1], 10) : 20;

    return { start, end, total, currentPage, totalPages, rowsPerPage };
  }

  async verifyPaginationConsistency(): Promise<void> {
    const state = await this.getPaginationState();

    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub.page-270', async () => expect(state.start).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub.page-271', async () => expect(state.end).toBeGreaterThanOrEqual(state.start));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub.page-272', async () => expect(state.end).toBeLessThanOrEqual(state.total));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub.page-273', async () => expect(state.currentPage).toBeLessThanOrEqual(state.totalPages));

    const expectedEnd = Math.min(state.currentPage * state.rowsPerPage, state.total);
    await recordEvidence('assert-toBe-user-license-hub.page-276', async () => expect(state.end).toBe(expectedEnd));

    const expectedStart = (state.currentPage - 1) * state.rowsPerPage + 1;
    await recordEvidence('assert-toBe-user-license-hub.page-279', async () => expect(state.start).toBe(expectedStart));
  }

  async getSelectedUserName(): Promise<string> {
    const assignedToText = this.licenseCards.first().getByText(/Assigned to/);
    if (!(await assignedToText.isVisible().catch(() => false))) {
      return '';
    }
    const parent = assignedToText.locator('..');
    const nameEl = parent.locator('p, span, h3, h4').first();
    return (await nameEl.textContent())?.trim() ?? '';
  }

  async restoreDefaultState(): Promise<void> {
    const searchVal = await this.userSearchInput.inputValue();
    if (searchVal) {
      await recordEvidence('action-fill-user-license-hub.page-295', async () => this.userSearchInput.fill(''));
    }
    const hwVal = await this.hardwareSearchInput.inputValue();
    if (hwVal) {
      await recordEvidence('action-fill-user-license-hub.page-299', async () => this.hardwareSearchInput.fill(''));
    }
  }

  // ─── ULH-B: Selection Methods ────────────────────────────────────────

  /**
   * Check whether the user card at the given index has the green-ring
   * selected box-shadow (rgb(188,255,71) 2px ring).
   */
  async isUserCardSelected(index: number): Promise<boolean> {
    const card = await this.getUserCardContainer(index);
    const boxShadow = await card.evaluate(
      (el) => getComputedStyle(el).boxShadow
    );
    return boxShadow.includes('188, 255, 71') || boxShadow.includes('188,255,71');
  }

  /**
   * Find and return the index of the currently selected user card
   * (0-based). Returns -1 if none selected.
   */
  async getSelectedUserCardIndex(): Promise<number> {
    return this.page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          if (el.className && el.className.startsWith('rounded-lg border')) break;
          el = el.parentElement;
        }
        if (el && getComputedStyle(el).boxShadow.includes('188, 255, 71')) return i;
      }
      return -1;
    });
  }

  /**
   * Returns the Locator for the outer user card container (the
   * `.rounded-lg.border...` element) at the given 0-based index.
   */
  async getUserCardContainer(index: number): Promise<Locator> {
    return this.userCards.nth(index);
  }

  /**
   * Click a user card by its 0-based index in the current DOM order.
   * Returns the card's h3 text for verification.
   */
  async selectUserByIndex(index: number): Promise<string> {
    const card = await this.getUserCardContainer(index);
    const name = await card.locator('h3').textContent();
    await recordEvidence('action-click-user-license-hub.page-352', async () => card.click());
    return name?.trim() ?? '';
  }

  /**
   * Get the license-count badge text from the user card at the given index.
   * Returns the number parsed from "N License(s)" text.
   */
  async getUserCardBadgeCount(index: number): Promise<number> {
    const card = await this.getUserCardContainer(index);
    const badgeText = await card.evaluate((el) => {
      const all = el.querySelectorAll('*');
      for (const child of all) {
        const text = child.textContent?.trim() ?? '';
        const m = text.match(/^(\d+)\s*Licenses?$/i);
        if (m) return text;
      }
      return '';
    });
    const match = badgeText.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // ─── ULH-B: License Panel Synchronization ────────────────────────────

  /**
   * Asserts that the number of visible license cards matches the
   * selected user's badge count.
   */
  async verifyLicenseCountMatchesBadge(selectedIndex: number): Promise<void> {
    const badgeCount = await this.getUserCardBadgeCount(selectedIndex);
    const licenseCount = await this.getVisibleLicenseCount();
    await recordEvidence('assert-toBe-user-license-hub.page-384', async () => expect(licenseCount).toBe(badgeCount));
  }

  /**
   * Returns an array of object descriptors for visible license cards:
   * { profile, role, maintenance, expiration, hardwareId, assignedToName }
   * Each field is the trimmed text or null.
   */
  async getLicensePanelRuntimeData(): Promise<
    Array<{
      profile: string | null;
      role: string | null;
      maintenance: string | null;
      expiration: string | null;
      hardwareId: string | null;
      assignedToName: string | null;
    }>
  > {
    return this.licenseCards.evaluateAll(cards => cards.map(card => {
      const paragraphs = Array.from(card.querySelectorAll('p'));
      const value = (label: string) => paragraphs.find(p => p.textContent?.trim() === label)?.nextElementSibling?.textContent?.trim() ?? null;
      return { profile: value('Profile'), role: value('Role'), maintenance: value('Maintenance'),
        expiration: value('Expiration'), hardwareId: value('Hardware ID'), assignedToName: value('Assigned to') };
    }));
  }

  /**
   * Verify the assigned-to name on every visible license card
   * matches the selected user's h3 text.
   */
  async verifyAssignedToMatchesSelection(selectedIndex: number): Promise<void> {
    const nameEl = await this.userCardNames.nth(selectedIndex);
    const userName = (await nameEl.textContent())?.trim() ?? '';
    const licenses = await this.getLicensePanelRuntimeData();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub.page-444', async () => expect(licenses.length).toBeGreaterThan(0));
    for (const lic of licenses) {
      await recordEvidence('assert-toBe-user-license-hub.page-446', async () => expect(lic.assignedToName).toBe(userName));
    }
  }

  /**
   * Verify the license toolbar buttons are enabled (not disabled)
   * when a user is selected.
   */
  async verifyToolbarButtonsEnabled(): Promise<void> {
    await recordEvidence('assert-toBeEnabled-user-license-hub.page-455', async () => expect(this.downloadButton).toBeEnabled());
    await recordEvidence('assert-toBeEnabled-user-license-hub.page-456', async () => expect(this.emailButton).toBeEnabled());
    await recordEvidence('assert-toBeEnabled-user-license-hub.page-457', async () => expect(this.addLicenseButton).toBeEnabled());
  }

  /**
   * Verify the license toolbar buttons are disabled when no user
   * has been selected (or when the UI decides they should be).
   */
  async verifyToolbarButtonsDisabled(): Promise<void> {
    await recordEvidence('assert-toBeDisabled-user-license-hub.page-465', async () => expect(this.downloadButton).toBeDisabled());
    await recordEvidence('assert-toBeDisabled-user-license-hub.page-466', async () => expect(this.emailButton).toBeDisabled());
    await recordEvidence('assert-toBeDisabled-user-license-hub.page-467', async () => expect(this.addLicenseButton).toBeDisabled());
  }

  // ─── ULH-B: Scrolling Methods ────────────────────────────────────────

  /**
   * Scroll the user panel by the given pixel amount.
   * The container is the inner overflow-y-auto div inside the user panel.
   */
  async scrollUserPanel(amount: number): Promise<void> {
    await recordEvidence('action-evaluate-user-license-hub.page-478', async () => this.page.evaluate((px) => {
      const scrollEl = [...document.querySelectorAll('main div')].find(
        (el) =>
          el.className &&
          el.className.includes('overflow-y-auto') &&
          el.className.includes('space-y-3')
      );
      if (scrollEl) {
        scrollEl.scrollTop = Math.max(0, scrollEl.scrollTop + px);
      }
    }, amount));
  }

  /**
   * Scroll the license panel by the given pixel amount.
   */
  async scrollLicensePanel(amount: number): Promise<void> {
    await recordEvidence('action-evaluate-user-license-hub.page-495', async () => this.page.evaluate((px) => {
      const scrollEl = [...document.querySelectorAll('main div')].find(
        (el) =>
          el.className &&
          el.className.includes('overflow-y-auto') &&
          el.className.includes('gap-3')
      );
      if (scrollEl) {
        scrollEl.scrollTop = Math.max(0, scrollEl.scrollTop + px);
      }
    }, amount));
  }

  /**
   * Get the current scrollTop of the user panel.
   */
  async getUserPanelScrollTop(): Promise<number> {
    return this.page.evaluate(() => {
      const scrollEl = [...document.querySelectorAll('main div')].find(
        (el) =>
          el.className &&
          el.className.includes('overflow-y-auto') &&
          el.className.includes('space-y-3')
      );
      return scrollEl ? scrollEl.scrollTop : 0;
    });
  }

  /**
   * Get the current scrollTop of the license panel.
   */
  async getLicensePanelScrollTop(): Promise<number> {
    return this.page.evaluate(() => {
      const scrollEl = [...document.querySelectorAll('main div')].find(
        (el) =>
          el.className &&
          el.className.includes('overflow-y-auto') &&
          el.className.includes('gap-3')
      );
      return scrollEl ? scrollEl.scrollTop : 0;
    });
  }

  // ─── ULH-B: Accessibility Checks ────────────────────────────────────

  /**
   * Check whether any user card has aria-selected set.
   */
  async anyCardHasAriaSelected(): Promise<boolean> {
    return this.page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          if (el.getAttribute('aria-selected') !== null) return true;
          el = el.parentElement;
        }
      }
      return false;
    });
  }

  /**
   * Check whether any user card has role="option" or role="listitem".
   */
  async anyCardHasSemanticRole(): Promise<boolean> {
    return this.page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          const role = el.getAttribute('role');
          if (role === 'option' || role === 'listitem' || role === 'button')
            return true;
          el = el.parentElement;
        }
      }
      return false;
    });
  }

  /**
   * Check whether any user card container has a non-null tabIndex.
   */
  async anyCardHasTabIndex(): Promise<boolean> {
    return this.page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          if (el.getAttribute('tabindex') !== null) return true;
          el = el.parentElement;
        }
      }
      return false;
    });
  }

  /**
   * Checks whether selection is only communicated via color — i.e.,
   * no aria-selected, no role, no data-state. Returns true if selection
   * is color-only (accessibility gap).
   */
  async isSelectionColorOnly(): Promise<boolean> {
    const hasAriaSel = await this.anyCardHasAriaSelected();
    const hasRole = await this.anyCardHasSemanticRole();
    return !hasAriaSel && !hasRole;
  }

  // ─── ULH-C: User Search & Filter Methods ─────────────────────────────

  /**
   * Type into the user search input. Each keystroke triggers an
   * API-side GET request (no debounce).
   */
  async setUserSearch(value: string): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-610', async () => this.userSearchInput.fill(value));
  }

  /**
   * Clear the user search input. Setting to empty triggers a
   * full-list reload.
   */
  async clearUserSearch(): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-618', async () => this.userSearchInput.fill(''));
  }

  /**
   * Read the current value of the user search input.
   */
  async getSearchInputValue(): Promise<string> {
    return this.userSearchInput.inputValue();
  }

  /**
   * Return the user search input locator for direct assertions.
   */
  getUserSearchInputLocator(): Locator {
    return this.userSearchInput;
  }

  /**
   * Click the Filters button to open the filter dialog.
   */
  async openUserFilters(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-639', async () => this.userFiltersButton.click());
  }

  /**
   * Dismiss the filter dialog via Escape key.
   */
  async closeUserFilters(): Promise<void> {
    await recordEvidence('action-press-user-license-hub.page-646', async () => this.page.keyboard.press('Escape'));
  }

  /**
   * Return the text content of the filter dialog heading.
   */
  async getFilterDialogHeading(): Promise<string> {
    const heading = this.page.getByRole('dialog').getByRole('heading', { level: 4 });
    return (await heading.textContent())?.trim() ?? '';
  }

  /**
   * Return the filter dialog locator.
   */
  getFilterDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  /**
   * Check whether the filter dialog is currently visible.
   */
  async isFilterDialogVisible(): Promise<boolean> {
    return this.getFilterDialog().isVisible().catch(() => false);
  }

  /**
   * Check the aria-expanded state on the Filters button.
   */
  async areFiltersExpanded(): Promise<boolean> {
    const expanded = await this.userFiltersButton.getAttribute('aria-expanded');
    return expanded === 'true';
  }

  /**
   * Return the text of all visible group options inside the
   * filter dialog's listbox.
   */
  async getFirstVisibleUserGroup(): Promise<string> {
    const text = await this.userCards.first().innerText();
    return text.match(/Group:\s*([^\n]+)/)?.[1]?.trim() ?? '';
  }

  async getGroupOptionTexts(): Promise<string[]> {
    const listbox = this.getFilterDialog().getByRole('listbox', { name: 'Suggestions' });
    const options = listbox.getByRole('option');
    return options.allTextContents();
  }

  /**
   * Select a group option by its displayed text inside the filter dialog.
   */
  async selectGroupOption(groupName: string): Promise<void> {
    const listbox = this.getFilterDialog().getByRole('listbox', { name: 'Suggestions' });
    const option = listbox.getByRole('option', { name: groupName });
    await recordEvidence('action-click-user-license-hub.page-695', async () => option.click());
  }

  /**
   * Select the "All Groups" option inside the filter dialog.
   */
  async selectAllGroups(): Promise<void> {
    await this.selectGroupOption('All Groups');
  }

  /**
   * Click the Select button inside the filter dialog to apply the chosen group.
   */
  async clickSelectButton(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-709', async () => this.getFilterDialog().getByRole('button', { name: 'Select' }).click());
  }

  /**
   * Click the Clear button inside the filter dialog.
   */
  async clickClearButton(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-716', async () => this.getFilterDialog().getByRole('button', { name: 'Clear' }).click());
  }

  /**
   * Return the badge count from the Filters button, or 0 if no badge.
   * Button text "Filters" → 0; "Filters 1" → 1; "Filters N" → N.
   */
  async getFiltersBadgeCount(): Promise<number> {
    const text = await this.userFiltersButton.textContent();
    const match = text?.match(/Filters\s*(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Return the pagination summary text, e.g. "Showing 1–20 of 1823".
   */
  async getPaginationSummaryText(): Promise<string> {
    return (await this.paginationSummary.textContent())?.trim() ?? '';
  }

  /**
   * Return the h3 names from all visible user cards.
   */
  async getVisibleUserCardNames(): Promise<string[]> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('.animate-pulse')).toHaveCount(0);
    return this.userCardNames.allTextContents();
  }

  /**
   * Wait for the user-list GET request to settle after a search
   * or filter action. Returns the response status.
   */
  async waitForUserListUpdate(): Promise<number> {
    const response = await this.page.waitForResponse(
      (resp) =>
        resp.url().includes('/api/users/f') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    return response.status();
  }

  // ─── ULH-D: Pagination Navigation & Structure ───────────────────────

  /**
   * Parse the pagination summary text into numeric parts.
   * Returns { start, end, total } from "Showing X–Y of Z".
   */
  async parsePaginationSummary(): Promise<{ start: number; end: number; total: number }> {
    const text = await this.getPaginationSummaryText();
    const match = text.match(/Showing\s+(\d+)[–-]\s*(\d+)\s+of\s+(\d+)/);
    return {
      start: match ? parseInt(match[1], 10) : 0,
      end: match ? parseInt(match[2], 10) : 0,
      total: match ? parseInt(match[3], 10) : 0,
    };
  }

  /**
   * Return the page summary text, e.g. "Page 1 of 92".
   */
  async getPageSummaryText(): Promise<string> {
    return (await this.pageInfoText.textContent())?.trim() ?? '';
  }

  /**
   * Parse the "Page N of M" text into numeric parts.
   * Returns { currentPage, totalPages } where UI page is 1-based.
   */
  async parsePageSummary(): Promise<{ currentPage: number; totalPages: number }> {
    const text = await this.getPageSummaryText();
    const match = text.match(/Page\s+(\d+)\s+of\s+(\d+)/);
    return {
      currentPage: match ? parseInt(match[1], 10) : 0,
      totalPages: match ? parseInt(match[2], 10) : 0,
    };
  }

  /**
   * Return the currently selected rows-per-page value as a number.
   */
  async getCurrentPageSize(): Promise<number> {
    const text = await this.rowsPerPageCombobox.textContent();
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  /**
   * Discover available rows-per-page options dynamically.
   * Opens the combobox, reads all option elements, then closes it.
   * Returns an array of numeric option values (e.g. [10, 20, 25]).
   */
  async getAvailablePageSizes(): Promise<number[]> {
    await recordEvidence('action-click-user-license-hub.page-807', async () => this.rowsPerPageCombobox.click());
    const listbox = this.page.getByRole('listbox');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });
    const options = listbox.getByRole('option');
    const texts = await options.allTextContents();
    await recordEvidence('action-press-user-license-hub.page-812', async () => this.page.keyboard.press('Escape'));
    return texts
      .map((t) => parseInt(t.trim(), 10))
      .filter((n) => !Number.isNaN(n) && n > 0);
  }

  /**
   * Wait for a new GET /api/users/f response, optionally matching
   * a specific page or size parameter change.
   */
  async waitForUserListResponse(expectedPage?: number, expectedSize?: number): Promise<number> {
    const response = await this.page.waitForResponse(
      (resp) => {
        if (!resp.url().includes('/api/users/f') || resp.request().method() !== 'GET')
          return false;
        if (expectedPage !== undefined || expectedSize !== undefined) {
          const url = new URL(resp.url());
          if (expectedPage !== undefined && url.searchParams.get('page') !== String(expectedPage))
            return false;
          if (expectedSize !== undefined && url.searchParams.get('size') !== String(expectedSize))
            return false;
        }
        return true;
      },
      { timeout: 15000 }
    );
    return response.status();
  }

  /**
   * Click Next, wait for the response, and return the new (1-based) page number.
   */
  async goToNextUserPage(): Promise<number> {
    const { currentPage } = await this.parsePageSummary();
    const respPromise = this.waitForUserListResponse(currentPage);
    await recordEvidence('action-click-user-license-hub.page-847', async () => this.nextPageButton.click());
    await respPromise;
    const { currentPage: newPage } = await this.parsePageSummary();
    return newPage;
  }

  /**
   * Click Previous, wait for the response, and return the new (1-based) page number.
   */
  async goToPreviousUserPage(): Promise<number> {
    const { currentPage } = await this.parsePageSummary();
    const expectedApiPage = currentPage - 2;
    const respPromise = this.waitForUserListResponse(
      expectedApiPage >= 0 ? expectedApiPage : undefined
    );
    await recordEvidence('action-click-user-license-hub.page-862', async () => this.previousPageButton.click());
    await respPromise;
    const { currentPage: newPage } = await this.parsePageSummary();
    return newPage;
  }

  /**
   * Return whether the Previous button is enabled.
   */
  async isPreviousEnabled(): Promise<boolean> {
    return this.previousPageButton.isEnabled();
  }

  /**
   * Return whether the Next button is enabled.
   */
  async isNextEnabled(): Promise<boolean> {
    return this.nextPageButton.isEnabled();
  }

  /**
   * Return the count of visible user cards on the current page.
   */
  async getUserPageCount(): Promise<number> {
    return this.userCards.count();
  }

  /**
   * Return the h3 text contents from all visible user cards.
   */
  async getVisibleUserCardHeadings(): Promise<string[]> {
    return this.userCardNames.allTextContents();
  }

  /**
   * Return the "Assigned to" name text from the first license card.
   */
  async getLicensePanelAssignedTo(): Promise<string> {
    return this.getSelectedUserName();
  }

  /**
   * Assert cross-field pagination consistency: end-start+1 matches
   * visible card count, end <= total, start >= 1.
   */
  async verifyPaginationConsistencyDynamic(): Promise<void> {
    const { start, end, total } = await this.parsePaginationSummary();
    const cardCount = await this.getUserPageCount();
    const { currentPage, totalPages } = await this.parsePageSummary();
    const pageSize = await this.getCurrentPageSize();

    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub.page-913', async () => expect(start).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub.page-914', async () => expect(end).toBeGreaterThanOrEqual(start));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub.page-915', async () => expect(end).toBeLessThanOrEqual(total));
    await recordEvidence('assert-toBe-user-license-hub.page-916', async () => expect(cardCount).toBe(end - start + 1));

    const expectedTotalPages = Math.ceil(total / pageSize);
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub.page-919', async () => expect(Math.abs(totalPages - expectedTotalPages)).toBeLessThanOrEqual(1));

    const expectedStart = (currentPage - 1) * pageSize + 1;
    await recordEvidence('assert-toBe-user-license-hub.page-922', async () => expect(start).toBe(expectedStart));

    const expectedEnd = Math.min(currentPage * pageSize, total);
    await recordEvidence('assert-toBe-user-license-hub.page-925', async () => expect(end).toBe(expectedEnd));
  }

  /**
   * Select a given rows-per-page size from the combobox.
   * Opens the listbox, clicks the matching option, waits for the response.
   */
  async setDynamicUserPageSize(size: number): Promise<void> {
    const currentSize = await this.getCurrentPageSize();
    if (currentSize === size) return;

    await recordEvidence('action-click-user-license-hub.page-936', async () => this.rowsPerPageCombobox.click());
    const listbox = this.page.getByRole('listbox');
    await listbox.waitFor({ state: 'visible', timeout: 5000 });
    const option = listbox.getByRole('option', { name: String(size), exact: true });
    await recordEvidence('action-click-user-license-hub.page-941', async () => option.click());
    await expect.poll(() => this.getCurrentPageSize()).toBe(size);
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('.animate-pulse')).toHaveCount(0);
    await expect.poll(() => this.parsePageSummary()).toMatchObject({ currentPage: 1 });
  }

  /**
   * Restore the default/original page size and wait for the response.
   */
  async restoreDefaultUserPageSize(originalSize: number): Promise<void> {
    const currentSize = await this.getCurrentPageSize();
    if (currentSize === originalSize) return;
    await this.setDynamicUserPageSize(originalSize);
  }

  /**
   * Navigate to the first user page. If not on page 1, clicks Previous
   * repeatedly until page 1 is reached.
   */
  async goToFirstUserPage(): Promise<void> {
    let { currentPage } = await this.parsePageSummary();
    while (currentPage > 1) {
      const expectedPage = currentPage - 1;
      await recordEvidence('action-click-user-license-hub.page-962', async () => this.previousPageButton.click());
      await expect.poll(() => this.parsePageSummary()).toMatchObject({ currentPage: expectedPage });
      await this.page.waitForLoadState('networkidle');
      currentPage = (await this.parsePageSummary()).currentPage;
    }
  }

  /**
   * Restore pagination to default state: page 1, original size 20.
   */
  async restoreDefaultPaginationState(): Promise<void> {
    await this.restoreDefaultUserPageSize(20);
    await this.goToFirstUserPage();
  }

  // ─── Delete User ────────────────────────────────────────────

  /**
   * Return all "Delete user" buttons visible on the current page.
   */
  getDeleteUserButtons(): Locator {
    return this.userCardDeleteButtons;
  }

  /**
   * Return the "Delete user" button for the first visible user card.
   */
  getDeleteUserButtonForFirstCard(): Locator {
    return this.userCardDeleteButtons.first();
  }

  /**
   * Return the name text (h3) of the first visible user card.
   */
  async getFirstVisibleUserName(): Promise<string> {
    const names = await this.getVisibleUserCardHeadings();
    return names[0] || '';
  }

  /**
   * Return all visible user name texts from user cards.
   */
  async getAllVisibleUserNames(): Promise<string[]> {
    return this.userCardNames.allTextContents();
  }

  /**
   * Extract the user ID from the first visible user card's API data.
   * Reads the userId from the most recent user list API response.
   */
  async getFirstVisibleUserId(): Promise<number | null> {
    const response = await this.page.waitForResponse(
      resp => resp.url().includes('/api/users/f') && resp.status() === 200,
      { timeout: 10000 }
    );
    const body = await response.json();
    return body?.content?.[0]?.id ?? body?.[0]?.id ?? null;
  }

  /**
   * Return the total user count from the "Showing X-Y of Z" pagination text.
   */
  async getTotalUserCount(): Promise<number> {
    const { total } = await this.parsePaginationSummary();
    return total;
  }

  /**
   * Return the total number of pages from the "Page X of Y" text.
   */
  async getTotalPages(): Promise<number> {
    const { totalPages } = await this.parsePageSummary();
    return totalPages;
  }

  /**
   * Navigate to a specific page by clicking Next until the target page is reached.
   * Assumes we are currently at or before the target page.
   */
  async goToPage(targetPage: number): Promise<void> {
    let { currentPage } = await this.parsePageSummary();
    while (currentPage < targetPage) {
      const respPromise = this.waitForUserListResponse(currentPage);
      await recordEvidence('action-click-user-license-hub.page-1044', async () => this.nextPageButton.click());
      await respPromise;
      currentPage = (await this.parsePageSummary()).currentPage;
    }
  }

  // ─── License Search & Filters ──────────────────────────────

  getVisibleLicenseCards(): Locator {
    return this.licenseCards;
  }

  async setLicenseSearch(value: string): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-1057', async () => this.licenseSearchInput.fill(value));
  }

  async clearLicenseSearch(): Promise<void> {
    await recordEvidence('action-clear-user-license-hub.page-1061', async () => this.licenseSearchInput.clear());
  }

  async getFirstVisibleHardwareId(): Promise<string> {
    const cards = this.getVisibleLicenseCards();
    const firstCard = cards.first();
    const hwIdEl = firstCard.locator('p').filter({ hasText: 'Hardware ID' }).locator('..').locator('> :last-child').first();
    return (await hwIdEl.textContent())?.trim() || '';
  }

  async getAllVisibleHardwareIds(): Promise<string[]> {
    const cards = this.getVisibleLicenseCards();
    const count = await cards.count();
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
      const hwIdEl = cards.nth(i).locator('p').filter({ hasText: 'Hardware ID' }).locator('..').locator('> :last-child').first();
      const id = (await hwIdEl.textContent())?.trim();
      if (id) ids.push(id);
    }
    return ids;
  }

  async getAllVisibleAssignedUsers(): Promise<string[]> {
    const licenses = await this.getLicensePanelRuntimeData();
    return licenses.map(license => license.assignedToName ?? '');
  }

  getLicenseDeleteButtons(): Locator {
    return this.licensePanel.getByRole('button', { name: 'Delete license' });
  }

  async openLicenseFilters(): Promise<void> {
    const expanded = await this.licenseFiltersButton.getAttribute('aria-expanded');
    if (expanded !== 'true') {
      await recordEvidence('action-click-user-license-hub.page-1102', async () => this.licenseFiltersButton.click());
    }
  }

  async closeLicenseFilters(): Promise<void> {
    const dialog = this.getLicenseFilterDialog();
    if (await dialog.isVisible()) {
      await recordEvidence('action-press-user-license-hub.page-1109', async () => this.page.keyboard.press('Escape'));
    }
  }

  async dismissLicenseFiltersViaEscape(): Promise<void> {
    await recordEvidence('action-press-user-license-hub.page-1114', async () => this.page.keyboard.press('Escape'));
  }

  getLicenseFilterDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  async restoreLicensePanelDefaultState(): Promise<void> {
    await this.clearLicenseSearch();
    const expanded = await this.licenseFiltersButton.getAttribute('aria-expanded');
    if (expanded === 'true') {
      await this.closeLicenseFilters();
    }
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('.animate-pulse')).toHaveCount(0);
  }

  // ─── Download License ──────────────────────────────────────

  async selectFirstVisibleUser(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-1133', async () => this.userCards.first().click());
    await expect.poll(() => this.getSelectedUserCardIndex()).toBe(0);
  }

  async applyRuntimeProfileForDownload(): Promise<void> {
    const availableLicenses = await this.getLicensePanelRuntimeData();
    const runtimeProfile = availableLicenses.find(license => license.profile)?.profile;
    expect(runtimeProfile, 'A populated runtime profile is required').toBeTruthy();
    await this.openLicenseFilters();
    const dialog = this.getLicenseFilterDialog();
    await recordEvidence('select-runtime-license-profile', async () => dialog.getByRole('option', { name: runtimeProfile!, exact: true }).click());
    const response = this.waitForUserListResponse();
    await recordEvidence('apply-runtime-license-profile', async () => dialog.getByRole('button', { name: 'Select', exact: true }).click());
    await response;
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('.animate-pulse')).toHaveCount(0);
  }

  async applySpecificProfileWithoutUserSelection(): Promise<void> {
    await this.openLicenseFilters();
    const dialog = this.getLicenseFilterDialog();
    const options = dialog.getByRole('option');
    const nonDefault = options.filter({ hasNotText: 'All Profiles' }).first();
    await recordEvidence('action-click-user-license-hub.page-1154', async () => nonDefault.click());
    await recordEvidence('action-click-user-license-hub.page-1155', async () => dialog.getByRole('button', { name: 'Select' }).click({ force: true }));
    await this.waitForUserListResponse();
  }

  async restoreAllProfilesFilter(): Promise<void> {
    await this.openLicenseFilters();
    const dialog = this.getLicenseFilterDialog();
    await recordEvidence('action-click-user-license-hub.page-1162', async () => dialog.getByRole('option', { name: 'All Profiles' }).click());
    await recordEvidence('action-click-user-license-hub.page-1163', async () => dialog.getByRole('button', { name: 'Select' }).click());
    await expect(dialog).toBeHidden();
    await this.page.waitForLoadState('networkidle');
  }

  async triggerDownloadAndCapture(
    page: import('@playwright/test').Page,
    tmpDir: string
  ): Promise<{ suggestedFilename: string; filePath: string }> {
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await recordEvidence('action-click-user-license-hub.page-1172', async () => this.downloadButton.click());
    const download = await downloadPromise;
    const suggestedFilename = download.suggestedFilename();
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(tmpDir, suggestedFilename);
    await download.saveAs(filePath);
    return { suggestedFilename, filePath };
  }

  // ─── Add License ───────────────────────────────────────────

  async openAddLicenseDialog(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-1185', async () => this.addLicenseButton.click());
    await this.page.waitForTimeout(500);
  }

  getAddLicenseDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  async closeAddLicenseDialog(): Promise<void> {
    const dialog = this.getAddLicenseDialog();
    if (await this.page.getByRole('listbox').isVisible().catch(() => false)) {
      await this.page.keyboard.press('Escape');
    }
    if (await dialog.isVisible().catch(() => false)) {
      await recordEvidence('closeAddLicenseDialog-close', async () => dialog.getByRole('button', { name: 'Close', exact: true }).click());
      await expect(dialog).toBeHidden();
    }
  }

  getAddLicenseProfileCombo(): Locator {
    return this.getAddLicenseDialog().getByRole('combobox').first();
  }

  getAddLicenseRoleCombo(): Locator {
    return this.getAddLicenseDialog().getByRole('combobox').last();
  }

  async selectAddLicenseRuntimeProfile(): Promise<void> {
    const combo = this.getAddLicenseProfileCombo();
    await recordEvidence('action-click-user-license-hub.page-1211', async () => combo.click());
    const listbox = this.page.getByRole('listbox');
    await recordEvidence('action-click-user-license-hub.page-1213', async () => listbox.getByRole('option').first().click());
    await this.page.waitForTimeout(400);
  }

  async selectAddLicenseRuntimeRole(): Promise<void> {
    const combo = this.getAddLicenseRoleCombo();
    await recordEvidence('action-click-user-license-hub.page-1219', async () => combo.click());
    const listbox = this.page.getByRole('listbox');
    await recordEvidence('action-click-user-license-hub.page-1221', async () => listbox.getByRole('option').first().click());
    await this.page.waitForTimeout(300);
  }

  async deleteLicenseByHardwareId(hwId: string): Promise<void> {
    const cards = this.getVisibleLicenseCards();
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const hwText = await card.locator('p').filter({ hasText: 'Hardware ID' }).locator('..').locator('> :last-child').first().textContent();
      if (hwText?.trim() === hwId) {
        const deleteBtn = card.getByRole('button', { name: 'Delete license' });
        await recordEvidence('action-click-user-license-hub.page-1233', async () => deleteBtn.click());
        await this.waitForUserListResponse();
        return;
      }
    }
  }

  // ─── Edit License ───────────────────────────────────────────

  /** First button (no label, no aria-label) inside a license card — the Edit button */
  getEditLicenseButtonForRuntimeLicense(): Locator {
    return this.page.locator('main > div > div:last-child .rounded-lg.border.bg-card')
      .filter({ hasText: 'Hardware ID' })
      .first()
      .locator('button')
      .filter({ hasNotText: /.+/ })
      .filter({ has: this.page.locator('svg') })
      .first();
  }

  async openEditLicenseDialog(): Promise<void> {
    const btn = this.getEditLicenseButtonForRuntimeLicense();
    await recordEvidence('action-click-user-license-hub.page-1255', async () => btn.click());
    await this.page.waitForTimeout(600);
  }

  getEditLicenseDialog(): Locator {
    return this.page.getByRole('dialog');
  }

  async closeEditLicenseDialog(): Promise<void> {
    const dialog = this.getEditLicenseDialog();
    if (await this.page.getByRole('listbox').isVisible().catch(() => false)) {
      await this.page.keyboard.press('Escape');
    }
    if (await dialog.isVisible().catch(() => false)) {
      await recordEvidence('closeEditLicenseDialog-close', async () => dialog.getByRole('button', { name: 'Close', exact: true }).click());
      await expect(dialog).toBeHidden();
    }
  }

  getEditLicenseHardwareIdInput(): Locator {
    return this.getEditLicenseDialog().locator('input').first();
  }

  getEditLicenseProfileCombo(): Locator {
    return this.getEditLicenseDialog().locator('[role="combobox"]').first();
  }

  getEditLicenseRoleCombo(): Locator {
    return this.getEditLicenseDialog().locator('[role="combobox"]').last();
  }

  getEditLicenseExpirationInput(): Locator {
    return this.getEditLicenseDialog().locator('input#expirationDate');
  }

  getEditLicenseMaintenanceInput(): Locator {
    return this.getEditLicenseDialog().locator('input#maintenanceDate');
  }

  getEditLicenseSaveButton(): Locator {
    return this.getEditLicenseDialog().getByRole('button', { name: 'Save' });
  }

  async getEditLicenseRoleOptions(): Promise<string[]> {
    const combo = this.getEditLicenseRoleCombo();
    await recordEvidence('action-click-user-license-hub.page-1297', async () => combo.click());
    await this.page.waitForTimeout(300);
    const listbox = this.page.getByRole('listbox');
    const opts = await listbox.locator('[role="option"]').all();
    const values = await Promise.all(opts.map(async o => (await o.innerText()).trim()));
    await recordEvidence('action-press-user-license-hub.page-1302', async () => this.page.keyboard.press('Escape'));
    await this.page.waitForTimeout(200);
    return values;
  }

  async selectEditLicenseRole(roleText: string): Promise<void> {
    const combo = this.getEditLicenseRoleCombo();
    await recordEvidence('action-click-user-license-hub.page-1309', async () => combo.click());
    await this.page.waitForTimeout(200);
    const listbox = this.page.getByRole('listbox');
    await recordEvidence('action-click-user-license-hub.page-1312', async () => listbox.getByRole('option', { name: roleText }).click());
    await this.page.waitForTimeout(300);
  }

  async setEditLicenseExpirationDate(dateStr: string): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-1317', async () => this.getEditLicenseExpirationInput().fill(dateStr));
  }

  async clearEditLicenseExpirationDate(): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-1321', async () => this.getEditLicenseExpirationInput().fill(''));
  }

  async setEditLicenseMaintenanceDate(dateStr: string): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-1325', async () => this.getEditLicenseMaintenanceInput().fill(dateStr));
  }

  async clearEditLicenseMaintenanceDate(): Promise<void> {
    await recordEvidence('action-fill-user-license-hub.page-1329', async () => this.getEditLicenseMaintenanceInput().fill(''));
  }

  async submitEditLicense(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-1333', async () => this.getEditLicenseSaveButton().click());
  }

  // ─── Delete License ───────────────────────────────────────────

  /** The Delete license button (aria-label="Delete license") inside the first visible license card */
  getDeleteLicenseButtonForRuntimeLicense(): Locator {
    return this.page.locator('button[aria-label="Delete license"]').first();
  }

  /** Click the Delete button for the runtime license — fires a DELETE request immediately (no confirmation). */
  async openDeleteLicenseAction(): Promise<void> {
    await recordEvidence('action-click-user-license-hub.page-1345', async () => this.getDeleteLicenseButtonForRuntimeLicense().click());
  }

  /** Observe a DELETE request to /api/license */
  waitForDeleteLicenseRequest(): Promise<import('@playwright/test').Response> {
    return this.page.waitForResponse(
      resp => resp.request().method() === 'DELETE' && resp.url().includes('/api/license'),
      { timeout: 15000 }
    );
  }

  /** Verify the lifecycle license Hardware ID is not present in the panel */
  async verifyRuntimeLicenseAbsent(hwId: string): Promise<void> {
    const allHwIds = await this.getAllVisibleHardwareIds();
    await recordEvidence('assert-toContain-user-license-hub.page-1359', async () => expect(allHwIds).not.toContain(hwId));
  }

  /** Safe cleanup: restore All Profiles and clear license search */
  async restoreDeleteLicenseCleanState(): Promise<void> {
    await this.restoreLicensePanelDefaultState();
  }
}
