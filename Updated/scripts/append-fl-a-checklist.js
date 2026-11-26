const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FL_A_CHECKLIST.xlsx');

// Copy backup
require('fs').copyFileSync(MAIN, BACKUP);

const rows = [
  // Summary Card
  ['LIMAS-SUD-861', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Summary Card" → "Card Visibility"', 'Floating Licenses FL-A', 'Summary Card', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-861-fl-a-summary-card-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts'],
  ['LIMAS-SUD-862', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Summary Card" → "Accessible Name"', 'Floating Licenses FL-A', 'Summary Card', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-862-fl-a-summary-card-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts'],
  ['LIMAS-SUD-863', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Summary Card" → "Focus and Selection State"', 'Floating Licenses FL-A', 'Summary Card', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-863-fl-a-summary-card-focus-and-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts'],
  // Section Shell
  ['LIMAS-SUD-864', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Section Shell" → "Heading"', 'Floating Licenses FL-A', 'Section Shell', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-864-fl-a-section-heading.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts'],
  ['LIMAS-SUD-865', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Section Shell" → "Description"', 'Floating Licenses FL-A', 'Section Shell', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-865-fl-a-section-description.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts'],
  ['LIMAS-SUD-866', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Section Shell" → "Section Visibility on Card Selection"', 'Floating Licenses FL-A', 'Section Shell', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-866-fl-a-section-visibility-on-card-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts'],
  // Date Control
  ['LIMAS-SUD-867', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Visibility"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-867-fl-a-date-control-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-868', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Label"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-868-fl-a-date-control-label.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-869', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Input Type"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-869-fl-a-date-control-type.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-870', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Accessible Name"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-870-fl-a-date-control-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-871', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "ID"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-871-fl-a-date-control-id.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-872', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Initial Empty Value"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-872-fl-a-date-control-initial-empty-value.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  ['LIMAS-SUD-873', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Expires Before Date Control" → "Enabled State"', 'Floating Licenses FL-A', 'Expires Before Date Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-873-fl-a-date-control-enabled-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts'],
  // Search Control
  ['LIMAS-SUD-874', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Visibility"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-874-fl-a-search-control-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-875', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Input Type"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-875-fl-a-search-control-type.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-876', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Placeholder"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-876-fl-a-search-control-placeholder.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-877', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Accessible Name (Placeholder-Only)"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-877-fl-a-search-control-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-878', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Initial Empty Value"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-878-fl-a-search-control-initial-empty-value.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-879', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Enabled State"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-879-fl-a-search-control-enabled-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  ['LIMAS-SUD-880', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Control" → "Search Icon Decorative"', 'Floating Licenses FL-A', 'Search Control', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-880-fl-a-search-icon-decorative.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts'],
  // Network
  ['LIMAS-SUD-881', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Network" → "Card Selection Triggers GET"', 'Floating Licenses FL-A', 'Network', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-881-fl-a-card-selection-triggers-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts'],
  ['LIMAS-SUD-882', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Network" → "Request Uses flicense Endpoint"', 'Floating Licenses FL-A', 'Network', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-882-fl-a-request-uses-flicense-endpoint.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts'],
  ['LIMAS-SUD-883', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Network" → "Response 200 Zero Content-Length"', 'Floating Licenses FL-A', 'Network', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-883-fl-a-response-200-zero-content-length.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts'],
  ['LIMAS-SUD-884', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Network" → "Single Request Per Card Selection"', 'Floating Licenses FL-A', 'Network', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-884-fl-a-single-request-per-card-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts'],
  // Zero State
  ['LIMAS-SUD-885', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Zero Counts" → "Count Wording"', 'Floating Licenses FL-A', 'Zero Counts', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-885-fl-a-zero-counts-wording.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts'],
  ['LIMAS-SUD-886', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Heading and Text"', 'Floating Licenses FL-A', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-886-fl-a-empty-state-heading-and-text.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts'],
  ['LIMAS-SUD-887', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "No Action Controls"', 'Floating Licenses FL-A', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-887-fl-a-no-action-controls-in-empty-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  // Columns: A=TestID, B=Title, C=Module, D=Section, E=Page, F=Classification,
  // G=Type, H=Dependencies, I=Plan Status, J=Script Status, K=Execution Status, L=Notes

  // Find current last populated row
  let lastRow = 4; // header
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }
  console.log('Last populated row:', lastRow);

  // Determine starting band index
  // We need to know which color to start with. Count populated rows from row 5.
  let bandIndex = 0; // 0=white, 1=light green
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }
  // After the loop, bandIndex is what the NEXT row should use
  // But wait — bandIndex toggles after each populated row.
  // The loop body toggles AFTER counting. So after row 891, bandIndex is ready for row 892.
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
      cell.alignment = { vertical: 'middle', wrapText: c === 1 }; // wrapText on Title column
    }
    bandIndex = 1 - bandIndex;
    currentRow++;
  }

  // Update auto-filter range
  ws.autoFilter = { from: 'A4', to: `L${currentRow - 1}` };

  // Preserve defaultRowHeight
  if (ws.properties && ws.properties.defaultRowHeight === 0) {
    ws.properties.defaultRowHeight = 15;
  }

  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved. Rows appended: ${rows.length}. First new: ${lastRow + 1}, Last new: ${currentRow - 1}`);
  console.log(`Backup: ${BACKUP}`);
}

main().catch(console.error);