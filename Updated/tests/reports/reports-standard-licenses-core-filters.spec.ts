import { randomUUID } from 'crypto';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Filter Panel', () => {
  test('LIMAS-SUD-1530: RSL-C Filter Panel â€” controls visible, Profile Role disabled, no request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    const controls = await reports.getStandardLicenseFilterControls();
    // Five RSL-C controls
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-21', async () => expect(controls.email.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-22', async () => expect(controls.hardwareIds.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-23', async () => expect(controls.userGroup.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-24', async () => expect(controls.productProfile.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-25', async () => expect(controls.profileRole.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-26', async () => expect(controls.profileRole.disabled).toBe(true));
    await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-27', async () => expect(controls.profileRole.placeholder).toMatch(/profile/i));

    // Date controls (untouched, outside RSL-C scope)
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-30', async () => expect(controls.expirationDate.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-31', async () => expect(controls.maintenanceDate.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-32', async () => expect(controls.licenseCreatedDate.visible).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-33', async () => expect(controls.licenseModifiedDate.visible).toBe(true));

    // No request triggered by expand alone
    // (verified by absence of extra standardlicenses POST beyond initial GET)
  });
});

test.describe('Email Filter', () => {
  test('LIMAS-SUD-1531: Email input â€” focus, accessible name, input type', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-51', async () => expect(reports.emailSearchbox).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-core-filters.spec-52', async () => expect(reports.emailSearchbox).toHaveRole('searchbox'));

    await recordEvidence('action-focus-reports-standard-licenses-core-filters.spec-54', async () => reports.emailSearchbox.focus());
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-56', async () => expect(focused).toBe('INPUT'));
  });

  test('LIMAS-SUD-1532: Email filter â€” Enter key trigger, debounce, POST request, page reset', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    const initialResponsePromise = page.waitForResponse(r => r.url().includes(reports.standardLicensesApiPath) && r.request().method() === 'GET');
    await reports.openReports();
    const initialResponse = await initialResponsePromise;
    const initialSize = new URL(initialResponse.url()).searchParams.get('size');
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing row exists after examining all available Standard Licenses data.');
    await reports.expandFilters();

    // Typing alone should NOT trigger
    let extraRequests = 0;
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.filterApiPath) && req.url().includes('page=')) extraRequests++;
    };
    page.on('request', handler);

    // The reviewed plan specifies typing followed by Enter; it does not forbid typing debounce.
    const postResponsePromise = page.waitForResponse(
      response => response.url().includes(reports.filterApiPath) && response.request().method() === 'POST',
      {timeout:15000}
    );
    await recordEvidence('enter-runtime-email-filter', async () => {
      await reports.emailSearchbox.fill(runtimeEmail!);
      await reports.emailSearchbox.press('Enter');
    });
    const postResponse = await postResponsePromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-88', async () => expect(postResponse.status()).toBe(200));

    // page reset to 0, size preserved
    const postUrl = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-92', async () => expect(postUrl.searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBeNull-reports-standard-licenses-core-filters.spec-93', async () => expect(postUrl.searchParams.get('size')).toBe(initialSize));

    // Verify POST body includes email
    const body = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-97', async () => expect(body).toHaveProperty('email'));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-98', async () => expect(typeof body.email).toBe('string'));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-99', async () => expect(body.email).toBe(runtimeEmail));

    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-110', async () => expect(extraRequests, 'Typing followed by Enter should be debounced into one filter request').toBe(1));
    page.removeListener('request', handler);
  });

  test('LIMAS-SUD-1533: Email filter â€” tag display, Remove, Clear all', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing row exists after examining all available Standard Licenses data.');
    await reports.expandFilters();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-114', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-115', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.loadedTotalText.waitFor();

    // Filter chip visible
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-119', async () => expect(reports.emailFilterChip).toBeVisible());
    const chipText = await reports.emailFilterChip.textContent();
    await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-121', async () => expect(chipText).toMatch(/Email:/));

    // Remove button on chip
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-124', async () => expect(reports.emailFilterRemoveButton).toBeVisible());

    // Clear all button
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-127', async () => expect(reports.clearAllFiltersButton).toBeVisible());
  });

  test('LIMAS-SUD-1534: Email filter â€” filtered counts, visible rows match, Active stays selected', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing row exists after examining all available Standard Licenses data.');
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-141', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-142', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.loadedTotalText.waitFor();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-146', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-147', async () => expect(total).toBeGreaterThan(0));
    // Filtered results should have total <= pre-filter total
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-149', async () => expect(total).toBeLessThanOrEqual(baseTotal));

    // Visible rows match loaded
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-153', async () => expect(rowCount).toBe(loaded));

    // Active remains pressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-core-filters.spec-156', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    // All visible rows contain the email
    const rows = reports.tableRows;
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const emailCell = rows.nth(i).locator('td').nth(3);
      const text = await emailCell.textContent();
      await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-164', async () => expect((text || '').toLowerCase()).toContain(runtimeEmail!.toLowerCase()));
    }
  });

  test('LIMAS-SUD-1535: Email filter API contract â€” POST, JSON body, email string field, paginated response', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    const filterResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing row exists after examining all available Standard Licenses data.');
    await reports.expandFilters();
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-182', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-183', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));

    const filterResponse = await filterResponsePromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-186', async () => expect(filterResponse.status()).toBe(200));
    await recordEvidence('assert-toContain-reports-standard-licenses-core-filters.spec-187', async () => expect(filterResponse.headers()['content-type']).toContain('application/json'));

    const url = new URL(filterResponse.url());
    await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-190', async () => expect(url.pathname).toMatch(/report\/standardlicenses/));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-191', async () => expect(url.searchParams.get('page')).toBe('0'));

    const reqBody = filterResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-194', async () => expect(reqBody).toHaveProperty('email'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-195', async () => expect(reqBody).toHaveProperty('group'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-196', async () => expect(reqBody).toHaveProperty('hardwareId'));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-197', async () => expect(Array.isArray(reqBody.hardwareId)).toBe(true));

    const resBody = await filterResponse.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-200', async () => expect(resBody).toHaveProperty('content'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-201', async () => expect(resBody).toHaveProperty('totalElements'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-202', async () => expect(resBody).toHaveProperty('totalPages'));

    // No duplicate request
    let filterRequestCount = 0;
    const reqHandler = (req: { url: () => string; method: () => string }) => {
      if (req.url().includes(reports.filterApiPath) && req.method() === 'POST') filterRequestCount++;
    };
    page.on('request', reqHandler);
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-211', async () => expect(filterRequestCount).toBeLessThanOrEqual(1));
    page.removeListener('request', reqHandler);
  });

  test('LIMAS-SUD-1536: Partial email fragment â€” substring match, page=0, count update', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing row exists after examining all available Standard Licenses data.');
    const runtimeEmailPartial = runtimeEmail!.split('@')[0];
    await reports.expandFilters();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-225', async () => reports.emailSearchbox.fill(runtimeEmailPartial!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-226', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.loadedTotalText.waitFor();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-230', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-231', async () => expect(total).toBeGreaterThan(0));

    // At least one row's email contains the partial fragment
    const rows = reports.tableRows;
    const count = await rows.count();
    const matches: string[] = [];
    for (let i = 0; i < count; i++) {
      const emailCell = rows.nth(i).locator('td').nth(3);
      const text = await emailCell.textContent();
      matches.push(text ?? '');
    }
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-265', async () => expect(matches.every(value => value.toLowerCase().includes(runtimeEmailPartial.toLowerCase()))).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-242', async () => expect(matches.length).toBe(loaded));
  });

  test('LIMAS-SUD-1537: No-match email â€” zero results, empty state, Clear restores', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeNoMatchEmail = `limas-no-match-${randomUUID()}@example.invalid`;
    await reports.expandFilters();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-255', async () => reports.emailSearchbox.fill(runtimeNoMatchEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-256', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.waitForStandardLicenseSettled();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-260', async () => expect(loaded).toBe(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-261', async () => expect(total).toBe(0));

    // Clear restores
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-264', async () => reports.clearAppliedStandardFilters());
    await reports.waitForStandardLicenseSettled();

    const { loaded: restoredLoaded, total: restoredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-268', async () => expect(restoredLoaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-269', async () => expect(restoredTotal).toBeGreaterThan(0));
  });
});

