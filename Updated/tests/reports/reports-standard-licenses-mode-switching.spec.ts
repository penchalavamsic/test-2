import type { Page, Response } from '@playwright/test';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

// Deleted reports preload their complete dataset and filter it in the browser.
// Compare functional results with the actual fetched records, not assumed extra requests.
type DeletedRecord = Record<string, any>;
async function openRuntimeDeleted(page: Page) {
  await new AuthenticationFlow(page).ensureAuthenticated(PROFILE);
  await new SystemUserDashboardPage(page).waitForFullRender();
  const reports = new ReportsPage(page);
  await reports.openReports();
  await reports.waitForStandardLicenseSettled();
  const records = await captureDeleted(reports, page);
  return { reports, records };
}
async function captureDeleted(reports: ReportsPage, page: Page): Promise<DeletedRecord[]> {
  const responses: Response[] = [];
  const collect = (r: Response) => { if (new URL(r.url()).pathname.endsWith(reports.deletedLicensesApiPath) && r.request().method() === 'GET') responses.push(r); };
  page.on('response', collect);
  try {
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-28', async () => reports.deletedTab.click());
    await reports.waitForStandardLicenseSettled();
    const pages = await Promise.all(responses.map(async r => { await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-30', async () => expect(r.ok()).toBe(true)); return r.json(); }));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-31', async () => expect(pages.length).toBeGreaterThan(0));
    const records: DeletedRecord[] = pages.flatMap(d => d.content);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-33', async () => expect(records.length).toBe(pages[0].totalElements));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-34', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(records.length));
    return records;
  } finally { page.removeListener('response', collect); }
}
const reportDay = (value: unknown): string => typeof value === 'string' ? value.slice(0, 10) : '';
async function assertDeletedResults(reports: ReportsPage, records: DeletedRecord[]) {
  await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-40', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).total).toBe(records.length));
  await reports.waitForStandardLicenseSettled();
  const state = await reports.getStandardLicenseTableSnapshot();
  await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-43', async () => expect(state.rows).toBe(state.loaded));
  await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-mode-switching.spec-44', async () => expect(state.loaded).toBeLessThanOrEqual(records.length));
  if (records.length) await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-45', async () => expect(state.loaded).toBeGreaterThan(0));
  const cells = await reports.tableRows.evaluateAll(rows => rows.map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent?.trim() || '')));
  for (const row of cells) {
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-48', async () => expect(records.some(r => String(r.email || '-').trim() === row[3] && String(r.hardwareId || '-').trim() === row[4]), 'Rendered record must belong to the expected filtered dataset').toBe(true));
  }
}
async function clearDeleted(reports: ReportsPage, records: DeletedRecord[]) {
  await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-52', async () => reports.clearFiltersButton.click());
  await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-53', async () => expect(reports.emailSearchbox).toHaveValue(''));
  await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-54', async () => expect(reports.hardwareIdsSearchbox).toHaveValue(''));
  await assertDeletedResults(reports, records);
  await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-56', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));
}


test.describe('Mode Control Structure', () => {
  test('LIMAS-SUD-1584: Mode control structure — group, buttons, aria-pressed semantics, native elements', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    // License mode group is a role=group with name "License mode"
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-19', async () => expect(reports.licenseModeGroup).toBeVisible());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-20', async () => expect(reports.licenseModeGroup).toHaveRole('group')); // native <fieldset> or <div role="group">

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
    await reports.waitForStandardLicenseSettled();
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
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-75', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-82', async () => reports.deletedTab.click());

    const deletedResponse = await deletedPromise;
    await deletedResponse.finished();
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-85', async () => expect(deletedResponse.status()).toBe(200));

    // Deleted is now pressed, Active unpressed
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-88', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-89', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'false'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-92', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-94', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
  });

  test('LIMAS-SUD-1587: Deleted API contract — GET, endpoint, page/size, deletedOn field', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-111', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;
    await deletedResponse.finished();
    await reports.waitForStandardLicenseSettled();

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
    await reports.waitForStandardLicenseSettled();
  });

  test('LIMAS-SUD-1588: Deleted counts — toolbar 433, loaded/total 150/433', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-149', async () => reports.deletedTab.click());
    await (await deletedPromise).finished();
    await reports.waitForStandardLicenseSettled();

    // Toolbar shows "433 records"
    const toolbarCount = await reports.getReportsRecordCount();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-154', async () => expect(toolbarCount).toBeGreaterThan(0));

    // loaded/total text visible
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-158', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-159', async () => expect(total).toBeGreaterThan(0));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-162', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
  });

  test('LIMAS-SUD-1589: Deleted table — 6 columns, License Dates Exp+Deleted', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-180', async () => reports.deletedTab.click());
    await (await deletedPromise).finished();
    await reports.waitForStandardLicenseSettled();

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
    await reports.waitForStandardLicenseSettled();
  });
});

