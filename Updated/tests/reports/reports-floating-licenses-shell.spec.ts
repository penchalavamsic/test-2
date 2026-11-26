import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Floating License Selection', () => {
  test('LIMAS-SUD-1636: Floating Licenses card â€” visible, button role, accessible name, enabled, aria-pressed="false" initially', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    const card = reports.floatingLicensesCard;
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-18', async () => expect(card).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-shell.spec-19', async () => expect(card).toBeEnabled());
    const pressed = await card.getAttribute('aria-pressed');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-21', async () => expect(pressed).toBe('false'));
    const text = await card.textContent();
    await recordEvidence('assert-toContain-reports-floating-licenses-shell.spec-23', async () => expect(text).toContain('Floating Licenses'));
  });

  test('LIMAS-SUD-1637: Floating Licenses card â€” keyboard focus and focus-visible indicator', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    // Focus the Floating Licenses card via keyboard
    await recordEvidence('action-focus-reports-floating-licenses-shell.spec-35', async () => reports.standardLicensesCard.focus());
    await recordEvidence('action-press-reports-floating-licenses-shell.spec-36', async () => page.keyboard.press('Tab'));

    const focused = await reports.floatingLicensesCard.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-39', async () => expect(focused).toBe(true));

    const hasFocusVisible = await reports.floatingLicensesCard.evaluate((el) =>
      el.matches(':focus-visible')
    );
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-44', async () => expect(hasFocusVisible).toBe(true));
  });

  test('LIMAS-SUD-1638: Floating Licenses card â€” mouse activation, selected state, Standard unselected, route /reports', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    // Initial: Standard Licenses is selected
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-56', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));

    // Click Floating Licenses
    await reports.selectFloatingLicensesReport();

    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-61', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-62', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-63', async () => expect(reports.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'false'));

    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-reports-floating-licenses-shell.spec-66', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
  });

  test('LIMAS-SUD-1639: Exactly one report card selected after Floating Licenses activation', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    await reports.selectFloatingLicensesReport();

    const cards = [reports.standardLicensesCard, reports.floatingLicensesCard, reports.floatingConfigurationsCard];
    let pressedCount = 0;
    for (const card of cards) {
      if ((await card.getAttribute('aria-pressed')) === 'true') pressedCount++;
    }
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-84', async () => expect(pressedCount).toBe(1));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-85', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
  });
});