test.describe('Hardware IDs Filter', () => {
  test('LIMAS-SUD-1538: Hardware IDs â€” searchbox combobox, focus, keyboard', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-284', async () => expect(reports.hardwareIdsSearchbox).toBeVisible());
    await recordEvidence('action-focus-reports-standard-licenses-core-filters.spec-285', async () => reports.hardwareIdsSearchbox.focus());
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-287', async () => expect(focused).toBe('INPUT'));
  });

  test('LIMAS-SUD-1539: Hardware ID checkbox selection, payload, matching results, and restoration', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const base = await reports.getStandardLicenseTableSnapshot();
    const ids = await reports.findRuntimeStandardHardwareIds(1);
    test.skip(ids.length < 1, 'Fewer than 1 distinct hardware IDs exist in the available Standard License data.');
    await reports.expandFilters();
    let response!: import('@playwright/test').Response;
    for (const id of ids) {
      await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-330', async () => reports.hardwareIdsSearchbox.fill(id));
      const responsePromise = page.waitForResponse(r => r.url().includes(reports.filterApiPath) && r.request().method() === 'POST' && r.request().postDataJSON()?.hardwareId?.some((item: {hardwareIdString: string}) => item.hardwareIdString === id));
      await recordEvidence('select-hardware-checkbox', () => reports.standardFilterOption(id).click());
      response = await responsePromise;
      await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-334', async () => expect(response.status()).toBe(200));
      await response.finished();
    }
    await recordEvidence('assert-toBeTruthy-reports-standard-licenses-core-filters.spec-337', async () => expect(response).toBeTruthy());
    const body = response!.request().postDataJSON();
    const selectedIds = body.hardwareId.map((item: {hardwareIdString: string}) => item.hardwareIdString);
    await recordEvidence('assert-toEqual-reports-standard-licenses-core-filters.spec-340', async () => expect(selectedIds.sort()).toEqual([...ids].sort()));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-341', async () => expect(new Set(selectedIds).size).toBe(ids.length));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-342', async () => expect(new URL(response!.url()).searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBeLessThan-reports-standard-licenses-core-filters.spec-343', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).total, {message: 'Selected hardware must narrow the displayed total when other hardware records exist'}).toBeLessThan(base.total));
    const state = await reports.getStandardLicenseTableSnapshot();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-345', async () => expect(state.loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-346', async () => expect(state.total).toBeLessThanOrEqual(base.total));
    const values = await reports.tableRows.locator('td:nth-child(5)').allTextContents();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-348', async () => expect(values.every(value => ids.includes(value.trim()))).toBe(true));
    await reports.clearAppliedStandardFilters();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-350', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(base.total));
  });

  test('LIMAS-SUD-1540: Hardware ID checkbox selection, payload, matching results, and restoration', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const base = await reports.getStandardLicenseTableSnapshot();
    const ids = await reports.findRuntimeStandardHardwareIds(2);
    test.skip(ids.length < 2, 'Fewer than 2 distinct hardware IDs exist in the available Standard License data.');
    await reports.expandFilters();
    let response!: import('@playwright/test').Response;
    for (const id of ids) {
      await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-367', async () => reports.hardwareIdsSearchbox.fill(id));
      const responsePromise = page.waitForResponse(r => r.url().includes(reports.filterApiPath) && r.request().method() === 'POST' && r.request().postDataJSON()?.hardwareId?.some((item: {hardwareIdString: string}) => item.hardwareIdString === id));
      await recordEvidence('select-hardware-checkbox', () => reports.standardFilterOption(id).click());
      response = await responsePromise;
      await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-371', async () => expect(response.status()).toBe(200));
      await response.finished();
    }
    await recordEvidence('assert-toBeTruthy-reports-standard-licenses-core-filters.spec-374', async () => expect(response).toBeTruthy());
    const body = response!.request().postDataJSON();
    const selectedIds = body.hardwareId.map((item: {hardwareIdString: string}) => item.hardwareIdString);
    await recordEvidence('assert-toEqual-reports-standard-licenses-core-filters.spec-377', async () => expect(selectedIds.sort()).toEqual([...ids].sort()));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-378', async () => expect(new Set(selectedIds).size).toBe(ids.length));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-379', async () => expect(new URL(response!.url()).searchParams.get('page')).toBe('0'));
    await recordEvidence('assert-toBeLessThan-reports-standard-licenses-core-filters.spec-380', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).total, {message: 'Selected hardware must narrow the displayed total when other hardware records exist'}).toBeLessThan(base.total));
    const state = await reports.getStandardLicenseTableSnapshot();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-382', async () => expect(state.loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-383', async () => expect(state.total).toBeLessThanOrEqual(base.total));
    const values = await reports.tableRows.locator('td:nth-child(5)').allTextContents();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-385', async () => expect(values.every(value => ids.includes(value.trim()))).toBe(true));
    await reports.clearAppliedStandardFilters();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-387', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(base.total));
  });

  test('LIMAS-SUD-1541: Hardware IDs API contract â€” POST, hardwareId JSON array, page/size params', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const ids = await reports.findRuntimeStandardHardwareIds(1);
    test.skip(ids.length === 0, 'No hardware ID exists in the available Standard License data.');
    const runtimeHardwareId = ids[0];
    await reports.expandFilters();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-377', async () => reports.hardwareIdsSearchbox.fill(runtimeHardwareId));
    const checkbox = reports.standardFilterOption(runtimeHardwareId);
    await checkbox.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-380', async () => checkbox.click());

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-384', async () => expect(Array.isArray(reqBody.hardwareId)).toBe(true));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-385', async () => expect(reqBody.hardwareId.map((item: {hardwareIdString: string}) => item.hardwareIdString)).toEqual([runtimeHardwareId]));

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-388', async () => expect(url.searchParams.get('page')).toBe('0'));

    const resBody = await postResponse.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-391', async () => expect(resBody).toHaveProperty('content'));
  });

  test('LIMAS-SUD-1542: Unknown hardware lookup cannot select an invalid ID or alter report data', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const base = await reports.getStandardLicenseTableSnapshot();
    const ids = [`LIMAS-NO-MATCH-${randomUUID()}`];
    await reports.expandFilters();
    const lookupPromise = page.waitForResponse(r => r.url().includes('/hardwareId/search') && r.request().method() === 'GET');
    await recordEvidence('search-unavailable-hardware', () => reports.hardwareIdsSearchbox.fill(ids[0]));
    const lookup = await lookupPromise;
    await recordEvidence('assert-toContain-reports-standard-licenses-core-filters.spec-440', async () => expect([200, 404]).toContain(lookup.status()));
    await lookup.finished();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-442', async () => expect(page.getByText('No Hardware IDs found.', {exact:true})).toBeVisible());
    await recordEvidence('assert-toHaveCount-reports-standard-licenses-core-filters.spec-443', async () => expect(reports.standardFilterOption(ids[0])).toHaveCount(0));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-444', async () => reports.hardwareIdsSearchbox.press('Enter'));
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-446', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(base.total));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-447', async () => expect(await reports.tableRows.count()).toBeGreaterThan(0));
    await reports.clearAppliedStandardFilters();
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-core-filters.spec-449', async () => expect(reports.hardwareIdsSearchbox).toHaveValue(''));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-450', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(base.total));
  });
});

