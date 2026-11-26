from pathlib import Path
"""Inspect How to Use sheet structure."""
from openpyxl import load_workbook

wb = load_workbook(str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx"))
ws = wb["How to Use"]
print("max_row:", ws.max_row, "max_col:", ws.max_column)
print("Merged:", [str(m) for m in ws.merged_cells.ranges])
print("Freeze:", ws.freeze_panes)
print()

for r in range(1, ws.max_row + 1):
    vals = []
    for c in range(1, ws.max_column + 1):
        v = ws.cell(row=r, column=c).value
        if v is not None:
            vals.append(chr(64 + c) + "=" + repr(v)[:80])
    if vals:
        print("Row " + str(r) + ": " + " | ".join(vals))
    else:
        print("Row " + str(r) + ": (empty)")

print()
for r in range(1, ws.max_row + 1):
    rd = ws.row_dimensions.get(r)
    if rd and rd.height:
        print("Row " + str(r) + " height: " + str(rd.height))

print()
for c in range(1, ws.max_column + 1):
    cd = ws.column_dimensions.get(chr(64 + c))
    if cd and cd.width:
        print("Col " + chr(64 + c) + " width: " + str(cd.width))

wb.close()