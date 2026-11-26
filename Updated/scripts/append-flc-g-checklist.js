const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FLC_G_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  ['LIMAS-SUD-1968', 'To verify Edit opens inline form with heading', 'Floating License Configurations FLC-G', 'Edit Form Shell', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1968-flc-g-edit-form-heading.md'],
  ['LIMAS-SUD-1969', 'To verify Edit form is inline panel, not a dialog', 'Floating License Configurations FLC-G', 'Edit Form Shell', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1969-flc-g-edit-inline-not-dialog.md'],
  ['LIMAS-SUD-1970', 'To verify Edit form has Cancel, Reset, and Save controls', 'Floating License Configurations FLC-G', 'Edit Form Shell', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1970-flc-g-edit-controls.md'],
  ['LIMAS-SUD-1971', 'To verify Product Profile is prepopulated in edit form', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1971-flc-g-edit-product-profile-prepop.md'],
  ['LIMAS-SUD-1972', 'To verify Profile Role is prepopulated in edit form', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1972-flc-g-edit-profile-role-prepop.md'],
  ['LIMAS-SUD-1973', 'To verify Number of Licenses is prepopulated', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1973-flc-g-edit-licenses-prepop.md'],
  ['LIMAS-SUD-1974', 'To verify Max Checkout Time is prepopulated', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1974-flc-g-edit-max-checkout-prepop.md'],
  ['LIMAS-SUD-1975', 'To verify Availability radio is prepopulated', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1975-flc-g-edit-availability-prepop.md'],
  ['LIMAS-SUD-1976', 'To verify Expiration Date is prepopulated', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1976-flc-g-edit-expiration-prepop.md'],
  ['LIMAS-SUD-1977', 'To verify Maintenance Date is prepopulated', 'Floating License Configurations FLC-G', 'Field Prepoulation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1977-flc-g-edit-maintenance-prepop.md'],
  ['LIMAS-SUD-1978', 'To verify User Group is disabled in edit form', 'Floating License Configurations FLC-G', 'Disabled and Read-Only Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1978-flc-g-edit-user-group-disabled.md'],
  ['LIMAS-SUD-1979', 'To verify Profile Role can be changed in edit form', 'Floating License Configurations FLC-G', 'Editable Field Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1979-flc-g-edit-profile-role-change.md'],
  ['LIMAS-SUD-1980', 'To verify Number of Licenses can be changed in edit form', 'Floating License Configurations FLC-G', 'Editable Field Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1980-flc-g-edit-licenses-change.md'],
  ['LIMAS-SUD-1981', 'To verify Max Checkout Time can be changed in edit form', 'Floating License Configurations FLC-G', 'Editable Field Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1981-flc-g-edit-max-checkout-change.md'],
  ['LIMAS-SUD-1982', 'To verify Availability can be toggled in edit form', 'Floating License Configurations FLC-G', 'Editable Field Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1982-flc-g-edit-availability-toggle.md'],
  ['LIMAS-SUD-1983', 'To verify Expiration Date can be changed in edit form', 'Floating License Configurations FLC-G', 'Editable Field Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1983-flc-g-edit-expiration-change.md'],
  ['LIMAS-SUD-1984', 'To verify Number of Licenses accepts positive integer', 'Floating License Configurations FLC-G', 'Numeric Validation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1984-flc-g-edit-licenses-positive-int.md'],
  ['LIMAS-SUD-1985', 'To verify Number of Licenses with value zero is valid', 'Floating License Configurations FLC-G', 'Numeric Validation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1985-flc-g-edit-licenses-zero-valid.md'],
  ['LIMAS-SUD-1986', 'To verify Save is initially enabled when form opens', 'Floating License Configurations FLC-G', 'Save State Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1986-flc-g-edit-save-enabled-initial.md'],
  ['LIMAS-SUD-1987', 'To verify Save stays enabled after one valid field change', 'Floating License Configurations FLC-G', 'Save State Behavior', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1987-flc-g-edit-save-after-change.md'],
  ['LIMAS-SUD-1988', 'To verify Reset restores original persisted values', 'Floating License Configurations FLC-G', 'Reset and Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1988-flc-g-edit-reset-restores.md'],
  ['LIMAS-SUD-1989', 'To verify Cancel discards changes and closes form', 'Floating License Configurations FLC-G', 'Reset and Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1989-flc-g-edit-cancel-discards.md'],
  ['LIMAS-SUD-1990', 'To verify reopening Edit shows persisted values not discarded changes', 'Floating License Configurations FLC-G', 'Reset and Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1990-flc-g-edit-reopen-persisted.md'],
  ['LIMAS-SUD-1991', 'To verify gated create-edit lifecycle with mutation flags', 'Floating License Configurations FLC-G', 'Controlled Update Lifecycle', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1991-flc-g-edit-gated-lifecycle.md'],
  ['LIMAS-SUD-1992', 'To verify safe restoration to clean state after edit form closure', 'Floating License Configurations FLC-G', 'Safe Restoration', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1992-flc-g-edit-safe-restoration.md'],
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