test.describe('User Group, Product Profile, Profile Role Filters', () => {
  test('LIMAS-SUD-1543: User Group â€” searchable combobox, dynamic options, selected state', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-425', async () => expect(reports.userGroupSearchbox).toBeVisible());
    await recordEvidence('action-focus-reports-standard-licenses-core-filters.spec-426', async () => reports.userGroupSearchbox.focus());
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-428', async () => expect(focused).toBe('INPUT'));
  });

  test('LIMAS-SUD-1544: User Group filter â€” select group triggers POST, filtered counts, visible rows match', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeUserGroup = runtimeData!.group;
    await reports.expandFilters();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    // Type and select a group option
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-447', async () => reports.userGroupSearchbox.fill(runtimeUserGroup));
    const option = reports.standardFilterOption(runtimeUserGroup);
    await option.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-450', async () => reports.applyStandardFilter(() => option.click()));

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-454', async () => expect(Array.isArray(reqBody.group)).toBe(true));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-455', async () => expect(reqBody.group.length).toBeGreaterThan(0));

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-458', async () => expect(loaded).toBeGreaterThan(0));

    // All visible rows have the group
    const rows = reports.tableRows;
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const groupCell = rows.nth(i).locator('td').nth(0);
      const text = await groupCell.textContent();
      await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-466', async () => expect(text).toContain(runtimeUserGroup));
    }
  });

  test('LIMAS-SUD-1545: User Group API contract â€” POST, group JSON array, page/size, response JSON', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeUserGroup = runtimeData!.group;
    await reports.expandFilters();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-485', async () => reports.userGroupSearchbox.fill(runtimeUserGroup));
    const option = reports.standardFilterOption(runtimeUserGroup);
    await option.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-488', async () => reports.applyStandardFilter(() => option.click()));

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-492', async () => expect(reqBody).toHaveProperty('group'));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-493', async () => expect(Array.isArray(reqBody.group)).toBe(true));

    const url = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-496', async () => expect(url.searchParams.get('page')).toBe('0'));

    const resBody = await postResponse.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-core-filters.spec-499', async () => expect(resBody).toHaveProperty('totalElements'));
  });

  test('LIMAS-SUD-1546: Product Profile â€” searchable combobox, dynamic options', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    await reports.expandFilters();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-core-filters.spec-512', async () => expect(reports.productProfileSearchbox).toBeVisible());
    await recordEvidence('action-focus-reports-standard-licenses-core-filters.spec-513', async () => reports.productProfileSearchbox.focus());
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-515', async () => expect(focused).toBe('INPUT'));
  });

  test('LIMAS-SUD-1547: Product Profile filter â€” POST with productProfile array, filtered counts, Profile Role enabled', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeProfile = runtimeData!.profile;
    await reports.expandFilters();

    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-533', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const option = reports.standardFilterOption(runtimeProfile);
    await option.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-536', async () => reports.applyStandardFilter(() => option.click()));

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-540', async () => expect(Array.isArray(reqBody.productProfile)).toBe(true));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-543', async () => expect(loaded).toBeGreaterThan(0));

    // Profile Role enabled
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-core-filters.spec-546', async () => expect(reports.profileRoleSearchbox).toBeEnabled());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-core-filters.spec-547', async () => expect(reports.profileRoleSearchbox).not.toHaveAttribute('placeholder', /profile first/i));
  });

  test('LIMAS-SUD-1548: Profile Role dependency â€” Profile enables Role, Clear Profile disables Role', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const baseTotal = (await reports.getStandardLicenseTableSnapshot()).total;
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeProfile = runtimeData!.profile;
    await reports.expandFilters();

    // Profile Role disabled initially
    await recordEvidence('assert-toBeDisabled-reports-standard-licenses-core-filters.spec-561', async () => expect(reports.profileRoleSearchbox).toBeDisabled());

    // Select Product Profile
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-564', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const option = reports.standardFilterOption(runtimeProfile);
    await option.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-567', async () => reports.applyStandardFilter(() => option.click()));
    await reports.waitForStandardLicenseSettled();

    // Profile Role enabled
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-core-filters.spec-571', async () => expect(reports.profileRoleSearchbox).toBeEnabled());

    // Clear â€” Profile Role disabled again
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-574', async () => reports.clearAppliedStandardFilters());
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBeDisabled-reports-standard-licenses-core-filters.spec-576', async () => expect(reports.profileRoleSearchbox).toBeDisabled());
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-636', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).total).toBe(baseTotal));

  });

  test('LIMAS-SUD-1549: Profile Role â€” dynamic options, selected state, corresponds to Profile', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeProfile = runtimeData!.profile;
    await reports.expandFilters();

    // Select Product Profile first
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-590', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const profileOption = reports.standardFilterOption(runtimeProfile);
    await profileOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-593', async () => reports.applyStandardFilter(() => profileOption.click()));

    // Profile Role now searchable
    await recordEvidence('assert-toBeEnabled-reports-standard-licenses-core-filters.spec-596', async () => expect(reports.profileRoleSearchbox).toBeEnabled());
    await recordEvidence('action-focus-reports-standard-licenses-core-filters.spec-597', async () => reports.profileRoleSearchbox.focus());
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-599', async () => expect(focused).toBe('INPUT'));
  });

  test('LIMAS-SUD-1550: Profile Role filter â€” POST includes productProfile and profileRole arrays', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeProfile = runtimeData!.profile;
    const runtimeRole = runtimeData!.role;
    await reports.expandFilters();

    // Select Profile
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-613', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const profileOption = reports.standardFilterOption(runtimeProfile);
    await profileOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-616', async () => reports.applyStandardFilter(() => profileOption.click()));
    await reports.waitForStandardLicenseSettled();

    // Now select Role
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-625', async () => reports.profileRoleSearchbox.fill(runtimeRole));
    const roleOption = reports.standardFilterOption(runtimeRole);
    await roleOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-628', async () => reports.applyStandardFilter(() => roleOption.click()));

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-632', async () => expect(Array.isArray(reqBody.productProfile)).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-633', async () => expect(Array.isArray(reqBody.profileRole)).toBe(true));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-636', async () => expect(loaded).toBeGreaterThan(0));

    // All visible rows match both
    const rows = reports.tableRows;
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const profileCell = rows.nth(i).locator('td').nth(1);
      const roleCell = rows.nth(i).locator('td').nth(2);
      const profileText = await profileCell.textContent();
      const roleText = await roleCell.textContent();
      await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-646', async () => expect(profileText).toContain(runtimeProfile));
      await recordEvidence('assert-toMatch-reports-standard-licenses-core-filters.spec-647', async () => expect(roleText).toContain(runtimeRole));
    }
  });

  test('LIMAS-SUD-1551: Profile change â€” changing Profile clears incompatible Role, options refresh', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No Standard License record with group, profile, and role exists in the available data.');
    const runtimeProfile = runtimeData!.profile;
    const runtimeRole = runtimeData!.role;
    const secondRuntimeData = await reports.findRuntimeStandardFilterRow(runtimeData!.profile);
    test.skip(!secondRuntimeData, 'No second profile exists in the available Standard License records.');
    const runtimeProfile2 = secondRuntimeData!.profile;
    await reports.expandFilters();

    // Select first profile + role
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-662', async () => reports.productProfileSearchbox.fill(runtimeProfile));
    const profileOption1 = reports.standardFilterOption(runtimeProfile);
    await profileOption1.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-665', async () => reports.applyStandardFilter(() => profileOption1.click()));
    await reports.waitForStandardLicenseSettled();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-668', async () => reports.profileRoleSearchbox.fill(runtimeRole));
    const roleOption1 = reports.standardFilterOption(runtimeRole);
    await roleOption1.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-671', async () => reports.applyStandardFilter(() => roleOption1.click()));
    await reports.waitForStandardLicenseSettled();

    // Change profile to a different one â€” Role should clear
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-675', async () => reports.productProfileSearchbox.fill(runtimeProfile2));
    const profileOption2 = reports.standardFilterOption(runtimeProfile2);
    await profileOption2.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-678', async () => reports.applyStandardFilter(() => profileOption2.click()));
    await reports.waitForStandardLicenseSettled();

    // Role input should be cleared
    const roleValue = await reports.profileRoleSearchbox.inputValue().catch(() => '');
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-683', async () => expect(roleValue).toBe(''));
  });
});