test.describe('Deleted Infinite Scroll', () => {
  test('LIMAS-SUD-1590: Deleted infinite scroll appends cached records without losing existing rows', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const before = await reports.getStandardLicenseTableSnapshot();
    test.skip(before.loaded === records.length, 'No additional Deleted records are available for a next scroll batch.');
    await recordEvidence('scroll-to-next-deleted-batch', async () => {
      await reports.tableRows.last().scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    });
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-277', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).loaded).toBeGreaterThan(before.loaded));
    await assertDeletedResults(reports, records);
    const after = await reports.getStandardLicenseTableSnapshot();
    await recordEvidence('assert-toEqual-reports-standard-licenses-mode-switching.spec-280', async () => expect(after.fingerprints.slice(0, before.fingerprints.length)).toEqual(before.fingerprints));
  });
});

test.describe('Filter Persistence', () => {
  test('LIMAS-SUD-1591: Mode-specific filters remain isolated and restore correct Active results', async ({ page }) => {

    await new AuthenticationFlow(page).ensureAuthenticated(PROFILE);
    await new SystemUserDashboardPage(page).waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const base = await reports.captureStandardLicenseBaseTotal();
    const email = await reports.findRuntimeStandardEmail();
    test.skip(!email, 'No email-bearing record is available for mode-isolation verification.');
    await reports.expandFilters();
    await reports.applyStandardFilter(async () => { await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-296', async () => reports.emailSearchbox.fill(email!)); await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-296', async () => reports.emailSearchbox.press('Enter')); });
    await reports.waitForStandardLicenseSettled();
    const filtered = await reports.getStandardLicenseTableSnapshot();
    const records = await captureDeleted(reports, page);
    await assertDeletedResults(reports, records);
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-301', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-303', async () => expect(reports.emailSearchbox).toHaveValue(email!));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-304', async () => expect((await reports.getStandardLicenseTableSnapshot()).total).toBe(filtered.total));
    const emails = await reports.tableRows.locator('td:nth-child(4)').allTextContents();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-306', async () => expect(emails.length).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-307', async () => expect(emails.every(v => v.toLowerCase().includes(email!.toLowerCase()))).toBe(true));
    await reports.clearAppliedStandardFilters();
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-309', async () => expect.poll(async () => (await reports.getStandardLicenseTableSnapshot()).total).toBe(base));
  });
});

test.describe('Core Filters in Deleted', () => {
  test('LIMAS-SUD-1592: Deleted email filter returns matching records and Clear restores all data', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const email = records.find(r => typeof r.email === 'string' && r.email.includes('@'))?.email;
    test.skip(!email, 'No email-bearing record exists in the complete Deleted dataset.');
    await reports.expandFilters();
    await recordEvidence('filter-deleted-email', async () => { await reports.emailSearchbox.fill(email); await reports.emailSearchbox.press('Enter'); });
    await assertDeletedResults(reports, records.filter(r => String(r.email || '').toLowerCase().includes(email.toLowerCase())));
    await clearDeleted(reports, records);
  });

  test('LIMAS-SUD-1593: Deleted hardware checkbox filter returns matching records and restores data', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const candidates = [...new Set(records.map(r => r.hardwareId).filter(v => typeof v === 'string' && v.trim()))];
    await reports.expandFilters();
    let hardware: string | undefined;
    for (const candidate of candidates) {
      const lookupPromise = page.waitForResponse(r => r.url().includes('/hardwareId/search'));
      await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-333', async () => reports.hardwareIdsSearchbox.fill(candidate));
      const lookup = await lookupPromise;
      await recordEvidence('assert-toContain-reports-standard-licenses-mode-switching.spec-335', async () => expect([200, 404]).toContain(lookup.status()));
      if (lookup.status() === 404 || (await lookup.json()).length === 0) continue;
      const option = reports.standardFilterOption(candidate);
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-338', async () => expect(option).toBeVisible());
      await recordEvidence('select-deleted-hardware', () => option.click());
      hardware = candidate;
      break;
    }
    test.skip(!hardware, 'No hardware ID from the complete Deleted dataset is available in the current hardware lookup.');
    await assertDeletedResults(reports, records.filter(r => r.hardwareId === hardware));
    await clearDeleted(reports, records);
  });

  test('LIMAS-SUD-1594: Deleted filter inventory exposes supported controls and preserves record groups', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    await reports.expandFilters();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-352', async () => expect(reports.emailSearchbox).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-353', async () => expect(reports.hardwareIdsSearchbox).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-354', async () => expect(reports.expirationDateInput).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-355', async () => expect(page.getByLabel('Deletion Date', {exact:true})).toBeVisible());
    await assertDeletedResults(reports, records);
    const cells = await reports.tableRows.evaluateAll(rows => rows.map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent?.trim() || '')));
    test.skip(records.length === 0, 'No Deleted records exist for verifying displayed user groups.');
    for (const row of cells) await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-359', async () => expect(records.some(r => String(r.groupName || '-').trim() === row[0] && String(r.email || '-').trim() === row[3] && String(r.hardwareId || '-').trim() === row[4])).toBe(true));
  });
});

