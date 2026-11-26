const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_FLC_H_CHECKLIST.xlsx');

const rows = [
  ['LIMAS-SUD-1993', 'To verify Delete menu item visible in card three-dot menu', 'Floating License Configurations FLC-H', 'Card-Menu Delete — Visibility', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1993-flc-h-card-delete-menu-visible.md'],
  ['LIMAS-SUD-1994', 'To verify Delete menu item has role menuitem', 'Floating License Configurations FLC-H', 'Card-Menu Delete — Role', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1994-flc-h-card-delete-role-menuitem.md'],
  ['LIMAS-SUD-1995', 'To verify Delete menu item can receive keyboard focus', 'Floating License Configurations FLC-H', 'Card-Menu Delete — Keyboard Focus', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1995-flc-h-card-delete-keyboard-focus.md'],
  ['LIMAS-SUD-1996', 'To verify no confirmation dialog before card-menu Delete', 'Floating License Configurations FLC-H', 'Card-Menu Delete — No Confirmation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1996-flc-h-card-delete-no-confirmation.md'],
  ['LIMAS-SUD-1997', 'To verify bulk Delete button visible in selection toolbar', 'Floating License Configurations FLC-H', 'Bulk Delete — Visibility', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1997-flc-h-bulk-delete-toolbar-visible.md'],
  ['LIMAS-SUD-1998', 'To verify bulk Delete button is enabled when cards selected', 'Floating License Configurations FLC-H', 'Bulk Delete — Enabled State', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1998-flc-h-bulk-delete-enabled.md'],
  ['LIMAS-SUD-1999', 'To verify selection count reflects selected cards', 'Floating License Configurations FLC-H', 'Bulk Delete — Selection Count', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-1999-flc-h-bulk-delete-selection-count.md'],
  ['LIMAS-SUD-2000', 'To verify no confirmation dialog for bulk Delete', 'Floating License Configurations FLC-H', 'Bulk Delete — No Confirmation', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2000-flc-h-bulk-delete-no-confirmation.md'],
  ['LIMAS-SUD-2001', 'To verify gated card-menu delete lifecycle with mutation flags', 'Floating License Configurations FLC-H', 'Controlled Delete Lifecycle — Gated', 'Floating License Configurations', 'Destructive (gated)', 'TEST_FLC_ALLOW_MUTATION=TRUE; TEST_FLC_ALLOW_DELETE=TRUE', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2001-flc-h-gated-card-delete-lifecycle.md'],
  ['LIMAS-SUD-2002', 'To verify Delete returns configuration count to original value', 'Floating License Configurations FLC-H', 'Controlled Delete Lifecycle — Count Sync', 'Floating License Configurations', 'Destructive (gated)', 'TEST_FLC_ALLOW_MUTATION=TRUE; TEST_FLC_ALLOW_DELETE=TRUE', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2002-flc-h-delete-count-sync.md'],
  ['LIMAS-SUD-2003', 'To verify unauthorized delete is handled gracefully', 'Floating License Configurations FLC-H', 'Failure Recovery — 401/403', 'Floating License Configurations', 'Skipped', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2003-flc-h-failure-unauthorized.md'],
  ['LIMAS-SUD-2004', 'To verify config not found delete is handled gracefully', 'Floating License Configurations FLC-H', 'Failure Recovery — 404', 'Floating License Configurations', 'Skipped', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2004-flc-h-failure-not-found.md'],
  ['LIMAS-SUD-2005', 'To verify server error during delete is handled gracefully', 'Floating License Configurations FLC-H', 'Failure Recovery — 500', 'Floating License Configurations', 'Skipped', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2005-flc-h-failure-server-error.md'],
  ['LIMAS-SUD-2006', 'To verify already-absent card treated as idempotent success', 'Floating License Configurations FLC-H', 'Duplicate-Delete Prevention', 'Floating License Configurations', 'Destructive (gated)', 'TEST_FLC_ALLOW_MUTATION=TRUE; TEST_FLC_ALLOW_DELETE=TRUE', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2006-flc-h-duplicate-delete-idempotent.md'],
  ['LIMAS-SUD-2007', 'To verify clean state restoration after delete inspection', 'Floating License Configurations FLC-H', 'Safe Restoration — No Selections', 'Floating License Configurations', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2007-flc-h-safe-restoration-clean.md'],
  ['LIMAS-SUD-2008', 'To verify original count restored after lifecycle cleanup', 'Floating License Configurations FLC-H', 'Safe Restoration — Original Count', 'Floating License Configurations', 'Destructive (gated)', 'TEST_FLC_ALLOW_MUTATION=TRUE; TEST_FLC_ALLOW_DELETE=TRUE', '', 'Reviewed', 'Generated', 'Not Run', 'plans/floating-license-configurations/LIMAS-SUD-2008-flc-h-safe-restoration-count.md'],
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