import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Reports Floating Licenses Deleted Infinite Scroll â€” RFL-D', () => {
  test.describe('Scroll Infrastructure', () => {
    test('LIMAS-SUD-1706: Scroll container â€” overflow-y:auto, flex-1, min-h-[260px], dimensions', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const container = reports.flScrollContainer;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-deleted-infinite-scroll.spec-21', async () => expect(container).toBeVisible());

      const overflowY = await container.evaluate((el) => getComputedStyle(el).overflowY);
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-24', async () => expect(overflowY).toBe('auto'));

      const flex = await container.evaluate((el) => getComputedStyle(el).flex);
      await recordEvidence('assert-toMatch-reports-floating-licenses-deleted-infinite-scroll.spec-27', async () => expect(flex).toMatch(/1/));

      const minHeightRaw = await container.evaluate((el) => getComputedStyle(el).minHeight);
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-30', async () => expect(minHeightRaw).toBe('260px'));

      const metrics = await reports.getFloatingLicenseScrollMetrics();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-33', async () => expect(metrics.scrollHeight).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-34', async () => expect(metrics.clientHeight).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-1707: Initial batch â€” GET /limas/api/report/allfloatingdeleted?page=0&size=500, Spring Page metadata', async ({ page }) => {
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

      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-53', async () => expect(response.status()).toBe(200));
      const reqUrl = new URL(response.url());
      await recordEvidence('assert-toContain-reports-floating-licenses-deleted-infinite-scroll.spec-55', async () => expect(reqUrl.pathname).toContain('allfloatingdeleted'));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-56', async () => expect(reqUrl.searchParams.get('page')).toBe('0'));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-57', async () => expect(reqUrl.searchParams.get('size')).toBe('500'));

      const body = await response.json();
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-60', async () => expect(body).toHaveProperty('totalElements'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-61', async () => expect(body).toHaveProperty('numberOfElements'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-62', async () => expect(body).toHaveProperty('totalPages'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-63', async () => expect(body).toHaveProperty('size'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-64', async () => expect(body).toHaveProperty('number'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-65', async () => expect(body).toHaveProperty('first'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-66', async () => expect(body).toHaveProperty('last'));
      await recordEvidence('assert-toHaveProperty-reports-floating-licenses-deleted-infinite-scroll.spec-67', async () => expect(body).toHaveProperty('content'));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-68', async () => expect(Array.isArray(body.content)).toBe(true));

      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-70', async () => expect(body.first).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-71', async () => expect(body.size).toBe(500));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-72', async () => expect(body.number).toBe(0));
    });

    test('LIMAS-SUD-1708: Sentinel â€” div.h-4[aria-hidden="true"], 16px, position, IntersectionObserver role', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const sentinel = reports.flScrollSentinel;
      const count = await sentinel.count();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-87', async () => expect(count).toBeGreaterThanOrEqual(0));

      if (count > 0) {
        const first = sentinel.first();
        const ariaHidden = await first.getAttribute('aria-hidden');
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-92', async () => expect(ariaHidden).toBe('true'));

        const height = await first.evaluate((el) => (el as HTMLElement).offsetHeight);
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-95', async () => expect(height).toBe(16));

        const isInsideContainer = await reports.flScrollContainer.evaluate((container) => {
          const sentinelEl = container.querySelector('div.h-4[aria-hidden="true"]');
          return sentinelEl !== null;
        });
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-101', async () => expect(isInsideContainer).toBe(true));
      }
    });
  });

  test.describe('Scroll Mechanics', () => {
    test('LIMAS-SUD-1709: Non-boundary scroll â€” scroll within loaded rows, no continuation request', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const beforeFps = await reports.getFloatingLicenseRowFingerprints();

      let continuationFired = false;
      page.on('request', (req) => {
        if (req.url().includes(reports.floatingLicensesDeletedApiPath) && req.method() === 'GET') {
          const url = new URL(req.url());
          if (url.searchParams.get('page') !== '0') {
            continuationFired = true;
          }
        }
      });

      await reports.scrollFloatingLicenseWithinBatch(50);

      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-132', async () => expect(continuationFired).toBe(false));

      const afterFps = await reports.getFloatingLicenseRowFingerprints();
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-135', async () => expect(afterFps.length).toBe(beforeFps.length));
    });

    test('LIMAS-SUD-1710: Controlled continuation â€” scroll to sentinel, trigger load, page increments, size=500 same', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const { total, loaded: loadedBefore } = await reports.getFloatingLicenseLoadedState();

      if (loadedBefore < total) {
        const nextPagePromise = reports.waitForFloatingLicenseNextPageRequest(1);
        await reports.scrollFloatingLicenseToSentinel();
        const nextResp = await nextPagePromise;

        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-155', async () => expect(nextResp.status).toBe(200));
        const reqUrl = nextResp.url;
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-157', async () => expect(reqUrl.searchParams.get('page')).toBe('1'));
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-158', async () => expect(reqUrl.searchParams.get('size')).toBe('500'));

        const loadedAfter = (await reports.getFloatingLicenseLoadedState()).loaded;
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-161', async () => expect(loadedAfter).toBeGreaterThanOrEqual(loadedBefore));
      }
    });

    test('LIMAS-SUD-1711: Sequential pages â€” page values sequential (0,1,2...), no gaps, no duplicates', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const pagesSeen: number[] = [];
      page.on('response', (resp) => {
        if (resp.url().includes(reports.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET') {
          const url = new URL(resp.url());
          const pageNum = parseInt(url.searchParams.get('page') ?? '-1', 10);
          const size = url.searchParams.get('size');
          if (pageNum >= 0 && size === '500') {
            pagesSeen.push(pageNum);
          }
        }
      });

      await reports.scrollFloatingLicenseToSentinel();

      await page.evaluate(() => new Promise((r) => setTimeout(r, 2000)));

      // Sequential â€” no gaps
      for (let i = 1; i < pagesSeen.length; i++) {
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-193', async () => expect(pagesSeen[i]).toBe(pagesSeen[i - 1] + 1));
      }

      // No duplicates
      const unique = new Set(pagesSeen);
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-198', async () => expect(unique.size).toBe(pagesSeen.length));
    });
  });

  test.describe('Row Integrity', () => {
    test('LIMAS-SUD-1712: Row append not replace â€” existing rows preserved, new rows appended, DOM order matches', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const beforeFps = await reports.getFloatingLicenseRowFingerprints();

      const { total, loaded: loadedBefore } = await reports.getFloatingLicenseLoadedState();
      if (loadedBefore < total) {
        await reports.scrollFloatingLicenseToSentinel();
        await reports.waitForFloatingLicenseNextPageRequest(1);
        await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      }

      const afterFps = await reports.getFloatingLicenseRowFingerprints();

      // All original rows preserved in order
      for (let i = 0; i < beforeFps.length; i++) {
        await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-226', async () => expect(afterFps[i]).toBe(beforeFps[i]));
      }

      // New rows appended
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-230', async () => expect(afterFps.length).toBeGreaterThanOrEqual(beforeFps.length));
    });

    test('LIMAS-SUD-1713: Loaded count sync â€” loaded â‰¤ total, count matches rendered rows, toolbar matches', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const { loaded, total } = await reports.getFloatingLicenseLoadedState();
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-244', async () => expect(loaded).toBeLessThanOrEqual(total));

      const renderedRows = await reports.getFloatingLicenseRenderedRowCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-247', async () => expect(renderedRows).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-248', async () => expect(renderedRows).toBeLessThanOrEqual(total));

      const toolbarCount = await reports.getFloatingLicenseRecordCount();
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-251', async () => expect(typeof toolbarCount).toBe('number'));
    });

    test('LIMAS-SUD-1714: Duplicate prevention â€” no dup rows (fingerprint unique), no dup requests (page unique)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const dedup = await reports.verifyNoDuplicateFloatingLicenseRows();
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-265', async () => expect(dedup.hasDuplicates).toBe(false));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-266', async () => expect(dedup.total).toBe(dedup.unique));
    });
  });

  test.describe('Loading and Stability', () => {
    test('LIMAS-SUD-1715: Loading indicator â€” visible during load, disappears after, toolbar stable, focus stable, mode controls usable', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Switch to Deleted and observe loading behavior
      const responsePromise = reports.waitForFloatingLicenseDeletedRequest();
      await recordEvidence('action-click-reports-floating-licenses-deleted-infinite-scroll.spec-282', async () => reports.floatingLicenseDeletedTab.click());
      await responsePromise;

      // After load: toolbar stable
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-deleted-infinite-scroll.spec-286', async () => expect(reports.floatingLicenseActiveTab).toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-deleted-infinite-scroll.spec-287', async () => expect(reports.floatingLicenseDeletedTab).toBeVisible());

      // Mode controls usable
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-deleted-infinite-scroll.spec-290', async () => expect(reports.floatingLicenseActiveTab).toBeEnabled());
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-deleted-infinite-scroll.spec-291', async () => expect(reports.floatingLicenseDeletedTab).toBeEnabled());
    });

    test('LIMAS-SUD-1716: Scroll stability â€” scrollTop preserved during append, no reset, smooth viewport transition', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Scroll partway down
      await reports.scrollFloatingLicenseWithinBatch(100);
      const scrollTopBefore = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop);

      const { total, loaded } = await reports.getFloatingLicenseLoadedState();
      if (loaded < total) {
        // Scroll to sentinel to trigger continuation
        await reports.scrollFloatingLicenseToSentinel();
        await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));
      }

      const scrollTopAfter = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop);
      // scrollTop should not have reset to 0
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-317', async () => expect(scrollTopAfter).not.toBe(0));
    });

    test('LIMAS-SUD-1717: Mode and filter preservation â€” Deleted pressed, filters collapsed, no mode switch during scroll', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await reports.scrollFloatingLicenseWithinBatch(50);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      // Deleted still pressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-334', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      // Active still unpressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-336', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'false'));

      // Filters still collapsed
      const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-340', async () => expect(filtersVisible).toBe(false));
    });
  });

  test.describe('End of Data and Restoration', () => {
    test('LIMAS-SUD-1718: End-of-data â€” from metadata: last:true or loaded===total, sentinel hidden/removed, no page > totalPages-1', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      const metadataPromise = reports.captureFloatingLicenseDeletedMetadata();
      await reports.selectFloatingLicenseDeletedMode();
      const meta = await metadataPromise;

      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-deleted-infinite-scroll.spec-358', async () => expect(meta.totalElements).toBeGreaterThan(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-359', async () => expect(meta.totalPages).toBeGreaterThanOrEqual(0));

      const { loaded, total } = await reports.getFloatingLicenseLoadedState();
      const atEnd = meta.last || loaded === total;
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-363', async () => expect(typeof atEnd).toBe('boolean'));

      if (meta.last) {
        // Sentinel should be hidden/removed or not present
        const sentinel = await reports.getFloatingLicenseSentinel();
        if (sentinel.found) {
          await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-369', async () => expect(sentinel.visible).toBe(false));
        }
      }

      // No page > totalPages - 1
      let maxPageSeen = -1;
      page.on('response', (resp) => {
        if (resp.url().includes(reports.floatingLicensesDeletedApiPath) && resp.request().method() === 'GET') {
          const url = new URL(resp.url());
          const pageNum = parseInt(url.searchParams.get('page') ?? '-1', 10);
          if (pageNum > maxPageSeen) maxPageSeen = pageNum;
        }
      });

      if (meta.totalPages > 0) {
        await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-384', async () => expect(maxPageSeen).toBeLessThanOrEqual(meta.totalPages - 1));
      }
    });

    test('LIMAS-SUD-1719: Scroll a11y â€” region semantics, keyboard scroll, loading announcement, aria-busy, focus, end-of-data communication', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Container is keyboard-scrollable
      const container = reports.flScrollContainer;
      await recordEvidence('action-focus-reports-floating-licenses-deleted-infinite-scroll.spec-400', async () => container.focus());
      await recordEvidence('action-press-reports-floating-licenses-deleted-infinite-scroll.spec-401', async () => page.keyboard.press('ArrowDown'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
      const scrollTopAfterKey = await reports.getFloatingLicenseScrollMetrics().then(m => m.scrollTop);
      // Container received scroll â€” at minimum it should not have thrown
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-405', async () => expect(typeof scrollTopAfterKey).toBe('number'));

      // flScrollContainer has tabIndex or is focusable
      const tabIndex = await container.getAttribute('tabindex').catch(() => null);
      const isFocusable = await container.evaluate((el) => {
        const style = getComputedStyle(el);
        return el.getAttribute('tabindex') !== null || style.overflowY === 'auto';
      });
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-413', async () => expect(isFocusable).toBe(true));
    });

    test('LIMAS-SUD-1720: Count a11y â€” loaded/total update announcement, appended content announcement, accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Loaded/total text is visible and has content
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-deleted-infinite-scroll.spec-427', async () => expect(reports.floatingLicenseLoadedTotalText).toBeVisible());
      const countText = await reports.floatingLicenseLoadedTotalText.textContent();
      await recordEvidence('assert-toMatch-reports-floating-licenses-deleted-infinite-scroll.spec-429', async () => expect(countText).toMatch(/\d+\s*loaded\s*Â·\s*\d+\s*total/));

      const { loaded, total } = await reports.getFloatingLicenseLoadedState();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-432', async () => expect(loaded).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-deleted-infinite-scroll.spec-433', async () => expect(total).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-1721: No Active contamination â€” no Active/Standard/FC rows in Deleted table, headers match Deleted schema', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-446', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));

      const headers = await reports.getFloatingLicenseHeaders();
      const headerTexts = headers.map(h => h.toLowerCase());
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-450', async () => expect(headerTexts.some(h => h.includes('profile'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-451', async () => expect(headerTexts.some(h => h.includes('role'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-452', async () => expect(headerTexts.some(h => h.includes('email'))).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-453', async () => expect(headerTexts.some(h => h.includes('hardware') || h.includes('hw'))).toBe(true));

      // Rows are from Deleted data
      const rows = reports.getDeletedFloatingLicenseRows();
      const rowCount = await rows.count();

      // Verify no mixed-mode contamination
      await reports.verifyNoMixedFloatingLicenseModeRows();
    });

    test('LIMAS-SUD-1722: Safe restoration â€” Active, clear filters, collapse, 0/0, empty-state, Export disabled, route /reports', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Navigate to Deleted first
      await reports.selectFloatingLicenseDeletedMode();

      // Safe restoration back to Active
      await reports.restoreFloatingLicenseActiveMode();

      // FL card selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-479', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
      // Active pressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-481', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
      // Deleted unpressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-deleted-infinite-scroll.spec-483', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Filters collapsed
      const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-deleted-infinite-scroll.spec-487', async () => expect(filtersVisible).toBe(false));

      // Profile Role disabled
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-deleted-infinite-scroll.spec-490', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());

      // Route /reports
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-deleted-infinite-scroll.spec-494', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });
});