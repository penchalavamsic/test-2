const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_SLC_A_CHECKLIST.xlsx');

const rows = [
  ['LIMAS-SUD-2009', 'Sidebar navigation to Standard License Configurations page', 'Standard License Configurations SLC-A', 'Page Shell — Navigation', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2009-slc-a-sidebar-navigation.md'],
  ['LIMAS-SUD-2010', 'Page heading is h1 and h2 Standard License Configurations', 'Standard License Configurations SLC-A', 'Page Shell — Heading', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2010-slc-a-heading-h1-h2.md'],
  ['LIMAS-SUD-2011', 'Dynamic configuration count badge shows N configurations', 'Standard License Configurations SLC-A', 'Page Shell — Count Badge', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2011-slc-a-count-badge.md'],
  ['LIMAS-SUD-2012', 'Main content region contains card grid', 'Standard License Configurations SLC-A', 'Page Shell — Main Content', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2012-slc-a-main-content-card-grid.md'],
  ['LIMAS-SUD-2013', 'No horizontal overflow at standard viewport', 'Standard License Configurations SLC-A', 'Page Shell — Overflow', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2013-slc-a-no-horizontal-overflow.md'],
  ['LIMAS-SUD-2014', 'Each card displays product name and role badge', 'Standard License Configurations SLC-A', 'Cards — Identity Fields', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2014-slc-a-card-product-role.md'],
  ['LIMAS-SUD-2015', 'Each card displays Licenses numeric value', 'Standard License Configurations SLC-A', 'Cards — Licenses', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2015-slc-a-card-licenses.md'],
  ['LIMAS-SUD-2016', 'Each card displays Maintenance and Expiration dates', 'Standard License Configurations SLC-A', 'Cards — Dates', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2016-slc-a-card-dates.md'],
  ['LIMAS-SUD-2017', 'Card boundaries maintain spacing and alignment', 'Standard License Configurations SLC-A', 'Cards — Layout', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2017-slc-a-card-spacing.md'],
  ['LIMAS-SUD-2018', 'Cards are read-only — no checkboxes, menus or buttons', 'Standard License Configurations SLC-A', 'Cards — Read-Only', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2018-slc-a-read-only-cards.md'],
  ['LIMAS-SUD-2019', 'Visible card count matches configuration count', 'Standard License Configurations SLC-A', 'Data Validation — Count Match', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2019-slc-a-count-card-match.md'],
  ['LIMAS-SUD-2020', 'All license counts are non-negative integers', 'Standard License Configurations SLC-A', 'Data Validation — License Values', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2020-slc-a-licenses-non-negative.md'],
  ['LIMAS-SUD-2021', 'Date fields use consistent DD MMM YYYY format', 'Standard License Configurations SLC-A', 'Data Validation — Date Format', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2021-slc-a-date-format.md'],
  ['LIMAS-SUD-2022', 'Role badges are associated with correct cards', 'Standard License Configurations SLC-A', 'Data Validation — Role Badges', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2022-slc-a-role-badge-association.md'],
  ['LIMAS-SUD-2023', 'SLC data fetched via GET /slconfig', 'Standard License Configurations SLC-A', 'API — GET Request', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2023-slc-a-api-get-slconfig.md'],
  ['LIMAS-SUD-2024', 'No mutation requests on SLC page', 'Standard License Configurations SLC-A', 'API — No Mutations', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2024-slc-a-no-mutations.md'],
  ['LIMAS-SUD-2025', 'Cards render without lingering loading indicator', 'Standard License Configurations SLC-A', 'State — Loaded', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2025-slc-a-loaded-state.md'],
  ['LIMAS-SUD-2026', 'All cards render simultaneously without pagination', 'Standard License Configurations SLC-A', 'State — No Pagination', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2026-slc-a-no-pagination.md'],
  ['LIMAS-SUD-2027', 'Page heading hierarchy is h1 and h2', 'Standard License Configurations SLC-A', 'Accessibility — Headings', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2027-slc-a-heading-hierarchy.md'],
  ['LIMAS-SUD-2028', 'Card grid allows sequential keyboard navigation', 'Standard License Configurations SLC-A', 'Accessibility — Keyboard', 'Standard License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/standard-license-configurations/LIMAS-SUD-2028-slc-a-keyboard-navigation.md'],
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