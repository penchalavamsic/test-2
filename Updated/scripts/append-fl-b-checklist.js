const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FL_B_CHECKLIST.xlsx');
require('fs').copyFileSync(MAIN, BACKUP);

const rows = [
  // Date Behavior (8)
  ['LIMAS-SUD-888', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Future Date Accepted"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-888-fl-b-future-date-accepted.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-889', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Future Date Triggers GET"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-889-fl-b-future-date-triggers-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-890', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Past Date Accepted"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-890-fl-b-past-date-accepted.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-891', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Past Date Triggers GET"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-891-fl-b-past-date-triggers-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-892', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Current Date Triggers GET"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-892-fl-b-current-date-triggers-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-893', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Date Clearing Triggers Default-Date GET"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-893-fl-b-date-clearing-triggers-default-date-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-894', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Date Value Persists After Request"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-894-fl-b-date-value-persists-after-request.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  ['LIMAS-SUD-895', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Date Behavior" → "Date Change Exactly One GET"', 'Floating Licenses FL-B', 'Date Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-895-fl-b-date-change-exactly-one-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts'],
  // Search Behavior (12)
  ['LIMAS-SUD-896', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Search Value Accepted"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-896-fl-b-search-value-accepted.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-897', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Client-Side No API Request"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-897-fl-b-search-client-side-no-api.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-898', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "No-Match Empty State Heading"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-898-fl-b-no-match-empty-state-heading.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-899', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "No-Match Empty State Subtext"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-899-fl-b-no-match-empty-state-subtext.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-900', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Count Unchanged During Search"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-900-fl-b-count-unchanged-during-search.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-901', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Enter Key No Effect"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-901-fl-b-enter-key-no-effect.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-902', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Escape Clears Field"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-902-fl-b-escape-clears-field.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-903', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Clearing Restores Default Empty State"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-903-fl-b-search-clearing-restores-default.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-904', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Search Persists Across Date Changes"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-904-fl-b-search-persists-across-date.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-905', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Search Value Visible"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-905-fl-b-search-value-visible.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-906', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Search Clearing No API Request"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-906-fl-b-search-clearing-no-api.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  ['LIMAS-SUD-907', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Search Behavior" → "Search Enabled"', 'Floating Licenses FL-B', 'Search Behavior', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-907-fl-b-search-enabled.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-behavior.spec.ts'],
  // Combined Filters (9)
  ['LIMAS-SUD-908', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Date First Then Search Both Persist"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-908-fl-b-date-first-then-search-both-persist.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-909', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Search First Then Date Persists"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-909-fl-b-search-first-then-date-persists.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-910', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Date Change With Populated Search"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-910-fl-b-date-change-with-populated-search.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-911', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Clear Search Date Stays"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-911-fl-b-clear-search-date-stays.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-912', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Clear Date Search Stays"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-912-fl-b-clear-date-search-stays.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-913', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Clear Order A Both Empty"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-913-fl-b-clear-order-a-both-empty.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-914', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Clear Order B Both Empty"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-914-fl-b-clear-order-b-both-empty.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-915', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "No Duplicate Requests"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-915-fl-b-no-duplicate-requests.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  ['LIMAS-SUD-916', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Combined Filters" → "Filtered Empty State"', 'Floating Licenses FL-B', 'Combined Filters', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-916-fl-b-filtered-empty-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts'],
  // Zero State Transitions (5)
  ['LIMAS-SUD-917', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Default State After Date Clearing"', 'Floating Licenses FL-B', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-917-fl-b-default-state-after-date-clearing.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-918', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Filtered State After Search"', 'Floating Licenses FL-B', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-918-fl-b-filtered-state-after-search.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-919', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Default State After Search Clearing"', 'Floating Licenses FL-B', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-919-fl-b-default-state-after-search-clearing.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-920', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Both Populated Empty State"', 'Floating Licenses FL-B', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-920-fl-b-both-populated-empty-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-921', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Empty State" → "Count Stable Across Transitions"', 'Floating Licenses FL-B', 'Empty State', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-921-fl-b-count-stable-across-transitions.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  // Network + Accessibility (4)
  ['LIMAS-SUD-922', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Network" → "No Write Methods"', 'Floating Licenses FL-B', 'Network', 'System User Dashboard', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-922-fl-b-no-write-methods.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-923', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Accessibility" → "Date Value Announcement"', 'Floating Licenses FL-B', 'Accessibility', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-923-fl-b-date-value-announcement.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-924', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Accessibility" → "Search Value Announcement"', 'Floating Licenses FL-B', 'Accessibility', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-924-fl-b-search-value-announcement.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
  ['LIMAS-SUD-925', 'To verify the functionality of "System User Dashboard" → "Floating Licenses" → "Accessibility" → "Focus After Date Clearing"', 'Floating Licenses FL-B', 'Accessibility', 'System User Dashboard', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/system-user-dashboard/LIMAS-SUD-925-fl-b-focus-after-date-clearing.md | tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts'],
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