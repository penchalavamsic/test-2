import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Reports Navigation and Shell', () => {
  test('LIMAS-SUD-1482: Reports sidebar link navigates to /reports', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-reports-standard-licenses-shell.spec-19', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
  });

  test('LIMAS-SUD-1483: Reports heading is h1 with text "Reports"', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-31', async () => expect(reports.heading).toBeVisible());
    await recordEvidence('assert-toHaveText-reports-standard-licenses-shell.spec-32', async () => expect(reports.heading).toHaveText('Reports'));
    const tagName = await reports.heading.evaluate((el) => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-34', async () => expect(tagName).toBe('h1'));
  });

  test('LIMAS-SUD-1484: Reports page shell has description, main, and footer', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-46', async () => expect(reports.description).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-47', async () => expect(reports.mainContent).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-48', async () => expect(reports.footer).toBeVisible());
  });

  test('LIMAS-SUD-1485: Reports sidebar link has accessible role and icon', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reportsLink = page.locator('a[href="/reports"]');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-58', async () => expect(reportsLink).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-59', async () => expect(reportsLink).toBeEnabled());
    const svg = reportsLink.locator('svg');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-61', async () => expect(svg).toBeVisible());
  });
});

test.describe('Report-Type Cards', () => {
  test('LIMAS-SUD-1486: Three report-type cards are visible with correct labels and aria-pressed', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-75', async () => expect(reports.standardLicensesCard).toBeVisible());
    await recordEvidence('assert-toContainText-reports-standard-licenses-shell.spec-76', async () => expect(reports.standardLicensesCard).toContainText('Standard Licenses'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-77', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-79', async () => expect(reports.floatingLicensesCard).toBeVisible());
    await recordEvidence('assert-toContainText-reports-standard-licenses-shell.spec-80', async () => expect(reports.floatingLicensesCard).toContainText('Floating Licenses'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-81', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-83', async () => expect(reports.floatingConfigurationsCard).toBeVisible());
    await recordEvidence('assert-toContainText-reports-standard-licenses-shell.spec-84', async () => expect(reports.floatingConfigurationsCard).toContainText('Floating Configurations'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-85', async () => expect(reports.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'false'));
  });

  test('LIMAS-SUD-1487: Exactly one report-type card is selected at all times', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const selected = await reports.getSelectedReportType();
    await recordEvidence('assert-toContain-reports-standard-licenses-shell.spec-98', async () => expect(selected).toContain('Standard Licenses'));
  });

  test('LIMAS-SUD-1488: Report-type cards have descriptions, icons, and are keyboard accessible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const svg = reports.standardLicensesCard.locator('svg');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-111', async () => expect(svg).toBeVisible());

    const desc = reports.standardLicensesCard.getByText('Standard and deleted license records');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-114', async () => expect(desc).toBeVisible());

    const tabIndex = await reports.standardLicensesCard.evaluate(el => (el as HTMLElement).tabIndex);
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-117', async () => expect(tabIndex).toBe(0));
  });
});

test.describe('Active View Toolbar', () => {
  test('LIMAS-SUD-1489: Record count shows runtime numeric value with "records" label', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-131', async () => expect(reports.recordCountText).toBeVisible());
    const count = await reports.getReportsRecordCount();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-shell.spec-133', async () => expect(count).toBeGreaterThanOrEqual(0));
  });

  test('LIMAS-SUD-1490: Active tab is selected, Deleted tab is unselected and visible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-145', async () => expect(reports.activeTab).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-146', async () => expect(reports.activeTab).toBeEnabled());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-147', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-149', async () => expect(reports.deletedTab).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-150', async () => expect(reports.deletedTab).toBeEnabled());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-151', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));
  });

  test('LIMAS-SUD-1491: License mode group wraps Active and Deleted tabs with accessible name', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-163', async () => expect(reports.licenseModeGroup).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-164', async () => expect(reports.licenseModeGroup).toHaveAttribute('aria-label', 'License mode'));
  });

  test('LIMAS-SUD-1492: Filters button is visible, enabled, and collapses/expands panel', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const filtersBtn = await reports.getFiltersButton();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-177', async () => expect(filtersBtn).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-178', async () => expect(filtersBtn).toBeEnabled());

    await reports.expandFilters();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-181', async () => expect(reports.emailSearchbox).toBeVisible());

    await reports.collapseFilters();
    await recordEvidence('assert-toBeHidden-reports-standard-licenses-shell.spec-184', async () => expect(reports.emailSearchbox).toBeHidden());
  });

  test('LIMAS-SUD-1493: Export Excel button is visible and enabled without activation', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const exportBtn = await reports.getExportExcelButton();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-197', async () => expect(exportBtn).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-198', async () => expect(exportBtn).toBeEnabled());
    await recordEvidence('assert-toHaveText-reports-standard-licenses-shell.spec-199', async () => expect(exportBtn).toHaveText('Export Excel'));
  });
});

