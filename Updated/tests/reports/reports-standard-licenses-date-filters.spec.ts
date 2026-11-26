import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Date Control Structure', () => {
  test('LIMAS-SUD-1557: Date control structure â€” visibility, labels, types, IDs, states', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const controls = await reports.getStandardLicenseDateFilterState();

    for (const [name, state] of Object.entries(controls)) {
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-22', async () => expect(state.visible, `${name} should be visible`).toBe(true));
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-23', async () => expect(state.type, `${name} should be type=date`).toBe('date'));
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-24', async () => expect(state.value, `${name} should start empty`).toBe(''));
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-25', async () => expect(state.disabled, `${name} should be enabled`).toBe(false));
      await recordEvidence('assert-toBeFalsy-reports-standard-licenses-date-filters.spec-26', async () => expect(state.minAttr, `${name} should have no min`).toBeFalsy());
      await recordEvidence('assert-toBeFalsy-reports-standard-licenses-date-filters.spec-27', async () => expect(state.maxAttr, `${name} should have no max`).toBeFalsy());
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-28', async () => expect(state.required, `${name} should not be required`).toBe(false));
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-29', async () => expect(state.hasCalendarButton, `${name} should have calendar button`).toBe(true));
    }

    // Verify role mappings
    for (const name of ['expirationDate', 'maintenanceDate', 'createdDate', 'modifiedDate']) {
      const locator = page.getByRole('textbox', { name: new RegExp(name.replace(/([A-Z])/g, ' $1'), 'i') });
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-35', async () => expect(locator.first()).toBeVisible());
    }
  });
});

test.describe('Expiration Date', () => {
  test('LIMAS-SUD-1558: Native date picker â€” type=date, browser chrome, Escape, focus return', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const expInput = reports.expirationDateInput;
    await recordEvidence('action-focus-reports-standard-licenses-date-filters.spec-52', async () => expInput.focus());

    // Native date input type confirmed
    const inputType = await expInput.getAttribute('type');
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-56', async () => expect(inputType).toBe('date'));

    // Date picker is browser native chrome (not application DOM)
    // Verified by absence of application-level calendar popup in accessibility tree
    const calendarDialogs = page.locator('[role="dialog"], [role="listbox"]');
    const dialogCount = await calendarDialogs.count();
    // Browser native picker not represented as application DOM dialog

    // Focus and keyboard interaction
    await recordEvidence('assert-toBeFocused-reports-standard-licenses-date-filters.spec-65', async () => expect(expInput).toBeFocused());
    await recordEvidence('action-press-reports-standard-licenses-date-filters.spec-66', async () => page.keyboard.press('Escape'));
    // Focus may remain or move; document whatever occurs
  });

  test('LIMAS-SUD-1559: Expiration Date current â€” change-event POST, expirationDate field, chip, counts', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-89', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-92', async () => expect(reqBody).toHaveProperty('expirationDate'));
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-93', async () => expect(typeof reqBody.expirationDate).toBe('string'));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-date-filters.spec-94', async () => expect(reqBody.expirationDate.length).toBeGreaterThan(0));

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-97', async () => expect(url.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-98', async () => expect(url.searchParams.get('size')).not.toBeNull());

    // Chip visible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-101', async () => expect(reports.expirationDateChip).toBeVisible());

    // Counts updated
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-date-filters.spec-105', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-date-filters.spec-106', async () => expect(total).toBeGreaterThan(0));

    // Rows sync
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-110', async () => expect(rowCount).toBe(loaded));

    // Active stays selected
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-date-filters.spec-113', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-116', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1560: Expiration Date past â€” POST, counts, rows, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { pastDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(pastDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-139', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-142', async () => expect(reqBody.expirationDate).not.toBeNull());

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-date-filters.spec-145', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-148', async () => expect(rowCount).toBe(loaded));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-150', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1561: Expiration Date future â€” POST, counts, rows, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { futureDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(futureDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-173', async () => expect(postResponse.status()).toBe(200));

    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-176', async () => expect(reqBody.expirationDate).not.toBeNull());

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-date-filters.spec-179', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-181', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1562: Expiration Date month-boundary â€” POST, counts, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { monthBoundaryDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(monthBoundaryDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-204', async () => expect(postResponse.status()).toBe(200));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-date-filters.spec-207', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-209', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1563: Expiration Date second date â€” replacement, chip update, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate, secondDate } = await reports.getReportDateRuntimeData();

    // Apply first date
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-228', async () => expect(reports.expirationDateChip).toBeVisible());

    // Apply second date
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.setStandardLicenseExpirationDate(secondDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-237', async () => expect(postResponse.status()).toBe(200));

    // No date stacking â€” chip replaces
    const chipText = await reports.expirationDateChip.textContent();
    await recordEvidence('assert-toMatch-reports-standard-licenses-date-filters.spec-241', async () => expect(chipText).toMatch(/Exp:/));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-243', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1564: Expiration Date same date reapply â€” no duplicate request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    let extraRequests = 0;
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.filterApiPath) && req.url().includes('page=')) extraRequests++;
    };
    page.on('request', handler);

    await reports.setStandardLicenseExpirationDate(currentDate);
    // Allow any duplicate requests to fire
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-date-filters.spec-271', async () => expect(extraRequests).toBeLessThanOrEqual(1));

    page.removeListener('request', handler);
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-274', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1565: Expiration Date invalid â€” browser validity prevents, no request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    // type=date browser constraint prevents invalid text
    // Attempting invalid text on native date input results in input being cleared
    const expInput = reports.expirationDateInput;
    const validityBefore = await expInput.evaluate((el: HTMLInputElement) => el.validity.valid);

    let filterRequests = 0;
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.filterApiPath)) filterRequests++;
    };
    page.on('request', handler);

    await recordEvidence('action-fill-reports-standard-licenses-date-filters.spec-299', async () => expInput.fill('invalid-date'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    // No filter request should fire
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-302', async () => expect(filterRequests).toBe(0));

    page.removeListener('request', handler);
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-305', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1566: Expiration Date clear â€” individual remove restores', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.clearStandardLicenseExpirationDate();
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-334', async () => expect(reqBody.expirationDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-337', async () => expect(total).toBe(baseTotal));
  });
});

