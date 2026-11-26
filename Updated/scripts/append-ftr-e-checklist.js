const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FTR_E_CHECKLIST.xlsx');

const tests = [
  'Delete button is visible on every row',
  'Delete button has role button and accessible name Delete',
  'Delete button has destructive text styling',
  'Delete disabled when feature has associated profiles',
  'Delete enabled when feature has 0 profiles',
  'Disabled Delete tooltip explains profile association',
  'Enabled Delete has no tooltip',
  'Root feature Delete disabled when associated with profiles',
  'Child feature Delete disabled when associated with profiles',
  'Profile count drives Delete disabled state',
  'Delete button count matches row count',
  'One Delete button per row',
  'Clicking enabled Delete opens Are you sure alertdialog',
  'Confirmation dialog has heading Are you sure h2',
  'Confirmation warning mentions feature name and permanently delete',
  'Confirmation dialog has Cancel and Delete controls',
  'Cancel dismisses confirmation without deleting',
  'Escape dismisses confirmation dialog',
  'Confirmation dialog role is alertdialog',
  'Controlled synthetic create-delete lifecycle',
  'Features page clean after delete dialog exploration',
];

const rows = [];
tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2144 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([id, name, 'FTR-E Features Delete Feature', `FTR-E: Delete Feature - ${name}`, 'Features', 'Read-only', '', '', '', '', '', '', `plans/ftr-e/${id}-${slug}.md`]);
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
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2144 to LIMAS-SUD-2164) for FTR-E`);
  const v = new ExcelJS.Workbook(); await v.xlsx.readFile(MAIN);
  console.log(`Total rows: ${v.getWorksheet(1).rowCount}`);
}).catch(() => workbook.xlsx.writeFile(MAIN).then(() => console.log(`Created new with ${rows.length} rows`)));