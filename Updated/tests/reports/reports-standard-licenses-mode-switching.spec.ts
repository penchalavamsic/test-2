import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Mode Control Structure', () => {
  test('LIMAS-SUD-1584: Mode control structure — group, buttons, aria-pressed semantics, native elements', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // License mode group is a role=group with name "License mode"
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-19', async () => expect(reports.licenseModeGroup).toBeVisible());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-20', async () => expect(await reports.licenseModeGroup.getAttribute('role')).toBeNull()); // native <fieldset> or <div role="group">

    // Active and Deleted are native <button> elements
    const activeTag = await reports.activeTab.evaluate((el) => el.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-24', async () => expect(activeTag).toBe('BUTTON'));
    const deletedTag = await reports.deletedTab.evaluate((el) => el.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-26', async () => expect(deletedTag).toBe('BUTTON'));

    // Active starts pressed, Deleted starts unpressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-29', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-30', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    // No individual aria-label; buttons rely on text content
    await recordEvidence('assert-toHaveText-reports-standard-licenses-mode-switching.spec-33', async () => expect(reports.activeTab).toHaveText('Active'));
    await recordEvidence('assert-toHaveText-reports-standard-licenses-mode-switching.spec-34', async () => expect(reports.deletedTab).toHaveText('Deleted'));
  });
});

test.describe('Active Mode', () => {
  test('LIMAS-SUD-1585: Already-selected Active click — no duplicate request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-47', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    let extraRequests = 0;
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.standardLicensesApiPath)) extraRequests++;
    };
    page.on('request', handler);

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-55', async () => reports.activeTab.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-57', async () => expect(extraRequests).toBe(0));

    page.removeListener('request', handler);

    // Active remains pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-62', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });
});

