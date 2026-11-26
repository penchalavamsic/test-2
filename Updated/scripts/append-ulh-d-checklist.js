const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_D.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const specs = {
  paginationStructure: [1039,1040,1041,1042,1043],
  paginationNavigation: [1044,1045,1046,1047,1048],
  pageSize: [1049,1050,1051,1052,1053],
  selectionSync: [1054,1055,1056,1057,1058],
  boundaries: [1059,1060,1061],
  accessibility: [1062],
};

const specMap = {
  paginationStructure: 'user-license-hub-pagination-structure.spec.ts',
  paginationNavigation: 'user-license-hub-pagination-navigation.spec.ts',
  pageSize: 'user-license-hub-page-size.spec.ts',
  selectionSync: 'user-license-hub-pagination-selection-sync.spec.ts',
  boundaries: 'user-license-hub-pagination-boundaries.spec.ts',
  accessibility: 'user-license-hub-pagination-accessibility.spec.ts',
};

const sectionNames = {
  paginationStructure: 'Pagination Structure',
  paginationNavigation: 'Pagination Navigation',
  pageSize: 'Page Size',
  selectionSync: 'Selection & License Sync',
  boundaries: 'Pagination Boundaries',
  accessibility: 'Pagination Accessibility',
};

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) lastRow = r;
  }
  console.log('Last populated row:', lastRow);

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) bandIndex = 1 - bandIndex;
  }
  console.log('Next band (0=white,1=light green):', bandIndex);

  const WHITE = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LG = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const BORDER = { top: {style:'thin',color:{argb:'FFD0D0D0'}},left:{style:'thin',color:{argb:'FFD0D0D0'}},bottom:{style:'thin',color:{argb:'FFD0D0D0'}},right:{style:'thin',color:{argb:'FFD0D0D0'}} };

  let currentRow = lastRow + 1;

  for (const [sectionKey, ids] of Object.entries(specs)) {
    const spec = specMap[sectionKey];
    for (const id of ids) {
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-d-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const scriptStatus = (id === 1061) ? 'Not Started' : 'Generated';
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-D — ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-D',
        sectionNames[sectionKey],
        'User & License Hub',
        'Read-only',
        '', '', 'Reviewed', scriptStatus, 'Not Run',
        `${planFile} | ${specPath}`,
      ];
      for (let c = 0; c < 12; c++) {
        const cell = ws.getCell(currentRow, c + 1);
        cell.value = values[c] || '';
        cell.font = FONT;
        cell.fill = bandIndex === 0 ? WHITE : LG;
        cell.border = BORDER;
        cell.alignment = { vertical: 'middle', wrapText: c === 1 };
      }
      bandIndex = 1 - bandIndex;
      currentRow++;
    }
  }

  ws.autoFilter = { from: 'A4', to: `L${currentRow - 1}` };
  await wb.xlsx.writeFile(MAIN);
  const newRows = currentRow - lastRow - 1;
  console.log(`Done. ${newRows} rows appended. First: ${lastRow + 1}, Last: ${currentRow - 1}`);
  console.log(`Backup saved to: ${BACKUP}`);
}

main().catch(e => { console.error(e); process.exit(1); });