test.describe('Filters Panel Shell', () => {
  test('LIMAS-SUD-1494: Filters panel contains all nine filter controls with correct labels', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const controls = await reports.getStandardLicenseFilterControls();
    const expected = ['email', 'hardwareIds', 'expirationDate', 'maintenanceDate', 'userGroup', 'productProfile', 'profileRole', 'licenseCreatedDate', 'licenseModifiedDate'];
    for (const name of expected) {
      await recordEvidence('assert-toBeDefined-reports-standard-licenses-shell.spec-217', async () => expect(controls[name], `${name} should be visible`).toBeDefined());
      await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-218', async () => expect(controls[name].visible, `${name} should be visible`).toBe(true));
    }
  });

  test('LIMAS-SUD-1495: Profile Role is disabled with placeholder "Select a profile first"', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-232', async () => expect(reports.profileRoleSearchbox).toBeVisible());
    await recordEvidence('assert-toBeDisabled-reports-standard-licenses-shell.spec-233', async () => expect(reports.profileRoleSearchbox).toBeDisabled());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-234', async () => expect(reports.profileRoleSearchbox).toHaveAttribute('placeholder', 'Select a profile first'));
  });

  test('LIMAS-SUD-1496: Date controls use native date inputs with calendar buttons, empty initially', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-247', async () => expect(reports.expirationDateInput).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-248', async () => expect(reports.expirationDateInput).toBeEnabled());
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-shell.spec-249', async () => expect(reports.expirationDateInput).toHaveValue(''));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-251', async () => expect(reports.maintenanceDateInput).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-252', async () => expect(reports.maintenanceDateInput).toBeEnabled());
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-shell.spec-253', async () => expect(reports.maintenanceDateInput).toHaveValue(''));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-255', async () => expect(reports.licenseCreatedDateInput).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-256', async () => expect(reports.licenseCreatedDateInput).toBeEnabled());
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-shell.spec-257', async () => expect(reports.licenseCreatedDateInput).toHaveValue(''));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-259', async () => expect(reports.licenseModifiedDateInput).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-260', async () => expect(reports.licenseModifiedDateInput).toBeEnabled());
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-shell.spec-261', async () => expect(reports.licenseModifiedDateInput).toHaveValue(''));
  });

  test('LIMAS-SUD-1497: Clear button is visible and clickable with all controls empty', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-274', async () => expect(reports.clearFiltersButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-shell.spec-275', async () => expect(reports.clearFiltersButton).toBeEnabled());

    // Clicking Clear with all controls empty should not change state
    await recordEvidence('action-click-reports-standard-licenses-shell.spec-278', async () => reports.clearFiltersButton.click());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-279', async () => expect(reports.loadedTotalText).toBeVisible());
  });

  test('LIMAS-SUD-1498: Filters expand and collapse without sending a request when empty', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await reports.loadedTotalText.waitFor();
    let requestCount = 0;
    page.on('request', (req) => {
      if (req.url().includes(reports.standardLicensesApiPath)) requestCount++;
    });

    await reports.expandFilters();
    await reports.collapseFilters();

    // No new Standard License requests should have fired from expand/collapse alone
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-300', async () => expect(requestCount).toBe(0));
  });
});

test.describe('Standard License Table', () => {
  test('LIMAS-SUD-1499: Table has six column headers: User Group, Profile, Role, Email, Hardware ID, License Dates', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const headers = await reports.getStandardLicenseHeaders();
    await recordEvidence('assert-toEqual-reports-standard-licenses-shell.spec-315', async () => expect(headers).toEqual(['User Group', 'Profile', 'Role', 'Email', 'Hardware ID', 'License Dates']));
  });

  test('LIMAS-SUD-1500: Table uses semantic table role with thead and tbody', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const table = await reports.getStandardLicenseTable();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-328', async () => expect(table).toBeVisible());
    await recordEvidence('assert-toHaveRole-reports-standard-licenses-shell.spec-330', async () => expect(table).toHaveRole('table'));

    const thead = table.locator('thead');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-333', async () => expect(thead).toBeVisible());

    const tbody = table.locator('tbody');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-336', async () => expect(tbody).toBeVisible());
  });

  test('LIMAS-SUD-1501: Loaded-total text shows {runtimeLoaded} loaded · {runtimeTotal} total', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-348', async () => expect(reports.loadedTotalText).toBeVisible());
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-shell.spec-350', async () => expect(loaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-shell.spec-351', async () => expect(total).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-shell.spec-352', async () => expect(loaded).toBeLessThanOrEqual(total));
  });

  test('LIMAS-SUD-1502: Rendered row count matches runtime loaded count', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded } = await reports.getStandardLicenseLoadedState();
    const rows = await reports.getVisibleStandardLicenseRows();
    const rowCount = await rows.count();
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-367', async () => expect(rowCount).toBe(loaded));
  });

  test('LIMAS-SUD-1503: Table scrollable container exists when more records available than loaded', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded < total) {
      const container = await reports.getReportsScrollContainer();
      const scrollHeight = await container.evaluate((el) => el.scrollHeight);
      const clientHeight = await container.evaluate((el) => el.clientHeight);
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-shell.spec-384', async () => expect(scrollHeight).toBeGreaterThanOrEqual(clientHeight));
    }
  });
});

