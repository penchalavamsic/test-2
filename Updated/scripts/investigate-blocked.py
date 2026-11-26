from pathlib import Path
"""Investigate blocked cases and check old Summary for colors."""
from openpyxl import load_workbook

# Check FORMAT_RESTORED for any colored Summary
wb = load_workbook(str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_FORMAT_RESTORED.xlsx"))
ws = wb["Summary"]
print("=== FORMAT_RESTORED Summary colors ===")
for r in range(1, 11):
    for c in ["A", "B", "C", "E", "F"]:
        cell = ws[f"{c}{r}"]
        fill_rgb = "none"
        if cell.fill and cell.fill.patternType:
            fill_rgb = cell.fill.start_color.rgb if cell.fill.start_color else "none"
        font_color = "default"
        if cell.font and cell.font.color:
            font_color = cell.font.color.rgb if cell.font.color.rgb else "theme"
        if fill_rgb != "none" and fill_rgb != "00000000":
            print(f"  {c}{r}: fill={fill_rgb}, font_color={font_color}, bold={cell.font.bold}")
wb.close()

# Now investigate blocked Test IDs
print("\n=== Blocked Case Investigation ===")
wb2 = load_workbook(str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx"))
tc = wb2["Test Checklist"]

# Find all rows where Type contains 'Blocked'
print("Rows with Type=Blocked:")
for r in range(5, tc.max_row + 1):
    tid = tc.cell(row=r, column=1).value
    tv = tc.cell(row=r, column=7).value
    if tid and tv and "Blocked" in str(tv):
        ss = tc.cell(row=r, column=10).value or ""
        ps = tc.cell(row=r, column=9).value or ""
        es = tc.cell(row=r, column=11).value or ""
        notes = tc.cell(row=r, column=12).value or ""
        note_str = str(notes)[:100]
        print(f"  Row {r}: {tid} | Plan={ps} | Script={ss} | Exec={es} | Notes={note_str}")

# Check Script Status="Not Started" rows
print("\nRows with Script Status=Not Started:")
count_ns = 0
for r in range(5, tc.max_row + 1):
    tid = tc.cell(row=r, column=1).value
    ss = tc.cell(row=r, column=10).value
    if tid and ss and str(ss) == "Not Started":
        tv = tc.cell(row=r, column=7).value or ""
        ps = tc.cell(row=r, column=9).value or ""
        es = tc.cell(row=r, column=11).value or ""
        notes = tc.cell(row=r, column=12).value or ""
        note_str = str(notes)[:100]
        print(f"  Row {r}: {tid} | Type={tv} | Plan={ps} | Script={ss} | Exec={es} | Notes={note_str}")
        count_ns += 1
print(f"  Total Not Started: {count_ns}")

# Check Plan Status="Not Started" rows
print("\nRows with Plan Status=Not Started:")
count_pns = 0
for r in range(5, tc.max_row + 1):
    tid = tc.cell(row=r, column=1).value
    ps = tc.cell(row=r, column=9).value
    if tid and ps and str(ps) == "Not Started":
        tv = tc.cell(row=r, column=7).value or ""
        ss = tc.cell(row=r, column=10).value or ""
        notes = tc.cell(row=r, column=12).value or ""
        note_str = str(notes)[:100]
        print(f"  Row {r}: {tid} | Type={tv} | Script={ss} | Notes={note_str}")
        count_pns += 1
print(f"  Total Plan Not Started: {count_pns}")

wb2.close()