const ExcelJS = require('exceljs');
const path = require('path');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FTR_B_CHECKLIST.xlsx');

const rows = [];
const tests = [
  'Add Root Feature button opens a dialog',
  'Dialog has role dialog and accessible name',
  'Dialog has heading "Add Root Feature" as h2',
  'Dialog has description "Add a new root feature"',
  'Dialog has Cancel, Save, and Close controls',
  'Feature Name input accepts text',
  'Feature Name is marked required',
  'Feature ID input accepts text',
  'Feature ID is marked required',
  'Empty Feature Name with ID filled — document Save state',
  'Description field is present and optional',
  'Description character counter starts at 0/1000',
  'Description counter updates while typing',
  'Description maximum length is 1000 characters',
  'Versions input and Add button are present',
  'Add version creates a chip with removal control',
  'Add multiple versions creates multiple chips',
  'Duplicate version adds only once or is validated',
  'Empty and whitespace-only Add does not create a valid chip',
  'Access Levels input and Add button are present',
  'Add access level creates a chip with removal control',
  'Add multiple access levels',
  'Duplicate access level is handled',
  'Save is initially enabled when dialog opens',
  'Save remains enabled after filling required fields',
  'Save state with optional fields filled',
  'Cancel dismisses the dialog without creating',
  'Close button dismisses the dialog',
  'Escape dismisses the dialog',
  'Reopening dialog after Cancel shows clean form',
  'Controlled create-delete lifecycle with mutation gates',
  'Features page clean after dialog exploration',
];

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2060 + i}`;
  rows.push([
    id,
    name,
    'FTR-B Features Add Root Feature',
    `FTR-B: Add Root Feature - ${name}`,
    'Features',
    'Read-only',
    '', '', '', '', '', '', '',
    `plans/ftr-b/${id}-${name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()}.md`,
  ]);
});

// Read existing workbook
const fs = require('fs');
if (fs.existsSync(MAIN)) {
  fs.copyFileSync(MAIN, BACKUP);
}

const workbook = new ExcelJS.Workbook();
const ws = workbook.addWorksheet('Sheet1');

// Write header
const header = ['Test Case ID', 'Test Case Title', 'Module', 'Feature', 'Category', 'Type', 'Priority', 'Pre-requisite', 'Test Steps', 'Expected Result', 'Status', 'Comments', 'Reviewer Notes', 'Plan Path'];
ws.addRow(header);

// Write data
rows.forEach(row => ws.addRow(row));

// Copy existing data too
try {
  const oldWorkbook = new ExcelJS.Workbook();
  oldWorkbook.xlsx.readFile(MAIN).then(async () => {
    const oldSheet = oldWorkbook.getWorksheet(1);
    if (oldSheet) {
      oldSheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // skip old header
        const values = row.values;
        // values is 1-indexed by ExcelJS
        const rowData = [];
        for (let i = 1; i <= 14; i++) {
          rowData.push(values[i] || '');
        }
        ws.addRow(rowData);
      });
    }
    await workbook.xlsx.writeFile(MAIN);
    console.log(`Appended ${rows.length} test rows (LIMAS-SUD-2060 to LIMAS-SUD-2091) for FTR-B`);

    // Read back and verify
    const verify = new ExcelJS.Workbook();
    await verify.xlsx.readFile(MAIN);
    const verifySheet = verify.getWorksheet(1);
    console.log(`Total rows in sheet after append: ${verifySheet.rowCount}`);
  });
} catch (e) {
  // Just write new rows if old file can't be read
  workbook.xlsx.writeFile(MAIN).then(() => {
    console.log(`Created new checklist with ${rows.length} test rows for FTR-B`);
  });
}