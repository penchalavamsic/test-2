const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FTR_C_CHECKLIST.xlsx');

const rows = [];
const tests = [
  'Add Child Feature button opens dialog with correct role and name',
  'Dialog has heading Add Child Feature as h2 and description',
  'Dialog has Cancel Save and Close controls',
  'Access Levels input and Add button are disabled',
  'Info text explains access levels are inherited from root',
  'Inherited access levels match parent row access levels',
  'Parent with no access levels shows no inherited chips',
  'Opening Add Child from different parent updates the dialog context',
  'Cancel dismisses without modifying hierarchy',
  'Feature Name and Feature ID are marked required',
  'Feature Name input accepts text',
  'Feature ID input accepts text',
  'Description counter starts at 0/1000 and updates',
  'Description max length is 1000 characters',
  'Versions input and Add button are present',
  'Adding version creates chip in child dialog',
  'Multiple versions create multiple chips in child dialog',
  'Empty whitespace version does not create chip',
  'Save is initially enabled when dialog opens',
  'Cancel dismisses the dialog',
  'Close button dismisses the dialog',
  'Escape dismisses the dialog',
  'Reopening after Cancel shows clean form',
  'Controlled create-delete child lifecycle',
  'Features page clean after child dialog exploration',
];

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2092 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([
    id,
    name,
    'FTR-C Features Add Child Feature',
    `FTR-C: Add Child Feature - ${name}`,
    'Features',
    'Read-only',
    '', '', '', '', '', '', '',
    `plans/ftr-c/${id}-${slug}.md`,
  ]);
});

if (fs.existsSync(MAIN)) {
  fs.copyFileSync(MAIN, BACKUP);
}

const workbook = new ExcelJS.Workbook();
const ws = workbook.addWorksheet('Sheet1');
const header = ['Test Case ID', 'Test Case Title', 'Module', 'Feature', 'Category', 'Type', 'Priority', 'Pre-requisite', 'Test Steps', 'Expected Result', 'Status', 'Comments', 'Reviewer Notes', 'Plan Path'];
ws.addRow(header);
rows.forEach(row => ws.addRow(row));

const oldWorkbook = new ExcelJS.Workbook();
oldWorkbook.xlsx.readFile(MAIN).then(async () => {
  const oldSheet = oldWorkbook.getWorksheet(1);
  if (oldSheet) {
    oldSheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const values = row.values;
      const rowData = [];
      for (let i = 1; i <= 14; i++) {
        rowData.push(values[i] || '');
      }
      ws.addRow(rowData);
    });
  }
  await workbook.xlsx.writeFile(MAIN);
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2092 to LIMAS-SUD-2116) for FTR-C`);

  const verify = new ExcelJS.Workbook();
  await verify.xlsx.readFile(MAIN);
  const verifySheet = verify.getWorksheet(1);
  console.log(`Total rows: ${verifySheet.rowCount}`);
}).catch(() => {
  workbook.xlsx.writeFile(MAIN).then(() => {
    console.log(`Created new checklist with ${rows.length} test rows for FTR-C`);
  });
});