const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFL_E_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  // Export Button (3)
  ['LIMAS-SUD-1723', 'To verify Export Excel disabled in Active mode (0 records), no download on click', 'Reports Floating Licenses RFL-E', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1723-rfl-e-export-active-disabled.md'],
  ['LIMAS-SUD-1724', 'To verify Export Excel enabled in Deleted mode — cursor=pointer, accessible name, tabindex=0', 'Reports Floating Licenses RFL-E', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1724-rfl-e-export-deleted-enabled.md'],
  ['LIMAS-SUD-1725', 'To verify Export keyboard — Tab focus, Enter/Space triggers download, focus-visible', 'Reports Floating Licenses RFL-E', 'Export Button', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1725-rfl-e-export-keyboard.md'],

  // Export Contract (6)
  ['LIMAS-SUD-1726', 'To verify client-side export — no server request, xlsx.js, 1 click=1 download, limas-reports.xlsx', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1726-rfl-e-export-client-side-contract.md'],
  ['LIMAS-SUD-1727', 'To verify unfiltered export scope — 1 sheet, 8 columns, data rows=totalElements, >1MB', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1727-rfl-e-export-unfiltered-scope.md'],
  ['LIMAS-SUD-1728', 'To verify workbook validation — not corrupt, .xlsx, nonempty, valid ZIP, header row', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1728-rfl-e-export-workbook-validation.md'],
  ['LIMAS-SUD-1729', 'To verify UI preserved during and after export — mode, card, filters, counts, table, scroll', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1729-rfl-e-export-ui-preservation.md'],
  ['LIMAS-SUD-1730', 'To verify filename — limas-reports.xlsx, no path separators, no credentials', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1730-rfl-e-export-filename.md'],
  ['LIMAS-SUD-1731', 'To verify MIME and size — application/xlsx or octet-stream, size>0, ZIP central directory', 'Reports Floating Licenses RFL-E', 'Export Contract', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1731-rfl-e-export-mime-and-size.md'],

  // Filtered Export (3)
  ['LIMAS-SUD-1732', 'To verify Product Profile filtered export — rows ≤ unfiltered total, headers unchanged, clear after', 'Reports Floating Licenses RFL-E', 'Filtered Export', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1732-rfl-e-export-filtered-product-profile.md'],
  ['LIMAS-SUD-1733', 'To verify Date filtered export — rows reflect scope, headers unchanged, clear after', 'Reports Floating Licenses RFL-E', 'Filtered Export', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1733-rfl-e-export-filtered-date.md'],
  ['LIMAS-SUD-1734', 'To verify zero-result export — no-match filter, observe behavior, no crash, consistent', 'Reports Floating Licenses RFL-E', 'Filtered Export', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1734-rfl-e-export-zero-result-no-file.md'],

  // Safety and Cleanup (3)
  ['LIMAS-SUD-1735', 'To verify duplicate protection — 2 rapid clicks, 2 valid workbooks, no corruption', 'Reports Floating Licenses RFL-E', 'Safety and Cleanup', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1735-rfl-e-export-duplicate-protection.md'],
  ['LIMAS-SUD-1736', 'To verify cleanup — temp file and dir removed, no shared Downloads folder used', 'Reports Floating Licenses RFL-E', 'Safety and Cleanup', 'Reports', 'Cleanup', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1736-rfl-e-export-cleanup.md'],
  ['LIMAS-SUD-1737', 'To verify export a11y — accessible name, disabled/enabled state communication, keyboard, focus-visible', 'Reports Floating Licenses RFL-E', 'Safety and Cleanup', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1737-rfl-e-export-a11y.md'],

  // Restoration and Controlled Failures (3)
  ['LIMAS-SUD-1738', 'To verify safe restoration — Active, 0/0, Export disabled, route /reports', 'Reports Floating Licenses RFL-E', 'Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1738-rfl-e-export-restoration.md'],
  ['LIMAS-SUD-1739', 'To verify controlled failure — 401 Unauthorized, graceful error, no crash', 'Reports Floating Licenses RFL-E', 'Controlled Failures', 'Reports', 'Mock', '', '', 'Reviewed', 'Not Started', 'Not Run', 'plans/reports/LIMAS-SUD-1739-rfl-e-export-controlled-failure-unauthorized.md'],
  ['LIMAS-SUD-1740', 'To verify controlled failure — 500 Server Error, graceful degradation', 'Reports Floating Licenses RFL-E', 'Controlled Failures', 'Reports', 'Mock', '', '', 'Reviewed', 'Not Started', 'Not Run', 'plans/reports/LIMAS-SUD-1740-rfl-e-export-controlled-failure-server-error.md'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }
  console.log('Last populated row:', lastRow);

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }
  console.log('Next band index:', bandIndex);

  const WHITE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LIGHT_GREEN_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const DARK_FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    right: { style: 'thin', color: { argb: 'FFD0D0D0' } },
  };

  let currentRow = lastRow + 1;
  for (const rowData of rows) {
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(currentRow, c + 1);
      cell.value = rowData[c] || '';
      cell.font = DARK_FONT;
      cell.fill = bandIndex === 0 ? WHITE_FILL : LIGHT_GREEN_FILL;
      cell.border = thinBorder;
      cell.alignment = { vertical: 'middle', wrapText: c === 1 };
    }
    bandIndex = 1 - bandIndex;
    currentRow++;
  }
  ws.autoFilter = { from: 'A4', to: `L${currentRow - 1}` };
  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved. Rows: ${rows.length}. First new: ${lastRow + 1}, Last new: ${currentRow - 1}`);
}

main().catch(console.error);