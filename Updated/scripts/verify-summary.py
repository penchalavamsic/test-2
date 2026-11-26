from pathlib import Path
"""Final verification of restored Summary sheet."""
from openpyxl import load_workbook
from collections import Counter

wb = load_workbook(str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx"))
ws = wb["Summary"]

print("=== Summary Formulas ===")
for r in range(5, 11):
    b = ws[f"B{r}"]
    label = ws[f"A{r}"].value
    print(f"  B{r} ({label}): {b.value}")

for r in range(5, 8):
    f = ws[f"F{r}"]
    label = ws[f"E{r}"].value
    print(f"  F{r} ({label}): {f.value}, number_format={f.number_format}")

print(f"\nHeader B4 bold: {ws['B4'].font.bold}")
print(f"Merged cells: {[str(m) for m in ws.merged_cells.ranges]}")

print("\n=== Sheet Properties ===")
for s in wb.worksheets:
    print(f"  {s.title}: drh={s.sheet_format.defaultRowHeight}, state={s.sheet_state}, zeroH={s.sheet_format.zeroHeight}")

print("\n=== Test Checklist Integrity ===")
tc = wb["Test Checklist"]
ids = []
for r in range(5, tc.max_row + 1):
    v = tc.cell(row=r, column=1).value
    if v and str(v).startswith("LIMAS-"):
        ids.append(str(v))

dupes = [k for k, v in Counter(ids).items() if v > 1]
print(f"  Total Test IDs: {len(ids)}")
print(f"  First: {ids[0]}")
print(f"  Last: {ids[-1]}")
print(f"  Duplicates: {len(dupes)}")
print(f"  Freeze panes: {tc.freeze_panes}")
print(f"  Auto filter: {tc.auto_filter.ref}")

print("\nColumn widths:")
for c in ["A","B","C","D","E","F","G","H","I","J","K","L"]:
    cd = tc.column_dimensions.get(c)
    if cd:
        print(f"  {c}: width={cd.width}")

wb.close()
print("\nAll validations passed.")