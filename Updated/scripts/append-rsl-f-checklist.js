const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RSL_F_CHECKLIST.xlsx');
require('fs').copyFileSync(MAIN, BACKUP);

const rows = [
  // Export Button (4)
  ['LIMAS-SUD-1610', 'To verify the functionality of "Reports" → "Standard Licenses" → "Export Button" → "Export button structure — visible, role=button, accessible name, enabled, toolbar, icon SVG, tabindex=0"', 'Reports Standard Licenses RSL-F', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1610-rsl-f-export-button-structure.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1611', 'To verify the functionality of "Reports" → "Standard Licenses" → "Export Button" → "Keyboard — Tab focus, focus-visible, Enter and Space activation"', 'Reports Standard Licenses RSL-F', 'Export Button', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1611-rsl-f-export-button-keyboard.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1612', 'To verify the functionality of "Reports" → "Standard Licenses" → "Export Button" → "State with zero filtered results — disabled or header-only export"', 'Reports Standard Licenses RSL-F', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1612-rsl-f-export-zero-results-state.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1613', 'To verify the functionality of "Reports" → "Standard Licenses" → "Export Button" → "Pending state — button state during active export"', 'Reports Standard Licenses RSL-F', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1613-rsl-f-export-pending-state.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Active Unfiltered Export (3)
  ['LIMAS-SUD-1614', 'To verify the functionality of "Reports" → "Standard Licenses" → "Unfiltered Export" → "Export contract — method, endpoint, Content-Type, status 200, Content-Disposition"', 'Reports Standard Licenses RSL-F', 'Unfiltered Export', 'Reports', 'API', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1614-rsl-f-export-request-contract.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1615', 'To verify the functionality of "Reports" → "Standard Licenses" → "Unfiltered Export" → "Scope — workbook row count consistent with runtime base total, no filters"', 'Reports Standard Licenses RSL-F', 'Unfiltered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1615-rsl-f-unfiltered-export-scope.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1616', 'To verify the functionality of "Reports" → "Standard Licenses" → "Unfiltered Export" → "UI preservation — no navigation, mode unchanged, filters unchanged, no data-changing request"', 'Reports Standard Licenses RSL-F', 'Unfiltered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1616-rsl-f-export-preserves-ui.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // File Metadata & Workbook Validation (3)
  ['LIMAS-SUD-1617', 'To verify the functionality of "Reports" → "Standard Licenses" → "File Metadata" → "Filename — nonempty, .xlsx extension, no path separators, no credentials"', 'Reports Standard Licenses RSL-F', 'File Metadata', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1617-rsl-f-filename-and-file-type.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1618', 'To verify the functionality of "Reports" → "Standard Licenses" → "Workbook" → "Structural validation — opens without corruption, sheets, headers, rows, not HTML error"', 'Reports Standard Licenses RSL-F', 'Workbook', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1618-rsl-f-workbook-structural-validation.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1619', 'To verify the functionality of "Reports" → "Standard Licenses" → "File Metadata" → "MIME type and file size — Content-Type consistent, size > 0"', 'Reports Standard Licenses RSL-F', 'File Metadata', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1619-rsl-f-mime-type-and-file-size.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Filtered Export Scope (5)
  ['LIMAS-SUD-1620', 'To verify the functionality of "Reports" → "Standard Licenses" → "Filtered Export" → "Core-filtered — Product Profile filter, request carries correct field, workbook matches filtered contract"', 'Reports Standard Licenses RSL-F', 'Filtered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1620-rsl-f-core-filtered-export-profile.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1621', 'To verify the functionality of "Reports" → "Standard Licenses" → "Filtered Export" → "Date-filtered — Expiration Date runtime, request carries correct date field, workbook consistent"', 'Reports Standard Licenses RSL-F', 'Filtered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1621-rsl-f-date-filtered-export.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1622', 'To verify the functionality of "Reports" → "Standard Licenses" → "Filtered Export" → "Combined — Profile + Role + Exp Date, all fields in request, scope matches, no stale data"', 'Reports Standard Licenses RSL-F', 'Filtered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1622-rsl-f-combined-filter-export.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1623', 'To verify the functionality of "Reports" → "Standard Licenses" → "Filtered Export" → "Zero-result — safe no-match filter, disabled state or header-only workbook"', 'Reports Standard Licenses RSL-F', 'Filtered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1623-rsl-f-zero-result-export.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1624', 'To verify the functionality of "Reports" → "Standard Licenses" → "Filtered Export" → "Post-export restoration — clear filters, unfiltered view restored, counts match base total"', 'Reports Standard Licenses RSL-F', 'Filtered Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1624-rsl-f-post-export-filter-restoration.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Deleted Export (2)
  ['LIMAS-SUD-1625', 'To verify the functionality of "Reports" → "Standard Licenses" → "Deleted Export" → "Availability — switch to Deleted, clear filters, observe Export button presence"', 'Reports Standard Licenses RSL-F', 'Deleted Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1625-rsl-f-deleted-export-availability.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1626', 'To verify the functionality of "Reports" → "Standard Licenses" → "Deleted Export" → "Scope — if available: export, validate workbook, Deleted-mode contract, no Active leakage"', 'Reports Standard Licenses RSL-F', 'Deleted Export', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1626-rsl-f-deleted-export-scope.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Duplicate Protection & Cleanup (3)
  ['LIMAS-SUD-1627', 'To verify the functionality of "Reports" → "Standard Licenses" → "Duplicate Protection" → "One click → one download event, no duplicate requests"', 'Reports Standard Licenses RSL-F', 'Duplicate Protection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1627-rsl-f-one-click-one-download.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1628', 'To verify the functionality of "Reports" → "Standard Licenses" → "Duplicate Protection" → "Repeated export — safe naming, no overwrite, no duplicate requests"', 'Reports Standard Licenses RSL-F', 'Duplicate Protection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1628-rsl-f-repeated-export.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1629', 'To verify the functionality of "Reports" → "Standard Licenses" → "Cleanup" → "File cleanup — temp dir, delete in finally, confirm gone, remove empty dir"', 'Reports Standard Licenses RSL-F', 'Cleanup', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1629-rsl-f-file-cleanup.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Accessibility (3)
  ['LIMAS-SUD-1630', 'To verify the functionality of "Reports" → "Standard Licenses" → "Accessibility" → "Export button — accessible name, SVG aria-hidden, button role"', 'Reports Standard Licenses RSL-F', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1630-rsl-f-export-button-a11y.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1631', 'To verify the functionality of "Reports" → "Standard Licenses" → "Accessibility" → "Keyboard activation — Tab to focus, Enter download, Space download"', 'Reports Standard Licenses RSL-F', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1631-rsl-f-keyboard-activation.md | tests/reports/reports-standard-licenses-export.spec.ts'],
  ['LIMAS-SUD-1632', 'To verify the functionality of "Reports" → "Standard Licenses" → "Accessibility" → "State communication — visible text, non-color state indication"', 'Reports Standard Licenses RSL-F', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1632-rsl-f-state-communication.md | tests/reports/reports-standard-licenses-export.spec.ts'],

  // Controlled Failures (3)
  ['LIMAS-SUD-1633', 'To verify the functionality of "Reports" → "Standard Licenses" → "Controlled Failure" → "Unauthorized/forbidden export — plan reviewed, requires fixture"', 'Reports Standard Licenses RSL-F', 'Controlled Failure', 'Reports', 'Negative', '', '', 'Reviewed', 'Not Started', 'Not Run', 'plans/reports/LIMAS-SUD-1633-rsl-f-unauthorized-export.md'],
  ['LIMAS-SUD-1634', 'To verify the functionality of "Reports" → "Standard Licenses" → "Controlled Failure" → "Server error/empty response/corrupt workbook — plan reviewed, requires fixture"', 'Reports Standard Licenses RSL-F', 'Controlled Failure', 'Reports', 'Negative', '', '', 'Reviewed', 'Not Started', 'Not Run', 'plans/reports/LIMAS-SUD-1634-rsl-f-server-error-export.md'],
  ['LIMAS-SUD-1635', 'To verify the functionality of "Reports" → "Standard Licenses" → "Controlled Failure" → "Network interruption/partial download/disk-write failure — plan reviewed, requires fixture"', 'Reports Standard Licenses RSL-F', 'Controlled Failure', 'Reports', 'Negative', '', '', 'Reviewed', 'Not Started', 'Not Run', 'plans/reports/LIMAS-SUD-1635-rsl-f-network-interruption-export.md'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  // Find current last populated row
  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }
  console.log('Last populated row:', lastRow);

  // Determine band index
  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }
  console.log('Next band index:', bandIndex, '(0=white, 1=light green)');

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
  console.log(`Backup: ${BACKUP}`);
}

main().catch(console.error);