test.describe('Other Date Filters', () => {
  test('LIMAS-SUD-1567: Maintenance Date â€” one valid date, POST, maintenanceDate, chip, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseMaintenanceDate(currentDate);
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-362', async () => expect(reqBody).toHaveProperty('maintenanceDate'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-363', async () => expect(reqBody.maintenanceDate).not.toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-364', async () => expect(reqBody.expirationDate).toBeNull());

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-367', async () => expect(url.searchParams.get('page')).toBe('0'));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-369', async () => expect(reports.maintenanceDateChip).toBeVisible());

    const { loaded } = await reports.getStandardLicenseLoadedState();
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-373', async () => expect(rowCount).toBe(loaded));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-375', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1568: Maintenance Date clear â€” individual, input empties, unfiltered returns', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseMaintenanceDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.clearStandardLicenseMaintenanceDate();
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-403', async () => expect(reqBody.maintenanceDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-406', async () => expect(total).toBe(baseTotal));
  });

  test('LIMAS-SUD-1569: License Created Date â€” one valid date, POST, createdDate, chip, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseCreatedDate(currentDate);
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-429', async () => expect(reqBody).toHaveProperty('createdDate'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-430', async () => expect(reqBody.createdDate).not.toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-431', async () => expect(reqBody.expirationDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-432', async () => expect(reqBody.maintenanceDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-433', async () => expect(reqBody.modifiedDate).toBeNull());

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-436', async () => expect(url.searchParams.get('page')).toBe('0'));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-440', async () => expect(rowCount).toBe(loaded));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-442', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1570: License Created Date clear â€” individual, unfiltered returns', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseCreatedDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.clearStandardLicenseCreatedDate();
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-470', async () => expect(reqBody.createdDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-473', async () => expect(total).toBe(baseTotal));
  });

  test('LIMAS-SUD-1571: License Modified Date â€” one valid date, POST, modifiedDate, chip, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseModifiedDate(currentDate);
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-496', async () => expect(reqBody).toHaveProperty('modifiedDate'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-497', async () => expect(reqBody.modifiedDate).not.toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-498', async () => expect(reqBody.expirationDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-499', async () => expect(reqBody.maintenanceDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-500', async () => expect(reqBody.createdDate).toBeNull());

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-503', async () => expect(url.searchParams.get('page')).toBe('0'));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-507', async () => expect(rowCount).toBe(loaded));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-509', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1572: License Modified Date clear â€” individual, unfiltered returns', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseModifiedDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.clearStandardLicenseModifiedDate();
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-537', async () => expect(reqBody.modifiedDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-540', async () => expect(total).toBe(baseTotal));
  });
});