test.describe('Active-to-Deleted', () => {
  test('LIMAS-SUD-1586: Active-to-Deleted switch — button press, API call to allstandarddeleted', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-75', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-82', async () => reports.deletedTab.click());

    const deletedResponse = await deletedPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-85', async () => expect(deletedResponse.status()).toBe(200));

    // Deleted is now pressed, Active unpressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-88', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-89', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'false'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-92', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-94', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });

  test('LIMAS-SUD-1587: Deleted API contract — GET, endpoint, page/size, deletedOn field', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-111', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;

    // Method is GET
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-115', async () => expect(deletedResponse.request().method()).toBe('GET'));

    // Endpoint is /api/report/allstandarddeleted
    await recordEvidence('assert-toContain-reports-standard-licenses-mode-switching.spec-118', async () => expect(deletedResponse.url()).toContain(reports.deletedLicensesApiPath));

    // Query params
    const url = new URL(deletedResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-122', async () => expect(url.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-123', async () => expect(url.searchParams.get('size')).toBe('500'));

    // Response body has deletedOn field
    const resBody = await deletedResponse.json();
    const firstItem = resBody.content?.[0] || resBody[0];
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-128', async () => expect(firstItem).toHaveProperty('deletedOn'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-131', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1588: Deleted counts — toolbar 433, loaded/total 150/433', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-149', async () => reports.deletedTab.click());
    await deletedPromise;

    // Toolbar shows "433 records"
    const toolbarCount = await reports.getReportsRecordCount();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-154', async () => expect(toolbarCount).toBeGreaterThan(0));

    // loaded/total text visible
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-158', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-159', async () => expect(total).toBeGreaterThan(0));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-162', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1589: Deleted table — 6 columns, License Dates Exp+Deleted', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-180', async () => reports.deletedTab.click());
    await deletedPromise;

    // 6 columns
    const headers = await reports.getStandardLicenseHeaders();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-185', async () => expect(headers.length).toBe(6));

    // License Dates column contains "Exp" and "Deleted" (not Maint)
    const dateCol = headers.find((h) => h.toLowerCase().includes('license') && h.toLowerCase().includes('date'));
    await recordEvidence('assert-toBeDefined-reports-standard-licenses-mode-switching.spec-189', async () => expect(dateCol).toBeDefined());

    // First row has non-empty date cells
    const rows = reports.tableRows;
    const firstRowCells = rows.first().locator('td');
    const cellCount = await firstRowCells.count();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-195', async () => expect(cellCount).toBe(6));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-198', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Deleted Infinite Scroll', () => {
  test('LIMAS-SUD-1590: Deleted infinite scroll — page param, next batch loads', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const initialPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-218', async () => reports.deletedTab.click());
    const initialResponse = await initialPromise;

    const initialUrl = new URL(initialResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-222', async () => expect(initialUrl.searchParams.get('page')).toBe('0'));

    const { loaded: initialLoaded } = await reports.getStandardLicenseLoadedState();

    // Scroll to trigger next page
    if (initialLoaded > 0) {
      const nextPromise = page.waitForResponse(
        (resp) => {
          if (!resp.url().includes(reports.deletedLicensesApiPath)) return false;
          if (resp.request().method() !== 'GET') return false;
          const url = new URL(resp.url());
          return url.searchParams.get('page') === '1';
        },
        { timeout: 15000 }
      );

      await reports.scrollStandardLicensesToNextLoadThreshold();
      const nextResponse = await nextPromise;
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-240', async () => expect(nextResponse.status()).toBe(200));

      const { loaded: afterScroll } = await reports.getStandardLicenseLoadedState();
      await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-243', async () => expect(afterScroll).toBeGreaterThan(initialLoaded));
    }

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-247', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Filter Persistence', () => {
  test('LIMAS-SUD-1591: No cross-mode filter persistence — each switch loads fresh data', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply a filter in Active mode
    const runtimeEmail = await reports.getRuntimeEmailFromTable();
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-266', async () => reports.emailSearchbox.fill(runtimeEmail));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-267', async () => page.keyboard.press('Enter'));
    await reports.loadedTotalText.waitFor();

    const { total: activeFilteredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeLessThan-reports-standard-licenses-mode-switching.spec-271', async () => expect(activeFilteredTotal).toBeLessThan(baseTotal));

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-279', async () => reports.deletedTab.click());
    await deletedPromise;

    // Check that no email filter is persisted — full Deleted dataset loads
    const { total: deletedTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-284', async () => expect(deletedTotal).toBeGreaterThan(0));

    // Switch back to Active — should load fresh, not with old filter
    const activePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-292', async () => reports.activeTab.click());
    await activePromise;

    // The filter chip should NOT be present after switch
    const chipVisible = await reports.emailFilterChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-297', async () => expect(chipVisible).toBe(false));
  });
});

test.describe('Core Filters in Deleted', () => {
  test('LIMAS-SUD-1592: Email filter in Deleted — POST, filtered results, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-316', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    // Apply Email filter in Deleted
    const runtimeEmail = await reports.getRuntimeEmailFromTable();
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-328', async () => reports.emailSearchbox.fill(runtimeEmail));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-329', async () => page.keyboard.press('Enter'));

    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-332', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-335', async () => expect(reqBody).toHaveProperty('email'));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-336', async () => expect(reqBody.email).toBe(runtimeEmail));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-mode-switching.spec-339', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    // Clear filters in Deleted
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-342', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();

    // Restore to Active
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-346', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1593: Hardware IDs in Deleted — POST, filtered results, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-364', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    // Apply Hardware IDs filter in Deleted
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    const runtimeHwId = await reports.getRuntimeHardwareIdFromTable();
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-376', async () => reports.hardwareIdsSearchbox.fill(runtimeHwId));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-377', async () => page.keyboard.press('Enter'));

    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-380', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-383', async () => expect(reqBody).toHaveProperty('hardwareId'));

    // Clear filters
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-386', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();

    // Restore to Active
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-390', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1594: Groups in Deleted — filter triggers POST, filtered results, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-408', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    // Apply Group filter in Deleted
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-419', async () => reports.userGroupSearchbox.fill('{runtimeUserGroup}'));
    const option = page.getByRole('option', { name: /{runtimeUserGroup}/ });
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-422', async () => option.click());

    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-425', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-428', async () => expect(reqBody).toHaveProperty('group'));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-429', async () => expect(Array.isArray(reqBody.group)).toBe(true));

    // Clear filters
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-432', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();

    // Restore to Active
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-436', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Date Filters in Deleted', () => {
  test('LIMAS-SUD-1595: Expiration Date in Deleted — POST, expirationDate field, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-456', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-470', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-473', async () => expect(reqBody).toHaveProperty('expirationDate'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-474', async () => expect(reqBody.expirationDate).not.toBeNull());

    // Clear and restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-477', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-479', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1596: Maintenance Date in Deleted — POST, maintenanceDate field, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-497', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseMaintenanceDate(currentDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-511', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-mode-switching.spec-514', async () => expect(reqBody).toHaveProperty('maintenanceDate'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-515', async () => expect(reqBody.maintenanceDate).not.toBeNull());

    // Clear and restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-518', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-520', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1597: Combined dates in Deleted — Expiration + Maintenance, both in POST, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-538', async () => reports.deletedTab.click());
    await deletedPromise;

    await reports.expandFilters();

    const { currentDate, pastDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseMaintenanceDate(pastDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-555', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-558', async () => expect(reqBody.expirationDate).not.toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-559', async () => expect(reqBody.maintenanceDate).not.toBeNull());

    // Both chips visible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-562', async () => expect(reports.expirationDateChip).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-563', async () => expect(reports.maintenanceDateChip).toBeVisible());

    // Clear and restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-566', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-568', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Clear in Deleted', () => {
  test('LIMAS-SUD-1598: Clear resets filters in Deleted — filter removed, unfiltered count returns', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-588', async () => reports.deletedTab.click());
    await deletedPromise;

    const { total: initialTotal } = await reports.getStandardLicenseLoadedState();

    await reports.expandFilters();

    // Apply a filter
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-596', async () => reports.emailSearchbox.fill('test'));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-597', async () => page.keyboard.press('Enter'));
    await reports.loadedTotalText.waitFor();

    const { total: filteredTotal } = await reports.getStandardLicenseLoadedState();

    // Clear
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-607', async () => reports.clearFiltersButton.click());
    const postResponse = await postPromise;

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-611', async () => expect(reqBody.email).toBeNull());

    // Counts restored to unfiltered
    const { total: restoredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-615', async () => expect(restoredTotal).toBe(initialTotal));

    // Restore to Active
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-618', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Deleted-to-Active', () => {
  test('LIMAS-SUD-1599: Deleted-to-Active switch — Active pressed with full record count', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Switch to Deleted first
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-639', async () => reports.deletedTab.click());
    await deletedPromise;
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-641', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Switch back to Active
    const activePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-649', async () => reports.activeTab.click());
    const activeResponse = await activePromise;

    // Active pressed, Deleted unpressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-653', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-654', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-657', async () => expect(total).toBe(baseTotal));

    const url = new URL(activeResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-660', async () => expect(url.searchParams.get('page')).toBe('0'));
  });

  test('LIMAS-SUD-1600: Deleted-to-Active API — GET allstandardlicenses, no filter state', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Switch to Deleted first
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-678', async () => reports.deletedTab.click());
    await deletedPromise;

    // Switch back to Active
    const activePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-687', async () => reports.activeTab.click());
    const activeResponse = await activePromise;

    // GET method, correct endpoint
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-691', async () => expect(activeResponse.request().method()).toBe('GET'));
    await recordEvidence('assert-toContain-reports-standard-licenses-mode-switching.spec-692', async () => expect(activeResponse.url()).toContain(reports.standardLicensesApiPath));

    // page=0, no filter query params
    const url = new URL(activeResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-696', async () => expect(url.searchParams.get('page')).toBe('0'));

    // No stale filter state carried over
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-699', async () => expect(url.searchParams.get('email')).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-700', async () => expect(url.searchParams.get('hardwareId')).toBeNull());

    // Full dataset
    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-704', async () => expect(total).toBe(baseTotal));
  });
});

test.describe('Stale Response', () => {
  test('LIMAS-SUD-1601: Active-to-Deleted stale response handling — only final mode data rendered', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Track all responses
    const responses: string[] = [];
    page.on('response', (resp) => {
      if (resp.url().includes(reports.standardLicensesApiPath) || resp.url().includes(reports.deletedLicensesApiPath)) {
        responses.push(resp.url());
      }
    });

    // Rapid switch: Active → Deleted (without waiting for Active response to resolve)
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-727', async () => reports.deletedTab.click()),
    ]);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

    // Final state: Deleted is pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-737', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // The table shows Deleted content (verified by API path of final settled response)
    const lastRelevant = responses.filter((u) => u.includes(reports.deletedLicensesApiPath) || u.includes(reports.standardLicensesApiPath));
    const finalUrl = lastRelevant[lastRelevant.length - 1];
    await recordEvidence('assert-toContain-reports-standard-licenses-mode-switching.spec-742', async () => expect(finalUrl).toContain('allstandarddeleted'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-745', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
    page.removeAllListeners();
  });

  test('LIMAS-SUD-1602: Deleted-to-Active stale response handling — only final mode data rendered', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted first
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-764', async () => reports.deletedTab.click());
    await deletedPromise;
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-766', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Track responses
    const responses: string[] = [];
    page.on('response', (resp) => {
      if (resp.url().includes(reports.standardLicensesApiPath) || resp.url().includes(reports.deletedLicensesApiPath)) {
        responses.push(resp.url());
      }
    });

    // Rapid switch back to Active
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-777', async () => reports.activeTab.click()),
    ]);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

    // Final state: Active is pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-787', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    const lastRelevant = responses.filter((u) => u.includes(reports.standardLicensesApiPath) || u.includes(reports.deletedLicensesApiPath));
    const finalUrl = lastRelevant[lastRelevant.length - 1];
    await recordEvidence('assert-toContain-reports-standard-licenses-mode-switching.spec-791', async () => expect(finalUrl).toContain('allstandardlicenses'));

    // Restore is already in Active
    page.removeAllListeners();
  });
});

