const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FLC_F_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  ['LIMAS-SUD-1946', 'To verify View Details menu item is visible in the three-dot menu', 'Floating License Configurations FLC-F', 'View Details Menu Item', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1946-flc-f-view-details-menu-visible.md'],
  ['LIMAS-SUD-1947', 'To verify View Details menu item has accessible aria-label', 'Floating License Configurations FLC-F', 'View Details Menu Item', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1947-flc-f-view-details-accessible-name.md'],
  ['LIMAS-SUD-1948', 'To verify View Details menu item can be activated by keyboard Enter', 'Floating License Configurations FLC-F', 'View Details Menu Item', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1948-flc-f-view-details-keyboard-enter.md'],
  ['LIMAS-SUD-1949', 'To verify details panel is an inline region, not a modal dialog', 'Floating License Configurations FLC-F', 'Details Panel Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1949-flc-f-details-inline-region-not-dialog.md'],
  ['LIMAS-SUD-1950', 'To verify Configuration Details heading is visible in panel', 'Floating License Configurations FLC-F', 'Details Panel Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1950-flc-f-details-heading.md'],
  ['LIMAS-SUD-1951', 'To verify details Close button has accessible name Close details for', 'Floating License Configurations FLC-F', 'Details Panel Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1951-flc-f-details-close-button-accessible.md'],
  ['LIMAS-SUD-1952', 'To verify details region accessible name matches card name', 'Floating License Configurations FLC-F', 'Details Panel Structure', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1952-flc-f-details-region-accessible-name.md'],
  ['LIMAS-SUD-1953', 'To verify Product Profile field is displayed in details panel', 'Floating License Configurations FLC-F', 'Configuration Identity Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1953-flc-f-details-product-profile.md'],
  ['LIMAS-SUD-1954', 'To verify Profile Role field is displayed in details panel', 'Floating License Configurations FLC-F', 'Configuration Identity Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1954-flc-f-details-profile-role.md'],
  ['LIMAS-SUD-1955', 'To verify User Group field is displayed in details panel', 'Floating License Configurations FLC-F', 'Configuration Identity Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1955-flc-f-details-user-group.md'],
  ['LIMAS-SUD-1956', 'To verify Total Licenses, Occupied, and Available fields are displayed', 'Floating License Configurations FLC-F', 'Capacity and Checkout Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1956-flc-f-details-capacity-fields.md'],
  ['LIMAS-SUD-1957', 'To verify Checkout field displays availability status', 'Floating License Configurations FLC-F', 'Capacity and Checkout Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1957-flc-f-details-checkout-field.md'],
  ['LIMAS-SUD-1958', 'To verify Max Checkout Time field is displayed with unit', 'Floating License Configurations FLC-F', 'Capacity and Checkout Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1958-flc-f-details-max-checkout.md'],
  ['LIMAS-SUD-1959', 'To verify Expiration date is displayed in details panel', 'Floating License Configurations FLC-F', 'Date Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1959-flc-f-details-expiration.md'],
  ['LIMAS-SUD-1960', 'To verify Maintenance date is displayed in details panel', 'Floating License Configurations FLC-F', 'Date Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1960-flc-f-details-maintenance.md'],
  ['LIMAS-SUD-1961', 'To verify Created date is displayed in details panel', 'Floating License Configurations FLC-F', 'Audit Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1961-flc-f-details-created.md'],
  ['LIMAS-SUD-1962', 'To verify Last Modified date is displayed in details panel', 'Floating License Configurations FLC-F', 'Audit Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1962-flc-f-details-last-modified.md'],
  ['LIMAS-SUD-1963', 'To verify Created by field is displayed in details panel', 'Floating License Configurations FLC-F', 'Audit Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1963-flc-f-details-created-by.md'],
  ['LIMAS-SUD-1964', 'To verify Configuration ID, Version ID, and System User ID are displayed', 'Floating License Configurations FLC-F', 'System ID Fields', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1964-flc-f-details-system-ids.md'],
  ['LIMAS-SUD-1965', 'To verify feature information note is displayed when unavailable', 'Floating License Configurations FLC-F', 'Feature Information', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1965-flc-f-details-feature-note.md'],
  ['LIMAS-SUD-1966', 'To verify Close button dismisses the details panel', 'Floating License Configurations FLC-F', 'Panel Dismissal', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1966-flc-f-details-close-dismisses.md'],
  ['LIMAS-SUD-1967', 'To verify safe restoration to clean state after closing details', 'Floating License Configurations FLC-F', 'Safe Restoration', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1967-flc-f-details-safe-restoration.md'],
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