import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Pagination Structure', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1039: Pagination summary text is visible and matches pattern', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await recordEvidence('assert-toBeVisible-user-license-hub-pagination-structure.spec-22', async () => expect(hub.paginationSummary).toBeVisible());
    const text = await hub.getPaginationSummaryText();
    await recordEvidence('assert-toMatch-user-license-hub-pagination-structure.spec-24', async () => expect(text).toMatch(/Showing\s+\d+[–-]\d+\s+of\s+\d+/));
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-structure.spec-25', async () => expect(text.length).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1040: Pagination summary parses into consistent numeric values', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { start, end, total } = await hub.parsePaginationSummary();

    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-structure.spec-33', async () => expect(start).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-structure.spec-34', async () => expect(end).toBeGreaterThanOrEqual(start));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-pagination-structure.spec-35', async () => expect(end).toBeLessThanOrEqual(total));

    const pageSize = await hub.getCurrentPageSize();
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-pagination-structure.spec-38', async () => expect(end - start + 1).toBeLessThanOrEqual(pageSize));
  });

  test('LIMAS-SUD-1041: Page summary text is visible and matches pattern', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await recordEvidence('assert-toBeVisible-user-license-hub-pagination-structure.spec-44', async () => expect(hub.pageInfoText).toBeVisible());
    const text = await hub.getPageSummaryText();
    await recordEvidence('assert-toMatch-user-license-hub-pagination-structure.spec-46', async () => expect(text).toMatch(/Page\s+\d+\s+of\s+\d+/));
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-structure.spec-47', async () => expect(text.length).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1042: Page summary parses into 1-based UI page numbers', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { currentPage, totalPages } = await hub.parsePageSummary();

    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-structure.spec-55', async () => expect(currentPage).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-structure.spec-56', async () => expect(totalPages).toBeGreaterThanOrEqual(1));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-pagination-structure.spec-57', async () => expect(currentPage).toBeLessThanOrEqual(totalPages));

    // Initial load: UI page = 1, API page = 0
    await recordEvidence('assert-toBe-user-license-hub-pagination-structure.spec-60', async () => expect(currentPage).toBe(1));
  });

  test('LIMAS-SUD-1043: Cross-field pagination consistency without hardcoded values', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.verifyPaginationConsistencyDynamic();
  });
});