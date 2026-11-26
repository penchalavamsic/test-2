const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_E.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const specs = {
  dialogShell: [1063,1064,1065,1066,1067,1068,1069,1070,1071,1072],
  fields: [1073,1074,1075,1076,1077,1078,1079,1080],
  validation: [1081,1082,1083],
  dropdowns: [1084],
  lifecycle: [1085],
};

const specMap = {
  dialogShell: 'user-license-hub-add-user.spec.ts',
  fields: 'user-license-hub-add-user.spec.ts',
  validation: 'user-license-hub-add-user.spec.ts',
  dropdowns: 'user-license-hub-add-user.spec.ts',
  lifecycle: 'user-license-hub-add-user.spec.ts',
};

const sectionNames = {
  dialogShell: 'Add User Dialog Shell',
  fields: 'Add User Fields',
  validation: 'Add User Validation',
  dropdowns: 'Add User Dropdowns',
  lifecycle: 'Add User Create Lifecycle',
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
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-e-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const scriptStatus = (id === 1085) ? 'Not Started' : 'Generated';
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-E \u2014 ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-E',
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