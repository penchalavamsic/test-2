const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFC_B_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  // Active Error State (2)
  ['LIMAS-SUD-1763', 'To verify Active mode 500 error: heading "Unable to load...", status text, Retry button, no table, mode and filters usable', 'Reports Floating Configurations RFC-B', 'Active Error State', 'Reports', 'Error', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1763-rfc-b-active-error-500-response.md'],
  ['LIMAS-SUD-1764', 'To verify Retry sends new GET /report/all?page=0&size=500, multiple retries, mode/card unchanged, UI responsive', 'Reports Floating Configurations RFC-B', 'Active Error State', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1764-rfc-b-retry-mechanism.md'],

  // Deleted Mode Selection (3)
  ['LIMAS-SUD-1765', 'To verify Deleted mode click: aria-pressed=true, loading text, FC card stays selected', 'Reports Floating Configurations RFC-B', 'Deleted Mode Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1765-rfc-b-deleted-mode-selection.md'],
  ['LIMAS-SUD-1766', 'To verify Deleted API contract: GET /report/alldeleted?page=0&size=500, 200, Spring Page envelope, distinct from /report/all', 'Reports Floating Configurations RFC-B', 'Deleted Mode Selection', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1766-rfc-b-deleted-api-contract.md'],
  ['LIMAS-SUD-1767', 'To verify Deleted counts: record count and loaded/total match API totalElements, dynamic read', 'Reports Floating Configurations RFC-B', 'Deleted Mode Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1767-rfc-b-deleted-counts.md'],

  // Deleted Table Structure (2)
  ['LIMAS-SUD-1768', 'To verify Deleted table: 6 headers (User Group, Profile, Role, Created/Deleted By, Configuration Details, Availability)', 'Reports Floating Configurations RFC-B', 'Deleted Table Structure', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1768-rfc-b-deleted-table-structure.md'],
  ['LIMAS-SUD-1769', 'To verify row structure: dates (Exp/Maint/Created/Modified), Feature, Availability (Total/Occupied/Max+Available/Unavailable)', 'Reports Floating Configurations RFC-B', 'Deleted Table Structure', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1769-rfc-b-deleted-row-structure.md'],

  // Deleted Mode State (1)
  ['LIMAS-SUD-1770', 'To verify Export Excel enabled in Deleted mode with data, accessible, runtime state recorded', 'Reports Floating Configurations RFC-B', 'Deleted Mode State', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1770-rfc-b-deleted-export-state.md'],

  // Mode Switching (5)
  ['LIMAS-SUD-1771', 'To verify Deleted-to-Active: Active pressed, error reappears, table removed, counts reset to 0', 'Reports Floating Configurations RFC-B', 'Mode Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1771-rfc-b-deleted-to-active-switching.md'],
  ['LIMAS-SUD-1772', 'To verify Active↔Deleted roundtrip: correct endpoints per mode, no stale data mixing', 'Reports Floating Configurations RFC-B', 'Mode Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1772-rfc-b-active-to-deleted-back.md'],
  ['LIMAS-SUD-1773', 'To verify already-selected Deleted: no duplicate request, counts/table stable, aria-pressed stays true', 'Reports Floating Configurations RFC-B', 'Mode Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1773-rfc-b-already-selected-deleted.md'],
  ['LIMAS-SUD-1774', 'To verify stale response: rapid Active→Deleted, late Active error does not pollute Deleted view', 'Reports Floating Configurations RFC-B', 'Mode Switching', 'Reports', 'Race Condition', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1774-rfc-b-mode-switch-stale-response.md'],
  ['LIMAS-SUD-1775', 'To verify loading state: visible during mode switch, resolves on response, no perpetual loading', 'Reports Floating Configurations RFC-B', 'Mode Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1775-rfc-b-mode-switch-loading-state.md'],

  // Filter and Mode Interplay (1)
  ['LIMAS-SUD-1776', 'To verify filter preservation: collapsed/empty state preserved across mode switches, no data leakage', 'Reports Floating Configurations RFC-B', 'Filter and Mode Interplay', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1776-rfc-b-filter-preservation-across-modes.md'],

  // Accessibility (2)
  ['LIMAS-SUD-1777', 'To verify mode switching a11y: Configuration mode group, aria-pressed, keyboard, focus management, AT communication', 'Reports Floating Configurations RFC-B', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1777-rfc-b-mode-switching-accessibility.md'],
  ['LIMAS-SUD-1778', 'To verify error state a11y: error heading/Retry accessible, status text reachable, no silent failure, focus order', 'Reports Floating Configurations RFC-B', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1778-rfc-b-error-state-accessibility.md'],

  // Safe Restoration (1)
  ['LIMAS-SUD-1779', 'To verify safe restoration: FC card selected, Active pressed, Deleted unpressed, filters collapsed, Active state visible, route /reports', 'Reports Floating Configurations RFC-B', 'Safe Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1779-rfc-b-safe-restoration.md'],

  // Data Freshness (1)
  ['LIMAS-SUD-1780', 'To verify Deleted API freshness: each visit re-fetches, no stale cache, counts always current', 'Reports Floating Configurations RFC-B', 'Data Freshness', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1780-rfc-b-deleted-api-freshness.md'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }

  const WHITE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LIGHT_GREEN_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const DARK_FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    right: { style: 'thin', color: { argb: 'FFD0D0D0' } },
  };

  const startRow = lastRow + 1;
  for (let i = 0; i < rows.length; i++) {
    const r = startRow + i;
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(r, c + 1);
      cell.value = rows[i][c] || '';
      cell.font = DARK_FONT;
      cell.fill = bandIndex === 0 ? WHITE_FILL : LIGHT_GREEN_FILL;
      cell.border = thinBorder;
      cell.alignment = { vertical: 'middle', wrapText: c === 1 };
    }
    bandIndex = 1 - bandIndex;
  }

  ws.autoFilter = { from: 'A4', to: 'L' + (startRow + rows.length - 1) };
  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved: ${rows.length} rows, range ${startRow}-${startRow + rows.length - 1}`);
}

main().catch(console.error);