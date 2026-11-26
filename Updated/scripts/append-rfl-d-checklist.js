const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const MAIN = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist.xlsx');
const BACKUP = path.resolve(__dirname, '..', 'inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_RFL_D_CHECKLIST.xlsx');
fs.copyFileSync(MAIN, BACKUP);

const rows = [
  // Scroll Infrastructure (3)
  ['LIMAS-SUD-1706', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Scroll Container — overflow-y:auto, flex-1, min-h-[260px], Dimensions"', 'Reports Floating Licenses RFL-D', 'Scroll Infrastructure', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1706-rfl-d-scroll-container-structure.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1707', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Initial Batch — GET allfloatingdeleted?page=0&size=500, Spring Page Metadata"', 'Reports Floating Licenses RFL-D', 'Scroll Infrastructure', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1707-rfl-d-initial-batch-metadata.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1708', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Sentinel — div.h-4[aria-hidden=true], 16px, IntersectionObserver Role"', 'Reports Floating Licenses RFL-D', 'Scroll Infrastructure', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1708-rfl-d-sentinel-structure.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],

  // Scroll Mechanics (3)
  ['LIMAS-SUD-1709', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Non-Boundary Scroll — No Continuation Request"', 'Reports Floating Licenses RFL-D', 'Scroll Mechanics', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1709-rfl-d-non-boundary-scroll.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1710', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Controlled Continuation — Scroll to Sentinel, Page Increments, size=500"', 'Reports Floating Licenses RFL-D', 'Scroll Mechanics', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1710-rfl-d-controlled-scroll-continuation.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1711', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Sequential Pages — 0,1,2..., No Gaps, No Duplicates"', 'Reports Floating Licenses RFL-D', 'Scroll Mechanics', 'Reports', 'Network', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1711-rfl-d-sequential-page-increment.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],

  // Row Integrity (3)
  ['LIMAS-SUD-1712', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Row Append Not Replace — Existing Rows Preserved, DOM Order"', 'Reports Floating Licenses RFL-D', 'Row Integrity', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1712-rfl-d-row-append-not-replace.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1713', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Loaded Count Sync — loaded ≤ total, Matches Rendered Rows"', 'Reports Floating Licenses RFL-D', 'Row Integrity', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1713-rfl-d-loaded-count-sync.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1714', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Duplicate Prevention — No Dup Rows (Fingerprints), No Dup Requests"', 'Reports Floating Licenses RFL-D', 'Row Integrity', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1714-rfl-d-duplicate-prevention.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],

  // Loading and Stability (3)
  ['LIMAS-SUD-1715', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Loading Indicator — Visible, Disappearance, Toolbar Stable, Focus Stable"', 'Reports Floating Licenses RFL-D', 'Loading and Stability', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1715-rfl-d-loading-indicator.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1716', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Scroll Stability — scrollTop Preserved, No Reset, Smooth Transition"', 'Reports Floating Licenses RFL-D', 'Loading and Stability', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1716-rfl-d-scroll-stability.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1717', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Mode and Filter Preservation — Deleted Pressed, No Mode Switch"', 'Reports Floating Licenses RFL-D', 'Loading and Stability', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1717-rfl-d-mode-and-filter-preservation.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],

  // End of Data and Restoration (5)
  ['LIMAS-SUD-1718', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "End-of-Data — Metadata: last:true, Sentinel Hidden, No Overshoot"', 'Reports Floating Licenses RFL-D', 'End of Data and Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1718-rfl-d-end-of-data-metadata.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1719', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Scroll A11y — Region, Keyboard, Loading, aria-busy, End-of-Data"', 'Reports Floating Licenses RFL-D', 'End of Data and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1719-rfl-d-scroll-a11y.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1720', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Count A11y — loaded/total Update, Appended Content Announcement"', 'Reports Floating Licenses RFL-D', 'End of Data and Restoration', 'Reports', 'Accessibility', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1720-rfl-d-loaded-count-a11y.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1721', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "No Active Contamination — Deleted Schema Only"', 'Reports Floating Licenses RFL-D', 'End of Data and Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1721-rfl-d-no-active-contamination.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
  ['LIMAS-SUD-1722', 'To verify the functionality of "Reports" → "Floating Licenses" → "Deleted Infinite Scroll" → "Safe Restoration — Active, Clear, 0/0, Empty-State, Export Disabled"', 'Reports Floating Licenses RFL-D', 'End of Data and Restoration', 'Reports', 'Read-only', '', '', 'Reviewed', 'Generated', 'Not Run', 'plans/reports/LIMAS-SUD-1722-rfl-d-safe-restoration.md | tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts'],
];

async function main() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(MAIN);
  const ws = wb.getWorksheet('Test Checklist');

  let lastRow = 4;
  for (let r = 5; r <= ws.rowCount; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      lastRow = r;
    }
  }
  console.log('Last populated row:', lastRow);

  let bandIndex = 0;
  for (let r = 5; r <= lastRow; r++) {
    const val = ws.getCell(`A${r}`).value;
    if (val && String(val).startsWith('LIMAS-')) {
      bandIndex = 1 - bandIndex;
    }
  }
  console.log('Next band index:', bandIndex);

  const WHITE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };
  const LIGHT_GREEN_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F5E9' } };
  const DARK_FONT = { name: 'Calibri', size: 11, color: { argb: 'FF000000' } };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
    right: { style: 'thin', color: { argb: 'FFD0D0D0' } },
  };

  let currentRow = lastRow + 1;
  for (const rowData of rows) {
    for (let c = 0; c < 12; c++) {
      const cell = ws.getCell(currentRow, c + 1);
      cell.value = rowData[c] || '';
      cell.font = DARK_FONT;
      cell.fill = bandIndex === 0 ? WHITE_FILL : LIGHT_GREEN_FILL;
      cell.border = thinBorder;
      cell.alignment = { vertical: 'middle', wrapText: c === 1 };
    }
    bandIndex = 1 - bandIndex;
    currentRow++;
  }
  ws.autoFilter = { from: 'A4', to: `L${currentRow - 1}` };
  await wb.xlsx.writeFile(MAIN);
  console.log(`Saved. Rows: ${rows.length}. First new: ${lastRow + 1}, Last new: ${currentRow - 1}`);
}

main().catch(console.error);