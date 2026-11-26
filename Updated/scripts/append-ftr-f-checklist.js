const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FTR_F_CHECKLIST.xlsx');

const tests = [
  'Clicking a Version opens Feature Update Management dialog',
  'Dialog has role dialog and accessible name Feature Update Management',
  'Dialog heading is h2 Feature Update Management',
  'Subtitle contains runtime Feature ID and selected Version',
  'Dialog has Cancel Save and Close controls',
  'Upload file control labeled Upload Update File is present',
  'A native file input exists within the dialog',
  'Upload icon button and file input are visible',
  'Selecting a file displays the filename in the input',
  'Replacing file updates the displayed filename',
  'Save is enabled before file selection',
  'Save remains enabled after file selection',
  'Update Comments textarea is present',
  'Comments textarea has placeholder',
  'Comments textarea accepts multiline input',
  'Comments textarea is optional not required',
  'Clearing comments restores empty value',
  'Cancel dismisses without uploading',
  'Close button dismisses the dialog',
  'Escape dismisses the dialog',
  'Reopening after Close shows clean state',
  'Reopening with file was selected state resets',
  'Initial focus is on the upload button when dialog opens',
  'File input has visible label Upload Update File',
  'Tab order includes Cancel and Save buttons',
  'Controlled update upload lifecycle',
  'Features page clean after update dialog exploration',
];

const rows = [];
tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2165 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([id, name, 'FTR-F Features Update Management', `FTR-F: Update Management - ${name}`, 'Features', 'Read-only', '', '', '', '', '', '', `plans/ftr-f/${id}-${slug}.md`]);
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
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2165 to LIMAS-SUD-2191) for FTR-F`);
  const v = new ExcelJS.Workbook(); await v.xlsx.readFile(MAIN);
  console.log(`Total rows: ${v.getWorksheet(1).rowCount}`);
}).catch(() => workbook.xlsx.writeFile(MAIN).then(() => console.log(`Created new with ${rows.length} rows`)));