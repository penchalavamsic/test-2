const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_C.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const specs = {
  userSearch: [1015,1016,1017,1018],
  searchStates: [1019,1020,1021,1022,1023],
  filtersDialog: [1024,1025,1026,1027,1028],
  groupFilter: [1029,1030,1031,1032,1033],
  searchFilterCombo: [1034,1035,1036],
  searchFilterAccessibility: [1037,1038],
};

const specMap = {
  userSearch: 'user-license-hub-user-search.spec.ts',
  searchStates: 'user-license-hub-user-search-states.spec.ts',
  filtersDialog: 'user-license-hub-user-filters-dialog.spec.ts',
  groupFilter: 'user-license-hub-user-group-filter.spec.ts',
  searchFilterCombo: 'user-license-hub-search-filter-combination.spec.ts',
  searchFilterAccessibility: 'user-license-hub-search-filter-accessibility.spec.ts',
};

const sectionNames = {
  userSearch: 'User Search',
  searchStates: 'Search States',
  filtersDialog: 'Filter Dialog',
  groupFilter: 'Group Filter',
  searchFilterCombo: 'Search-Filter Combinations',
  searchFilterAccessibility: 'Search & Filter Accessibility',
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
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-c-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-C — ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-C',
        sectionNames[sectionKey],
        'User & License Hub',
        'Read-only',
        '', '', 'Reviewed', 'Generated', 'Not Run',
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