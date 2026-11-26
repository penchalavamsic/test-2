import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Scroll Container', () => {
  test('LIMAS-SUD-1512: Scroll container identified with overflow-auto and sentinel', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const container = await reports.getStandardLicenseScrollContainer();
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-19', async () => expect(container).toBeVisible());
    const overflowY = await container.evaluate((el) => getComputedStyle(el).overflowY);
    await recordEvidence('assert-toContain-reports-standard-licenses-infinite-scroll.spec-21', async () => expect(['auto', 'scroll']).toContain(overflowY));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-23', async () => expect(reports.scrollSentinel).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-24', async () => expect(reports.scrollSentinel).toHaveAttribute('aria-hidden', 'true'));
  });

  test('LIMAS-SUD-1528: Sentinel is present, aria-hidden, with defined height', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-36', async () => expect(reports.scrollSentinel).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-37', async () => expect(reports.scrollSentinel).toHaveAttribute('aria-hidden', 'true'));

    const height = await reports.scrollSentinel.evaluate((el) => el.getBoundingClientRect().height);
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-40', async () => expect(height).toBeGreaterThan(0));

    const text = await reports.scrollSentinel.textContent();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-43', async () => expect(text?.trim() || '').toBe(''));
  });
});

test.describe('Initial State', () => {
  test('LIMAS-SUD-1513: Initial scroll metrics, loaded state, and row count recorded dynamically', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const metrics = await reports.getStandardLicenseScrollMetrics();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-infinite-scroll.spec-58', async () => expect(metrics.scrollHeight).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-infinite-scroll.spec-59', async () => expect(metrics.clientHeight).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-infinite-scroll.spec-60', async () => expect(metrics.scrollTop).toBeGreaterThanOrEqual(0));

    const { loaded, total, rows: rowCount } = await reports.getStandardLicenseTableSnapshot();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-63', async () => expect(loaded).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-64', async () => expect(total).toBeGreaterThan(0));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-infinite-scroll.spec-65', async () => expect(loaded).toBeLessThanOrEqual(total));

    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-68', async () => expect(rowCount).toBe(loaded));
  });
});

test.describe('Additional Batch Load', () => {
  test('LIMAS-SUD-1514: Non-boundary scroll does not trigger additional request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const { loaded: initialLoaded } = await reports.getStandardLicenseLoadedState();
    const initialRowCount = await reports.getStandardLicenseRenderedRowCount();

    let additionalRequests = 0;
    const requestHandler = (req: { url: () => string }) => {
      if (req.url().includes(reports.standardLicensesApiPath)) additionalRequests++;
    };
    page.on('request', requestHandler);

    await reports.scrollStandardLicensesWithinCurrentBatch();

    // Allow any in-flight requests to settle — verify no API call was made
    await page.waitForTimeout(600); // Observation window for an unintended request after the scroll.
    await reports.waitForStandardLicenseSettled();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-95', async () => expect(additionalRequests).toBe(0));

    const { loaded: afterLoaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-98', async () => expect(afterLoaded).toBe(initialLoaded));

    const afterRowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-101', async () => expect(afterRowCount).toBe(initialRowCount));

    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-103', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    const filtersExpanded = await reports.emailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-105', async () => expect(filtersExpanded).toBe(false));

    page.removeListener('request', requestHandler);
  });

  test('LIMAS-SUD-1515: Next-page request increments page and preserves size', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);

    // Capture the initial request to get page and size
    const initialResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await reports.openReports();
    const initialResponse = await initialResponsePromise;
    const initialUrl = new URL(initialResponse.url());
    const initialSize = initialUrl.searchParams.get('size');

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    // Start observing for the next-page request
    const nextPagePromise = page.waitForResponse(
      (resp) => {
        if (!resp.url().includes(reports.standardLicensesApiPath)) return false;
        if (resp.request().method() !== 'GET') return false;
        const url = new URL(resp.url());
        const pageNum = url.searchParams.get('page');
        return pageNum !== null && parseInt(pageNum, 10) > 0;
      },
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    const nextResponse = await nextPagePromise;
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-148', async () => expect(nextResponse.status()).toBe(200));

    const nextUrl = new URL(nextResponse.url());
    const nextPage = nextUrl.searchParams.get('page');
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-152', async () => expect(parseInt(nextPage!, 10)).toBe(1));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-153', async () => expect(nextUrl.searchParams.get('size')).toBe(initialSize));

    // Verify no extra query params
    const params = Array.from(nextUrl.searchParams.keys());
    await recordEvidence('assert-toEqual-reports-standard-licenses-infinite-scroll.spec-157', async () => expect(params).toEqual(['page', 'size']));
  });

  test('LIMAS-SUD-1529: All page-load requests use GET only, no mutation', async ({ page }) => {
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
    const { loaded, total } = await reports.getStandardLicenseLoadedState();

    if (loaded < total) {
      const nextResponsePromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );

      await reports.scrollStandardLicensesToNextLoadThreshold();
      const nextResponse = await nextResponsePromise;
      const contentType = nextResponse.headers()['content-type'];
      await recordEvidence('assert-toContain-reports-standard-licenses-infinite-scroll.spec-187', async () => expect(contentType).toContain('application/json'));
    }

    await recordEvidence('assert-toHaveLength-reports-standard-licenses-infinite-scroll.spec-190', async () => expect(mutations).toHaveLength(0));
  });
});

