const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_PRF_B_CHECKLIST.xlsx');

const tests = [
  'Manage opens dialog with profile name',
  'Dialog shows h2 heading with profile name',
  'Dialog shows No description paragraph when description is empty',
  'Three tabs Overview Roles Features are visible',
  'Overview tab is selected by default',
  'Overview shows User Licenses count',
  'Overview shows Floating count',
  'Overview shows Assigned count',
  'Overview shows Profile Details heading',
  'Overview shows Name field in Profile Details',
  'Overview shows Description field in Profile Details',
  'Overview shows Total Roles field in Profile Details',
  'Switching to Roles tab shows Manage Roles heading',
  'Switching to Features tab shows Manage Features heading',
  'Switching tab updates aria-selected state correctly',
  'Roles tab has Add Role button',
  'Roles tab shows table with role entries',
  'Roles table shows role name and value cells',
  'Features tab has Add feature combobox',
  'Features tab has Create Feature button',
  'Features tab has Save button',
  'Features table shows existing feature rows',
  'Close button dismisses the dialog',
  'Reopening Manage for a different profile shows correct name',
];

const rows = [];
tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2224 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([id, name, 'PRF-B Manage Profile Dialog', `PRF-B: Profiles - ${name}`, 'Profiles', 'Read-only', '', '', '', '', '', '', `plans/profiles/${id}-${slug}.md`]);
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
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2224 to LIMAS-SUD-2247) for PRF-B`);
  const v = new ExcelJS.Workbook(); await v.xlsx.readFile(MAIN);
  console.log(`Total rows: ${v.getWorksheet(1).rowCount}`);
}).catch(() => workbook.xlsx.writeFile(MAIN).then(() => console.log(`Created new with ${rows.length} rows`)));