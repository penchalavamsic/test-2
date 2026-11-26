from pathlib import Path
"""Fix the hidden-grid issue in LIMAS checklist for Excel for the web.

Root cause: sheet_format.defaultRowHeight is 0 on some sheets.
Excel for the web interprets this as all rows hidden.

Fix: set defaultRowHeight to a sensible value (e.g., 15) and
ensure no row is hidden and no row has height 0.
"""
import shutil
import copy
from openpyxl import load_workbook
from openpyxl.utils import get_column_letter

MAIN = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")
BACKUP = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_BEFORE_UNHIDE_FIX.xlsx")
CANDIDATE = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_WEB_FIXED.xlsx")

# 1. Backup already created via Copy-Item in the prior step.
print("Backup already exists:", BACKUP)

# 2. Open with formulas preserved
wb = load_workbook(MAIN, keep_vba=False)

print("\n=== INSPECTION ===")

for ws in wb.worksheets:
    print(f"\nSheet: {ws.title}")
    print(f"  sheet_state: {ws.sheet_state}")
    print(f"  max_row: {ws.max_row}, max_column: {ws.max_column}")
    print(f"  freeze_panes: {ws.freeze_panes}")
    if ws.auto_filter and ws.auto_filter.ref:
        print(f"  auto_filter.ref: {ws.auto_filter.ref}")
    print(f"  sheet_view.showGridLines: {ws.sheet_view.showGridLines}")
    print(f"  sheet_format.defaultRowHeight: {ws.sheet_format.defaultRowHeight}")
    print(f"  sheet_format.zeroHeight: {ws.sheet_format.zeroHeight}")

    hidden_rows = []
    zero_height_rows = []
    visible_rows = 0
    for r in range(1, ws.max_row + 1):
        rd = ws.row_dimensions.get(r)
        if rd:
            if rd.hidden:
                hidden_rows.append(r)
            if rd.height == 0:
                zero_height_rows.append(r)
            if not rd.hidden and rd.height != 0:
                visible_rows += 1
        else:
            visible_rows += 1

    hidden_cols = []
    for c in range(1, ws.max_column + 1):
        col_letter = get_column_letter(c)
        cd = ws.column_dimensions.get(col_letter)
        if cd and cd.hidden:
            hidden_cols.append(col_letter)

    print(f"  Hidden rows: {len(hidden_rows)}")
    if hidden_rows:
        print(f"    First: {hidden_rows[0]}, Last: {hidden_rows[-1]}")
    print(f"  Zero-height rows: {len(zero_height_rows)}")
    if zero_height_rows:
        print(f"    First: {zero_height_rows[0]}, Last: {zero_height_rows[-1]}")
    print(f"  Visible rows: {visible_rows}")
    print(f"  Hidden columns: {len(hidden_cols)}")
    if hidden_cols:
        print(f"    {hidden_cols}")

# 4. Fix each visible worksheet
print("\n=== FIXING ===")
total_unhidden_rows = 0
total_unhidden_cols = 0

for ws in wb.worksheets:
    print(f"\nProcessing: {ws.title} (state: {ws.sheet_state})")

    # Ensure sheet state is visible (except intentionally hidden sheets)
    # Lists sheet is intentionally hidden per original design
    if ws.title == "Lists":
        print("  Skipping: Lists is intentionally hidden")
        continue

    ws.sheet_state = "visible"

    # Fix defaultRowHeight — root cause of hidden grid
    old_drh = ws.sheet_format.defaultRowHeight
    if old_drh == 0 or old_drh is None:
        ws.sheet_format.defaultRowHeight = 15
        print(f"  defaultRowHeight: {old_drh} -> 15")
    else:
        print(f"  defaultRowHeight kept: {old_drh}")

    # Fix zeroHeight
    if ws.sheet_format.zeroHeight:
        ws.sheet_format.zeroHeight = False
        print("  zeroHeight: True -> False")

    # Unhide all rows
    unhidden = 0
    for r in range(1, ws.max_row + 1):
        rd = ws.row_dimensions.get(r)
        if rd:
            if rd.hidden:
                rd.hidden = False
                unhidden += 1
            if rd.height == 0:
                # Restore from context: if no custom height was set,
                # openpyxl uses None which means default
                rd.height = None
                unhidden += 1

    print(f"  Rows unhidden: {unhidden}")
    total_unhidden_rows += unhidden

    # Unhide all columns A-L
    unhidden_cols = 0
    for c in range(1, 13):
        col_letter = get_column_letter(c)
        cd = ws.column_dimensions.get(col_letter)
        if cd and cd.hidden:
            cd.hidden = False
            unhidden_cols += 1

    print(f"  Columns unhidden: {unhidden_cols}")
    total_unhidden_cols += unhidden_cols

# 8. Save candidate
wb.save(CANDIDATE)
print(f"\nCandidate saved: {CANDIDATE}")

# 9. Reopen and verify
print("\n=== VERIFICATION ===")
wb2 = load_workbook(CANDIDATE)
all_ok = True

for ws in wb2.worksheets:
    print(f"\nSheet: {ws.title}")
    print(f"  sheet_state: {ws.sheet_state}")
    print(f"  defaultRowHeight: {ws.sheet_format.defaultRowHeight}")
    print(f"  zeroHeight: {ws.sheet_format.zeroHeight}")
    print(f"  freeze_panes: {ws.freeze_panes}")
    if ws.auto_filter and ws.auto_filter.ref:
        print(f"  auto_filter.ref: {ws.auto_filter.ref}")

    hidden = sum(1 for r in range(1, ws.max_row + 1)
                 if ws.row_dimensions.get(r) and ws.row_dimensions[r].hidden)
    zero_h = sum(1 for r in range(1, ws.max_row + 1)
                 if ws.row_dimensions.get(r) and ws.row_dimensions[r].height == 0)

    print(f"  Hidden rows: {hidden}")
    print(f"  Zero-height rows: {zero_h}")

    if ws.title != "Lists":
        if hidden > 0:
            print("  FAIL: Hidden rows remain")
            all_ok = False
        if zero_h > 0:
            print("  FAIL: Zero-height rows remain")
            all_ok = False
        if ws.sheet_format.zeroHeight:
            print("  FAIL: zeroHeight still True")
            all_ok = False

# Verify Test Checklist row 1 and data rows are visible
tc = wb2["Test Checklist"]
tc_hidden = sum(1 for r in range(1, tc.max_row + 1)
                if tc.row_dimensions.get(r) and tc.row_dimensions[r].hidden)
print(f"\nTest Checklist hidden rows after fix: {tc_hidden}")

# Verify column widths preserved
print("\nColumn widths (Test Checklist):")
for c in range(1, 13):
    col_letter = get_column_letter(c)
    cd = tc.column_dimensions.get(col_letter)
    if cd:
        print(f"  {col_letter}: width={cd.width}, hidden={cd.hidden}")

# Count Test IDs
test_ids = []
for r in range(5, tc.max_row + 1):
    val = tc.cell(row=r, column=1).value
    if val and str(val).startswith("LIMAS-"):
        test_ids.append(str(val).strip())

print(f"\nTotal Test IDs: {len(test_ids)}")
print(f"First: {test_ids[0] if test_ids else 'NONE'}")
print(f"Last: {test_ids[-1] if test_ids else 'NONE'}")

# Duplicate check
from collections import Counter
dupes = [tid for tid, cnt in Counter(test_ids).items() if cnt > 1]
print(f"Duplicates: {len(dupes)}")
if dupes:
    print(f"  {dupes}")

print(f"\nAll checks passed: {all_ok}")
wb2.close()