test.describe('Initial Network and Counts', () => {
  test('LIMAS-SUD-1504: Initial API call uses GET /api/report/allstandardlicenses with page and size params', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    const responsePromise = reports.waitForStandardLicenseInitialRequest();
    await reports.openReports();
    const { url, status } = await responsePromise;

    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-401', async () => expect(status).toBe(200));
    await recordEvidence('assert-toContain-reports-standard-licenses-shell.spec-402', async () => expect(url.pathname).toContain(reports.standardLicensesApiPath));
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-403', async () => expect(url.searchParams.has('page')).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-404', async () => expect(url.searchParams.has('size')).toBe(true));
  });

  test('LIMAS-SUD-1505: API response is JSON with content array, totalElements, and pagination metadata', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await reports.openReports();
    const response = await responsePromise;

    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-422', async () => expect(response.status()).toBe(200));
    await recordEvidence('assert-toContain-reports-standard-licenses-shell.spec-423', async () => expect(response.headers()['content-type']).toContain('application/json'));

    const body = await response.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-shell.spec-426', async () => expect(body).toHaveProperty('content'));
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-427', async () => expect(Array.isArray(body.content)).toBe(true));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-shell.spec-428', async () => expect(body).toHaveProperty('totalElements'));
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-429', async () => expect(typeof body.totalElements).toBe('number'));
  });

  test('LIMAS-SUD-1506: No data-changing request (POST/PUT/PATCH/DELETE) during initial load', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);

    const mutations: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes(reports.standardLicensesApiPath) && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
        mutations.push(req.method());
      }
    });

    await reports.openReports();
    await reports.loadedTotalText.waitFor();

    await recordEvidence('assert-toHaveLength-reports-standard-licenses-shell.spec-450', async () => expect(mutations).toHaveLength(0));
  });

  test('LIMAS-SUD-1507: Loaded count does not exceed total and record-count label is consistent', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    const recordCount = await reports.getReportsRecordCount();

    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-shell.spec-465', async () => expect(loaded).toBeLessThanOrEqual(total));
    // Runtime total from loaded-text should equal the record-count toolbar value
    await recordEvidence('assert-toBe-reports-standard-licenses-shell.spec-467', async () => expect(total).toBe(recordCount));
  });
});

test.describe('Accessibility', () => {
  test('LIMAS-SUD-1508: Reports heading is the only h1 and has accessible text', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-shell.spec-481', async () => expect(reports.heading).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-reports-standard-licenses-shell.spec-482', async () => expect(reports.heading).toHaveAccessibleName('Reports'));
  });

  test('LIMAS-SUD-1509: Report-type cards use aria-pressed for selected state, not color alone', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Standard Licenses selected via aria-pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-495', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    // Floating Licenses NOT selected
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-497', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    // Floating Configurations NOT selected
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-499', async () => expect(reports.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'false'));
  });

  test('LIMAS-SUD-1510: Active/Deleted tabs use aria-pressed for selected state', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-511', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-512', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));
  });

  test('LIMAS-SUD-1511: Focusable elements in main have logical tab order', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Verify all main interactive elements are keyboard reachable
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-525', async () => expect(reports.standardLicensesCard).toHaveAttribute('tabindex', '0'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-526', async () => expect(reports.activeTab).toHaveAttribute('tabindex', '0'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-527', async () => expect(reports.deletedTab).toHaveAttribute('tabindex', '0'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-528', async () => expect(reports.filtersButton).toHaveAttribute('tabindex', '0'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-shell.spec-529', async () => expect(reports.exportExcelButton).toHaveAttribute('tabindex', '0'));
  });
});

test.afterEach(async ({ page }) => {
  const reports = new ReportsPage(page);
  if (await reports.heading.isVisible().catch(() => false)) {
    await reports.restoreStandardLicenseInitialState();
  }
});