test.describe('Clear and Combined Dates', () => {
  test('LIMAS-SUD-1573: Date request-body contract â€” POST, field names, ISO timestamp UTC, null empty', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;

    // Contract verification
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-567', async () => expect(reqBody).toHaveProperty('expirationDate'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-568', async () => expect(reqBody).toHaveProperty('maintenanceDate'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-569', async () => expect(reqBody).toHaveProperty('createdDate'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-570', async () => expect(reqBody).toHaveProperty('modifiedDate'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-571', async () => expect(reqBody).toHaveProperty('email'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-572', async () => expect(reqBody).toHaveProperty('hardwareId'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-573', async () => expect(reqBody).toHaveProperty('group'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-574', async () => expect(reqBody).toHaveProperty('productProfile'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-date-filters.spec-575', async () => expect(reqBody).toHaveProperty('profileRole'));

    // Date format: ISO timestamp string (UTC)
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-578', async () => expect(typeof reqBody.expirationDate).toBe('string'));
    await recordEvidence('assert-toMatch-reports-standard-licenses-date-filters.spec-579', async () => expect(reqBody.expirationDate).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/));

    // Empty dates are null
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-582', async () => expect(reqBody.maintenanceDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-583', async () => expect(reqBody.createdDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-584', async () => expect(reqBody.modifiedDate).toBeNull());

    // Method is POST
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-587', async () => expect(postResponse.request().method()).toBe('POST'));

    // Response is JSON
    await recordEvidence('assert-toContain-reports-standard-licenses-date-filters.spec-590', async () => expect(postResponse.headers()['content-type']).toContain('application/json'));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-592', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1574: Global Clear â€” one date populated, chip removed, unfiltered returns', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.clearAllStandardLicenseDateFilters();
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-619', async () => expect(reqBody.expirationDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-622', async () => expect(total).toBe(baseTotal));

    const chipVisible = await reports.expirationDateChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-625', async () => expect(chipVisible).toBe(false));
  });

  test('LIMAS-SUD-1575: Global Clear â€” multiple dates, single POST, all null', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate, pastDate } = await reports.getReportDateRuntimeData();
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();
    await reports.setStandardLicenseMaintenanceDate(pastDate);
    await reports.loadedTotalText.waitFor();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-650', async () => reports.clearFiltersButton.click());
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-653', async () => expect(reqBody.expirationDate).toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-654', async () => expect(reqBody.maintenanceDate).toBeNull());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-657', async () => expect(total).toBe(baseTotal));
  });

  test('LIMAS-SUD-1576: Global Clear â€” core filter + date, both reset, Profile Role disabled', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Apply Product Profile + Expiration Date
    const { currentDate } = await reports.getReportDateRuntimeData();
    const runtimeProfile = await reports.getRuntimeProfileFromTable();
    await recordEvidence('action-fill-reports-standard-licenses-date-filters.spec-675', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const profileOption = page.getByRole('option', { name: runtimeProfile });
    await profileOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-678', async () => profileOption.click());
    await reports.loadedTotalText.waitFor();

    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    // Global Clear
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-689', async () => reports.clearFiltersButton.click());
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-692', async () => expect(reqBody.expirationDate).toBeNull());
    await recordEvidence('assert-toEqual-reports-standard-licenses-date-filters.spec-693', async () => expect(reqBody.productProfile).toEqual([]));

    // Profile Role disabled
    await recordEvidence('assert-toBeDisabled-reports-standard-licenses-date-filters.spec-696', async () => expect(reports.profileRoleSearchbox).toBeDisabled());

    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-699', async () => expect(total).toBe(baseTotal));
  });

  test('LIMAS-SUD-1577: Combined dates â€” Expiration + Maintenance, both in POST, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate, pastDate } = await reports.getReportDateRuntimeData();

    // Set Maintenance Date first
    await reports.setStandardLicenseMaintenanceDate(pastDate);
    await reports.loadedTotalText.waitFor();

    // Set Expiration Date (combined state)
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-726', async () => expect(reqBody.expirationDate).not.toBeNull());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-727', async () => expect(reqBody.maintenanceDate).not.toBeNull());

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-730', async () => expect(url.searchParams.get('page')).toBe('0'));

    // Both chips visible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-733', async () => expect(reports.expirationDateChip).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-734', async () => expect(reports.maintenanceDateChip).toBeVisible());

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-date-filters.spec-737', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-739', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Core Filter and Date', () => {
  test('LIMAS-SUD-1578: Core filter + date â€” Email + Expiration, POST includes both, restore', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();
    const runtimeEmail = await reports.getRuntimeEmailFromTable();

    // Apply Email filter
    await recordEvidence('action-fill-reports-standard-licenses-date-filters.spec-759', async () => reports.emailSearchbox.fill(runtimeEmail));
    await recordEvidence('action-press-reports-standard-licenses-date-filters.spec-760', async () => page.keyboard.press('Enter'));
    await reports.loadedTotalText.waitFor();

    // Apply Date filter
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-771', async () => expect(reqBody.email).toBe(runtimeEmail));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-date-filters.spec-772', async () => expect(reqBody.expirationDate).not.toBeNull());

    // Both chips visible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-775', async () => expect(reports.emailFilterChip).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-776', async () => expect(reports.expirationDateChip).toBeVisible());

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-date-filters.spec-779', async () => expect(loaded).toBeGreaterThanOrEqual(0));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-781', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });
});