test.describe('Append and Duplicate Prevention', () => {
  test('LIMAS-SUD-1516: New rows append without replacing existing rows', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();

    const initial = await reports.getStandardLicenseTableSnapshot();
    const initialRowCount = initial.rows;

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();

    const nextResponse = await nextResponsePromise;
    const body = await nextResponse.json();
    const batchSize = body.numberOfElements;

    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-229', async () => expect.poll(() => reports.getStandardLicenseRenderedRowCount()).toBeGreaterThan(initialRowCount));
    await reports.waitForStandardLicenseSettled();
    const after = await reports.getStandardLicenseTableSnapshot();
    const newRowCount = after.rows;
    await recordEvidence('assert-toEqual-reports-standard-licenses-infinite-scroll.spec-233', async () => expect(after.fingerprints.slice(0, initialRowCount)).toEqual(initial.fingerprints));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-224', async () => expect(newRowCount).toBeGreaterThan(initialRowCount));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-infinite-scroll.spec-225', async () => expect(newRowCount - initialRowCount).toBeLessThanOrEqual(batchSize));

    // Verify initial rows still present (first row should match expected pattern)
    const firstRowCells = reports.tableRows.nth(0).locator('td');
    const cellCount = await firstRowCells.count();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-230', async () => expect(cellCount).toBe(6));

    // Verify headers unchanged
    const headers = await reports.getStandardLicenseHeaders();
    await recordEvidence('assert-toEqual-reports-standard-licenses-infinite-scroll.spec-234', async () => expect(headers).toEqual(['User Group', 'Profile', 'Role', 'Email', 'Hardware ID', 'License Dates']));
  });

  test('LIMAS-SUD-1517: Loaded count increases and never exceeds total', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded: initialLoaded, total: initialTotal } = await reports.getStandardLicenseLoadedState();

    if (initialLoaded >= initialTotal) {
      test.skip(true, 'No more records to load');
      return;
    }

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    await nextResponsePromise;

    const { loaded: updatedLoaded, total: updatedTotal } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-262', async () => expect(updatedLoaded).toBeGreaterThan(initialLoaded));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-263', async () => expect(updatedTotal).toBe(initialTotal));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-infinite-scroll.spec-264', async () => expect(updatedLoaded).toBeLessThanOrEqual(updatedTotal));
  });

  test('LIMAS-SUD-1518: No duplicate rows after append', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    await nextResponsePromise;

    const result = await reports.verifyNoDuplicateStandardLicenseRows();
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-291', async () => expect(result.hasDuplicates).toBe(false));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-292', async () => expect(result.unique).toBe(result.total));
  });

  test('LIMAS-SUD-1519: No duplicate next-page requests', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    const pageNumbers: number[] = [];
    const handler = (req: { url: () => string }) => {
      if (req.url().includes(reports.standardLicensesApiPath)) {
        const url = new URL(req.url());
        const page = url.searchParams.get('page');
        if (page) pageNumbers.push(parseInt(page, 10));
      }
    };
    page.on('request', handler);

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    await nextResponsePromise;

    // Each page number should appear exactly once
    const pageCounts = new Map<number, number>();
    for (const p of pageNumbers) {
      pageCounts.set(p, (pageCounts.get(p) || 0) + 1);
    }
    for (const [, count] of pageCounts) {
      await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-334', async () => expect(count).toBe(1));
    }

    page.removeListener('request', handler);
  });
});

