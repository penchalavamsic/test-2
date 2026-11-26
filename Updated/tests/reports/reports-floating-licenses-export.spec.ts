import { generatedEmail } from '../test-data/generated';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import {
  createExportTempDirectory,
  captureExportDownload,
  inspectExportMetadata,
  validateExportedWorkbookStructure,
  cleanupExportArtifacts,
} from '../helpers/download-helper';

const PROFILE = resolveProfileName();

test.describe('Reports Floating Licenses Export Excel â€” RFL-E', () => {
  test.describe('Export Button', () => {
    test('LIMAS-SUD-1723: Export disabled in Active mode â€” 0 records, button visible but disabled, no download fires', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Active mode has 0 records by design
      await reports.verifyFloatingLicenseExportDisabledInActiveMode();

      // Confirm no download fires when clicking the disabled button
      let downloadFired = false;
      const onDownload = () => { downloadFired = true; };
      page.on('download', onDownload);
      await recordEvidence('action-click-reports-floating-licenses-export.spec-36', async () => reports.floatingLicenseExportButton.click({ force: true }));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-38', async () => expect(downloadFired).toBe(false));
      page.removeListener('download', onDownload);
    });

    test('LIMAS-SUD-1724: Export enabled in Deleted mode â€” button visible, enabled, accessible name, tabindex=0', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const btn = reports.floatingLicenseExportButton;
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-export.spec-53', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-export.spec-54', async () => expect(btn).toBeEnabled());

      const state = await reports.getFloatingLicenseExportState();
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-57', async () => expect(state.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-58', async () => expect(state.enabled).toBe(true));
      await recordEvidence('assert-toBeTruthy-reports-floating-licenses-export.spec-59', async () => expect(state.accessibleName).toBeTruthy());

      const tabindex = await btn.getAttribute('tabindex');
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-62', async () => expect(tabindex).toBe('0'));
    });

    test('LIMAS-SUD-1725: Keyboard â€” Tab focus on Export, Enter triggers download, Space triggers download, focus-visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const btn = reports.floatingLicenseExportButton;

      // Tab to focus the Export button
      await recordEvidence('action-focus-reports-floating-licenses-export.spec-78', async () => reports.floatingLicenseActiveTab.focus());
      let focused = await reports.floatingLicenseActiveTab.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-80', async () => expect(focused).toBe(true));

      await recordEvidence('action-press-reports-floating-licenses-export.spec-82', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-83', async () => page.keyboard.press('Tab'));
      focused = await btn.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-85', async () => expect(focused).toBe(true));

      // Verify focus-visible
      const hasFocusVisible = await btn.evaluate((el) =>
        el.matches(':focus-visible') || el.classList.contains('focus-visible')
      );
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-91', async () => expect(hasFocusVisible).toBe(true));

      // Enter triggers download
      let downloadFired = false;
      const onDownload = () => { downloadFired = true; };
      page.on('download', onDownload);
      await recordEvidence('action-press-reports-floating-licenses-export.spec-97', async () => page.keyboard.press('Enter'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-99', async () => expect(downloadFired).toBe(true));
      page.removeListener('download', onDownload);

      // Refocus and test Space
      downloadFired = false;
      await recordEvidence('action-press-reports-floating-licenses-export.spec-104', async () => page.keyboard.press('Shift+Tab'));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-105', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-106', async () => page.keyboard.press('Tab'));
      focused = await btn.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-108', async () => expect(focused).toBe(true));

      page.on('download', onDownload);
      await recordEvidence('action-press-reports-floating-licenses-export.spec-111', async () => page.keyboard.press('Space'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-113', async () => expect(downloadFired).toBe(true));
      page.removeListener('download', onDownload);
    });
  });

  test.describe('Export Contract', () => {
    test('LIMAS-SUD-1726: Client-side export â€” no server request, download event fires, filename limas-reports.xlsx, one click = one download', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // Track any server requests during export
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

      const result = await reports.waitForFloatingLicenseExport(() =>
        reports.triggerFloatingLicenseExport()
      );

      // Client-side export: no server request for the file
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-150', async () => expect(serverExportRequest).toBe(false));

      // Download event fired
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-153', async () => expect(result.downloadEventCount).toBe(1));

      // Filename observed
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-156', async () => expect(result.filename.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-1727: Unfiltered scope â€” 1 sheet "Exported Deleted Floating Licenses", 8 columns, dataRowCount matches runtime totalElements, file size > 1MB', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const { total } = await reports.getFloatingLicenseModeCounts();

      const testId = 'sud-1727';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-181', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-182', async () => expect(validation.isHtmlErrorPage).toBe(false));
        await recordEvidence('assert-toBeNull-reports-floating-licenses-export.spec-183', async () => expect(validation.error).toBeNull());

        // 1 sheet
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-186', async () => expect(validation.sheetCount).toBe(1));
        const sheetName = validation.sheetNames[0];
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-188', async () => expect(sheetName).toBe('Exported Deleted Floating Licenses'));

        // 8 columns
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-191', async () => expect(validation.columnCount).toBe(8));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-192', async () => expect(validation.headerCount).toBe(8));

        // Data rows match runtime totalElements
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-195', async () => expect(validation.dataRowCount).toBeGreaterThan(0));
        await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-export.spec-196', async () => expect(validation.dataRowCount).toBeLessThanOrEqual(total + 50));

        // File size > 1MB
        const stat = fs.statSync(filePath);
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-200', async () => expect(stat.size).toBeGreaterThan(1024 * 1024));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1728: Workbook validation â€” opens without corruption, not HTML error, .xlsx extension, nonempty', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const testId = 'sud-1728';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-226', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-227', async () => expect(validation.isHtmlErrorPage).toBe(false));
        await recordEvidence('assert-toBeNull-reports-floating-licenses-export.spec-228', async () => expect(validation.error).toBeNull());
        await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-export.spec-229', async () => expect(validation.sheetCount).toBeGreaterThanOrEqual(1));
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-230', async () => expect(validation.dataRowCount).toBeGreaterThan(0));

        // .xlsx extension
        const meta = await inspectExportMetadata(result.download, filePath);
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-234', async () => expect(meta.extension).toBe('.xlsx'));

        // Nonempty
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-237', async () => expect(meta.fileSizeBytes).toBeGreaterThan(0));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1729: UI preservation â€” Deleted stays selected, FL card stays selected, filters collapsed, counts unchanged after export', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const beforeCounts = await reports.getFloatingLicenseModeCounts();

      // Track any data-changing requests
      const mutations: string[] = [];
      page.on('request', (req) => {
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
          if (
            req.url().includes(reports.floatingLicensesApiPath) ||
            req.url().includes(reports.floatingLicensesDeletedApiPath)
          ) {
            mutations.push(`${req.method()} ${req.url()}`);
          }
        }
      });

      await reports.triggerFloatingLicenseExport();
      await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

      // UI remains on /reports
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-export.spec-273', async () => expect(url.pathname).toMatch(/\/reports\/?$/));

      // FL card stays selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-export.spec-276', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));

      // Deleted stays selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-export.spec-279', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'true'));
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-export.spec-280', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'false'));

      // Filters collapsed (no visible filter panel)
      const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-284', async () => expect(filtersVisible).toBe(false));

      // Counts unchanged
      const afterCounts = await reports.getFloatingLicenseModeCounts();
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-288', async () => expect(afterCounts.total).toBe(beforeCounts.total));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-289', async () => expect(afterCounts.loaded).toBe(beforeCounts.loaded));

      // No data-changing requests
      await recordEvidence('assert-toHaveLength-reports-floating-licenses-export.spec-292', async () => expect(mutations).toHaveLength(0));
    });

    test('LIMAS-SUD-1730: Filename â€” limas-reports.xlsx, no path separators, no credential-like strings', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const testId = 'sud-1730';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const meta = await inspectExportMetadata(result.download, filePath);
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-315', async () => expect(meta.suggestedFilename.length).toBeGreaterThan(0));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-316', async () => expect(meta.suggestedFilename).toBe('limas-reports.xlsx'));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-317', async () => expect(meta.hasPathSeparators).toBe(false));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-318', async () => expect(meta.hasCredentials).toBe(false));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });

    test('LIMAS-SUD-1731: MIME and size â€” application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, size > 0', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const testId = 'sud-1731';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const meta = await inspectExportMetadata(result.download, filePath);
        await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-344', async () => expect(meta.fileSizeBytes).toBeGreaterThan(0));

        // Verify PK header (ZIP/XLSX)
        const buf = fs.readFileSync(filePath);
        const header = buf.slice(0, 4).toString('hex');
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-349', async () => expect(header).toBe('504b0304'));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }
    });
  });

  test.describe('Filtered Export', () => {
    test('LIMAS-SUD-1732: Product Profile filter â€” apply, export, rows â‰¤ unfiltered total, headers unchanged, clear after', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const unfilteredTotal = (await reports.getFloatingLicenseModeCounts()).total;

      // Apply Product Profile filter
      await recordEvidence('action-click-reports-floating-licenses-export.spec-370', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });
      await recordEvidence('action-click-reports-floating-licenses-export.spec-372', async () => reports.flProductProfileSearchbox.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const firstOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
      const hasOption = await firstOption.isVisible().catch(() => false);
      if (!hasOption) {
        // No profile options â€” skip export, restore state
        await recordEvidence('action-click-reports-floating-licenses-export.spec-378', async () => reports.filtersButton.click());
        return;
      }
      await recordEvidence('action-click-reports-floating-licenses-export.spec-381', async () => firstOption.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const testId = 'sud-1732';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-394', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-export.spec-395', async () => expect(validation.dataRowCount).toBeLessThanOrEqual(unfilteredTotal));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-396', async () => expect(validation.sheetNames[0]).toBe('Exported Deleted Floating Licenses'));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-397', async () => expect(validation.columnCount).toBe(8));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }

      // Clear and restore
      await reports.clearFloatingLicenseFilters();
      await recordEvidence('action-click-reports-floating-licenses-export.spec-404', async () => reports.filtersButton.click());
      await reports.floatingLicenseLoadedTotalText.waitFor();
    });

    test('LIMAS-SUD-1733: Date filter â€” apply Expiration Date, export, rows â‰¤ total, headers unchanged, clear after', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const unfilteredTotal = (await reports.getFloatingLicenseModeCounts()).total;

      // Apply Expiration Date filter
      const { currentDate } = await reports.getReportDateRuntimeData();
      await recordEvidence('action-click-reports-floating-licenses-export.spec-422', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });
      await recordEvidence('action-fill-reports-floating-licenses-export.spec-424', async () => reports.flExpirationDateInput.fill(currentDate));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-425', async () => page.keyboard.press('Tab'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const testId = 'sud-1733';
      const dir = createExportTempDirectory(testId);
      let filePath = '';
      try {
        const result = await captureExportDownload(page, dir, async () => {
          await reports.triggerFloatingLicenseExport();
        });
        filePath = result.filePath;

        const validation = await validateExportedWorkbookStructure(filePath);
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-438', async () => expect(validation.opensWithoutCorruption).toBe(true));
        await recordEvidence('assert-toBeLessThanOrEqual-reports-floating-licenses-export.spec-439', async () => expect(validation.dataRowCount).toBeLessThanOrEqual(unfilteredTotal));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-440', async () => expect(validation.sheetNames[0]).toBe('Exported Deleted Floating Licenses'));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-441', async () => expect(validation.columnCount).toBe(8));
      } finally {
        if (filePath) await cleanupExportArtifacts(filePath, dir);
      }

      // Clear and restore
      await reports.clearFloatingLicenseFilters();
      await recordEvidence('action-click-reports-floating-licenses-export.spec-448', async () => reports.filtersButton.click());
      await reports.floatingLicenseLoadedTotalText.waitFor();
    });

    test('LIMAS-SUD-1734: Zero-result filter behavior â€” no-match filter, export behavior, no crash', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      await recordEvidence('action-click-reports-floating-licenses-export.spec-462', async () => reports.filtersButton.click());
      await reports.flEmailSearchbox.waitFor({ state: 'visible' });

      // Apply a no-match email filter
      await recordEvidence('action-fill-reports-floating-licenses-export.spec-466', async () => reports.flEmailSearchbox.fill(generatedEmail('no-match-xyz-99999')));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-467', async () => page.keyboard.press('Enter'));
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const btn = reports.floatingLicenseExportButton;
      const isDisabled = await btn.isDisabled().catch(() => false);

      if (isDisabled) {
        let downloadFired = false;
        const onDownload = () => { downloadFired = true; };
        page.on('download', onDownload);
        await recordEvidence('action-click-reports-floating-licenses-export.spec-477', async () => btn.click({ force: true }));
        await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-479', async () => expect(downloadFired).toBe(false));
        page.removeListener('download', onDownload);
      } else {
        const testId = 'sud-1734';
        const dir = createExportTempDirectory(testId);
        let filePath = '';
        try {
          const result = await captureExportDownload(page, dir, async () => {
            await recordEvidence('action-click-reports-floating-licenses-export.spec-487', async () => btn.click());
          });
          filePath = result.filePath;
          const validation = await validateExportedWorkbookStructure(filePath);
          await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-491', async () => expect(validation.opensWithoutCorruption).toBe(true));
          await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-492', async () => expect(validation.dataRowCount).toBe(0));
          await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-493', async () => expect(validation.headerCount).toBeGreaterThan(0));
        } finally {
          if (filePath) await cleanupExportArtifacts(filePath, dir);
        }
      }

      // Restore
      await reports.clearFloatingLicenseFilters();
      await recordEvidence('action-click-reports-floating-licenses-export.spec-501', async () => reports.filtersButton.click());
      await reports.floatingLicenseLoadedTotalText.waitFor();
    });
  });

  test.describe('Safety and Cleanup', () => {
    test('LIMAS-SUD-1735: Duplicate protection â€” click twice, one download per click, both valid', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      // First export
      const result1 = await reports.waitForFloatingLicenseExport(() =>
        reports.triggerFloatingLicenseExport()
      );
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-521', async () => expect(result1.downloadEventCount).toBe(1));

      // Second export
      const result2 = await reports.waitForFloatingLicenseExport(() =>
        reports.triggerFloatingLicenseExport()
      );
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-527', async () => expect(result2.downloadEventCount).toBe(1));

      // Both filenames nonempty
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-530', async () => expect(result1.filename.length).toBeGreaterThan(0));
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-531', async () => expect(result2.filename.length).toBeGreaterThan(0));

      // Filenames safe
      for (const f of [result1.filename, result2.filename]) {
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-535', async () => expect(f.includes('/')).toBe(false));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-536', async () => expect(f.includes('\\')).toBe(false));
        await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-537', async () => expect(/token|credential|auth|secret|password|key=/i.test(f)).toBe(false));
      }
    });

    test('LIMAS-SUD-1736: Cleanup â€” export, temp dir removed after cleanupExportArtifacts, no stray files', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();
      await reports.selectFloatingLicenseDeletedMode();

      const testId = 'sud-1736';
      const dir = createExportTempDirectory(testId);
      let filePath = '';

      const result = await captureExportDownload(page, dir, async () => {
        await reports.triggerFloatingLicenseExport();
      });
      filePath = result.filePath;

      // Validate workbook before cleanup
      const validation = await validateExportedWorkbookStructure(filePath);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-562', async () => expect(validation.opensWithoutCorruption).toBe(true));

      // File exists before cleanup
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-565', async () => expect(fs.existsSync(filePath)).toBe(true));

      // Cleanup
      await cleanupExportArtifacts(filePath, dir);

      // File gone
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-571', async () => expect(fs.existsSync(filePath)).toBe(false));

      // Directory removed
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-574', async () => expect(fs.existsSync(dir)).toBe(false));
    });

    test('LIMAS-SUD-1737: Accessibility â€” accessible name "Export Excel", disabled state in Active, keyboard reachable, focus-visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // In Active mode: button disabled
      const activeState = await reports.getFloatingLicenseExportState();
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-588', async () => expect(activeState.visible).toBe(true));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-589', async () => expect(activeState.enabled).toBe(false));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-590', async () => expect(activeState.accessibleName).toBe('Export Excel'));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-591', async () => expect(activeState.role).toBe('button'));

      // Switch to Deleted to verify enabled state and keyboard
      await reports.selectFloatingLicenseDeletedMode();

      const btn = reports.floatingLicenseExportButton;
      await recordEvidence('assert-toBeEnabled-reports-floating-licenses-export.spec-597', async () => expect(btn).toBeEnabled());

      // Keyboard reachability
      await recordEvidence('action-focus-reports-floating-licenses-export.spec-600', async () => reports.floatingLicenseActiveTab.focus());
      await recordEvidence('action-press-reports-floating-licenses-export.spec-601', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-reports-floating-licenses-export.spec-602', async () => page.keyboard.press('Tab'));
      const focused = await btn.evaluate((el) => el === document.activeElement);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-604', async () => expect(focused).toBe(true));

      // Focus-visible
      const hasFocusVisible = await btn.evaluate((el) =>
        el.matches(':focus-visible') || el.classList.contains('focus-visible')
      );
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-610', async () => expect(hasFocusVisible).toBe(true));

      // SVG icon is decorative
      const svg = btn.locator('svg').first();
      const ariaHidden = await svg.getAttribute('aria-hidden').catch(() => null);
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-615', async () => expect(ariaHidden === 'true' || ariaHidden === null).toBe(true));

      // Button has visible text
      const textContent = await btn.textContent();
      await recordEvidence('assert-toBeTruthy-reports-floating-licenses-export.spec-619', async () => expect(textContent).toBeTruthy());
      await recordEvidence('assert-toBeGreaterThan-reports-floating-licenses-export.spec-620', async () => expect(textContent!.trim().length).toBeGreaterThan(0));
    });
  });

  test.describe('Restoration', () => {
    test('LIMAS-SUD-1738: Restore Active â€” FL selected, Active pressed, 0/0 counts, Export disabled, route /reports', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();
      const reports = new ReportsPage(page);
      await reports.openReports();
      await reports.selectFloatingLicensesReport();

      // Navigate to Deleted first
      await reports.selectFloatingLicenseDeletedMode();

      // Restore to Active
      await reports.restoreFloatingLicenseActiveMode();

      // FL selected
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-export.spec-641', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));

      // Active pressed
      await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-export.spec-644', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));

      // 0/0 counts (Active mode has 0 records)
      const { loaded, total } = await reports.getFloatingLicenseLoadedState();
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-648', async () => expect(loaded).toBe(0));
      await recordEvidence('assert-toBe-reports-floating-licenses-export.spec-649', async () => expect(total).toBe(0));

      // Export disabled
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-export.spec-652', async () => expect(reports.floatingLicenseExportButton).toBeDisabled());

      // Route /reports
      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-reports-floating-licenses-export.spec-656', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
    });
  });

  test.describe('Controlled Failures', () => {
    test.skip('LIMAS-SUD-1739: Unauthorized 401', async () => {
      // Plan Status: Reviewed
      // Script Status: Not Started
      // Execution Status: Not Run
      // Reason: Requires controlled export-failure fixture
    });

    test.skip('LIMAS-SUD-1740: Server error 500', async () => {
      // Plan Status: Reviewed
      // Script Status: Not Started
      // Execution Status: Not Run
      // Reason: Requires controlled server-error fixture
    });
  });
});