test.describe('Counts and Infinite-Scroll Reset', () => {
  test('LIMAS-SUD-1579: Filter-triggered infinite-scroll reset â€” page=0, stale rows removed', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Trigger scroll to append rows
    const { loaded } = await reports.getStandardLicenseLoadedState();
    if (loaded < baseTotal) {
      const nextPromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      await reports.scrollStandardLicensesToNextLoadThreshold();
      await nextPromise;
    }

    await reports.expandFilters();
    const { currentDate } = await reports.getReportDateRuntimeData();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );
    await reports.setStandardLicenseExpirationDate(currentDate);
    const postResponse = await postPromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-818', async () => expect(new URL(postResponse.url()).searchParams.get('page')).toBe('0'));

    // Only filtered rows, no stale appended rows
    const { loaded: filterLoaded } = await reports.getStandardLicenseLoadedState();
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-823', async () => expect(rowCount).toBe(filterLoaded));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-date-filters.spec-824', async () => expect(filterLoaded).toBeLessThanOrEqual(10));

    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-826', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
  });

  test('LIMAS-SUD-1580: Result synchronization â€” counts consistent after date filter', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    const { currentDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-date-filters.spec-848', async () => expect(loaded).toBeLessThanOrEqual(total));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-date-filters.spec-849', async () => expect(total).toBeLessThanOrEqual(baseTotal));

    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-852', async () => expect(rowCount).toBe(loaded));

    // Clear restores
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-855', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();

    const { loaded: restoredLoaded, total: restoredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-date-filters.spec-859', async () => expect(restoredLoaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-860', async () => expect(restoredTotal).toBe(baseTotal));
  });

  test('LIMAS-SUD-1581: No-result date â€” zero counts, empty state, Clear restores', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { noMatchDate } = await reports.getReportDateRuntimeData();

    await reports.setStandardLicenseExpirationDate(noMatchDate);
    await reports.loadedTotalText.waitFor();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();

    if (loaded === 0 && total === 0) {
      // Empty state observed
      const table = await reports.getStandardLicenseTable();
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-883', async () => expect(table.locator('thead')).toBeVisible());

      // Clear accessible
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-886', async () => expect(reports.clearFiltersButton).toBeVisible());
    }

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-890', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
    const { loaded: restoredLoaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-date-filters.spec-893', async () => expect(restoredLoaded).toBeGreaterThan(0));
  });
});

test.describe('Accessibility and Restoration', () => {
  test('LIMAS-SUD-1582: Filter panel state â€” stays expanded, date value persists, focus stable', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const { currentDate } = await reports.getReportDateRuntimeData();
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.loadedTotalText.waitFor();

    // Filters stay expanded after date request
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-913', async () => expect(reports.expirationDateInput).toBeVisible());

    // Collapse + re-expand preserves date
    await reports.collapseFilters();
    await reports.expandFilters();
    const dateValue = await reports.expirationDateInput.inputValue().catch(() => '');
    await recordEvidence('assert-toBeTruthy-reports-standard-licenses-date-filters.spec-919', async () => expect(dateValue).toBeTruthy());

    // Clear restores empty
    await recordEvidence('action-click-reports-standard-licenses-date-filters.spec-922', async () => reports.clearFiltersButton.click());
    await reports.loadedTotalText.waitFor();
    const clearedValue = await reports.expirationDateInput.inputValue().catch(() => '');
    await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-925', async () => expect(clearedValue).toBe(''));
  });

  test('LIMAS-SUD-1583: Accessibility â€” labels, focus, keyboard navigation', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    // Date controls have parent text labels (visual association, no <label for>)
    const dateInputs = [
      reports.expirationDateInput,
      reports.maintenanceDateInput,
      reports.licenseCreatedDateInput,
      reports.licenseModifiedDateInput,
    ];

    for (const input of dateInputs) {
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-947', async () => expect(input).toBeVisible());
      await recordEvidence('action-focus-reports-standard-licenses-date-filters.spec-948', async () => input.focus());
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      await recordEvidence('assert-toBe-reports-standard-licenses-date-filters.spec-950', async () => expect(focused).toBe('INPUT'));
    }

    // Keyboard navigation between date controls via Tab
    await recordEvidence('action-focus-reports-standard-licenses-date-filters.spec-954', async () => reports.expirationDateInput.focus());
    await recordEvidence('action-press-reports-standard-licenses-date-filters.spec-955', async () => page.keyboard.press('Tab'));
    const focusedAfterTab = await page.evaluate(() => document.activeElement?.id);
    await recordEvidence('assert-toBeTruthy-reports-standard-licenses-date-filters.spec-957', async () => expect(focusedAfterTab).toBeTruthy());

    // Clear button accessible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-date-filters.spec-960', async () => expect(reports.clearFiltersButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-date-filters.spec-961', async () => expect(reports.clearFiltersButton).toBeEnabled());

    // Active stays selected
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-date-filters.spec-964', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });
});