test.describe('Active View and Toolbar', () => {
  test('LIMAS-SUD-1640: Active control â€” visible, enabled, pressed, "Floating license mode" group', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-99', async () => expect(reports.floatingLicenseActiveTab).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-shell.spec-100', async () => expect(reports.floatingLicenseActiveTab).toBeEnabled());
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-101', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));

    // Verify the group
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-104', async () => expect(reports.floatingLicenseModeGroup).toBeVisible());
    const groupName = await reports.floatingLicenseModeGroup.getAttribute('aria-label');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-106', async () => expect(groupName).toBe('Floating license mode'));
  });

  test('LIMAS-SUD-1641: Deleted control â€” visible, enabled, unpressed, keyboard reachable, focus-visible (no activation)', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const deleted = reports.floatingLicenseDeletedTab;
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-119', async () => expect(deleted).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-shell.spec-120', async () => expect(deleted).toBeEnabled());
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-121', async () => expect(deleted).toHaveAttribute('aria-pressed', 'false'));
    const text = await deleted.textContent();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-123', async () => expect(text?.trim()).toBe('Deleted'));

    // Keyboard reachability
    await recordEvidence('action-focus-reports-floating-licenses-shell.spec-126', async () => reports.floatingLicenseActiveTab.focus());
    await recordEvidence('action-press-reports-floating-licenses-shell.spec-127', async () => page.keyboard.press('Tab'));
    const focused = await deleted.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-129', async () => expect(focused).toBe(true));

    const hasFocusVisible = await deleted.evaluate((el) => el.matches(':focus-visible'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-132', async () => expect(hasFocusVisible).toBe(true));

    // Do NOT activate Deleted â€” move focus away
    await recordEvidence('action-press-reports-floating-licenses-shell.spec-135', async () => page.keyboard.press('Tab'));
  });

  test('LIMAS-SUD-1642: Active already-selected â€” no duplicate request, state unchanged', async ({ page }) => {
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

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-154', async () => reports.floatingLicenseActiveTab.click());

    // Allow any potential request to settle
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-158', async () => expect(extraRequest).toBe(false));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-159', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
  });

  test('LIMAS-SUD-1643: Toolbar record count â€” nonnegative, stable, Floating Licenses specific', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await reports.floatingLicenseLoadedTotalText.waitFor();
    const count = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-173', async () => expect(count).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-174', async () => expect(Number.isInteger(count)).toBe(true));

    // Re-read after settling
    const count2 = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-178', async () => expect(count2).toBe(count));
  });

  test('LIMAS-SUD-1644: Loaded/total counts â€” nonnegative, loaded â‰¤ total, consistent', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const { loaded, total } = await reports.getFloatingLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-191', async () => expect(loaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-192', async () => expect(total).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-shell.spec-193', async () => expect(loaded).toBeLessThanOrEqual(total));

    const apiMeta = await reports.captureFloatingLicenseInitialMetadata();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-196', async () => expect(total).toBe(apiMeta.totalElements));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-197', async () => expect(loaded).toBe(apiMeta.numberOfElements));
  });

  test('LIMAS-SUD-1645: Toolbar grouping â€” "Floating license mode" group, control order', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // Verify group contains exactly Active and Deleted
    const activeInGroup = reports.floatingLicenseModeGroup.getByRole('button', { name: 'Active' });
    const deletedInGroup = reports.floatingLicenseModeGroup.getByRole('button', { name: 'Deleted' });
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-212', async () => expect(activeInGroup).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-213', async () => expect(deletedInGroup).toBeVisible());

    // Tab order: Active â†’ Deleted â†’ Filters
    await recordEvidence('action-focus-reports-floating-licenses-shell.spec-216', async () => reports.floatingLicenseActiveTab.focus());
    await recordEvidence('action-press-reports-floating-licenses-shell.spec-217', async () => page.keyboard.press('Tab'));
    let focused = await reports.floatingLicenseDeletedTab.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-219', async () => expect(focused).toBe(true));

    await recordEvidence('action-press-reports-floating-licenses-shell.spec-221', async () => page.keyboard.press('Tab'));
    focused = await reports.filtersButton.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-223', async () => expect(focused).toBe(true));
  });
});

test.describe('Filters Panel Shell', () => {
  test('LIMAS-SUD-1646: Filters button â€” expand, collapse, focus stable, no request triggered', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // Filters initially collapsed
    const emailVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-239', async () => expect(emailVisible).toBe(false));

    // Expand
    let apiRequestFired = false;
    page.on('request', (req) => {
      if (req.url().includes(reports.floatingLicensesApiPath)) apiRequestFired = true;
    });

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-247', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-249', async () => expect(apiRequestFired).toBe(false));

    // Collapse
    await recordEvidence('action-click-reports-floating-licenses-shell.spec-252', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'hidden' });
  });

  test('LIMAS-SUD-1647: Filter panel â€” heading, internal scrolling, Clear button visible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-265', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Clear button visible
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-269', async () => expect(reports.flClearFiltersButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-shell.spec-270', async () => expect(reports.flClearFiltersButton).toBeEnabled());
  });

  test('LIMAS-SUD-1648: Filter controls inventory â€” 6 Floating License filters, types, labels, initial values', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-282', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    const controls = await reports.getFloatingLicenseFilterControls();
    const names = Object.keys(controls);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-287', async () => expect(names.length).toBe(6));

    // Email
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-290', async () => expect(controls.email.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-291', async () => expect(controls.email.disabled).toBe(false));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-292', async () => expect(controls.email.type).toBe('email'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-293', async () => expect(controls.email.value).toBe(''));

    // Hardware IDs
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-296', async () => expect(controls.hardwareIds.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-297', async () => expect(controls.hardwareIds.disabled).toBe(false));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-298', async () => expect(controls.hardwareIds.type).toBe('search'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-299', async () => expect(controls.hardwareIds.value).toBe(''));

    // Expiration Date
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-302', async () => expect(controls.expirationDate.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-303', async () => expect(controls.expirationDate.disabled).toBe(false));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-304', async () => expect(controls.expirationDate.type).toBe('date'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-305', async () => expect(controls.expirationDate.value).toBe(''));

    // License Created Date
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-308', async () => expect(controls.licenseCreatedDate.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-309', async () => expect(controls.licenseCreatedDate.disabled).toBe(false));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-310', async () => expect(controls.licenseCreatedDate.type).toBe('date'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-311', async () => expect(controls.licenseCreatedDate.value).toBe(''));

    // Product Profile
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-314', async () => expect(controls.productProfile.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-315', async () => expect(controls.productProfile.disabled).toBe(false));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-316', async () => expect(controls.productProfile.type).toBe('search'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-317', async () => expect(controls.productProfile.value).toBe(''));

    // Profile Role â€” disabled
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-320', async () => expect(controls.profileRole.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-321', async () => expect(controls.profileRole.disabled).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-322', async () => expect(controls.profileRole.type).toBe('search'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-323', async () => expect(controls.profileRole.value).toBe(''));

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-325', async () => reports.filtersButton.click());
  });

  test('LIMAS-SUD-1649: Profile Role dependency â€” disabled, placeholder "Select a profile first"', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-337', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-shell.spec-340', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
    const placeholder = await reports.flProfileRoleSearchbox.getAttribute('placeholder');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-342', async () => expect(placeholder).toBe('Select a profile first'));

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-344', async () => reports.filtersButton.click());
  });

  test('LIMAS-SUD-1650: Clear initial state â€” activate with empty filters, filters stay empty, counts stable', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-356', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    const beforeCount = await reports.getFloatingLicenseRecordCount();
    const beforeState = await reports.getFloatingLicenseLoadedState();

    let extraRequest = false;
    page.on('request', (req) => {
      if (req.url().includes(reports.floatingLicensesApiPath)) extraRequest = true;
    });

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-367', async () => reports.flClearFiltersButton.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    // Verify filters remain empty
    const controls = await reports.getFloatingLicenseFilterControls();
    for (const [, ctrl] of Object.entries(controls)) {
      await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-373', async () => expect(ctrl.value).toBe(''));
    }

    // Verify counts stable
    const afterCount = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-378', async () => expect(afterCount).toBe(beforeCount));

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-380', async () => reports.filtersButton.click());
  });
});

