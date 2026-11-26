const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFC_A_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  // Card Selection (3)
  ['LIMAS-SUD-1741', 'To verify Floating Configurations card visible, accessible name, aria-pressed=true when selected; other cards unpressed; keyboard reachable', 'Reports Floating Configurations RFC-A', 'Card Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1741-rfc-a-card-visibility.md'],
  ['LIMAS-SUD-1742', 'To verify Tab to FC card, Enter/Space selects, aria-pressed updates, visible focus indicator', 'Reports Floating Configurations RFC-A', 'Card Selection', 'Reports', 'Keyboard', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1742-rfc-a-card-keyboard.md'],
  ['LIMAS-SUD-1743', 'To verify click FC card → aria-pressed=true, siblings unpressed, heading visible, route /reports', 'Reports Floating Configurations RFC-A', 'Card Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1743-rfc-a-card-selection.md'],

  // Active Mode (4)
  ['LIMAS-SUD-1744', 'To verify default Active — Active pressed, Deleted unpressed, group=Configuration mode, accessible name', 'Reports Floating Configurations RFC-A', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1744-rfc-a-default-active.md'],
  ['LIMAS-SUD-1745', 'To verify Active is button, not disabled, tabindex, non-color pressed indicator', 'Reports Floating Configurations RFC-A', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1745-rfc-a-active-control-structure.md'],
  ['LIMAS-SUD-1746', 'To verify Deleted exists, not disabled, not pressed, accessible name "Deleted", mirrors Active', 'Reports Floating Configurations RFC-A', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1746-rfc-a-deleted-control-structure.md'],
  ['LIMAS-SUD-1747', 'To verify no duplicate request on re-click Active when already pressed, counts stable', 'Reports Floating Configurations RFC-A', 'Mode Controls', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1747-rfc-a-active-already-selected.md'],

  // Toolbar and Counts (3)
  ['LIMAS-SUD-1748', 'To verify record count format "{N} records", non-negative, "0 records" when empty/errored', 'Reports Floating Configurations RFC-A', 'Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1748-rfc-a-record-count.md'],
  ['LIMAS-SUD-1749', 'To verify loaded/total format "{loaded} loaded · {total} total" when data loads, verify error behavior', 'Reports Floating Configurations RFC-A', 'Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1749-rfc-a-loaded-total-counts.md'],
  ['LIMAS-SUD-1750', 'To verify toolbar order: record count, mode group, Filters, Export Excel', 'Reports Floating Configurations RFC-A', 'Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1750-rfc-a-toolbar-group-order.md'],

  // Filters Panel (5)
  ['LIMAS-SUD-1751', 'To verify Filters button toggles panel, no aria-expanded (a11y gap), heading "Filters" appears', 'Reports Floating Configurations RFC-A', 'Filters Panel', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1751-rfc-a-filters-button-toggle.md'],
  ['LIMAS-SUD-1752', 'To verify filter panel shell: "Filters" heading, 8 controls, Clear button, grid layout, labels above', 'Reports Floating Configurations RFC-A', 'Filters Panel', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1752-rfc-a-filter-panel-shell.md'],
  ['LIMAS-SUD-1753', 'To verify 8 filters: System Users (searchbox), Expiration Date, Maintenance Date, User Group, Product Profile, Profile Role (disabled), Config Modified Date, Config Created Date', 'Reports Floating Configurations RFC-A', 'Filters Panel', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1753-rfc-a-filter-controls-inventory.md'],
  ['LIMAS-SUD-1754', 'To verify Profile Role disabled initially "Select a profile first", enabled after Product Profile selected, re-disables on clear', 'Reports Floating Configurations RFC-A', 'Filters Panel', 'Reports', 'Dependency', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1754-rfc-a-profile-role-dependency.md'],
  ['LIMAS-SUD-1755', 'To verify Clear button visible, no error on click when filters empty', 'Reports Floating Configurations RFC-A', 'Filters Panel', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1755-rfc-a-clear-initial-state.md'],

  // Export Button (1)
  ['LIMAS-SUD-1756', 'To verify Export Excel button element, accessible name, tabindex, enabled even during 500 error (behavioral)', 'Reports Floating Configurations RFC-A', 'Export Button', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1756-rfc-a-export-button-structure.md'],

  // Error State (4)
  ['LIMAS-SUD-1757', 'To verify 500 error state: "Unable to load..." heading, status text, Retry button, no table, filters and mode usable, UI responsive', 'Reports Floating Configurations RFC-A', 'Error State', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1757-rfc-a-error-state.md'],
  ['LIMAS-SUD-1758', 'To verify initial API contract: GET /report/all?page=0&size=500, 500 status, no Spring Page, 1 request per selection/retry', 'Reports Floating Configurations RFC-A', 'Error State', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1758-rfc-a-initial-api-contract.md'],
  ['LIMAS-SUD-1759', 'To verify pagination mechanism: page=0 (0-based), size=500, GET-based, visible even during error', 'Reports Floating Configurations RFC-A', 'Error State', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1759-rfc-a-pagination-mechanism.md'],
  ['LIMAS-SUD-1760', 'To verify Retry sends new GET page=0&size=500, mode/card unaffected, multiple retries allowed', 'Reports Floating Configurations RFC-A', 'Error State', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1760-rfc-a-retry-mechanism.md'],

  // Accessibility (1)
  ['LIMAS-SUD-1761', 'To verify error a11y: error accessible, Retry accessible, mode keyboard-accessible, focus near error, no silent failure', 'Reports Floating Configurations RFC-A', 'Accessibility', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1761-rfc-a-error-state-a11y.md'],

  // Safe Restoration (1)
  ['LIMAS-SUD-1762', 'To verify safe restoration: FC selected, Active pressed, Deleted unpressed, filters collapsed, error/initial view, route /reports, browser open', 'Reports Floating Configurations RFC-A', 'Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1762-rfc-a-safe-restoration.md'],
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
  console.log('Last populated row:', lastRow);

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell('A' + r).value;
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

  const startRow = lastRow + 1;
  for (let i = 0; i < rows.length; i++) {
    const rowData = rows[i];
    const r = startRow + i;
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(r, c + 1);
      cell.value = rowData[c] || '';
      cell.font = DARK_FONT;
      cell.fill = bandIndex === 0 ? WHITE_FILL : LIGHT_GREEN_FILL;
      cell.border = thinBorder;
      cell.alignment = { vertical: 'middle', wrapText: c === 1 };
    }
    bandIndex = 1 - bandIndex;
  }

  const endRow = startRow + rows.length - 1;
  ws.autoFilter = { from: 'A4', to: 'L' + endRow };
  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved. Rows: ${rows.length}. Range: ${startRow} - ${endRow}`);
}

main().catch(console.error);