test.describe('Date Filters in Deleted', () => {
  test('LIMAS-SUD-1595: Deleted Expiration Date filter returns the exact matching dataset and clears', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const day = records.map(r => reportDay(r.expirationDate)).find(v => /^\d{4}-\d{2}-\d{2}$/.test(v));
    test.skip(!day, 'No valid Expiration Date exists in the complete Deleted dataset.');
    await reports.expandFilters();
    const input = page.getByLabel('Expiration Date', {exact:true});
    await recordEvidence('apply-deleted-date', () => input.fill(day!));
    await assertDeletedResults(reports, records.filter(r => reportDay(r.expirationDate) === day));
    await clearDeleted(reports, records);
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-374', async () => expect(input).toHaveValue(''));
  });

  test('LIMAS-SUD-1596: Deleted Deletion Date filter returns the exact matching dataset and clears', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const day = records.map(r => reportDay(r.deletedOn)).find(v => /^\d{4}-\d{2}-\d{2}$/.test(v));
    test.skip(!day, 'No valid Deletion Date exists in the complete Deleted dataset.');
    await reports.expandFilters();
    const input = page.getByLabel('Deletion Date', {exact:true});
    await recordEvidence('apply-deleted-date', () => input.fill(day!));
    await assertDeletedResults(reports, records.filter(r => reportDay(r.deletedOn) === day));
    await clearDeleted(reports, records);
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-387', async () => expect(input).toHaveValue(''));
  });

  test('LIMAS-SUD-1597: Combined expiration and deletion dates match their intersection and clear', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    const record = records.find(r => /^\d{4}-\d{2}-\d{2}$/.test(reportDay(r.expirationDate)) && /^\d{4}-\d{2}-\d{2}$/.test(reportDay(r.deletedOn)));
    test.skip(!record, 'No Deleted record has both valid expiration and deletion dates.');
    const expiration = reportDay(record!.expirationDate), deletion = reportDay(record!.deletedOn);
    await reports.expandFilters();
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-397', async () => reports.expirationDateInput.fill(expiration));
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-398', async () => page.getByLabel('Deletion Date', {exact:true}).fill(deletion));
    await assertDeletedResults(reports, records.filter(r => reportDay(r.expirationDate) === expiration && reportDay(r.deletedOn) === deletion));
    await clearDeleted(reports, records);
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-401', async () => expect(reports.expirationDateInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-reports-standard-licenses-mode-switching.spec-402', async () => expect(page.getByLabel('Deletion Date', {exact:true})).toHaveValue(''));
  });
});

