const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_ULH_A_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const sections = {
  navigation: [926, 927, 928],
  pageShell: [929, 930, 931, 932],
  userControls: [933, 934, 935, 936, 937, 938, 939, 940, 941],
  userList: [942, 943, 944, 945, 946],
  pagination: [947, 948, 949, 950, 951, 952, 953],
  licenseControls: [954, 955, 956, 957, 958, 959, 960, 961, 962, 963],
  licenseList: [964, 965, 966, 967, 968],
  network: [969, 970, 971],
  accessibility: [972, 973, 974, 975],
};

const specMap = {
  navigation: 'user-license-hub-navigation-shell.spec.ts',
  pageShell: 'user-license-hub-navigation-shell.spec.ts',
  userControls: 'user-license-hub-user-controls.spec.ts',
  userList: 'user-license-hub-user-list.spec.ts',
  pagination: 'user-license-hub-pagination.spec.ts',
  licenseControls: 'user-license-hub-license-controls.spec.ts',
  licenseList: 'user-license-hub-license-list.spec.ts',
  network: 'user-license-hub-network.spec.ts',
  accessibility: 'user-license-hub-accessibility.spec.ts',
};

const sectionNames = {
  navigation: 'Navigation',
  pageShell: 'Page Shell',
  userControls: 'User Controls',
  userList: 'User List',
  pagination: 'Pagination',
  licenseControls: 'License Controls',
  licenseList: 'License List',
  network: 'Network',
  accessibility: 'Accessibility',
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
  console.log('Next band:', bandIndex);

  const WHITE = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LG = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const BORDER = { top: {style:'thin',color:{argb:'FFD0D0D0'}},left:{style:'thin',color:{argb:'FFD0D0D0'}},bottom:{style:'thin',color:{argb:'FFD0D0D0'}},right:{style:'thin',color:{argb:'FFD0D0D0'}} };

  let currentRow = lastRow + 1;

  for (const [sectionKey, ids] of Object.entries(sections)) {
    const spec = specMap[sectionKey];
    for (const id of ids) {
      const planFile = `plans/user-license-hub/LIMAS-SUD-${id}-ulh-a-*.md`;
      const specPath = `tests/user-license-hub/${spec}`;
      const values = [
        `LIMAS-SUD-${id}`,
        `User & License Hub ULH-A — ${sectionNames[sectionKey]}`,
        'User & License Hub ULH-A',
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
  console.log(`Saved. ${currentRow - lastRow - 1} rows. First: ${lastRow + 1}, Last: ${currentRow - 1}`);
  console.log(`Backup: ${BACKUP}`);
}

main().catch(console.error);