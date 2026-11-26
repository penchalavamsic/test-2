const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_PRF_A_CHECKLIST.xlsx');

const tests = [
  'Sidebar navigation lands on Profiles page',
  'Profiles heading is h1',
  'Create Profile button is visible',
  'Search input is present with placeholder Search',
  'Sort field combobox is present with default Name',
  'Sort direction combobox is present with default Ascending',
  'Profile cards are visible',
  'Search accepts text input',
  'Search finds match by profile name fragment',
  'No-match search shows zero cards',
  'Clearing search restores all cards',
  'Search is case-insensitive',
  'Leading trailing whitespace in search is handled',
  'No duplicate cards appear after search and clear',
  'Default sort is Name Ascending first card is alphabetically first',
  'Selecting Name Descending reorders cards',
  'Card count is consistent after sorting change',
  'Sort field combobox shows Name option',
  'Each card has a Profile name heading h3',
  'Each card has Edit and Delete icon buttons',
  'Each card has User Licenses Floating and Assigned counts',
  'Each card has a Roles count label like N Roles',
  'Role badges are visible when roles exist',
  'Overflow badge plus N is present when roles exceed visible slots',
  'Each card has a Manage button',
  'Cards have unique runtime identities no duplicate headings',
  'Count values are numeric and non-negative',
  'Search input has accessible placeholder',
  'Create Profile button has accessible name',
  'Manage button has accessible name Manage',
  'Role badges are distinguishable beyond color',
  'Profiles page restores to clean state after exploration',
];

const rows = [];
tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2192 + i}`;
  const slug = name.replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  rows.push([id, name, 'PRF-A Profiles Shell Search Sorting Cards', `PRF-A: Profiles - ${name}`, 'Profiles', 'Read-only', '', '', '', '', '', '', `plans/profiles/${id}-${slug}.md`]);
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
  console.log(`Appended ${rows.length} rows (LIMAS-SUD-2192 to LIMAS-SUD-2223) for PRF-A`);
  const v = new ExcelJS.Workbook(); await v.xlsx.readFile(MAIN);
  console.log(`Total rows: ${v.getWorksheet(1).rowCount}`);
}).catch(() => workbook.xlsx.writeFile(MAIN).then(() => console.log(`Created new with ${rows.length} rows`)));