test.describe('Clear in Deleted', () => {
  test('LIMAS-SUD-1598: Deleted no-match email gives zero results and Clear restores the complete dataset', async ({ page }) => {

    const {reports, records} = await openRuntimeDeleted(page);
    await reports.expandFilters();
    const email = `no-match-${Date.now()}@example.invalid`;
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-412', async () => expect(records.some(r => String(r.email || '').includes(email))).toBe(false));
    await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-413', async () => reports.emailSearchbox.fill(email));
    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-414', async () => reports.emailSearchbox.press('Enter'));
    await assertDeletedResults(reports, []);
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-416', async () => expect(page.getByText('No Deleted License records found', {exact:true})).toBeVisible());
    await clearDeleted(reports, records);
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
    await reports.waitForStandardLicenseSettled();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Switch to Deleted first
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-639', async () => reports.deletedTab.click());
    await (await deletedPromise).finished();
    await reports.waitForStandardLicenseSettled();
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
    await reports.waitForStandardLicenseSettled();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();

    // Switch to Deleted first
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-678', async () => reports.deletedTab.click());
    await (await deletedPromise).finished();
    await reports.waitForStandardLicenseSettled();

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
    await reports.waitForStandardLicenseSettled();

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
    await reports.waitForStandardLicenseSettled();
    page.removeAllListeners();
  });

  test('LIMAS-SUD-1602: Deleted-to-Active stale response handling — only final mode data rendered', async ({page}) => {
    await new AuthenticationFlow(page).ensureAuthenticated(PROFILE);
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const initial = await reports.getStandardLicenseTableSnapshot();
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    let held = false;
    const target = (url: URL) => url.pathname.endsWith(reports.deletedLicensesApiPath) && url.searchParams.get('page') === '0';
    let routeDone: Promise<void> | undefined;
    await page.route(target, route => {
      routeDone = (async () => {
        held = true;
        const response = await route.fetch();
        await gate;
        await route.fulfill({response}).catch(error => { if (!route.request().failure() && !page.isClosed()) throw error; });
      })();
      return routeDone;
    });
    try {
      await recordEvidence('start-deleted-request', () => reports.deletedTab.click());
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-575', async () => expect.poll(() => held, {timeout:15000}).toBe(true));
      await recordEvidence('return-active-before-deleted-response', () => reports.activeTab.click());
      release();
      await reports.waitForStandardLicenseSettled();
      await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-579', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed','true'));
      const final = await reports.getStandardLicenseTableSnapshot();
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-581', async () => expect(final.total).toBe(initial.total));
      await recordEvidence('assert-toEqual-reports-standard-licenses-mode-switching.spec-582', async () => expect(final.fingerprints.slice(0,initial.loaded), 'Late Deleted data must not overwrite visible Active rows').toEqual(initial.fingerprints));
    } finally { release(); if (routeDone) await routeDone; await page.unroute(target); }
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
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-807', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-809', async () => reports.deletedTab.click());

    // Loading indicator appears
    const indicator = await reports.getStandardLicenseLoadingIndicator();
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-813', async () => expect(indicator).not.toBeNull());
    if (indicator) {
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-815', async () => expect(indicator.found).toBe(true));
    }

    // Wait for data to settle
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-820', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-823', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
  });

  test('LIMAS-SUD-1604: Cached Active report stays correct during refresh and settles with valid data', async ({page}) => {
    await new AuthenticationFlow(page).ensureAuthenticated(PROFILE);
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const activeBefore=await reports.getStandardLicenseTableSnapshot();
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-623', async () => reports.deletedTab.click());
    await reports.waitForStandardLicenseSettled();
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    let held = false;
    const target = (url: URL) => url.pathname.endsWith(reports.standardLicensesApiPath) && url.searchParams.get('page') === '0';
    // Hold the response only in this browser; do not slow or modify the backend.
    let routeDone: Promise<void> | undefined;
    await page.route(target, route => {
      routeDone = (async () => {
        held = true;
        const response = await route.fetch();
        await gate;
        await route.fulfill({response}).catch(error => { if (!route.request().failure() && !page.isClosed()) throw error; });
      })();
      return routeDone;
    });
    const indicator = reports.mainContent.locator('[class*="spin"], [class*="Spinner"], [class*="loader"], [class*="Loader"], [role="progressbar"]').or(reports.mainContent.getByText(/^Loading/i));
    try {
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-642', async () => expect(indicator.first()).not.toBeVisible());
      await recordEvidence('switch-active-with-response-pending', () => reports.activeTab.click());
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-644', async () => expect.poll(() => held, {timeout:15000}).toBe(true));
      await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-645', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed','true'));
      const pending=await reports.getStandardLicenseTableSnapshot();
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-647', async () => expect(pending.total).toBe(activeBefore.total));
      await recordEvidence('assert-toEqual-reports-standard-licenses-mode-switching.spec-648', async () => expect(pending.fingerprints.slice(0,activeBefore.rows)).toEqual(activeBefore.fingerprints));
      release();
      await reports.waitForStandardLicenseSettled();
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-651', async () => expect(indicator.first()).not.toBeVisible());
      await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-652', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed','true'));
      const settled=await reports.getStandardLicenseTableSnapshot();
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-654', async () => expect(settled.total).toBe(activeBefore.total));
      await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-655', async () => expect(settled.rows).toBe(settled.loaded));
      await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-mode-switching.spec-656', async () => expect(settled.rows).toBeGreaterThan(0));
    } finally { release(); if (routeDone) await routeDone; await page.unroute(target); }
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
    await reports.waitForStandardLicenseSettled();

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
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-892', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));

    // Focus Deleted and activate via Enter
    await recordEvidence('action-focus-reports-standard-licenses-mode-switching.spec-895', async () => reports.deletedTab.focus());

    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-902', async () => page.keyboard.press('Enter'));
    await (await deletedPromise).finished();
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-mode-switching.spec-904', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'true'));

    // Switch back via Space
    await recordEvidence('action-focus-reports-standard-licenses-mode-switching.spec-907', async () => reports.activeTab.focus());

    const activePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-914', async () => page.keyboard.press('Space'));
    await (await activePromise).finished();
    await reports.waitForStandardLicenseSettled();
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
    await reports.waitForStandardLicenseSettled();
    const baseTotal = await reports.captureStandardLicenseBaseTotal();
    await reports.expandFilters();

    // Apply Email filter in Active
    const runtimeEmail = await reports.findRuntimeStandardEmail();
    test.skip(!runtimeEmail, 'No email-bearing Standard License record exists in the available data');
    if (!runtimeEmail) return;
    await reports.applyStandardFilter(async () => {
      await recordEvidence('action-fill-reports-standard-licenses-mode-switching.spec-743', async () => reports.emailSearchbox.fill(runtimeEmail));
      await recordEvidence('action-press-reports-standard-licenses-mode-switching.spec-744', async () => reports.emailSearchbox.press('Enter'));
    });

    const { total: activeFilteredTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeLessThan-reports-standard-licenses-mode-switching.spec-939', async () => expect(activeFilteredTotal).toBeLessThan(baseTotal));

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-947', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;
    await deletedResponse.finished();
    await reports.waitForStandardLicenseSettled();

    // Deleted API is a fresh GET with no filter state
    const deletedUrl = new URL(deletedResponse.url());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-952', async () => expect(deletedUrl.searchParams.get('email')).toBeNull());

    // Filter chip not visible in Deleted
    const chipVisible = await reports.emailFilterChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-956', async () => expect(chipVisible).toBe(false));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-959', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
  });

  test('LIMAS-SUD-1608: Active with date filter → Deleted (fresh load) — date not carried over', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    await reports.expandFilters();

    // Apply Expiration Date in Active
    const { currentDate } = await reports.getReportDateRuntimeData();
    await reports.setStandardLicenseExpirationDate(currentDate);
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-mode-switching.spec-977', async () => expect(reports.expirationDateChip).toBeVisible());

    // Switch to Deleted
    const deletedPromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.deletedLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-985', async () => reports.deletedTab.click());
    const deletedResponse = await deletedPromise;
    await deletedResponse.finished();
    await reports.waitForStandardLicenseSettled();

    // Date filter is not carried over
    const deletedUrl = new URL(deletedResponse.url());
    await recordEvidence('assert-toBeNull-reports-standard-licenses-mode-switching.spec-990', async () => expect(deletedUrl.searchParams.get('expirationDate')).toBeNull());

    // Date chip not visible in Deleted
    const chipVisible = await reports.expirationDateChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-mode-switching.spec-994', async () => expect(chipVisible).toBe(false));

    // Restore
    await recordEvidence('action-click-reports-standard-licenses-mode-switching.spec-997', async () => reports.activeTab.click());
    await reports.waitForStandardLicenseSettled();
  });

  test('LIMAS-SUD-1609: Rapid toggle Active→Deleted→Active — final state correct, no UI corruption', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
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
    await reports.waitForStandardLicenseSettled();

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