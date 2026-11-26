const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');

const rows = [
  ['LIMAS-SUD-2029', 'Sidebar navigation to Features page', 'Features FTR-A', 'Page Shell — Navigation', 'Features', 'Read-only'],
  ['LIMAS-SUD-2030', 'Page heading is h1 Features', 'Features FTR-A', 'Page Shell — Heading', 'Features', 'Read-only'],
  ['LIMAS-SUD-2031', 'Add Root Feature button is visible', 'Features FTR-A', 'Page Shell — Add Root', 'Features', 'Read-only'],
  ['LIMAS-SUD-2032', 'Expand All and Collapse All buttons visible', 'Features FTR-A', 'Page Shell — Controls', 'Features', 'Read-only'],
  ['LIMAS-SUD-2033', 'Feature table has correct column headers', 'Features FTR-A', 'Page Shell — Headers', 'Features', 'Read-only'],
  ['LIMAS-SUD-2034', 'Feature table has loaded rows', 'Features FTR-A', 'Page Shell — Rows', 'Features', 'Read-only'],
  ['LIMAS-SUD-2035', 'Expand button on rows with children', 'Features FTR-A', 'Hierarchy — Expand Buttons', 'Features', 'Read-only'],
  ['LIMAS-SUD-2036', 'Expand All expands all collapsible rows', 'Features FTR-A', 'Hierarchy — Expand All', 'Features', 'Read-only'],
  ['LIMAS-SUD-2037', 'Collapse All collapses all expanded rows', 'Features FTR-A', 'Hierarchy — Collapse All', 'Features', 'Read-only'],
  ['LIMAS-SUD-2038', 'Repeated Expand All does not produce errors', 'Features FTR-A', 'Hierarchy — Idempotent', 'Features', 'Read-only'],
  ['LIMAS-SUD-2039', 'Search input accepts text', 'Features FTR-A', 'Search — Input', 'Features', 'Read-only'],
  ['LIMAS-SUD-2040', 'Search filters table rows by feature name', 'Features FTR-A', 'Search — By Name', 'Features', 'Read-only'],
  ['LIMAS-SUD-2041', 'Search matches on feature ID fragment', 'Features FTR-A', 'Search — By ID', 'Features', 'Read-only'],
  ['LIMAS-SUD-2042', 'No-match search shows zero rows', 'Features FTR-A', 'Search — No Match', 'Features', 'Read-only'],
  ['LIMAS-SUD-2043', 'Clearing search restores all rows', 'Features FTR-A', 'Search — Clear', 'Features', 'Read-only'],
  ['LIMAS-SUD-2044', 'No duplicate rows after search and clear', 'Features FTR-A', 'Search — No Duplicates', 'Features', 'Read-only'],
  ['LIMAS-SUD-2045', 'Each row displays feature name and ID', 'Features FTR-A', 'Row Structure — Name/ID', 'Features', 'Read-only'],
  ['LIMAS-SUD-2046', 'Row has Add Child Feature, Edit, Delete actions', 'Features FTR-A', 'Row Structure — Actions', 'Features', 'Read-only'],
  ['LIMAS-SUD-2047', 'Delete button disabled on all rows', 'Features FTR-A', 'Row Structure — Delete State', 'Features', 'Read-only'],
  ['LIMAS-SUD-2048', 'Used in Profiles badge is present and clickable', 'Features FTR-A', 'Row Structure — Profiles Badge', 'Features', 'Read-only'],
  ['LIMAS-SUD-2049', 'Profiles badge opens a dialog', 'Features FTR-A', 'Profiles Dialog — Open', 'Features', 'Read-only'],
  ['LIMAS-SUD-2050', 'Dialog heading Profiles Using This Feature', 'Features FTR-A', 'Profiles Dialog — Heading', 'Features', 'Read-only'],
  ['LIMAS-SUD-2051', 'Profiles dialog has close button', 'Features FTR-A', 'Profiles Dialog — Close', 'Features', 'Read-only'],
  ['LIMAS-SUD-2052', 'Escape key closes Profiles dialog', 'Features FTR-A', 'Profiles Dialog — Escape', 'Features', 'Read-only'],
  ['LIMAS-SUD-2053', 'Dialog shows profile cards when profiles exist', 'Features FTR-A', 'Profiles Dialog — Cards', 'Features', 'Read-only'],
  ['LIMAS-SUD-2054', 'Profile count in badge consistent with cards', 'Features FTR-A', 'Profiles Dialog — Count', 'Features', 'Read-only'],
  ['LIMAS-SUD-2055', 'Selecting a profile navigates to Profiles page', 'Features FTR-A', 'Profile Navigation — Navigate', 'Features', 'Read-only'],
  ['LIMAS-SUD-2056', 'Profile navigation opens correct Profile', 'Features FTR-A', 'Profile Navigation — Correct', 'Features', 'Read-only'],
  ['LIMAS-SUD-2057', 'Return to Features restores page state', 'Features FTR-A', 'Profile Navigation — Return', 'Features', 'Read-only'],
  ['LIMAS-SUD-2058', 'Only read-only requests during profile navigation', 'Features FTR-A', 'Profile Navigation — No Mutations', 'Features', 'Read-only'],
  ['LIMAS-SUD-2059', 'Features page restores clean state after exploration', 'Features FTR-A', 'Safe Restoration', 'Features', 'Read-only'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) lastRow = r;
  }
  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) bandIndex = 1 - bandIndex;
  }

  const WHITE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LIGHT_GREEN_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const DARK_FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const thinBorder = { top: { style: 'thin', color: { argb: 'FFD0D0D0' } }, left: { style: 'thin', color: { argb: 'FFD0D0D0' } }, bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } }, right: { style: 'thin', color: { argb: 'FFD0D0D0' } } };

  const startRow = lastRow + 1;
  for (let i = 0; i < rows.length; i++) {
    const r = startRow + i;
    const cells = [rows[i][0], rows[i][1], rows[i][2], rows[i][3], rows[i][4], rows[i][5], '', '', 'Reviewed', 'Generated', 'Not Run', `plans/features/LIMAS-SUD-${2029 + i}-*.md`];
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(r, c + 1);
      cell.value = cells[c] || '';
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