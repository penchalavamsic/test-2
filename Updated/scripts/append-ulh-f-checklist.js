const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_F.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const specs = {
  dialogShell: [1086,1087,1088,1089,1090,1091,1092,1093],
  prepopulation: [1094,1095],
  fields: [1096,1097,1098,1099,1100,1101],
  saveState: [1102],
  validation: [1103,1104],
  dropdowns: [1105,1106,1107],
  lifecycle: [1108],
  accessibility: [1109,1110],
  apiContract: [1111],
};

const specMap = {
  dialogShell: 'user-license-hub-edit-user.spec.ts',
  prepopulation: 'user-license-hub-edit-user.spec.ts',
  fields: 'user-license-hub-edit-user.spec.ts',
  saveState: 'user-license-hub-edit-user.spec.ts',
  validation: 'user-license-hub-edit-user.spec.ts',
  dropdowns: 'user-license-hub-edit-user.spec.ts',
  lifecycle: 'user-license-hub-edit-user.spec.ts',
  accessibility: 'user-license-hub-edit-user.spec.ts',
  apiContract: 'user-license-hub-edit-user.spec.ts',
};

const sectionNames = {
  dialogShell: 'Edit User Dialog Shell',
  prepopulation: 'Edit User Prepopulated Values',
  fields: 'Edit User Fields',
  saveState: 'Edit User Save State',
  validation: 'Edit User Validation',
  dropdowns: 'Edit User Dropdowns',
  lifecycle: 'Edit User Update Lifecycle',
  accessibility: 'Edit User Accessibility',
  apiContract: 'Edit User API Contract',
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
  const gatedIds = new Set([1108, 1111]);

  for (const [sectionKey, ids] of Object.entries(specs)) {
    const spec = specMap[sectionKey];
    for (const id of ids) {
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-f-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const scriptStatus = gatedIds.has(id) ? 'Not Started' : 'Generated';
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-F \u2014 ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-F',
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