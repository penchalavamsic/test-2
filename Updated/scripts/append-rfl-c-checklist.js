const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFL_C_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  // Mode Controls (2)
  ['LIMAS-SUD-1684', 'To verify the functionality of "Reports" → "Floating Licenses" → "Mode Controls" → "Group, aria-pressed, keyboard, and single-selection"', 'Reports Floating Licenses RFL-C', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1684-rfl-c-mode-control-semantics.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1685', 'To verify the functionality of "Reports" → "Floating Licenses" → "Mode Controls" → "Already-Selected Active Idempotency"', 'Reports Floating Licenses RFL-C', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1685-rfl-c-already-selected-active.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Active-to-Deleted Switching (3)
  ['LIMAS-SUD-1686', 'To verify the functionality of "Reports" → "Floating Licenses" → "Active-to-Deleted" → "Mode Transition and Scroll Reset"', 'Reports Floating Licenses RFL-C', 'Active-to-Deleted Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1686-rfl-c-active-to-deleted-switching.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1687', 'To verify the functionality of "Reports" → "Floating Licenses" → "Active-to-Deleted" → "Deleted API Contract (allfloatingdeleted)"', 'Reports Floating Licenses RFL-C', 'Active-to-Deleted Switching', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1687-rfl-c-deleted-api-contract.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1688', 'To verify the functionality of "Reports" → "Floating Licenses" → "Active-to-Deleted" → "Deleted Data Availability and Export State"', 'Reports Floating Licenses RFL-C', 'Active-to-Deleted Switching', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1688-rfl-c-deleted-data-availability.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Deleted View (3)
  ['LIMAS-SUD-1689', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted View" → "Counts and Loaded/Total State"', 'Reports Floating Licenses RFL-C', 'Deleted View', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1689-rfl-c-deleted-counts.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1690', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted View" → "Table Headers, Details Sub-Fields, and Layout"', 'Reports Floating Licenses RFL-C', 'Deleted View', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1690-rfl-c-deleted-table-structure.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1691', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted View" → "Export Excel Enabled State"', 'Reports Floating Licenses RFL-C', 'Deleted View', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1691-rfl-c-deleted-export-state.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Deleted Filters (5)
  ['LIMAS-SUD-1692', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Filters" → "Filter Persistence Across Modes"', 'Reports Floating Licenses RFL-C', 'Deleted Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1692-rfl-c-filter-persistence-across-modes.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1693', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Filters" → "Date Filter Persistence Across Modes"', 'Reports Floating Licenses RFL-C', 'Deleted Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1693-rfl-c-date-filter-persistence.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1694', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Filters" → "Non-Date Filter in Deleted Mode"', 'Reports Floating Licenses RFL-C', 'Deleted Filters', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1694-rfl-c-deleted-non-date-filter.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1695', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Filters" → "Date Filter in Deleted Mode"', 'Reports Floating Licenses RFL-C', 'Deleted Filters', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1695-rfl-c-deleted-date-filter.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1696', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Filters" → "Clear All in Deleted Mode"', 'Reports Floating Licenses RFL-C', 'Deleted Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1696-rfl-c-deleted-clear-filters.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Deleted-to-Active Restoration (2)
  ['LIMAS-SUD-1697', 'To verify the functionality of "Reports" → "Floating Licenses" → "Mode Switching" → "Scroll and Sentinel Reset"', 'Reports Floating Licenses RFL-C', 'Deleted-to-Active Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1697-rfl-c-scroll-sentinel-reset.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1698', 'To verify the functionality of "Reports" → "Floating Licenses" → "Mode Switching" → "Deleted-to-Active Full Restoration"', 'Reports Floating Licenses RFL-C', 'Deleted-to-Active Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1698-rfl-c-deleted-to-active-switching.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Loading and Stale-Response Safety (2)
  ['LIMAS-SUD-1699', 'To verify the functionality of "Reports" → "Floating Licenses" → "Safety" → "Controlled Stale-Response Prevention"', 'Reports Floating Licenses RFL-C', 'Loading and Stale-Response Safety', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1699-rfl-c-stale-response-safety.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1700', 'To verify the functionality of "Reports" → "Floating Licenses" → "Safety" → "Loading-State Observation"', 'Reports Floating Licenses RFL-C', 'Loading and Stale-Response Safety', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1700-rfl-c-loading-state.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Accessibility (4)
  ['LIMAS-SUD-1701', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Mode Controls — Group, Pressed, Keyboard, Focus"', 'Reports Floating Licenses RFL-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1701-rfl-c-mode-controls-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1702', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Mode-Change and Loading Announcements"', 'Reports Floating Licenses RFL-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1702-rfl-c-mode-change-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1703', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Deleted Table Headers, Rows, and Cell Semantics"', 'Reports Floating Licenses RFL-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1703-rfl-c-deleted-table-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
  ['LIMAS-SUD-1704', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Filter State Communication Across Modes"', 'Reports Floating Licenses RFL-C', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1704-rfl-c-filter-state-a11y.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],

  // Safe Restoration (1)
  ['LIMAS-SUD-1705', 'To verify the functionality of "Reports" → "Floating Licenses" → "Restoration" → "Safe Restoration to Initial Active State"', 'Reports Floating Licenses RFL-C', 'Safe Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1705-rfl-c-safe-restoration.md | tests/reports/reports-floating-licenses-active-deleted.spec.ts'],
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
  console.log(`Backup: ${BACKUP}`);
}

main().catch(console.error);