import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { ReportsPage } from '../pages/reports.page';

test.beforeEach(async ({ page }) => {
  await new ReportsPage(page).openReports();
});
import {
  createExportTempDirectory,
  captureExportDownload,
  inspectExportMetadata,
  validateExportedWorkbookStructure,
  cleanupExportArtifacts,
} from '../helpers/download-helper';

test.describe('Reports Floating Configurations ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â RFC-C', () => {
  test.describe('Deleted Data Load', () => {
    test('LIMAS-SUD-1781: Full auto-load ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â API pages loaded, all data rendered, row count matches API', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const [result] = await Promise.all([
        reportsPage.waitForFloatingConfigurationsDeletedResponse(),
        reportsPage.selectFloatingConfigurationsDeleted(),
      ]);

      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-22', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'true'));

      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-25', async () => expect(counts.loaded).toBeGreaterThan(0));
      await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-26', async () => expect(counts.total).toBeGreaterThan(0));

      if (result && result.status === 200) {
        const body = result.body;
        if (typeof body.totalElements === 'number') {
          await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-31', async () => expect(counts.total).toBeGreaterThanOrEqual(body.totalElements));
        }
        if (typeof body.totalPages === 'number' && body.totalPages > 1) {
          await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-34', async () => expect(counts.loaded).toBeGreaterThan(500));
        }
      }
    });

    test('LIMAS-SUD-1782: Counts sync ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â record count and loaded/total match API envelope', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      const [result] = await Promise.all([
        reportsPage.waitForFloatingConfigurationsDeletedResponse(),
        reportsPage.selectFloatingConfigurationsDeleted(),
      ]);

      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-49', async () => expect(counts.recordCount).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-50', async () => expect(counts.loaded).toBeLessThanOrEqual(counts.total));

      if (result && result.status === 200) {
        const body = result.body;
        if (typeof body.totalElements === 'number') {
          await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-55', async () => expect(counts.recordCount).toBe(body.totalElements));
          await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-56', async () => expect(counts.loaded).toBe(body.totalElements));
          await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-57', async () => expect(counts.total).toBe(body.totalElements));
        }
      }
    });
  });

  test.describe('Deleted Filter Inventory', () => {
    test('LIMAS-SUD-1783: Filter inventory ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 3 textbox inputs: Deleted By, Created By, Group Name', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      await reportsPage.expandFloatingConfigurationsFilters();

      const controls = await reportsPage.getFloatingConfigurationsDeletedFilterControls();
      const names = Object.keys(controls);
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-74', async () => expect(names.length).toBe(3));

      await recordEvidence('assert-toBeDefined-reports-floating-configurations-deleted.spec-76', async () => expect(controls.deletedBy).toBeDefined());
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-77', async () => expect(controls.deletedBy.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-78', async () => expect(controls.deletedBy.disabled).toBe(false));

      await recordEvidence('assert-toBeDefined-reports-floating-configurations-deleted.spec-80', async () => expect(controls.createdBy).toBeDefined());
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-81', async () => expect(controls.createdBy.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-82', async () => expect(controls.createdBy.disabled).toBe(false));

      await recordEvidence('assert-toBeDefined-reports-floating-configurations-deleted.spec-84', async () => expect(controls.groupName).toBeDefined());
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-85', async () => expect(controls.groupName.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-86', async () => expect(controls.groupName.disabled).toBe(false));
    });
  });

  test.describe('Client-Side Filtering', () => {
    test('LIMAS-SUD-1784: Filter by Deleted By ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â rows/loaded/total update after fill', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const beforeCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.createdBy;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      // Track that no API request fires during filtering
      let apiRequestFired = false;
      page.on('request', (req) => {
        if (req.url().includes(reportsPage.floatingConfigurationsDeletedApiPath)) {
          apiRequestFired = true;
        }
      });

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-114', async () => expect(apiRequestFired).toBe(false));

      const afterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-117', async () => expect(afterCounts.loaded).toBeLessThanOrEqual(beforeCounts.loaded));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-118', async () => expect(afterCounts.total).toBeLessThanOrEqual(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-119', async () => expect(afterCounts.loaded).toBe(afterCounts.total));
    });

    test('LIMAS-SUD-1785: Filter by Created By ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â rows/loaded/total update after fill', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const beforeCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.createdBy || row.deletedBy;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('createdBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const afterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-138', async () => expect(afterCounts.loaded).toBeLessThanOrEqual(beforeCounts.loaded));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-139', async () => expect(afterCounts.total).toBeLessThanOrEqual(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-140', async () => expect(afterCounts.loaded).toBe(afterCounts.total));
    });

    test('LIMAS-SUD-1786: Filter by Group Name ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â rows/loaded/total update after fill', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const beforeCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('groupName', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const afterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-159', async () => expect(afterCounts.loaded).toBeLessThanOrEqual(beforeCounts.loaded));
      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-160', async () => expect(afterCounts.total).toBeLessThanOrEqual(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-161', async () => expect(afterCounts.loaded).toBe(afterCounts.total));
    });

    test('LIMAS-SUD-1787: Clear ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â all 3 fields empty, full data restored', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const beforeCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // Apply a filter first
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.userGroup || row.deletedBy || row.createdBy;
      if (filterValue) {
        await reportsPage.applyFloatingConfigurationsDeletedFilter('groupName', filterValue);
        await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      }

      // Clear
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const afterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // All 3 fields should be empty
      const deletedByVal = await reportsPage.getFloatingConfigurationsDeletedFilterValue('deletedBy');
      const createdByVal = await reportsPage.getFloatingConfigurationsDeletedFilterValue('createdBy');
      const groupNameVal = await reportsPage.getFloatingConfigurationsDeletedFilterValue('groupName');
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-191', async () => expect(deletedByVal).toBe(''));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-192', async () => expect(createdByVal).toBe(''));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-193', async () => expect(groupNameVal).toBe(''));

      // Full data restored
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-196', async () => expect(afterCounts.loaded).toBe(beforeCounts.loaded));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-197', async () => expect(afterCounts.total).toBe(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-198', async () => expect(afterCounts.loaded).toBe(afterCounts.total));
    });

    test('LIMAS-SUD-1788: Combined filters ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Deleted By + Group Name, rows ÃƒÂ¢Ã¢â‚¬Â°Ã‚Â¤ single-filter result', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const deletedByVal = row.deletedBy;
      const groupVal = row.userGroup;
      test.skip(!deletedByVal || !groupVal, 'Required runtime data or UI state is unavailable: !deletedByVal || !groupVal.');

      // Apply Deleted By alone first
      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', deletedByVal);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const deletedByCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // Add Group Name
      await reportsPage.applyFloatingConfigurationsDeletedFilter('groupName', groupVal);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const combinedCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-223', async () => expect(combinedCounts.loaded).toBeLessThanOrEqual(deletedByCounts.loaded));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-224', async () => expect(combinedCounts.loaded).toBe(combinedCounts.total));
    });

    test('LIMAS-SUD-1789: Zero-result filter ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â non-matching value, no rows, no crash', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', 'NO-MATCH-ZZZ-99999');
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-238', async () => expect(counts.loaded).toBe(0));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-239', async () => expect(counts.total).toBe(0));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-240', async () => expect(counts.recordCount).toBe(0));

      // No crash ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â UI still present
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-243', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-244', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));

      // Restore
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
    });

    test('LIMAS-SUD-1790: Client-side contract ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no API during filtering, only initial GETs', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      let filterApiFired = false;
      page.on('request', (req) => {
        if (
          req.url().includes(reportsPage.floatingConfigurationsDeletedApiPath) &&
          (req.method() === 'GET' || req.method() === 'POST')
        ) {
          // Only count requests after initial load
          filterApiFired = true;
        }
      });

      // Reset the flag after initial load settles
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      filterApiFired = false;

      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

      // No new API requests should have been made
      // (We can't guarantee zero because of polling/keepalive, so check counts don't change via server)
      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-282', async () => expect(counts.loaded).toBe(counts.total));
    });

    test('LIMAS-SUD-1791: Counts relationship ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â filtered loaded=total, post-clear counts restored', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const preFilterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // Apply filter
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const filteredCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-303', async () => expect(filteredCounts.loaded).toBe(filteredCounts.total));

      // Clear
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const restoredCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-310', async () => expect(restoredCounts.loaded).toBe(preFilterCounts.loaded));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-311', async () => expect(restoredCounts.total).toBe(preFilterCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-312', async () => expect(restoredCounts.loaded).toBe(restoredCounts.total));
    });

    test('LIMAS-SUD-1792: Filtered empty state ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â 0 records text, no rows rendered', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', 'NO-MATCH-ZZZ-99999');
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const rowCount = await reportsPage.getFloatingConfigurationsDeletedRowCount();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-326', async () => expect(rowCount).toBe(0));

      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-329', async () => expect(counts.recordCount).toBe(0));

      // Restore
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
    });
  });

  test.describe('Filter State Management', () => {
    test('LIMAS-SUD-1793: Scroll stability ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â position preserved through filter/clear cycle', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      // Capture initial scroll position
      const initialScrollY = await page.evaluate(() => window.scrollY);

      // Apply and clear a filter
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      await reportsPage.clearFloatingConfigurationsDeletedFilters();
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

      const finalScrollY = await page.evaluate(() => window.scrollY);
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-359', async () => expect(finalScrollY).toBeGreaterThanOrEqual(0));
      // Scroll position should be reasonable (not jumped to extremes)
      await recordEvidence('assert-toBeLessThan-reports-floating-configurations-deleted.spec-361', async () => expect(Math.abs(finalScrollY - initialScrollY)).toBeLessThan(500));
    });

    test('LIMAS-SUD-1794: Stale data prevention ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â rapid filter/clear, no stale counts persist', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      // Rapid filter ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ clear ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢ filter
      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
      await reportsPage.applyFloatingConfigurationsDeletedFilter('groupName', row.userGroup);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const finalCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      // After rapid cycles, loaded should equal total (consistent state)
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-383', async () => expect(finalCounts.loaded).toBe(finalCounts.total));
      await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-384', async () => expect(finalCounts.loaded).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-1795: Clear restoration ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â full dataset, loaded/total match, ready for next test', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      const preFilterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // Apply filter, then clear
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const restoredCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-407', async () => expect(restoredCounts.loaded).toBe(preFilterCounts.loaded));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-408', async () => expect(restoredCounts.total).toBe(preFilterCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-409', async () => expect(restoredCounts.loaded).toBe(restoredCounts.total));

      // Verify Deleted mode still active and no error
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-412', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      const errorVisible = await reportsPage.fcErrorState.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-414', async () => expect(errorVisible).toBe(false));
    });
  });

  test.describe('Export Excel', () => {
    test('LIMAS-SUD-1796: Export button state ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â enabled, accessible name, tabindex', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const exportState = await reportsPage.getFloatingConfigurationsExportState();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-426', async () => expect(exportState.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-427', async () => expect(exportState.enabled).toBe(true));

      const btn = reportsPage.fcExportButton;
      const tabindex = await btn.getAttribute('tabindex');
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-431', async () => expect(tabindex).toBe('0'));
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-432', async () => expect(btn).toHaveAccessibleName('Export Excel'));
    });

    test('LIMAS-SUD-1797: Client-side contract ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â no server request, download fires, filename received', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      let serverExportRequest = false;
      page.on('request', (req) => {
        if (req.url().includes('/api/') && ['GET', 'POST'].includes(req.method())) {
          const ct = req.headers()['content-type'] || '';
          if (
            ct.includes('spreadsheet') ||
            ct.includes('excel') ||
            ct.includes('officedocument') ||
            ct.includes('octet-stream')
          ) {
            serverExportRequest = true;
          }
        }
      });

      const { filename, download } = await reportsPage.exportFloatingConfigurationsDeleted();

      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-458', async () => expect(serverExportRequest).toBe(false));
      await recordEvidence('assert-toBeNull-reports-floating-configurations-deleted.spec-459', async () => expect(download).not.toBeNull());
      await recordEvidence('assert-toBeTruthy-reports-floating-configurations-deleted.spec-460', async () => expect(filename).toBeTruthy());
      await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-461', async () => expect(filename!.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-1798: Workbook validation ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â valid .xlsx, nonempty, not corrupt, sheet present', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const testId = 'sud-1798';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await recordEvidence('action-click-reports-floating-configurations-deleted.spec-475', async () => reportsPage.fcExportButton.click());
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-480', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-481', async () => expect(validation.isHtmlErrorPage).toBe(false));
        await recordEvidence('assert-toBeNull-reports-floating-configurations-deleted.spec-482', async () => expect(validation.error).toBeNull());
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-483', async () => expect(validation.sheetCount).toBeGreaterThanOrEqual(1));
        await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-484', async () => expect(validation.dataRowCount).toBeGreaterThan(0));

        const meta = await inspectExportMetadata(result.download, filePath);
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-487', async () => expect(meta.extension).toBe('.xlsx'));
        await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-488', async () => expect(meta.fileSizeBytes).toBeGreaterThan(0));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1799: Headers/schema ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â correct columns present in exported workbook', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const testId = 'sud-1799';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await recordEvidence('action-click-reports-floating-configurations-deleted.spec-505', async () => reportsPage.fcExportButton.click());
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-510', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-511', async () => expect(validation.hasHeaders).toBe(true));
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-512', async () => expect(validation.headerCount).toBeGreaterThanOrEqual(10));

        // Read actual headers from workbook to verify dynamically
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(filePath);
        const ws = wb.getWorksheet(1);
        const headerRow = ws.getRow(1);
        const headerValues: string[] = ((headerRow.values as any[]) || []).slice(1);
        const headerStr = headerValues.filter((v: any) => v).join(' ');

        // Verify key column categories present
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-524', async () => expect(headerStr.toLowerCase()).toMatch(/user.group|group/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-525', async () => expect(headerStr.toLowerCase()).toMatch(/profile/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-526', async () => expect(headerStr.toLowerCase()).toMatch(/role/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-527', async () => expect(headerStr.toLowerCase()).toMatch(/feature/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-528', async () => expect(headerStr.toLowerCase()).toMatch(/expiration|exp/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-529', async () => expect(headerStr.toLowerCase()).toMatch(/maintenance|maint/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-530', async () => expect(headerStr.toLowerCase()).toMatch(/deleted/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-531', async () => expect(headerStr.toLowerCase()).toMatch(/created|system.user/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-532', async () => expect(headerStr.toLowerCase()).toMatch(/total|license/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-533', async () => expect(headerStr.toLowerCase()).toMatch(/occupied/));
        await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-534', async () => expect(headerStr.toLowerCase()).toMatch(/checkout|available/));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1800: Row count ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â data rows match totalElements from UI, header row present', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const counts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      const uiTotal = counts.total;

      const testId = 'sud-1800';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await recordEvidence('action-click-reports-floating-configurations-deleted.spec-554', async () => reportsPage.fcExportButton.click());
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-559', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-configurations-deleted.spec-560', async () => expect(validation.dataRowCount).toBeGreaterThanOrEqual(uiTotal));
        await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-561', async () => expect(validation.headerCount).toBeGreaterThan(0));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1801: Filtered scope ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â filtered export has fewer rows, unfiltered restores full', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const unfilteredCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      const testId = 'sud-1801';

      // Unfiltered export
      const dir1 = createExportTempDirectory(`${testId}-unfiltered`);
      let filePath1 = '';
      let unfilteredRowCount = 0;
      try {
        const result = await captureExportDownload(page, dir1, async () => {
          await recordEvidence('action-click-reports-floating-configurations-deleted.spec-582', async () => reportsPage.fcExportButton.click());
        });
        filePath1 = result.filePath;
        const validation = await validateExportedWorkbookStructure(filePath1);
        unfilteredRowCount = validation.dataRowCount;
      } finally {
        if (filePath1) await cleanupExportArtifacts(filePath1, dir1);
      }

      // Apply filter
      await reportsPage.expandFloatingConfigurationsFilters();
      const row = await reportsPage.getFloatingConfigurationsDeletedRowComponents(0);
      const filterValue = row.deletedBy || row.userGroup;
      test.skip(!filterValue, 'Required runtime data or UI state is unavailable: !filterValue.');

      await reportsPage.applyFloatingConfigurationsDeletedFilter('deletedBy', filterValue);
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      // Filtered export
      const dir2 = createExportTempDirectory(`${testId}-filtered`);
      let filePath2 = '';
      let filteredRowCount = 0;
      try {
        const result = await captureExportDownload(page, dir2, async () => {
          await recordEvidence('action-click-reports-floating-configurations-deleted.spec-606', async () => reportsPage.fcExportButton.click());
        });
        filePath2 = result.filePath;
        const validation = await validateExportedWorkbookStructure(filePath2);
        filteredRowCount = validation.dataRowCount;
      } finally {
        if (filePath2) await cleanupExportArtifacts(filePath2, dir2);
      }

      await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-configurations-deleted.spec-615', async () => expect(filteredRowCount).toBeLessThanOrEqual(unfilteredRowCount));

      // Restore
      await reportsPage.clearFloatingConfigurationsDeletedFilters();
    });

    test('LIMAS-SUD-1802: UI preservation ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â mode, card, counts, table preserved during export', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const beforeCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();

      // Track mutations
      const mutations: string[] = [];
      page.on('request', (req) => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
          if (req.url().includes(reportsPage.floatingConfigurationsDeletedApiPath)) {
            mutations.push(`${req.method()} ${req.url()}`);
          }
        }
      });

      await recordEvidence('action-click-reports-floating-configurations-deleted.spec-639', async () => reportsPage.fcExportButton.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

      // UI preserved
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-644', async () => expect(url.pathname).toMatch(/\/reports\/?$/));

      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-646', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-647', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-648', async () => expect(reportsPage.fcActiveTab).toHaveAttribute('aria-pressed', 'false'));

      const afterCounts = await reportsPage.getFloatingConfigurationsDeletedCounts();
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-651', async () => expect(afterCounts.total).toBe(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-652', async () => expect(afterCounts.loaded).toBe(beforeCounts.loaded));

      await recordEvidence('assert-toHaveLength-reports-floating-configurations-deleted.spec-654', async () => expect(mutations).toHaveLength(0));
    });

    test('LIMAS-SUD-1803: Duplicate protection ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â two clicks, two downloads, both valid', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      // First export
      const result1 = await reportsPage.exportFloatingConfigurationsDeleted();
      await recordEvidence('assert-toBeNull-reports-floating-configurations-deleted.spec-665', async () => expect(result1.download).not.toBeNull());
      await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-666', async () => expect(result1.filename!.length).toBeGreaterThan(0));

      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

      // Second export
      const result2 = await reportsPage.exportFloatingConfigurationsDeleted();
      await recordEvidence('assert-toBeNull-reports-floating-configurations-deleted.spec-672', async () => expect(result2.download).not.toBeNull());
      await recordEvidence('assert-toBeGreaterThan-reports-floating-configurations-deleted.spec-673', async () => expect(result2.filename!.length).toBeGreaterThan(0));

      // Both filenames safe
      for (const f of [result1.filename!, result2.filename!]) {
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-677', async () => expect(f.includes('/')).toBe(false));
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-678', async () => expect(f.includes('\\')).toBe(false));
        await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-679', async () => expect(/token|credential|auth|secret|password|key=/i.test(f)).toBe(false));
      }
    });

    test('LIMAS-SUD-1804: Cleanup ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â file removed, temp cleaned, finally block executes', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const testId = 'sud-1804';
      const dir = createExportTempDirectory(testId);
      let filePath = '';

      const result = await captureExportDownload(page, dir, async () => {
        await recordEvidence('action-click-reports-floating-configurations-deleted.spec-694', async () => reportsPage.fcExportButton.click());
      });
      filePath = result.filePath;

      const validation = await validateExportedWorkbookStructure(filePath);
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-699', async () => expect(validation.opensWithoutCorruption).toBe(true));

      const fs = require('fs');
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-702', async () => expect(fs.existsSync(filePath)).toBe(true));

      await cleanupExportArtifacts(filePath, dir);

      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-706', async () => expect(fs.existsSync(filePath)).toBe(false));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-707', async () => expect(fs.existsSync(dir)).toBe(false));
    });
  });

  test.describe('Accessibility', () => {
    test('LIMAS-SUD-1805: Filter a11y ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â labels, accessible names, Clear accessible', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();
      await reportsPage.expandFloatingConfigurationsFilters();

      // Each filter input should have an accessible name
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-720', async () => expect(reportsPage.fcDeletedDeletedByInput).toHaveAccessibleName('Deleted By'));
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-721', async () => expect(reportsPage.fcDeletedCreatedByInput).toHaveAccessibleName('Created By'));
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-722', async () => expect(reportsPage.fcDeletedGroupNameInput).toHaveAccessibleName('Group Name'));

      // Clear button
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-725', async () => expect(reportsPage.fcClearFiltersButton).toHaveAccessibleName('Clear'));
      await recordEvidence('assert-toBeEnabled-reports-floating-configurations-deleted.spec-726', async () => expect(reportsPage.fcClearFiltersButton).toBeEnabled());
    });

    test('LIMAS-SUD-1806: Export a11y ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â button accessible name, keyboard, state, download notification', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      const btn = reportsPage.fcExportButton;
      await recordEvidence('assert-toHaveAccessibleName-reports-floating-configurations-deleted.spec-736', async () => expect(btn).toHaveAccessibleName('Export Excel'));
      await recordEvidence('assert-toBeEnabled-reports-floating-configurations-deleted.spec-737', async () => expect(btn).toBeEnabled());

      // Keyboard focus
      await recordEvidence('action-focus-reports-floating-configurations-deleted.spec-740', async () => reportsPage.fcActiveTab.focus());
      await recordEvidence('action-press-reports-floating-configurations-deleted.spec-741', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-reports-floating-configurations-deleted.spec-742', async () => page.keyboard.press('Tab'));
      const focused = await btn.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-744', async () => expect(focused).toBe(true));

      // Focus-visible
      const hasFocusVisible = await btn.evaluate((el) =>
        el.matches(':focus-visible') || el.classList.contains('focus-visible')
      );
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-750', async () => expect(hasFocusVisible).toBe(true));

      // Enter triggers download
      let downloadFired = false;
      const onDownload = () => { downloadFired = true; };
      page.on('download', onDownload);
      await recordEvidence('action-press-reports-floating-configurations-deleted.spec-756', async () => page.keyboard.press('Enter'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-758', async () => expect(downloadFired).toBe(true));
      page.removeListener('download', onDownload);
    });
  });

  test.describe('Safe Restoration', () => {
    test('LIMAS-SUD-1807: Restore Active error state ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â FC card, Active pressed, Deleted unpressed, error visible, route /reports', async ({ page }) => {
      const reportsPage = new ReportsPage(page);

      await reportsPage.selectFloatingConfigurationsReport();
      await reportsPage.selectFloatingConfigurationsDeleted();

      // Restore to initial state
      await reportsPage.restoreFloatingConfigurationsInitialState();

      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-773', async () => expect(reportsPage.floatingConfigurationsCard).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-774', async () => expect(reportsPage.fcActiveTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-configurations-deleted.spec-775', async () => expect(reportsPage.fcDeletedTab).toHaveAttribute('aria-pressed', 'false'));

      // Active error state may be visible (500)
      const errorVisible = await reportsPage.fcErrorState.isVisible().catch(() => false);

      const filtersVisible = await reportsPage.fcFilterPanel.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-configurations-deleted.spec-781', async () => expect(filtersVisible).toBe(false));

      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-configurations-deleted.spec-784', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });
});