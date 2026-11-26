const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FLC_E_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  ['LIMAS-SUD-1917', 'To verify Create Configuration button opens inline form with heading', 'Floating License Configurations FLC-E', 'Form Shell and Layout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1917-flc-e-create-form-heading.md'],
  ['LIMAS-SUD-1918', 'To verify Create form has Cancel button in the header area', 'Floating License Configurations FLC-E', 'Form Shell and Layout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1918-flc-e-create-form-cancel-button.md'],
  ['LIMAS-SUD-1919', 'To verify Create form is inline panel, not a modal dialog', 'Floating License Configurations FLC-E', 'Form Shell and Layout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1919-flc-e-create-form-inline-not-dialog.md'],
  ['LIMAS-SUD-1920', 'To verify all top-level field labels are visible on create form', 'Floating License Configurations FLC-E', 'Form Shell and Layout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1920-flc-e-create-form-field-labels.md'],
  ['LIMAS-SUD-1921', 'To verify Reset and Save Configuration buttons are at the form bottom', 'Floating License Configurations FLC-E', 'Form Shell and Layout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1921-flc-e-create-form-bottom-controls.md'],
  ['LIMAS-SUD-1922', 'To verify User Group field is prepopulated with currently selected group', 'Floating License Configurations FLC-E', 'User Group Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1922-flc-e-user-group-prepopulated.md'],
  ['LIMAS-SUD-1923', 'To verify User Group combobox is editable and has options populated', 'Floating License Configurations FLC-E', 'User Group Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1923-flc-e-user-group-editable-options.md'],
  ['LIMAS-SUD-1924', 'To verify User Group field has a label displayed', 'Floating License Configurations FLC-E', 'User Group Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1924-flc-e-user-group-label.md'],
  ['LIMAS-SUD-1925', 'To verify Product Profile combobox starts with placeholder Select a profile', 'Floating License Configurations FLC-E', 'Product Profile Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1925-flc-e-product-profile-placeholder.md'],
  ['LIMAS-SUD-1926', 'To verify Product Profile options list is populated with profiles', 'Floating License Configurations FLC-E', 'Product Profile Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1926-flc-e-product-profile-options-populated.md'],
  ['LIMAS-SUD-1927', 'To verify Product Profile field shows required indicator asterisk', 'Floating License Configurations FLC-E', 'Product Profile Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1927-flc-e-product-profile-required.md'],
  ['LIMAS-SUD-1928', 'To verify Profile Role combobox starts with placeholder Select a role', 'Floating License Configurations FLC-E', 'Profile Role Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1928-flc-e-profile-role-placeholder.md'],
  ['LIMAS-SUD-1929', 'To verify Profile Role options list is populated with roles', 'Floating License Configurations FLC-E', 'Profile Role Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1929-flc-e-profile-role-options-populated.md'],
  ['LIMAS-SUD-1930', 'To verify selecting a Product Profile filters Profile Role options', 'Floating License Configurations FLC-E', 'Profile Role Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1930-flc-e-profile-role-cascade.md'],
  ['LIMAS-SUD-1931', 'To verify Profile Role field shows required indicator asterisk', 'Floating License Configurations FLC-E', 'Profile Role Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1931-flc-e-profile-role-required.md'],
  ['LIMAS-SUD-1932', 'To verify Number of Licenses is a spinbutton with numeric-only input', 'Floating License Configurations FLC-E', 'Number of Licenses Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1932-flc-e-licenses-spinbutton.md'],
  ['LIMAS-SUD-1933', 'To verify Number of Licenses shows required indicator asterisk', 'Floating License Configurations FLC-E', 'Number of Licenses Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1933-flc-e-licenses-required.md'],
  ['LIMAS-SUD-1934', 'To verify Max Checkout Time is a spinbutton with numeric-only input', 'Floating License Configurations FLC-E', 'Max Checkout Time Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1934-flc-e-max-checkout-spinbutton.md'],
  ['LIMAS-SUD-1935', 'To verify Max Checkout Time shows required indicator asterisk', 'Floating License Configurations FLC-E', 'Max Checkout Time Field', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1935-flc-e-max-checkout-required.md'],
  ['LIMAS-SUD-1936', 'To verify Available for Checkout has Available and Unavailable radio buttons', 'Floating License Configurations FLC-E', 'Available for Checkout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1936-flc-e-availability-radios.md'],
  ['LIMAS-SUD-1937', 'To verify Available radio is selected by default', 'Floating License Configurations FLC-E', 'Available for Checkout', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1937-flc-e-availability-default-available.md'],
  ['LIMAS-SUD-1938', 'To verify Expiration Date and Maintenance Date textboxes are present', 'Floating License Configurations FLC-E', 'Date Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1938-flc-e-date-textboxes.md'],
  ['LIMAS-SUD-1939', 'To verify Date fields are not marked as required with asterisk', 'Floating License Configurations FLC-E', 'Date Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1939-flc-e-date-fields-not-required.md'],
  ['LIMAS-SUD-1940', 'To verify Save Configuration is disabled when required fields are empty', 'Floating License Configurations FLC-E', 'Save State Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1940-flc-e-save-disabled-initial.md'],
  ['LIMAS-SUD-1941', 'To verify Save Configuration becomes enabled after required fields are filled', 'Floating License Configurations FLC-E', 'Save State Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1941-flc-e-save-enabled-required-filled.md'],
  ['LIMAS-SUD-1942', 'To verify Cancel button closes the form and restores Create button', 'Floating License Configurations FLC-E', 'Form Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1942-flc-e-cancel-closes-form.md'],
  ['LIMAS-SUD-1943', 'To verify Escape key dismisses the create form', 'Floating License Configurations FLC-E', 'Form Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1943-flc-e-escape-closes-form.md'],
  ['LIMAS-SUD-1944', 'To verify Reset button restores form fields to default values', 'Floating License Configurations FLC-E', 'Reset Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1944-flc-e-reset-restores-defaults.md'],
  ['LIMAS-SUD-1945', 'To verify full restore to clean state after form closure returns to config list', 'Floating License Configurations FLC-E', 'Safe Restoration', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1945-flc-e-safe-restoration.md'],
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