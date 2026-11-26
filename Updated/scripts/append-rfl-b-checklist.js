const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFL_B_CHECKLIST.xlsx');
require('fs').copyFileSync(MAIN, BACKUP);

const rows = [
  // Email Filter (3)
  ['LIMAS-SUD-1663', 'To verify the functionality of "Reports" → "Floating Licenses" → "Email Filter" → "Input Structure and Enter Trigger"', 'Reports Floating Licenses RFL-B', 'Email Filter', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1663-rfl-b-email-input-structure.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1664', 'To verify the functionality of "Reports" → "Floating Licenses" → "Email Filter" → "Chip Display, Remove, and Clear All"', 'Reports Floating Licenses RFL-B', 'Email Filter', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1664-rfl-b-email-chip-remove.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1665', 'To verify the functionality of "Reports" → "Floating Licenses" → "Email Filter" → "Client-Side Filtering — No Server Request"', 'Reports Floating Licenses RFL-B', 'Email Filter', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1665-rfl-b-email-client-side.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // Hardware IDs Filter (1)
  ['LIMAS-SUD-1666', 'To verify the functionality of "Reports" → "Floating Licenses" → "Hardware IDs Filter" → "Input Structure"', 'Reports Floating Licenses RFL-B', 'Hardware IDs Filter', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1666-rfl-b-hardware-filter-structure.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // Product Profile and Role (5)
  ['LIMAS-SUD-1667', 'To verify the functionality of "Reports" → "Floating Licenses" → "Product Profile" → "Combobox Structure and Options"', 'Reports Floating Licenses RFL-B', 'Product Profile and Role', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1667-rfl-b-product-profile-combobox.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1668', 'To verify the functionality of "Reports" → "Floating Licenses" → "Product Profile" → "Selection, Pill, and Chip"', 'Reports Floating Licenses RFL-B', 'Product Profile and Role', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1668-rfl-b-product-profile-selection.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1669', 'To verify the functionality of "Reports" → "Floating Licenses" → "Profile Role" → "Dependency on Product Profile"', 'Reports Floating Licenses RFL-B', 'Product Profile and Role', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1669-rfl-b-profile-role-dependency.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1670', 'To verify the functionality of "Reports" → "Floating Licenses" → "Profile Role" → "Combobox, Selection, and Chip"', 'Reports Floating Licenses RFL-B', 'Product Profile and Role', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1670-rfl-b-profile-role-selection.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1671', 'To verify the functionality of "Reports" → "Floating Licenses" → "Profile and Role" → "Clearing Profile Clears Role"', 'Reports Floating Licenses RFL-B', 'Product Profile and Role', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1671-rfl-b-profile-clear-cascade.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // Date Filters (2)
  ['LIMAS-SUD-1672', 'To verify the functionality of "Reports" → "Floating Licenses" → "Expiration Date" → "Native Date Input and Chip"', 'Reports Floating Licenses RFL-B', 'Date Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1672-rfl-b-expiration-date.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1673', 'To verify the functionality of "Reports" → "Floating Licenses" → "License Created Date" → "Native Date Input Structure"', 'Reports Floating Licenses RFL-B', 'Date Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1673-rfl-b-created-date.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // Clear and Combined Filters (3)
  ['LIMAS-SUD-1674', 'To verify the functionality of "Reports" → "Floating Licenses" → "Clear" → "Panel Clear Button"', 'Reports Floating Licenses RFL-B', 'Clear and Combined Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1674-rfl-b-clear-panel.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1675', 'To verify the functionality of "Reports" → "Floating Licenses" → "Clear" → "Clear All Button"', 'Reports Floating Licenses RFL-B', 'Clear and Combined Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1675-rfl-b-clear-all.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1676', 'To verify the functionality of "Reports" → "Floating Licenses" → "Combined" → "Multiple Filters Simultaneously"', 'Reports Floating Licenses RFL-B', 'Clear and Combined Filters', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1676-rfl-b-combined-filters.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // API, Counts, and Reset (4)
  ['LIMAS-SUD-1677', 'To verify the functionality of "Reports" → "Floating Licenses" → "API" → "Filter — Client-Side Only, No POST"', 'Reports Floating Licenses RFL-B', 'API, Counts, and Reset', 'Reports', 'Client-side', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1677-rfl-b-filter-client-side-contract.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1678', 'To verify the functionality of "Reports" → "Floating Licenses" → "Counts" → "Zero-Result Filter Stability"', 'Reports Floating Licenses RFL-B', 'API, Counts, and Reset', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1678-rfl-b-zero-result-count-stability.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1679', 'To verify the functionality of "Reports" → "Floating Licenses" → "Empty State" → "Filtered Empty State and Export"', 'Reports Floating Licenses RFL-B', 'API, Counts, and Reset', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1679-rfl-b-filtered-empty-state.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1680', 'To verify the functionality of "Reports" → "Floating Licenses" → "Filter Panel" → "State and Focus Stability"', 'Reports Floating Licenses RFL-B', 'API, Counts, and Reset', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1680-rfl-b-panel-state-focus.md | tests/reports/reports-floating-licenses-filters.spec.ts'],

  // Accessibility and Restoration (3)
  ['LIMAS-SUD-1681', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Filter Labels, Combobox, and Disabled"', 'Reports Floating Licenses RFL-B', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1681-rfl-b-filter-labels-a11y.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1682', 'To verify the functionality of "Reports" → "Floating Licenses" → "Accessibility" → "Chip Communication and Keyboard"', 'Reports Floating Licenses RFL-B', 'Accessibility and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1682-rfl-b-chip-a11y.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
  ['LIMAS-SUD-1683', 'To verify the functionality of "Reports" → "Floating Licenses" → "Restoration" → "Filter State Restoration"', 'Reports Floating Licenses RFL-B', 'Accessibility and Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1683-rfl-b-filter-restoration.md | tests/reports/reports-floating-licenses-filters.spec.ts'],
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