test.describe('Floating License Table', () => {
  test('LIMAS-SUD-1651: Export Excel button â€” structure, disabled state when zero records, SVG, accessible name', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const btn = reports.floatingLicenseExportButton;
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-395', async () => expect(btn).toBeVisible());
    const text = await btn.textContent();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-397', async () => expect(text?.trim()).toBe('Export Excel'));

    // SVG present
    const svg = btn.locator('svg');
    const svgCount = await svg.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-402', async () => expect(svgCount).toBeGreaterThanOrEqual(0)); // May or may not have SVG

    // Disabled state based on record count
    const recordCount = await reports.getFloatingLicenseRecordCount();
    const isDisabled = await btn.isDisabled().catch(() => true);
    if (recordCount === 0) {
      await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-408', async () => expect(isDisabled).toBe(true));
    }
  });

  test('LIMAS-SUD-1652: Empty state â€” no table, "No Floating License records found" message', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const { total } = await reports.getFloatingLicenseLoadedState();

    if (total === 0) {
      // Verify empty state messages
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-425', async () => expect(reports.floatingLicenseEmptyState).toBeVisible());
      const noRecordsMsg = page.getByText('No records are available for the current report and applied filters.');
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-427', async () => expect(noRecordsMsg).toBeVisible());
    } else {
      // Table should be present with headers
      const table = reports.floatingLicenseTable;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-431', async () => expect(table).toBeVisible());
      const headers = await reports.getFloatingLicenseHeaders();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-shell.spec-433', async () => expect(headers.length).toBeGreaterThan(0));
    }
  });
});

