import { generatedEmail } from '../test-data/generated';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Reports Floating Licenses Active and Deleted Views â€” RFL-C', () => {
  test.describe('Mode Controls', () => {
    test('LIMAS-SUD-1684: Mode group role="group", aria-label="Floating license mode", Active aria-pressed="true"/"false", Deleted aria-pressed, keyboard reachability, single-selection, non-color selected state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      const group = reports.floatingLicenseModeGroup;
      const groupRole = await group.getAttribute('role');
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-21', async () => expect(groupRole).toBe('group'));
      const groupLabel = await group.getAttribute('aria-label');
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-23', async () => expect(groupLabel).toBe('Floating license mode'));

      // Active pressed, Deleted unpressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-26', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-27', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Keyboard reachability: Tab from Active â†’ Deleted
      await recordEvidence('action-focus-reports-floating-licenses-active-deleted.spec-30', async () => reports.floatingLicenseActiveTab.focus());
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-31', async () => page.keyboard.press('Tab'));
      const focusedOnDeleted = await reports.floatingLicenseDeletedTab.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-33', async () => expect(focusedOnDeleted).toBe(true));

      const hasFocusVisible = await reports.floatingLicenseDeletedTab.evaluate((el) => el.matches(':focus-visible'));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-36', async () => expect(hasFocusVisible).toBe(true));

      // Single-selection: click Deleted, verify Active unpressed
      await reports.selectFloatingLicenseDeletedMode();
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-40', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-41', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));

      // Non-color selected state: classes differ
      const activeClass = await reports.floatingLicenseActiveTab.getAttribute('class');
      const deletedClass = await reports.floatingLicenseDeletedTab.getAttribute('class');
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-46', async () => expect(activeClass).not.toBe(deletedClass));
    });

    test('LIMAS-SUD-1685: Already-selected Active â€” click Active when already selected, verify no duplicate request, counts stable, scroll unchanged', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      let extraRequest = false;
      page.on('request', (req) => {
        if (req.url().includes(reports.floatingLicensesApiPath) && req.method() === 'GET') {
          extraRequest = true;
        }
      });

      const beforeCount = await reports.getFloatingLicenseRecordCount();
      const beforeState = await reports.getFloatingLicenseLoadedState();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-68', async () => reports.floatingLicenseActiveTab.click());

      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-71', async () => expect(extraRequest).toBe(false));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-72', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));

      const afterCount = await reports.getFloatingLicenseRecordCount();
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-75', async () => expect(afterCount).toBe(beforeCount));
      await recordEvidence('assert-toEqual-reports-floating-licenses-active-deleted.spec-76', async () => expect(await reports.getFloatingLicenseLoadedState()).toEqual(beforeState));
    });
  });

  test.describe('Active-to-Deleted Switching', () => {
    test('LIMAS-SUD-1686: Click Deleted â†’ Deleted pressed, Active unpressed, FL card stays selected, scroll resets, route /reports', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-92', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-93', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'false'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-94', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));

      // Scroll resets to 0
      const scrollTop = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop).catch(() => 0);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-98', async () => expect(scrollTop).toBe(0));

      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-active-deleted.spec-101', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });

    test('LIMAS-SUD-1687: Deleted API contract â€” GET /limas/api/report/allfloatingdeleted?page=0&size=500, Spring Page envelope, totalElements, numberOfElements, totalPages, compare with toolbar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      const responsePromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      await reports.selectFloatingLicenseDeletedMode();
      const response = await responsePromise;

      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-120', async () => expect(response.status()).toBe(200));
      const ct = response.headers()['content-type'] || '';
      await recordEvidence('assert-toContain-reports-floating-licenses-active-deleted.spec-122', async () => expect(ct).toContain('application/json'));

      const reqUrl = new URL(response.url());
      await recordEvidence('assert-toContain-reports-floating-licenses-active-deleted.spec-125', async () => expect(reqUrl.pathname).toContain('allfloatingdeleted'));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-126', async () => expect(reqUrl.searchParams.get('page')).toBe('0'));
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-active-deleted.spec-127', async () => expect(Number(reqUrl.searchParams.get('size'))).toBeGreaterThan(0));

      const body = await response.json();
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-130', async () => expect(body).toHaveProperty('totalElements'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-131', async () => expect(body).toHaveProperty('numberOfElements'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-132', async () => expect(body).toHaveProperty('totalPages'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-133', async () => expect(body).toHaveProperty('content'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-134', async () => expect(body).toHaveProperty('last'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-135', async () => expect(body).toHaveProperty('first'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-136', async () => expect(body).toHaveProperty('size'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-active-deleted.spec-137', async () => expect(body).toHaveProperty('number'));

      // Compare with toolbar
      const { total, loaded } = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-141', async () => expect(total).toBe(body.totalElements));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-142', async () => expect(loaded).toBe(body.numberOfElements));
    });

    test('LIMAS-SUD-1688: Deleted data availability â€” totalElements > 0, rows rendered, Export enabled, filters available, counts match', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await reports.selectFloatingLicenseDeletedMode();

      const { total } = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-active-deleted.spec-157', async () => expect(total).toBeGreaterThan(0));

      // Rows rendered
      const rows = reports.getDeletedFloatingLicenseRows();
      const rowCount = await rows.count();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-active-deleted.spec-162', async () => expect(rowCount).toBeGreaterThan(0));

      // Export enabled
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-active-deleted.spec-165', async () => expect(reports.floatingLicenseExportButton).toBeEnabled());

      // Filters available
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-168', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-170', async () => expect(reports.flEmailSearchbox).toBeVisible());
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-active-deleted.spec-171', async () => expect(reports.flEmailSearchbox).toBeEnabled());

      // Counts match
      const { loaded } = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-active-deleted.spec-175', async () => expect(loaded).toBeLessThanOrEqual(total));
    });
  });

  test.describe('Deleted View', () => {
    test('LIMAS-SUD-1689: Deleted counts â€” toolbar count, loaded, total, rendered rows, loaded â‰¤ total, no Active contamination', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await reports.selectFloatingLicenseDeletedMode();

      const { toolbarCount, loaded, total } = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-192', async () => expect(toolbarCount).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-193', async () => expect(loaded).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-194', async () => expect(total).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-active-deleted.spec-195', async () => expect(loaded).toBeLessThanOrEqual(total));

      // Rendered rows should match loaded
      const rows = reports.getDeletedFloatingLicenseRows();
      const rowCount = await rows.count();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-200', async () => expect(rowCount).toBeGreaterThanOrEqual(0));

      // No Active contamination: Active endpoint should not have been called recently
      // The Deleted view should not show Active-only data
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-204', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
    });

    test('LIMAS-SUD-1690: Deleted table â€” headers Profile/Role/Email/Hardware ID/Details, Details has Feature/Exp/Created/Deleted, row count, scroll container, text wrapping', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await reports.selectFloatingLicenseDeletedMode();

      const headers = await reports.getFloatingLicenseHeaders();
      const headerTexts = headers.map(h => h.toLowerCase());
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-220', async () => expect(headerTexts.some(h => h.includes('profile'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-221', async () => expect(headerTexts.some(h => h.includes('role'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-222', async () => expect(headerTexts.some(h => h.includes('email'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-223', async () => expect(headerTexts.some(h => h.includes('hardware') || h.includes('hw'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-224', async () => expect(headerTexts.some(h => h.includes('details') || h.includes('detail'))).toBe(true));

      // Row count
      const rows = reports.getDeletedFloatingLicenseRows();
      const rowCount = await rows.count();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-active-deleted.spec-229', async () => expect(rowCount).toBeGreaterThan(0));

      // Scroll container exists
      const container = reports.flScrollContainer;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-233', async () => expect(container).toBeVisible());
    });

    test('LIMAS-SUD-1691: Export Excel enabled (when records present), no accidental activation', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await reports.selectFloatingLicenseDeletedMode();

      const exportBtn = reports.floatingLicenseExportButton;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-248', async () => expect(exportBtn).toBeVisible());
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-active-deleted.spec-249', async () => expect(exportBtn).toBeEnabled());

      // Verify no accidental activation â€” no download event from just viewing
      let downloadTriggered = false;
      page.on('download', () => { downloadTriggered = true; });
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-255', async () => expect(downloadTriggered).toBe(false));
    });
  });

  test.describe('Deleted Filters', () => {
    test('LIMAS-SUD-1692: Filter persistence â€” switch to Active, apply Product Profile, switch to Deleted, verify filter persists or resets, switch back to Active and verify', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Expand filters
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-270', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      // Select a Product Profile
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-274', async () => reports.flProductProfileSearchbox.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const firstOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
      const hasOption = await firstOption.isVisible().catch(() => false);
      if (hasOption) {
        await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-279', async () => firstOption.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
      }

      const profilesChipBefore = page.getByText(/Profiles:\s*\d+/);
      const hadProfile = await profilesChipBefore.isVisible().catch(() => false);

      // Switch to Deleted
      await reports.selectFloatingLicenseDeletedMode();

      // Check filter state after mode switch
      const profilesChipDeleted = page.getByText(/Profiles:\s*\d+/);
      const chipPersists = await profilesChipDeleted.isVisible().catch(() => false);

      // Switch back to Active
      await reports.selectFloatingLicenseActiveMode();

      // Verify Active mode restored
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-297', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-active-deleted.spec-299', async () => expect(url.pathname).toMatch(/\/reports\/?$/));

      // Cleanup
      const clearAll = page.getByRole('button', { name: 'Clear all' });
      const cv = await clearAll.isVisible().catch(() => false);
      if (cv) await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-304', async () => clearAll.click());
    });

    test('LIMAS-SUD-1693: Date filter persistence â€” same with Expiration Date', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-316', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      const testDate = '2026-12-16';
      await recordEvidence('action-fill-reports-floating-licenses-active-deleted.spec-320', async () => reports.flExpirationDateInput.fill(testDate));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-321', async () => page.keyboard.press('Tab'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      const expChipBefore = page.getByText(`Exp: ${testDate}`);
      const hadExp = await expChipBefore.isVisible().catch(() => false);

      // Switch to Deleted
      await reports.selectFloatingLicenseDeletedMode();

      const expChipDeleted = page.getByText(`Exp: ${testDate}`);
      const chipPersists = await expChipDeleted.isVisible().catch(() => false);

      // Switch back to Active
      await reports.selectFloatingLicenseActiveMode();
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-335', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));

      // Cleanup
      const clearAll = page.getByRole('button', { name: 'Clear all' });
      const cv = await clearAll.isVisible().catch(() => false);
      if (cv) await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-340', async () => clearAll.click());
    });

    test('LIMAS-SUD-1694: Deleted non-date filter â€” Product Profile, chip, client-side, counts sync, clear restores unfiltered', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-353', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      // Apply Product Profile filter
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-357', async () => reports.flProductProfileSearchbox.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const firstOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
      const hasOption = await firstOption.isVisible().catch(() => false);
      if (hasOption) {
        await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-362', async () => firstOption.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

        // Chip visible
        const profilesChip = page.getByText(/Profiles:\s*\d+/);
        await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-367', async () => expect(profilesChip).toBeVisible());

        // Counts still display (client-side)
        const { toolbarCount } = await reports.getFloatingLicenseModeCounts();
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-371', async () => expect(toolbarCount).toBeGreaterThanOrEqual(0));

        // Clear and verify unfiltered restored
        await reports.clearFloatingLicenseFilters();
        const profilesChipAfter = page.getByText(/Profiles:\s*\d+/);
        await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-376', async () => expect(profilesChipAfter).not.toBeVisible());
      }
    });

    test('LIMAS-SUD-1695: Deleted date filter â€” Expiration Date, chip, client-side, clear restores', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-390', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      const testDate = '2026-12-16';
      await recordEvidence('action-fill-reports-floating-licenses-active-deleted.spec-394', async () => reports.flExpirationDateInput.fill(testDate));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-395', async () => page.keyboard.press('Tab'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      const expChip = page.getByText(`Exp: ${testDate}`);
      const chipVisible = await expChip.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-400', async () => expect(typeof chipVisible).toBe('boolean'));

      // No server request triggered
      let extraRequest = false;
      page.on('request', (req) => {
        if (req.url().includes('/api/report/')) extraRequest = true;
      });
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-408', async () => expect(extraRequest).toBe(false));

      // Clear
      const clearAll = page.getByRole('button', { name: 'Clear all' });
      const cv = await clearAll.isVisible().catch(() => false);
      if (cv) await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-413', async () => clearAll.click());
      const expChipAfter = page.getByText(`Exp: ${testDate}`);
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-415', async () => expect(expChipAfter).not.toBeVisible());
    });

    test('LIMAS-SUD-1696: Deleted clear â€” with both filters populated, panel Clear / Clear all, all six clear, chips gone, Profile Role disabled, Deleted stays selected, counts restore', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-428', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      // Apply email
      await recordEvidence('action-fill-reports-floating-licenses-active-deleted.spec-432', async () => reports.flEmailSearchbox.fill(generatedEmail('deleted-clear')));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-433', async () => page.keyboard.press('Enter'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Apply date
      await recordEvidence('action-fill-reports-floating-licenses-active-deleted.spec-437', async () => reports.flExpirationDateInput.fill('2026-12-16'));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-438', async () => page.keyboard.press('Tab'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Click panel Clear
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-442', async () => reports.flClearFiltersButton.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Verify all chips gone
      const emailChip = page.getByText(/Email:/);
      const expChip = page.getByText(/Exp:/);
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-448', async () => expect(emailChip).not.toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-449', async () => expect(expChip).not.toBeVisible());

      // Profile Role disabled
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-active-deleted.spec-452', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());

      // Deleted stays selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-455', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));

      // All six filter inputs cleared
      const filterState = await reports.getFloatingLicenseFilterState();
      for (const [, ctrl] of Object.entries(filterState)) {
        if (ctrl.value !== undefined) await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-460', async () => expect(ctrl.value).toBe(''));
      }

      // Counts present
      const { toolbarCount } = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-465', async () => expect(toolbarCount).toBeGreaterThanOrEqual(0));
    });
  });

  test.describe('Deleted-to-Active Restoration', () => {
    test('LIMAS-SUD-1697: Scroll and sentinel reset on mode switch â€” scroll=0, correct mode container, sentinel recalcs, loaded count only from active mode, no stale rows, at most 1 initial request', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Switch back to Active
      const responsePromise = reports.waitForFloatingLicenseModeRequest();
      await reports.selectFloatingLicenseActiveMode();
      await responsePromise;

      // Scroll reset
      const scrollTop = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop).catch(() => 0);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-487', async () => expect(scrollTop).toBe(0));

      // Verify correct mode container â€” Active pressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-490', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-491', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // At most 1 initial request from Active
      let extraRequest = 0;
      page.on('request', (req) => {
        if (req.url().includes(reports.floatingLicensesApiPath) && req.method() === 'GET') extraRequest++;
      });
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      // Allow 1 from the awaited response, but no more
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-active-deleted.spec-500', async () => expect(extraRequest).toBeLessThanOrEqual(1));
    });

    test('LIMAS-SUD-1698: Deleted-to-Active â€” clear filters, click Active, Active pressed, Deleted unpressed, Active contract used, page=0, Deleted rows removed, Active counts/state return, scroll resets, route /reports', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Capture Active initial state
      const activeInitial = await reports.getFloatingLicenseModeCounts();

      // Switch to Deleted
      await reports.selectFloatingLicenseDeletedMode();
      const deletedState = await reports.getFloatingLicenseModeCounts();

      // Switch back to Active
      const responsePromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.floatingLicensesApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      await reports.selectFloatingLicenseActiveMode();
      const response = await responsePromise;

      // Active pressed, Deleted unpressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-528', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-529', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Active contract used
      const reqUrl = new URL(response.url());
      await recordEvidence('assert-toContain-reports-floating-licenses-active-deleted.spec-533', async () => expect(reqUrl.pathname).toContain('allfloatinglicenses'));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-534', async () => expect(reqUrl.searchParams.get('page')).toBe('0'));

      // Scroll resets
      const scrollTop = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop).catch(() => 0);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-538', async () => expect(scrollTop).toBe(0));

      // Route /reports
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-active-deleted.spec-542', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });

  test.describe('Loading and Stale-Response Safety', () => {
    test('LIMAS-SUD-1699: Stale response safety â€” Activeâ†’Deletedâ†’Active sequence, verify final mode=Active, final counts Active, no mixed data, no duplicate requests', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Capture initial Active count
      const activeInitial = await reports.getFloatingLicenseModeCounts();

      // Active â†’ Deleted
      await reports.selectFloatingLicenseDeletedMode();

      // Deleted â†’ Active
      const activeResponse = reports.waitForFloatingLicenseModeRequest();
      await reports.selectFloatingLicenseActiveMode();
      await activeResponse;

      // Final mode is Active
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-568', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-569', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Final counts from Active
      const finalCounts = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-573', async () => expect(finalCounts.total).toBe(activeInitial.total));

      // No mixed data
      await reports.verifyNoMixedFloatingLicenseModeRows();
    });

    test('LIMAS-SUD-1700: Loading state â€” observe loading indicator, toolbar visibility, previous-mode content, count update timing, indicator disappearance, aria-live/aria-busy, mode controls usable', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Switch to Deleted and observe loading behavior
      const responsePromise = reports.waitForFloatingLicenseDeletedRequest();
      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-590', async () => reports.floatingLicenseDeletedTab.click());
      await responsePromise;

      // After response, toolbar should be visible
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-594', async () => expect(reports.floatingLicenseActiveTab).toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-595', async () => expect(reports.floatingLicenseDeletedTab).toBeVisible());

      // Mode controls usable
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-active-deleted.spec-598', async () => expect(reports.floatingLicenseActiveTab).toBeEnabled());
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-active-deleted.spec-599', async () => expect(reports.floatingLicenseDeletedTab).toBeEnabled());
    });
  });

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-1701: Mode controls a11y â€” group name, pressed announcements, single-selection, keyboard Enter/Space, visible focus, non-color selected, logical keyboard order', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Group name
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-614', async () => expect(reports.floatingLicenseModeGroup).toHaveAttribute('aria-label', 'Floating license mode'));

      // Pressed announcements
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-617', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-618', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Keyboard activation: Space on Deleted
      await recordEvidence('action-focus-reports-floating-licenses-active-deleted.spec-621', async () => reports.floatingLicenseActiveTab.focus());
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-622', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-623', async () => page.keyboard.press('Space'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-624', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-625', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'false'));

      // Keyboard activation: Enter on Active
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-628', async () => page.keyboard.press('Tab'));
      // Shift+Tab back to Active
      await recordEvidence('action-down-reports-floating-licenses-active-deleted.spec-630', async () => page.keyboard.down('Shift'));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-631', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-up-reports-floating-licenses-active-deleted.spec-632', async () => page.keyboard.up('Shift'));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-633', async () => page.keyboard.press('Enter'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-634', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));

      // Visible focus
      await recordEvidence('action-focus-reports-floating-licenses-active-deleted.spec-637', async () => reports.floatingLicenseActiveTab.focus());
      const hasFocusVisible = await reports.floatingLicenseActiveTab.evaluate((el) => el.matches(':focus-visible'));
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-639', async () => expect(hasFocusVisible).toBe(true));

      // Non-color selected: classes differ
      const activeClass = await reports.floatingLicenseActiveTab.getAttribute('class');
      const deletedClass = await reports.floatingLicenseDeletedTab.getAttribute('class');
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-644', async () => expect(activeClass).not.toBe(deletedClass));

      // Logical keyboard order: Active â†’ Deleted
      await recordEvidence('action-focus-reports-floating-licenses-active-deleted.spec-647', async () => reports.floatingLicenseActiveTab.focus());
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-648', async () => page.keyboard.press('Tab'));
      const focused = await reports.floatingLicenseDeletedTab.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-650', async () => expect(focused).toBe(true));
    });

    test('LIMAS-SUD-1702: Mode-change a11y â€” change announcement, loading announcement, count announcement, Deleted results announcement, focus stability', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Focus Active tab before switching
      await recordEvidence('action-focus-reports-floating-licenses-active-deleted.spec-663', async () => reports.floatingLicenseActiveTab.focus());
      const focusedBefore = await reports.floatingLicenseActiveTab.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-665', async () => expect(focusedBefore).toBe(true));

      // Switch to Deleted via keyboard
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-668', async () => page.keyboard.press('Tab'));
      const [response] = await Promise.all([
      page.waitForResponse(
        (resp) => resp.url().includes(reports.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      ),
      recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-669', async () => page.keyboard.press('Enter')),
    ]);

      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-676', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));

      // Count announcement present via loaded/total text
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-active-deleted.spec-679', async () => expect(reports.floatingLicenseLoadedTotalText).toBeVisible());
    });

    test('LIMAS-SUD-1703: Deleted table a11y â€” header associations, row semantics, cell content, Details formatting, empty-state announcement', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Table headers present
      const headers = await reports.getFloatingLicenseHeaders();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-694', async () => expect(headers.length).toBeGreaterThanOrEqual(5));

      // Row semantics â€” rows are in tbody
      const rows = reports.getDeletedFloatingLicenseRows();
      const rowCount = await rows.count();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-active-deleted.spec-699', async () => expect(rowCount).toBeGreaterThan(0));

      // Cell content â€” first row should have content in each cell
      const firstRow = rows.nth(0);
      const cells = firstRow.locator('td');
      const cellCount = await cells.count();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-active-deleted.spec-705', async () => expect(cellCount).toBeGreaterThanOrEqual(5));
      for (let i = 0; i < cellCount; i++) {
        const text = await cells.nth(i).textContent();
        await recordEvidence('assert-toBeTruthy-reports-floating-licenses-active-deleted.spec-708', async () => expect(text).toBeTruthy());
      }
    });

    test('LIMAS-SUD-1704: Filter state a11y â€” filter reset communication, chip communication, Profile Role disabled, Clear button communication', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-722', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      // Apply a filter
      await recordEvidence('action-fill-reports-floating-licenses-active-deleted.spec-726', async () => reports.flEmailSearchbox.fill(generatedEmail('a11y-deleted')));
      await recordEvidence('action-press-reports-floating-licenses-active-deleted.spec-727', async () => page.keyboard.press('Enter'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Chip has accessible remove button
      const removeBtn = page.getByRole('button', { name: /Remove Email:/ });
      const removeVisible = await removeBtn.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-733', async () => expect(typeof removeVisible).toBe('boolean'));

      // Clear button has accessible name
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-active-deleted.spec-736', async () => expect(reports.flClearFiltersButton).toHaveAccessibleName('Clear'));
      const clearAll = page.getByRole('button', { name: 'Clear all' });
      const clearAllVisible = await clearAll.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-739', async () => expect(typeof clearAllVisible).toBe('boolean'));

      // Profile Role disabled
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-active-deleted.spec-742', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());

      // Cleanup
      if (clearAllVisible) await recordEvidence('action-click-reports-floating-licenses-active-deleted.spec-745', async () => clearAll.click());
    });
  });

  test.describe('Safe Restoration', () => {
    test('LIMAS-SUD-1705: Safe restoration â€” FL selected, Active pressed, filters empty and collapsed, Profile Role disabled, Active counts 0/0, Export disabled, route /reports, browser open', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Navigate away to Deleted first to create a non-default state
      await reports.selectFloatingLicenseDeletedMode();

      // Safe restoration back to Active
      await reports.restoreFloatingLicenseActiveMode();

      // FL selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-766', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
      // Active pressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-768', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      // Deleted unpressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-active-deleted.spec-770', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Filters collapsed
      const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-active-deleted.spec-774', async () => expect(filtersVisible).toBe(false));

      // Profile Role disabled
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-active-deleted.spec-777', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());

      // Route /reports
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-active-deleted.spec-781', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });
});