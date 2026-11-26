const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_B.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const specs = {
  userSelection: [976,977,978,979,980,981,982,983,984,985],
  selectionSemantics: [986,987,988,989,990,991,992,993],
  licenseSync: [994,995,996,997,998,999],
  panelScrolling: [1000,1001,1002,1003,1004,1005,1006],
  selectionAccessibility: [1007,1008,1009,1010,1011,1012,1013,1014],
};

const specMap = {
  userSelection: 'user-license-hub-user-selection.spec.ts',
  selectionSemantics: 'user-license-hub-selection-semantics.spec.ts',
  licenseSync: 'user-license-hub-license-synchronization.spec.ts',
  panelScrolling: 'user-license-hub-panel-scrolling.spec.ts',
  selectionAccessibility: 'user-license-hub-selection-accessibility.spec.ts',
};

const sectionNames = {
  userSelection: 'User Selection',
  selectionSemantics: 'Selection Semantics',
  licenseSync: 'License Synchronization',
  panelScrolling: 'Panel Scrolling',
  selectionAccessibility: 'Selection Accessibility',
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
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-b-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-B — ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-B',
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