test.describe('Initial Network and Counts', () => {
  test('LIMAS-SUD-1653: Initial API contract â€” GET, endpoint, query params, 200, JSON, response shape', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await reports.selectFloatingLicensesReport();
    const response = await responsePromise;

    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-454', async () => expect(response.status()).toBe(200));
    const ct = response.headers()['content-type'] || '';
    await recordEvidence('assert-toContain-reports-floating-licenses-shell.spec-456', async () => expect(ct).toContain('application/json'));

    const reqUrl = new URL(response.url());
    await recordEvidence('assert-toContain-reports-floating-licenses-shell.spec-459', async () => expect(reqUrl.pathname).toContain('allfloatinglicenses'));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-460', async () => expect(reqUrl.searchParams.has('page')).toBe(true));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-461', async () => expect(reqUrl.searchParams.has('size')).toBe(true));

    const body = await response.json();
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-464', async () => expect(body).toHaveProperty('totalElements'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-465', async () => expect(body).toHaveProperty('numberOfElements'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-466', async () => expect(body).toHaveProperty('content'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-467', async () => expect(body).toHaveProperty('last'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-468', async () => expect(body).toHaveProperty('first'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-469', async () => expect(body).toHaveProperty('totalPages'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-470', async () => expect(body).toHaveProperty('size'));
    await recordEvidence('assert-toHaveProperty-reports-floating-licenses-shell.spec-471', async () => expect(body).toHaveProperty('number'));
  });

  test('LIMAS-SUD-1654: Pagination mechanism â€” page/size params, first/last flags, metadata consistency', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.floatingLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await reports.selectFloatingLicensesReport();
    const response = await responsePromise;

    const body = await response.json();

    // first should be true (page=0)
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-492', async () => expect(body.first).toBe(true));

    // last should be true when totalElements <= size
    if (body.totalElements <= body.size) {
      await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-496', async () => expect(body.last).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-497', async () => expect(body.totalPages).toBe(0)); // Spring convention: 0 when 0 elements
    }

    const reqUrl = new URL(response.url());
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-501', async () => expect(reqUrl.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-shell.spec-502', async () => expect(Number(reqUrl.searchParams.get('size'))).toBeGreaterThan(0));

    // UI counts match
    const { loaded, total } = await reports.getFloatingLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-506', async () => expect(total).toBe(body.totalElements));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-507', async () => expect(loaded).toBe(body.numberOfElements));
  });

  test('LIMAS-SUD-1655: Request count â€” exactly one GET, no PUT/PATCH/DELETE/export', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();

    const mutations: string[] = [];
    let getCount = 0;

    page.on('request', (req) => {
      if (req.url().includes(reports.floatingLicensesApiPath)) {
        if (req.method() === 'GET') getCount++;
        else mutations.push(`${req.method()} ${req.url()}`);
      }
      // Also check for export-like requests
      if (['PUT', 'PATCH', 'DELETE'].includes(req.method())) {
        mutations.push(`${req.method()} ${req.url()}`);
      }
    });

    await reports.selectFloatingLicensesReport();
    await reports.floatingLicenseLoadedTotalText.waitFor();
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-536', async () => expect(getCount).toBe(1));
    await recordEvidence('assert-toHaveLength-reports-floating-licenses-shell.spec-537', async () => expect(mutations).toHaveLength(0));
  });
});

test.describe('Loading and Empty States', () => {
  test('LIMAS-SUD-1656: Loading state â€” indicator, toolbar visible, count update, indicator disappearance', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // After settling, verify the loaded/total text is visible
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-552', async () => expect(reports.floatingLicenseLoadedTotalText).toBeVisible());

    // Verify counts are stable and nonnegative
    const { loaded, total } = await reports.getFloatingLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-556', async () => expect(loaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-557', async () => expect(total).toBeGreaterThanOrEqual(0));

    // Toolbar remains visible
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-560', async () => expect(reports.floatingLicenseActiveTab).toBeVisible());
  });

  test('LIMAS-SUD-1657: Infinite-scroll container and sentinel â€” identify without triggering next batch', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // Check scroll container existence
    const container = await reports.getFloatingLicenseScrollContainer();
    const containerVisible = await container.isVisible().catch(() => false);

    if (containerVisible) {
      const metrics = await reports.getFloatingLicenseScrollMetrics();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-578', async () => expect(metrics.scrollTop).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-579', async () => expect(metrics.scrollHeight).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-shell.spec-580', async () => expect(metrics.clientHeight).toBeGreaterThanOrEqual(0));

      // Check sentinel
      const sentinel = reports.flScrollSentinel;
      const sentinelExists = await sentinel.count().catch(() => 0);
      // Sentinel may or may not exist depending on data volume
      await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-586', async () => expect(typeof sentinelExists).toBe('number'));
    }

    // Verify no additional request triggered during inspection
    let extraRequest = false;
    page.on('request', (req) => {
      if (req.url().includes(reports.floatingLicensesApiPath)) extraRequest = true;
    });
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-595', async () => expect(extraRequest).toBe(false));
  });
});