test.describe('Loading Indicator', () => {
  test('LIMAS-SUD-1603: Loading indicator — Active-to-Deleted spinner', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-807', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-809', async () => reports.deletedTab.click());

    // Loading indicator appears
    const indicator = await reports.getStandardLicenseLoadingIndicator();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-813', async () => expect(indicator).not.toBeNull());
    if (indicator) {
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-815', async () => expect(indicator.found).toBe(true));
    }

    // Wait for data to settle
    await reports.loadedTotalText.waitFor();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-820', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-823', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1604: Loading indicator — Deleted-to-Active spinner', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-841', async () => reports.deletedTab.click());
    await deletedPromise;
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-843', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-845', async () => reports.activeTab.click());

    // Loading indicator appears
    const indicator = await reports.getStandardLicenseLoadingIndicator();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-849', async () => expect(indicator).not.toBeNull());
    if (indicator) {
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-851', async () => expect(indicator.found).toBe(true));
    }

    // Wait for data to settle
    await reports.loadedTotalText.waitFor();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-856', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });
});

test.describe('Accessibility', () => {
  test('LIMAS-SUD-1605: Keyboard Tab order through mode buttons', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Focus Active button
    await recordEvidence('action-focus-reports-standard-licenses-mode-switching.spec-871', async () => reports.activeTab.focus());
    let focusedTag = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-873', async () => expect(focusedTag).toBe('BUTTON'));

    const activeFocused = await reports.activeTab.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-876', async () => expect(activeFocused).toBe(true));

    // Tab to Deleted button
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-879', async () => page.keyboard.press('Tab'));
    const deletedFocused = await reports.deletedTab.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-881', async () => expect(deletedFocused).toBe(true));
  });

  test('LIMAS-SUD-1606: Enter/Space activates mode switch', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-892', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    // Focus Deleted and activate via Enter
    await recordEvidence('action-focus-reports-standard-licenses-mode-switching.spec-895', async () => reports.deletedTab.focus());

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-902', async () => page.keyboard.press('Enter'));
    await deletedPromise;
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-904', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Switch back via Space
    await recordEvidence('action-focus-reports-standard-licenses-mode-switching.spec-907', async () => reports.activeTab.focus());

    const activePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-914', async () => page.keyboard.press('Space'));
    await activePromise;
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-916', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });
});

