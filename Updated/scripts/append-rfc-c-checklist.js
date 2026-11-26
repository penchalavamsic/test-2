const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFC_C_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  ['LIMAS-SUD-1781', 'To verify Deleted auto-loads all data in 2 sequential GETs (page=0, page=1) — totalPages=2, last=true on page 1, 150 rows rendered, no manual scroll needed', 'Reports Floating Configurations RFC-C', 'Deleted Data Load', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1781-rfc-c-deleted-api-full-load.md'],
  ['LIMAS-SUD-1782', 'To verify counts sync: record count and loaded/total match API totalElements/loaded, dynamic reads', 'Reports Floating Configurations RFC-C', 'Deleted Data Load', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1782-rfc-c-deleted-counts-sync.md'],
  ['LIMAS-SUD-1783', 'To verify Deleted mode has 3 filters: Deleted By (textbox Enter deleted by), Created By (textbox Enter created by), Group Name (textbox Enter group name) — different from Active 8 filters', 'Reports Floating Configurations RFC-C', 'Deleted Filter Inventory', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1783-rfc-c-deleted-filter-inventory.md'],

  ['LIMAS-SUD-1784', 'To verify filter by Deleted By: rows/loaded/total update, client-side, dynamic value', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1784-rfc-c-filter-by-deleted-by.md'],
  ['LIMAS-SUD-1785', 'To verify filter by Created By: rows/loaded/total update, client-side, clear after', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1785-rfc-c-filter-by-created-by.md'],
  ['LIMAS-SUD-1786', 'To verify filter by Group Name: rows/loaded/total update, client-side, clear after', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1786-rfc-c-filter-by-group-name.md'],
  ['LIMAS-SUD-1787', 'To verify Clear: all 3 fields emptied, delay, full dataset restored, UI consistent', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1787-rfc-c-clear-filter.md'],
  ['LIMAS-SUD-1788', 'To verify combined filter: Deleted By + Group Name together, rows ≤ single-filter, client-side', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1788-rfc-c-filter-combined.md'],
  ['LIMAS-SUD-1789', 'To verify zero-result filter: non-matching value → 0 rows, 0 records, no crash, clear restores', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1789-rfc-c-filter-zero-result.md'],
  ['LIMAS-SUD-1790', 'To verify client-side contract: no API requests during filter input, only initial page 0+1 GETs, filtering operates on preloaded data', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1790-rfc-c-filter-client-side-contract.md'],
  ['LIMAS-SUD-1791', 'To verify filtered counts: loaded === total when filtered, post-clear counts restored to full dataset', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1791-rfc-c-filter-counts-relationship.md'],
  ['LIMAS-SUD-1792', 'To verify filtered empty state: 0 records text, no rows, filter controls interactive, no crash', 'Reports Floating Configurations RFC-C', 'Client-Side Filtering', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1792-rfc-c-filtered-empty-state.md'],

  ['LIMAS-SUD-1793', 'To verify scroll stability: position preserved through filter/clear cycle, table scrollable after', 'Reports Floating Configurations RFC-C', 'Filter State Management', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1793-rfc-c-scroll-stability.md'],
  ['LIMAS-SUD-1794', 'To verify stale data prevention: rapid filter/clear/filter, no stale counts, counts match visible rows', 'Reports Floating Configurations RFC-C', 'Filter State Management', 'Reports', 'Race Condition', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1794-rfc-c-filter-stale-data.md'],
  ['LIMAS-SUD-1795', 'To verify Clear restores full dataset, loaded/total match API, ready for next test', 'Reports Floating Configurations RFC-C', 'Filter State Management', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1795-rfc-c-clear-restoration.md'],

  ['LIMAS-SUD-1796', 'To verify Export Excel button: enabled, accessible name, tabindex, cursor pointer when data loaded', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1796-rfc-c-export-button-state.md'],
  ['LIMAS-SUD-1797', 'To verify client-side Export: no server request, download fires, suggested filename "limas-reports.xlsx"', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1797-rfc-c-export-client-side-contract.md'],
  ['LIMAS-SUD-1798', 'To verify workbook: valid .xlsx, nonempty, not corrupt, sheet "Exported Deleted Configs", opens successfully', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1798-rfc-c-export-workbook-validation.md'],
  ['LIMAS-SUD-1799', 'To verify export schema: 15 columns (User Group, Product Profile, Profile Role, Feature, Feature Version, Expiration Date, Maintenance Date, System User, Deleted By, Modified Date, Created Date, Total Licenses, Occupied Licenses, Max Checkout (h), Available for Checkout)', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1799-rfc-c-export-headers-and-schema.md'],
  ['LIMAS-SUD-1800', 'To verify export row count: data rows match totalElements, header row present, total rows = data + 1', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1800-rfc-c-export-row-count.md'],
  ['LIMAS-SUD-1801', 'To verify filtered export: apply filter, export has fewer rows matching scope, restore unfiltered full export', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1801-rfc-c-export-filtered-scope.md'],
  ['LIMAS-SUD-1802', 'To verify UI preservation: Deleted mode, FC card, counts, table, scroll preserved during/after export', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1802-rfc-c-export-ui-preservation.md'],
  ['LIMAS-SUD-1803', 'To verify duplicate protection: two rapid clicks, two downloads, both valid .xlsx, no corruption', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1803-rfc-c-export-duplicate-protection.md'],
  ['LIMAS-SUD-1804', 'To verify cleanup: file removed after test, temp cleaned, cleanup in finally block, no shared paths', 'Reports Floating Configurations RFC-C', 'Export Excel', 'Reports', 'Cleanup', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1804-rfc-c-export-cleanup.md'],

  ['LIMAS-SUD-1805', 'To verify filter a11y: textbox labels accessible, Clear button accessible, filter state communicated', 'Reports Floating Configurations RFC-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1805-rfc-c-filter-a11y.md'],
  ['LIMAS-SUD-1806', 'To verify Export a11y: accessible name, keyboard, focus-visible, download notification accessible', 'Reports Floating Configurations RFC-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1806-rfc-c-export-a11y.md'],

  ['LIMAS-SUD-1807', 'To verify safe restoration: FC card selected, Active pressed, Deleted unpressed, 0 records, error visible, route /reports, browser open', 'Reports Floating Configurations RFC-C', 'Safe Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1807-rfc-c-safe-restoration-active.md'],
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