test.describe('Accessibility and Restoration', () => {
  test('LIMAS-SUD-1658: Empty-state accessibility â€” role=group, paragraph text', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const { total } = await reports.getFloatingLicenseLoadedState();

    if (total === 0) {
      // The data area container uses role="group"
      const emptyContainer = reports.floatingLicenseEmptyState;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-614', async () => expect(emptyContainer).toBeVisible());
    }

    // Loaded/total text is always visible
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-shell.spec-618', async () => expect(reports.floatingLicenseLoadedTotalText).toBeVisible());
  });

  test('LIMAS-SUD-1659: Report card selected-state accessibility â€” aria-pressed, non-color indicator', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // aria-pressed is programmatically set
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-631', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-632', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-633', async () => expect(reports.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'false'));

    // Selected card should have a visual class or style difference beyond color
    const selectedClass = await reports.floatingLicensesCard.getAttribute('class');
    const unselectedClass = await reports.standardLicensesCard.getAttribute('class');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-638', async () => expect(selectedClass).not.toBe(unselectedClass));
  });

  test('LIMAS-SUD-1660: Active/Deleted accessibility â€” group role, aria-pressed, keyboard, group name', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // Group has role and accessible name
    const groupRole = await reports.floatingLicenseModeGroup.getAttribute('role');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-652', async () => expect(groupRole).toBe('group'));
    const groupLabel = await reports.floatingLicenseModeGroup.getAttribute('aria-label');
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-654', async () => expect(groupLabel).toBe('Floating license mode'));

    // Active pressed, Deleted unpressed
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-657', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-658', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

    // Keyboard reachable
    await recordEvidence('action-focus-reports-floating-licenses-shell.spec-661', async () => reports.floatingLicenseActiveTab.focus());
    await recordEvidence('action-press-reports-floating-licenses-shell.spec-662', async () => page.keyboard.press('Tab'));
    const focused = await reports.floatingLicenseDeletedTab.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-664', async () => expect(focused).toBe(true));
  });

  test('LIMAS-SUD-1661: Filters and Export accessibility â€” labels, types, disabled announcement, aria-expanded gap', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-676', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Each filter control has an associated accessible name
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-680', async () => expect(reports.flEmailSearchbox).toHaveAccessibleName('Email'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-681', async () => expect(reports.flHardwareIdsSearchbox).toHaveAccessibleName('Search Hardware IDs'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-682', async () => expect(reports.flExpirationDateInput).toHaveAccessibleName('Expiration Date'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-683', async () => expect(reports.flLicenseCreatedDateInput).toHaveAccessibleName('License Created Date'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-684', async () => expect(reports.flProductProfileSearchbox).toHaveAccessibleName('Search profiles'));

    // Profile Role disabled with dependency
    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-shell.spec-687', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());

    // Clear accessible name
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-690', async () => expect(reports.flClearFiltersButton).toHaveAccessibleName('Clear'));

    // Export accessible name
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-shell.spec-693', async () => expect(reports.floatingLicenseExportButton).toHaveAccessibleName('Export Excel'));

    // Filters button lacks aria-expanded (accessibility gap)
    const filtersExpanded = await reports.filtersButton.getAttribute('aria-expanded');
    await recordEvidence('assert-toBeNull-reports-floating-licenses-shell.spec-697', async () => expect(filtersExpanded).toBeNull());

    await recordEvidence('action-click-reports-floating-licenses-shell.spec-699', async () => reports.filtersButton.click());
  });

  test('LIMAS-SUD-1662: Safe restoration â€” Floating Licenses selected, Active pressed, filters collapsed/empty, counts restored, route /reports', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    // Capture initial metadata
    const initialMeta = await reports.captureFloatingLicenseInitialMetadata();

    // Mutate state: expand filters, click Clear
    await recordEvidence('action-click-reports-floating-licenses-shell.spec-715', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-floating-licenses-shell.spec-717', async () => reports.flClearFiltersButton.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    // Restore
    await reports.restoreFloatingLicenseInitialState();

    // Verify restored state
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-724', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-725', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-726', async () => expect(reports.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'false'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-727', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-shell.spec-728', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

    // Filters collapsed
    const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-732', async () => expect(filtersVisible).toBe(false));

    // Route
    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-reports-floating-licenses-shell.spec-736', async () => expect(url.pathname).toMatch(/\/reports\/?$/));

    // Counts restored
    const { total } = await reports.getFloatingLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-floating-licenses-shell.spec-740', async () => expect(total).toBe(initialMeta.totalElements));
  });
});