const ExcelJS = require('exceljs');
const path = require('path');

const CHECKLIST_PATH = path.resolve(__dirname, '..', 'inventory', 'LIMAS_3_Simple_Test_Checklist.xlsx');

const newCases = [
  {
    id: 'LIMAS-SUD-844',
    title: 'Date triggers expiration GET under Expiration filter',
    result: 'Setting a date triggers exactly one GET to /flconfig/e/{date}/{userId}?page=0&size=5.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-844-efc-f-date-triggers-expiration-get.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec.ts',
  },
  {
    id: 'LIMAS-SUD-845',
    title: 'Search after date produces no flconfig request',
    result: 'Filling search after date set produces zero additional flconfig API requests.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-845-efc-f-search-after-date-no-request.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-845-efc-f-search-after-date-no-request.spec.ts',
  },
  {
    id: 'LIMAS-SUD-846',
    title: 'Date persists after client-side search input',
    result: 'Date input value remains unchanged after entering search text (date-first order).',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-846-efc-f-date-persists-after-search.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-846-efc-f-date-persists-after-search.spec.ts',
  },
  {
    id: 'LIMAS-SUD-847',
    title: 'Search persists after date-triggered API response',
    result: 'Search value remains populated after filling a date triggers an API response (search-first order).',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-847-efc-f-search-persists-after-date-request.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec.ts',
  },
  {
    id: 'LIMAS-SUD-848',
    title: 'Date change with populated search triggers GET for new date',
    result: 'Changing date while search is populated triggers one GET for the new date and search persists.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-848-efc-f-date-change-with-populated-search.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec.ts',
  },
  {
    id: 'LIMAS-SUD-849',
    title: 'Clear search preserves date and produces no request',
    result: 'Clearing search while date is populated produces no flconfig API request and date value remains.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-849-efc-f-clear-search-preserves-date.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec.ts',
  },
  {
    id: 'LIMAS-SUD-850',
    title: 'Clear date preserves search and triggers default-date GET',
    result: 'Clearing date while search is populated triggers default-date flconfig GET and search value remains.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-850-efc-f-clear-date-preserves-search.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec.ts',
  },
  {
    id: 'LIMAS-SUD-851',
    title: 'Expiration to Maintenance preserves date and search',
    result: 'Switching from Expiration to Maintenance preserves both date and search values.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec.ts',
  },
  {
    id: 'LIMAS-SUD-852',
    title: 'Maintenance to Expiration preserves date and search',
    result: 'Switching from Maintenance to Expiration preserves both date and search values.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-852-efc-f-maint-to-exp-preserves-both.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-852-efc-f-maint-to-exp-preserves-both.spec.ts',
  },
  {
    id: 'LIMAS-SUD-853',
    title: 'Clear search does not clear date value',
    result: 'Clearing search independently does not clear the date input value.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-853-efc-f-clear-search-independent-of-date.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-853-efc-f-clear-search-independent-of-date.spec.ts',
  },
  {
    id: 'LIMAS-SUD-854',
    title: 'Clear date does not clear search value',
    result: 'Clearing date independently does not clear the search input value.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-854-efc-f-clear-date-independent-of-search.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-854-efc-f-clear-date-independent-of-search.spec.ts',
  },
  {
    id: 'LIMAS-SUD-855',
    title: 'Combined no-match state with date and search',
    result: 'With both date set and non-matching search, empty state shows heading and supporting text.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-855-efc-f-combined-no-match-state.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-855-efc-f-combined-no-match-state.spec.ts',
  },
  {
    id: 'LIMAS-SUD-856',
    title: 'Count text unchanged during combined operations',
    result: 'Count text remains unchanged throughout combined date and search operations.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec.ts',
  },
  {
    id: 'LIMAS-SUD-857',
    title: 'Combined default state after clearing both controls',
    result: 'After clearing both search and date, default empty state returns.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec.ts',
  },
  {
    id: 'LIMAS-SUD-858',
    title: 'Exp-to-Maint switch uses /flconfig/m/ endpoint',
    result: 'Switching from Expiration to Maintenance with date set uses GET /flconfig/m/{date}/{userId}.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-858-efc-f-exp-to-maint-uses-flconfig-m-endpoint.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-858-efc-f-exp-to-maint-uses-flconfig-m-endpoint.spec.ts',
  },
  {
    id: 'LIMAS-SUD-859',
    title: 'Maint-to-Exp switch uses /flconfig/e/ endpoint',
    result: 'Switching from Maintenance to Expiration with date set uses GET /flconfig/e/{date}/{userId}.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec.ts',
  },
  {
    id: 'LIMAS-SUD-860',
    title: 'Tab order moves from date to button to search',
    result: 'Keyboard Tab navigation moves from Expires until to Floating License Configurations button to Search input.',
    plans: 'plans/system-user-dashboard/LIMAS-SUD-860-efc-f-tab-order-date-button-search.md',
    scripts: 'tests/system-user-dashboard/LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec.ts',
  },
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(CHECKLIST_PATH);
  const ws = wb.getWorksheet('Test Checklist');

  const module = 'System User Dashboard';
  const type = 'Read-only';
  const priority = 'P1';
  const planStatus = 'Reviewed';
  const scriptStatus = 'Generated';
  const execStatus = 'Not Run';
  const preconds = 'Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.';
  const steps = '1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load. Perform combined date+search interaction.';
  const titlePrefix = 'To verify the functionality of "System User Dashboard" -> "Expiring Floating Configurations" -> "Combined Date and Search" -> ';

  let startRow = 875;
  for (const c of newCases) {
    const row = ws.getRow(startRow);
    row.getCell(1).value = c.id;
    row.getCell(2).value = module;
    row.getCell(3).value = titlePrefix + '"' + c.title + '"';
    row.getCell(4).value = preconds;
    row.getCell(5).value = steps;
    row.getCell(6).value = c.result;
    row.getCell(7).value = type;
    row.getCell(8).value = priority;
    row.getCell(9).value = planStatus;
    row.getCell(10).value = scriptStatus;
    row.getCell(11).value = execStatus;
    row.getCell(12).value = c.plans + ' | ' + c.scripts;
    startRow++;
  }

  await wb.xlsx.writeFile(CHECKLIST_PATH);
  console.log('Appended 17 rows (875-891). Last ID: LIMAS-SUD-860');
}

main().catch((e) => console.error(e));