const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FLC_D_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  ['LIMAS-SUD-1889', 'To verify selection toolbar shows dynamic selected count when one card is checked', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1889-flc-d-selection-toolbar-dynamic-count.md'],
  ['LIMAS-SUD-1890', 'To verify Select loaded button has accessible name and keyboard focus support', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1890-flc-d-select-loaded-button-accessible.md'],
  ['LIMAS-SUD-1891', 'To verify Clear button is accessible with role and focus indicator', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1891-flc-d-clear-button-accessible.md'],
  ['LIMAS-SUD-1892', 'To verify Dates button is accessible with role and focus indicator', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1892-flc-d-dates-button-accessible.md'],
  ['LIMAS-SUD-1893', 'To verify Capacity button is accessible with role and focus indicator', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1893-flc-d-capacity-button-accessible.md'],
  ['LIMAS-SUD-1894', 'To verify Delete button is accessible with role and focus indicator', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1894-flc-d-delete-button-accessible.md'],
  ['LIMAS-SUD-1895', 'To verify selection toolbar is hidden when no cards are selected', 'Floating License Configurations FLC-D', 'Selection Toolbar Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1895-flc-d-toolbar-hidden-no-selection.md'],
  ['LIMAS-SUD-1896', 'To verify Select loaded selects all visible loaded configuration cards', 'Floating License Configurations FLC-D', 'Select Loaded and Clear', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1896-flc-d-select-loaded-selects-all.md'],
  ['LIMAS-SUD-1897', 'To verify selected count updates dynamically after Select loaded', 'Floating License Configurations FLC-D', 'Select Loaded and Clear', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1897-flc-d-selection-count-after-select-loaded.md'],
  ['LIMAS-SUD-1898', 'To verify Clear removes all selections and hides toolbar', 'Floating License Configurations FLC-D', 'Select Loaded and Clear', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1898-flc-d-clear-removes-selections.md'],
  ['LIMAS-SUD-1899', 'To verify Select loaded scopes to search-filtered cards only', 'Floating License Configurations FLC-D', 'Select Loaded and Clear', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1899-flc-d-select-loaded-with-search-filter.md'],
  ['LIMAS-SUD-1900', 'To verify Clear after Select loaded restores no-selection state', 'Floating License Configurations FLC-D', 'Select Loaded and Clear', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1900-flc-d-clear-after-select-all.md'],
  ['LIMAS-SUD-1901', 'To verify Dates button opens inline panel with Update Dates heading', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1901-flc-d-dates-panel-heading.md'],
  ['LIMAS-SUD-1902', 'To verify Dates panel contains Expiration Date and Maintenance Date textbox inputs', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1902-flc-d-dates-panel-fields.md'],
  ['LIMAS-SUD-1903', 'To verify Dates panel shows current default values from runtime cards', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1903-flc-d-dates-panel-default-values.md'],
  ['LIMAS-SUD-1904', 'To verify Dates panel has Use expiration date for maintenance checkbox with role checkbox', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1904-flc-d-dates-panel-checkbox.md'],
  ['LIMAS-SUD-1905', 'To verify Dates panel has Cancel and Update Dates controls', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1905-flc-d-dates-panel-controls.md'],
  ['LIMAS-SUD-1906', 'To verify Cancel closes Dates panel and leaves selections unchanged', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1906-flc-d-dates-panel-cancel.md'],
  ['LIMAS-SUD-1907', 'To verify reopening Dates panel after Cancel shows form with original default values', 'Floating License Configurations FLC-D', 'Dates Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1907-flc-d-dates-panel-reopen-state.md'],
  ['LIMAS-SUD-1908', 'To verify Capacity button opens inline panel with Update Capacity heading', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1908-flc-d-capacity-panel-heading.md'],
  ['LIMAS-SUD-1909', 'To verify Capacity panel contains Number of Licenses and Max Checkout Time spinbutton inputs', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1909-flc-d-capacity-panel-fields.md'],
  ['LIMAS-SUD-1910', 'To verify Capacity inputs have role spinbutton for numeric-only entry', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1910-flc-d-capacity-spinbutton-role.md'],
  ['LIMAS-SUD-1911', 'To verify Capacity panel has Cancel and Update Capacity controls', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1911-flc-d-capacity-panel-controls.md'],
  ['LIMAS-SUD-1912', 'To verify Cancel closes Capacity panel and leaves selections unchanged', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1912-flc-d-capacity-panel-cancel.md'],
  ['LIMAS-SUD-1913', 'To verify reopening Capacity panel after Cancel shows form with original default values', 'Floating License Configurations FLC-D', 'Capacity Panel', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1913-flc-d-capacity-panel-reopen-state.md'],
  ['LIMAS-SUD-1914', 'To verify Delete button triggers immediate destructive action with no confirmation dialog (documented, never clicked)', 'Floating License Configurations FLC-D', 'Delete Action', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1914-flc-d-delete-immediate-destructive.md'],
  ['LIMAS-SUD-1915', 'To verify Delete does not produce a confirmation dialog or modal', 'Floating License Configurations FLC-D', 'Delete Action', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1915-flc-d-delete-no-confirmation.md'],
  ['LIMAS-SUD-1916', 'To verify full restore to clean state after bulk-actions exploration', 'Floating License Configurations FLC-D', 'Safe Restoration', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1916-flc-d-full-restore.md'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell('A' + r).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }

  const WHITE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LIGHT_GREEN_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const DARK_FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    right: { style: 'thin', color: { argb: 'FFD0D0D0' } },
  };

  const startRow = lastRow + 1;
  for (let i = 0; i < rows.length; i++) {
    const r = startRow + i;
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(r, c + 1);
      cell.value = rows[i][c] || '';
      cell.font = DARK_FONT;
      cell.fill = bandIndex === 0 ? WHITE_FILL : LIGHT_GREEN_FILL;
      cell.border = thinBorder;
      cell.alignment = { vertical: 'middle', wrapText: c === 1 };
    }
    bandIndex = 1 - bandIndex;
  }

  ws.autoFilter = { from: 'A4', to: 'L' + (startRow + rows.length - 1) };
  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved: ${rows.length} rows, range ${startRow}-${startRow + rows.length - 1}`);
}

main().catch(console.error);