const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFL_A_CHECKLIST.xlsx');
require('fs').copyFileSync(MAIN, BACKUP);

const rows = [
  // Floating License Selection (4)
  ['LIMAS-SUD-1636', 'To verify the functionality of "Reports" → "Floating Licenses" → "Report Card" → "Visibility and Structure"', 'Reports Floating Licenses RFL-A', 'Floating License Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1636-rfl-a-floating-license-card-visibility.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1637', 'To verify the functionality of "Reports" → "Floating Licenses" → "Report Card" → "Keyboard Focus and Focus Indicator"', 'Reports Floating Licenses RFL-A', 'Floating License Selection', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1637-rfl-a-floating-license-card-keyboard.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1638', 'To verify the functionality of "Reports" → "Floating Licenses" → "Report Card" → "Mouse Activation and Selection"', 'Reports Floating Licenses RFL-A', 'Floating License Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1638-rfl-a-floating-license-card-selection.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1639', 'To verify the functionality of "Reports" → "Floating Licenses" → "Report Card" → "Exactly One Card Selected"', 'Reports Floating Licenses RFL-A', 'Floating License Selection', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1639-rfl-a-single-card-selected.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Active View and Toolbar (5)
  ['LIMAS-SUD-1640', 'To verify the functionality of "Reports" → "Floating Licenses" → "Active Control" → "Structure and Pressed State"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1640-rfl-a-active-control-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1641', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Control" → "Structure Without Activation"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1641-rfl-a-deleted-control-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1642', 'To verify the functionality of "Reports" → "Floating Licenses" → "Active Control" → "Already-Selected Activation"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1642-rfl-a-active-already-selected.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1643', 'To verify the functionality of "Reports" → "Floating Licenses" → "Toolbar" → "Record Count"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1643-rfl-a-record-count.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1644', 'To verify the functionality of "Reports" → "Floating Licenses" → "Toolbar" → "Loaded and Total Counts"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1644-rfl-a-loaded-total-counts.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1645', 'To verify the functionality of "Reports" → "Floating Licenses" → "Toolbar" → "Grouping and Control Order"', 'Reports Floating Licenses RFL-A', 'Active View and Toolbar', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1645-rfl-a-toolbar-group-order.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Filters Panel Shell (5)
  ['LIMAS-SUD-1646', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filters Panel" → "Filters Button Expand and Collapse"', 'Reports Floating Licenses RFL-A', 'Filters Panel Shell', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1646-rfl-a-filters-button-toggle.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1647', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filters Panel" → "Panel Visibility and Clear Button"', 'Reports Floating Licenses RFL-A', 'Filters Panel Shell', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1647-rfl-a-filter-panel-shell.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1648', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filters Panel" → "Filter Controls Inventory"', 'Reports Floating Licenses RFL-A', 'Filters Panel Shell', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1648-rfl-a-filter-controls-inventory.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1649', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filters Panel" → "Profile Role Dependency"', 'Reports Floating Licenses RFL-A', 'Filters Panel Shell', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1649-rfl-a-profile-role-dependency.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1650', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filters Panel" → "Clear Initial State"', 'Reports Floating Licenses RFL-A', 'Filters Panel Shell', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1650-rfl-a-clear-initial-state.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Floating License Table (2)
  ['LIMAS-SUD-1651', 'To verify the functionality of "Reports" → "Floating Licenses" → "Export Excel" → "Button Structure"', 'Reports Floating Licenses RFL-A', 'Floating License Table', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1651-rfl-a-export-button-structure.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1652', 'To verify the functionality of "Reports" → "Floating Licenses" → "Table" → "Empty State or Table Structure"', 'Reports Floating Licenses RFL-A', 'Floating License Table', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1652-rfl-a-table-empty-state.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Initial Network and Counts (3)
  ['LIMAS-SUD-1653', 'To verify the functionality of "Reports" → "Floating Licenses" → "API" → "Initial API Contract"', 'Reports Floating Licenses RFL-A', 'Initial Network and Counts', 'Reports', 'API', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1653-rfl-a-initial-api-contract.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1654', 'To verify the functionality of "Reports" → "Floating Licenses" → "API" → "Pagination Mechanism"', 'Reports Floating Licenses RFL-A', 'Initial Network and Counts', 'Reports', 'API', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1654-rfl-a-pagination-mechanism.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1655', 'To verify the functionality of "Reports" → "Floating Licenses" → "API" → "Request Count and Safety"', 'Reports Floating Licenses RFL-A', 'Initial Network and Counts', 'Reports', 'API', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1655-rfl-a-request-count-safety.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Loading and Empty States (2)
  ['LIMAS-SUD-1656', 'To verify the functionality of "Reports" → "Floating Licenses" → "Loading State" → "Loading Indicator and Count Update"', 'Reports Floating Licenses RFL-A', 'Loading and Empty States', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1656-rfl-a-loading-state.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1657', 'To verify the functionality of "Reports" → "Floating Licenses" → "Infinite Scroll" → "Scroll Container and Sentinel Identification"', 'Reports Floating Licenses RFL-A', 'Loading and Empty States', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1657-rfl-a-infinite-scroll-mechanism.md | tests/reports/reports-floating-licenses-shell.spec.ts'],

  // Accessibility and Restoration (5)
  ['LIMAS-SUD-1658', 'To verify the functionality of "Reports" → "Floating Licenses" → "Empty State" → "Accessibility"', 'Reports Floating Licenses RFL-A', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1658-rfl-a-empty-state-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1659', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Report Card Selected State"', 'Reports Floating Licenses RFL-A', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1659-rfl-a-card-selected-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1660', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Active and Deleted Semantics"', 'Reports Floating Licenses RFL-A', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1660-rfl-a-active-deleted-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1661', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Filters and Export Accessibility"', 'Reports Floating Licenses RFL-A', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1661-rfl-a-filters-export-a11y.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
  ['LIMAS-SUD-1662', 'To verify the functionality of "Reports" → "Floating Licenses" → "Restoration" → "Safe Initial State Restoration"', 'Reports Floating Licenses RFL-A', 'Accessibility and Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1662-rfl-a-safe-restoration.md | tests/reports/reports-floating-licenses-shell.spec.ts'],
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