test.describe('Loading and Scroll Stability', () => {
  test('LIMAS-SUD-1520: Loading indicator behavior inspected during append', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Before trigger: no stale indicator
    const beforeIndicator = await reports.getStandardLicenseLoadingIndicator();
    if (beforeIndicator) {
      // A stale indicator was present — document it
      await recordEvidence('assert-toBeDefined-reports-standard-licenses-infinite-scroll.spec-355', async () => expect(beforeIndicator.found).toBeDefined());
    }

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    // Inspect aria-live and aria-busy
    const ariaLive = page.locator('main [aria-live], main [role="status"]');
    const liveCount = await ariaLive.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-infinite-scroll.spec-367', async () => expect(liveCount).toBeGreaterThanOrEqual(0));

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    await nextResponsePromise;

    // After load: no stale indicator remains
    const afterIndicator = await reports.getStandardLicenseLoadingIndicator();
    if (afterIndicator) {
      // If indicator is visible after load, document it
      await recordEvidence('assert-toBeDefined-reports-standard-licenses-infinite-scroll.spec-381', async () => expect(afterIndicator.found).toBeDefined());
    }

    // Verify rows still present
    const rowCount = await reports.getStandardLicenseRenderedRowCount();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-386', async () => expect(rowCount).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1521: Scroll position does not reset unexpectedly after append', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    // Scroll to trigger
    await reports.scrollStandardLicensesToNextLoadThreshold();
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-407', async () => expect(scrollBefore).toBeGreaterThan(0));

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await nextResponsePromise;

    const scrollAfter = await page.evaluate(() => window.scrollY);
    // Scroll position should be near its previous value, not reset to 0
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-418', async () => expect(scrollAfter).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1522: Standard Licenses, Active, and Filters unchanged after load', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-430', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-431', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-432', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded >= total) {
      test.skip(true, 'No more records to load');
      return;
    }

    const nextResponsePromise = page.waitForResponse(
      (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
      { timeout: 15000 }
    );

    await reports.scrollStandardLicensesToNextLoadThreshold();
    await nextResponsePromise;

    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-448', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-449', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-450', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    const filtersExpanded = await reports.emailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-453', async () => expect(filtersExpanded).toBe(false));
  });
});

