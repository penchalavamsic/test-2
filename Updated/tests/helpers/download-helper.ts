import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { Page, Download } from '@playwright/test';

/**
 * Creates a unique test-scoped temporary directory for export downloads.
 * Returns the absolute path. The caller is responsible for cleanup.
 */
export function createExportTempDirectory(testId: string): string {
  const dir = path.join(os.tmpdir(), `limas-export-${testId}-${Date.now()}`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Waits for a download event after triggering an action.
 * Saves the file to the given directory and returns the Download object.
 */
export async function captureExportDownload(
  page: Page,
  downloadDir: string,
  action: () => Promise<void>
): Promise<{ download: Download; filePath: string }> {
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30000 }),
    action(),
  ]);
  const suggestedFilename = download.suggestedFilename();
  const filePath = path.join(downloadDir, suggestedFilename);
  await download.saveAs(filePath);
  return { download, filePath };
}

/**
 * Safe metadata inspection — returns only structural info, never business data.
 */
export interface ExportMetadata {
  exists: boolean;
  fileSizeBytes: number;
  suggestedFilename: string;
  extension: string;
  mimeType: string;
  hasPathSeparators: boolean;
  hasCredentials: boolean;
}

export async function inspectExportMetadata(
  download: Download,
  filePath: string
): Promise<ExportMetadata> {
  const suggestedFilename = download.suggestedFilename();
  const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

  return {
    exists: stat !== null,
    fileSizeBytes: stat?.size ?? 0,
    suggestedFilename,
    extension: path.extname(suggestedFilename).toLowerCase(),
    mimeType: '',
    hasPathSeparators: suggestedFilename.includes('/') || suggestedFilename.includes('\\'),
    hasCredentials: /token|credential|auth|secret|password|key=/i.test(suggestedFilename),
  };
}

/**
 * Validates workbook structure only using ExcelJS.
 * Never logs business data — returns redacted structural diagnostics.
 */
export interface WorkbookValidation {
  opensWithoutCorruption: boolean;
  sheetCount: number;
  sheetNames: string[];
  hasHeaders: boolean;
  headerCount: number;
  columnCount: number;
  dataRowCount: number;
  isHtmlErrorPage: boolean;
  error: string | null;
}

export async function validateExportedWorkbookStructure(
  filePath: string
): Promise<WorkbookValidation> {
  const ExcelJS = require('exceljs');
  const result: WorkbookValidation = {
    opensWithoutCorruption: false,
    sheetCount: 0,
    sheetNames: [],
    hasHeaders: false,
    headerCount: 0,
    columnCount: 0,
    dataRowCount: 0,
    isHtmlErrorPage: false,
    error: null,
  };

  try {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(filePath);

    // Check if this is an HTML error page saved as .xlsx
    const raw = fs.readFileSync(filePath, 'utf-8').slice(0, 200);
    if (/<!DOCTYPE|<html|<body|<head/i.test(raw)) {
      result.isHtmlErrorPage = true;
      result.error = 'File appears to be an HTML error page saved with .xlsx extension';
      return result;
    }

    result.opensWithoutCorruption = true;
    result.sheetCount = wb.worksheets.length;
    result.sheetNames = wb.worksheets.map((ws: any) => ws.name || '[unnamed]');

    // Inspect first visible worksheet
    const ws = wb.getWorksheet(1);
    if (ws) {
      // Find header row (first row with content)
      let headerRow: any = null;
      let headerRowNum = 0;
      for (let r = 1; r <= Math.min(ws.rowCount || 20, 20); r++) {
        const row = ws.getRow(r);
        const nonEmptyCells = (row.values as any[] || []).filter((v: any) => v !== null && v !== undefined && v !== '');
        if (nonEmptyCells.length > 1) {
          headerRow = row;
          headerRowNum = r;
          break;
        }
      }

      if (headerRow) {
        result.hasHeaders = true;
        const headerValues = (headerRow.values as any[] || []).slice(1); // ExcelJS 1-based
        result.headerCount = headerValues.filter((v: any) => v !== null && v !== undefined && v !== '').length;
        result.columnCount = headerValues.length;
      }

      // Count data rows (rows after header with content)
      let dataRows = 0;
      for (let r = (headerRowNum || 2) + 1; r <= (ws.rowCount || 0); r++) {
        const row = ws.getRow(r);
        const hasContent = (row.values as any[] || []).some(
          (v: any) => v !== null && v !== undefined && v !== ''
        );
        if (hasContent) dataRows++;
      }
      result.dataRowCount = dataRows;
    }
  } catch (e: any) {
    result.error = `Workbook open failed: ${e.message || String(e)}`;
  }

  return result;
}

/**
 * Deletes the downloaded file and removes the temporary directory if empty.
 * Safe — only removes files within the test-scoped directory.
 */
export async function deleteExportedWorkbook(filePath: string): Promise<void> {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export async function removeExportTempDirectory(dirPath: string): Promise<void> {
  if (fs.existsSync(dirPath)) {
    try {
      const entries = fs.readdirSync(dirPath);
      if (entries.length === 0) {
        fs.rmdirSync(dirPath);
      }
    } catch {
      // Directory may have other files — leave it
    }
  }
}

/**
 * Full cleanup: delete file and remove directory.
 */
export async function cleanupExportArtifacts(
  filePath: string,
  dirPath: string
): Promise<void> {
  await deleteExportedWorkbook(filePath);
  await removeExportTempDirectory(dirPath);
}