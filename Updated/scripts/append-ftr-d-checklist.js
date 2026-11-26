const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FTR_D_CHECKLIST.xlsx');

const tests = [
  'Edit button opens dialog with role dialog and name Edit',
  'Dialog has heading Edit h2 and description Edit feature details',
  'Dialog has Cancel Save and Close controls no Reset',
  'Feature Name is prepopulated and editable',
  'Feature ID is prepopulated and disabled',
  'Description field is present with counter',
  'Existing Versions appear as chips with removal controls',
  'Existing Access Levels appear as chips for root features',
  'Root feature Access Levels input and Add button are enabled in Edit',
  'Child feature Edit displays inherited access levels',
  'No inheritance info banner in Edit dialog unlike Add Child',
  'Changing Feature Name updates input value',
  'Description counter updates while typing in Edit',
  'Description max length is 1000 chars in Edit',
  'Add version in Edit creates a chip',
  'Add access level for root in Edit creates a chip',
  'Save is initially enabled when Edit dialog opens',
  'Cancel dismisses without persisting changes',
  'Close button dismisses the dialog',
  'Escape dismisses the dialog',
  'Reopening Edit after Cancel shows original persisted values',
  'Clearing Feature Name produces empty value in input',
  'Empty whitespace Feature Name accepted in input',
  'Duplicate version input is handled gracefully',
  'Duplicate access level handled gracefully for root',
  'Controlled update lifecycle with mutation gates',
  'Features page clean after edit dialog exploration',
];

const rows = [];
tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2117 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([id, name, 'FTR-D Features Edit Feature', `FTR-D: Edit Feature - ${name}`, 'Features', 'Read-only', '', '', '', '', '', '', `plans/ftr-d/${id}-${slug}.md`]);
});

if (fs.existsSync(MAIN)) fs.copyFileSync(MAIN, BACKUP);

const workbook = new ExcelJS.Workbook();
const ws = workbook.addWorksheet('Sheet1');
ws.addRow(['Test Case ID','Test Case Title','Module','Feature','Category','Type','Priority','Pre-requisite','Test Steps','Expected Result','Status','Comments','Reviewer Notes','Plan Path']);
rows.forEach(r => ws.addRow(r));

const old = new ExcelJS.Workbook();
old.xlsx.readFile(MAIN).then(async () => {
  const oldSheet = old.getWorksheet(1);
  if (oldSheet) {
    oldSheet.eachRow((row, rn) => { if (rn === 1) return; const rd = []; for (let i=1;i<=14;i++) rd.push(row.values[i]||''); ws.addRow(rd); });
  }
  await workbook.xlsx.writeFile(MAIN);
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2117 to LIMAS-SUD-2143) for FTR-D`);
  const v = new ExcelJS.Workbook(); await v.xlsx.readFile(MAIN);
  console.log(`Total rows: ${v.getWorksheet(1).rowCount}`);
}).catch(() => workbook.xlsx.writeFile(MAIN).then(() => console.log(`Created new with ${rows.length} rows`)));