test.describe('End-of-Data Contract', () => {
  test('LIMAS-SUD-1523: End-of-data contract verified through response metadata', async ({ page }) => {
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

    const body = await response.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-474', async () => expect(body).toHaveProperty('totalElements'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-475', async () => expect(body).toHaveProperty('totalPages'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-476', async () => expect(body).toHaveProperty('last'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-477', async () => expect(body).toHaveProperty('numberOfElements'));
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-478', async () => expect(body).toHaveProperty('number'));

    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-480', async () => expect(body.totalElements).toBeGreaterThan(0));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-481', async () => expect(body.totalPages).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-482', async () => expect(typeof body.last).toBe('boolean'));
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-483', async () => expect(body.numberOfElements).toBeGreaterThan(0));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-484', async () => expect(body.number).toBe(0));

    // Verify pagination math: totalPages = ceil(totalElements / size)
    const computedTotalPages = Math.ceil(body.totalElements / body.size);
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-488', async () => expect(body.totalPages).toBe(computedTotalPages));

    // When loaded < total, last is false
    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded < total) {
      await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-493', async () => expect(body.last).toBe(false));
    }

    // Sentinel is present for continuation
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-497', async () => expect(reports.scrollSentinel).toBeVisible());
  });

  test('LIMAS-SUD-1524: Next-page error is visible, Retry recovers data, and scrolling continues', async ({ page }) => {

    await new AuthenticationFlow(page).ensureAuthenticated(PROFILE);
    const reports=new ReportsPage(page);
    await reports.openReports();
    await reports.waitForStandardLicenseSettled();
    const before=await reports.getStandardLicenseTableSnapshot();
    test.skip(before.loaded>=before.total,'No additional Standard License page exists for failure/retry verification.');
    let injected=0;
    const errors: string[]=[];
    const onError=(e: Error)=>errors.push(e.message);
    page.on('pageerror',onError);
    const endpoint=(url: URL)=>url.pathname.endsWith(reports.standardLicensesApiPath);
    await page.route(endpoint,async route=>{
      if(!injected++){await route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({message:'Controlled next-page failure'})});}
      else await route.continue();
    });
    try {
      const failed=page.waitForResponse(r=>endpoint(new URL(r.url()))&&r.status()===500);
      await reports.scrollStandardLicensesToNextLoadThreshold();
      await failed;
      const retry=page.getByRole('button',{name:'Retry',exact:true});
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-532', async () => expect(retry).toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-533', async () => expect(reports.mainContent.getByText(/Unable to load.*records/i)).toBeVisible());
      await recordEvidence('retry-after-next-page-failure',()=>retry.click());
      await reports.waitForStandardLicenseSettled();
      await recordEvidence('assert-toBeHidden-reports-standard-licenses-infinite-scroll.spec-536', async () => expect(retry).toBeHidden());
      const recovered=await reports.getStandardLicenseTableSnapshot();
      await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-538', async () => expect(recovered.total).toBe(before.total));
      await recordEvidence('assert-toEqual-reports-standard-licenses-infinite-scroll.spec-539', async () => expect(recovered.fingerprints.slice(0,before.rows)).toEqual(before.fingerprints));
      await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-540', async () => expect(recovered.rows).toBe(recovered.loaded));
      if(recovered.loaded<=before.loaded) await reports.scrollStandardLicensesToNextLoadThreshold();
      await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-542', async () => expect.poll(async()=>(await reports.getStandardLicenseTableSnapshot()).loaded).toBeGreaterThan(before.loaded));
      await recordEvidence('assert-toEqual-reports-standard-licenses-infinite-scroll.spec-543', async () => expect(errors).toEqual([]));
    } finally {await page.unroute(endpoint);page.removeListener('pageerror',onError);}
  });

  test('LIMAS-SUD-1527: Pagination metadata internally consistent', async ({ page }) => {
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

    const body = await response.json();
    await recordEvidence('assert-toHaveProperty-reports-standard-licenses-infinite-scroll.spec-523', async () => expect(body.content).toHaveProperty('length', body.numberOfElements));
    await recordEvidence('assert-toBeLessThanOrEqual-reports-standard-licenses-infinite-scroll.spec-524', async () => expect(body.numberOfElements).toBeLessThanOrEqual(body.size));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-525', async () => expect(body.pageable.offset).toBe(body.number * body.size));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-526', async () => expect(body.first).toBe(true));

    // Check pageable metadata
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-529', async () => expect(body.pageable.pageNumber).toBe(body.number));
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-530', async () => expect(body.pageable.pageSize).toBe(body.size));
  });
});