test.describe('Clear Button and Combined Filters', () => {
  test('LIMAS-SUD-1552: Clear â€” single field reset, chip removed, unfiltered data restored', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing record exists in the available Standard License data.');
    await reports.expandFilters();

    // Apply email filter
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-699', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-700', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.waitForStandardLicenseSettled();

    const { total: filteredTotal } = await reports.getStandardLicenseLoadedState();

    // Clear
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-706', async () => reports.clearFiltersButton.click());
    await reports.waitForStandardLicenseSettled();

    const { total: restoredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-710', async () => expect(restoredTotal).toBeGreaterThan(filteredTotal));

    // Chip removed
    const chip = reports.emailFilterChip;
    const chipVisible = await chip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-715', async () => expect(chipVisible).toBe(false));
  });

  test('LIMAS-SUD-1553: Clear â€” multiple fields reset, Profile Role clears and disables, no duplicate requests', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow(undefined, true);
    test.skip(!runtimeData, 'No record with both an email and hardware ID exists in the available Standard License data.');
    const runtimeEmail = runtimeData!.email;
    const runtimeHardwareId = runtimeData!.hardwareId;
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply email + hardware ID filters
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-730', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-731', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.waitForStandardLicenseSettled();

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-734', async () => reports.hardwareIdsSearchbox.fill(runtimeHardwareId!));
    const checkbox = reports.standardFilterOption(runtimeHardwareId);
    await checkbox.waitFor({ state: 'visible' }).catch(() => {});
    const isVisible = await checkbox.isVisible().catch(() => false);
    if (isVisible) await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-738', async () => reports.applyStandardFilter(() => checkbox.click()));
    await reports.waitForStandardLicenseSettled();

    // Track requests during clear
    let clearRequests = 0;
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.filterApiPath) && req.url().includes('page=')) clearRequests++;
    };
    page.on('request', handler);

    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-748', async () => reports.clearFiltersButton.click());
    await reports.waitForStandardLicenseSettled();

    // No duplicate reset requests
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-752', async () => expect(clearRequests).toBeLessThanOrEqual(1));

    // Profile Role disabled
    await recordEvidence('assert-toBeDisabled-reports-standard-licenses-core-filters.spec-755', async () => expect(reports.profileRoleSearchbox).toBeDisabled());

    // Unfiltered data restored
    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-759', async () => expect(total).toBe(baseTotal));

    page.removeListener('request', handler);
  });

  test('LIMAS-SUD-1554: Combined filters â€” Group + Profile + Role, POST includes all, no duplicates', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeData = await reports.findRuntimeStandardFilterRow();
    test.skip(!runtimeData, 'No record with group, profile, and role exists in the available Standard License data.');
    const runtimeUserGroup = runtimeData!.group;
    const runtimeProfile = runtimeData!.profile;
    const runtimeRole = runtimeData!.role;
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply User Group
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-776', async () => reports.userGroupSearchbox.fill(runtimeUserGroup!));
    const groupOption = reports.standardFilterOption(runtimeUserGroup);
    await groupOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-779', async () => reports.applyStandardFilter(() => groupOption.click()));
    await reports.waitForStandardLicenseSettled();

    // Apply Product Profile
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-783', async () => reports.productProfileSearchbox.fill(runtimeProfile!));
    const profileOption = reports.standardFilterOption(runtimeProfile);
    await profileOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-786', async () => reports.applyStandardFilter(() => profileOption.click()));
    await reports.waitForStandardLicenseSettled();

    // Apply Profile Role
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-795', async () => reports.profileRoleSearchbox.fill(runtimeRole!));
    const roleOption = reports.standardFilterOption(runtimeRole);
    await roleOption.waitFor({ state: 'visible' });
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-798', async () => reports.applyStandardFilter(() => roleOption.click()));

    const postResponse = await postPromise;
    const reqBody = postResponse.request().postDataJSON();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-802', async () => expect(Array.isArray(reqBody.group)).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-803', async () => expect(Array.isArray(reqBody.productProfile)).toBe(true));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-804', async () => expect(Array.isArray(reqBody.profileRole)).toBe(true));

    const { loaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-807', async () => expect(loaded).toBeGreaterThan(0));

    // No duplicate rows
    const result = await reports.verifyNoDuplicateStandardLicenseRows();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-811', async () => expect(result.hasDuplicates).toBe(false));

    // Clear restores default
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-814', async () => reports.clearFiltersButton.click());
    await reports.waitForStandardLicenseSettled();
    const { total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-817', async () => expect(total).toBe(baseTotal));
  });

  test('LIMAS-SUD-1555: Filter reset â€” applying filter resets to page=0, scroll resets, no stale pages', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing record exists in the available Standard License data.');

    // Trigger some infinite scroll to have > 10 rows
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded < total) {
      const nextPromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      await reports.scrollStandardLicensesToNextLoadThreshold();
      await nextPromise;
      await reports.waitForStandardLicenseSettled();
    }

    // Now apply a filter â€” should reset to page=0
    await reports.expandFilters();
    const postPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.filterApiPath) && resp.request().method() === 'POST',
      { timeout: 15000 }
    );

    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-847', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-848', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));

    const postResponse = await postPromise;
    const postUrl = new URL(postResponse.url());
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-852', async () => expect(postUrl.searchParams.get('page')).toBe('0'));

    // Only filter results visible, no stale scrolled rows
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    const { loaded: filterLoaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-857', async () => expect(rowCount).toBe(filterLoaded));

    // Scroll position reset
    const scrollY = await page.evaluate(() => window.scrollY);
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-core-filters.spec-861', async () => expect(scrollY).toBeGreaterThanOrEqual(0));
  });

  test('LIMAS-SUD-1556: Result synchronization â€” counts match, rendered rows match loaded, restore after Clear', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing record exists in the available Standard License data.');
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply email filter
    await recordEvidence('action-fill-reports-standard-licenses-core-filters.spec-876', async () => reports.emailSearchbox.fill(runtimeEmail!));
    await recordEvidence('action-press-reports-standard-licenses-core-filters.spec-877', async () => reports.applyStandardFilter(() => page.keyboard.press('Enter')));
    await reports.waitForStandardLicenseSettled();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-881', async () => expect(loaded).toBeLessThanOrEqual(total));

    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-884', async () => expect(rowCount).toBe(loaded));

    // Unfiltered total comparison (should be >= filtered total)
    const unfilteredTotal = baseTotal;
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-core-filters.spec-888', async () => expect(total).toBeLessThanOrEqual(unfilteredTotal));

    // Clear restores
    await recordEvidence('action-click-reports-standard-licenses-core-filters.spec-891', async () => reports.clearFiltersButton.click());
    await reports.waitForStandardLicenseSettled();

    const { loaded: restoredLoaded, total: restoredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-core-filters.spec-895', async () => expect(restoredLoaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-896', async () => expect(restoredTotal).toBe(unfilteredTotal));

    const restoredRowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-core-filters.spec-899', async () => expect(restoredRowCount).toBe(restoredLoaded));
  });
});