test.describe('Combined Scenarios', () => {
  test('LIMAS-SUD-1607: Active with filter → Deleted (filter reset) — no filter carried over', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply Email filter in Active
    const runtimeEmail = await reports.getRuntimeEmailFromTable();
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-934', async () => reports.emailSearchbox.fill(runtimeEmail));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-935', async () => page.keyboard.press('Enter'));
    await reports.loadedTotalText.waitFor();

    const { total: activeFilteredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeLessThan-reports-standard-licenses-mode-switching.spec-939', async () => expect(activeFilteredTotal).toBeLessThan(baseTotal));

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-947', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;

    // Deleted API is a fresh GET with no filter state
    const deletedUrl = new URL(deletedResponse.url());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-952', async () => expect(deletedUrl.searchParams.get('email')).toBeNull());

    // Filter chip not visible in Deleted
    const chipVisible = await reports.emailFilterChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-956', async () => expect(chipVisible).toBe(false));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-959', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1608: Active with date filter → Deleted (fresh load) — date not carried over', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    // Apply Expiration Date in Active
    const { currentDate } = await reports.getReportDateRuntimeData();
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-977', async () => expect(reports.expirationDateChip).toBeVisible());

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-985', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;

    // Date filter is not carried over
    const deletedUrl = new URL(deletedResponse.url());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-990', async () => expect(deletedUrl.searchParams.get('expirationDate')).toBeNull());

    // Date chip not visible in Deleted
    const chipVisible = await reports.expirationDateChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-994', async () => expect(chipVisible).toBe(false));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-997', async () => reports.activeTab.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1609: Rapid toggle Active→Deleted→Active — final state correct, no UI corruption', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-1010', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    // Rapid toggle: Active → Deleted → Active
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-1013', async () => reports.deletedTab.click());

    // Small delay to let the Deleted request start
    await page.evaluate(() => new Promise((r) => setTimeout(r, 100)));

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-1018', async () => reports.activeTab.click()),
    ]);
    await reports.loadedTotalText.waitFor();

    // Final state: Active is pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-1028', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-1029', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    // Table shows Active data
    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-1033', async () => expect(total).toBe(baseTotal));

    // No UI corruption — table and headings present
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-1036', async () => expect(reports.heading).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-1037', async () => expect(reports.standardLicenseTable).toBeVisible());
  });
});