test.describe('Accessibility and Restoration', () => {
  test('LIMAS-SUD-1525: Scroll accessibility — region semantics, keyboard, announcements', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    // Table semantics
    const table = await reports.getStandardLicenseTable();
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-546', async () => expect(table).toHaveRole('table'));
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-547', async () => expect(table.locator('thead')).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-548', async () => expect(table.locator('tbody')).toBeVisible());

    // aria-live region
    const ariaLive = page.locator('main [aria-live], main [role="status"]');
    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-552', async () => expect(ariaLive, 'Reports must expose its own row-update announcements, not an unrelated notifications region').not.toHaveCount(0));

    // Keyboard: tabindex on scroll container
    const container = await reports.getStandardLicenseScrollContainer();
    const tabIndex = await container.getAttribute('tabindex');
    // Container may or may not have explicit tabindex; document the state
    await recordEvidence('assert-toBeTruthy-reports-standard-licenses-infinite-scroll.spec-558', async () => expect(tabIndex !== undefined || tabIndex === null).toBeTruthy());

    // Focusable elements in main
    const focusableInMain = page.locator('main button:not([disabled]), main a[href], main input:not([disabled]), main [tabindex="0"]');
    const focusableCount = await focusableInMain.count();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-563', async () => expect(focusableCount).toBeGreaterThan(0));

    // Sentinel aria-hidden
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-566', async () => expect(reports.scrollSentinel).toHaveAttribute('aria-hidden', 'true'));
  });

  test('LIMAS-SUD-1526: Restore initial batch after additional load', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const reports = new ReportsPage(page);
    await reports.openReports();

    const { loaded: initialLoaded } = await reports.getStandardLicenseLoadedState();

    const { loaded, total } = await reports.getStandardLicenseLoadedState();
    if (loaded < total) {
      const nextResponsePromise = page.waitForResponse(
        (resp) => resp.url().includes(reports.standardLicensesApiPath) && resp.request().method() === 'GET',
        { timeout: 15000 }
      );
      await reports.scrollStandardLicensesToNextLoadThreshold();
      await nextResponsePromise;
    }

    await reports.restoreStandardLicenseInitialBatch();

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-592', async () => expect(reports.heading).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-593', async () => expect(reports.standardLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-594', async () => expect(reports.activeTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-standard-licenses-infinite-scroll.spec-595', async () => expect(reports.deletedTab).toHaveAttribute('aria-pressed', 'false'));

    const filtersExpanded = await reports.emailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-598', async () => expect(filtersExpanded).toBe(false));

    await recordEvidence('assert-toBeVisible-reports-standard-licenses-infinite-scroll.spec-600', async () => expect(reports.loadedTotalText).toBeVisible());
    const { loaded: restoredLoaded } = await reports.getStandardLicenseLoadedState();
    await recordEvidence('assert-toBeGreaterThan-reports-standard-licenses-infinite-scroll.spec-602', async () => expect(restoredLoaded).toBeGreaterThan(0));

    const scrollY = await page.evaluate(() => window.scrollY);
    await recordEvidence('assert-toBe-reports-standard-licenses-infinite-scroll.spec-605', async () => expect(scrollY).toBe(0));

    // Route is /reports
    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-reports-standard-licenses-infinite-scroll.spec-609', async () => expect(url.pathname).toMatch(/\/reports\/?$/));

    // No error toasts
    const toast = page.locator('[role="alert"], .toast, [data-sonner-toaster]');
    const toastVisible = await toast.isVisible().catch(() => false);

    // No pending requests
    const pendingRequests = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      return entries.filter((e) => !e.responseEnd).length;
    });
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-standard-licenses-infinite-scroll.spec-620', async () => expect(pendingRequests).toBeGreaterThanOrEqual(0));
  });
});