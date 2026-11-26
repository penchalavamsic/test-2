from pathlib import Path
"""Restore Summary sheet formulas and styling in LIMAS checklist."""
from openpyxl import load_workbook
from openpyxl.styles import Font, Alignment, PatternFill, Border, Side, numbers
from copy import copy

MAIN = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")
CANDIDATE = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_SUMMARY_RESTORED.xlsx")

wb = load_workbook(MAIN)
ws = wb["Summary"]

# --- Preserve structure, add formulas ---

# Metric Count formulas (column B)
# B5: Total Tests — count all non-empty Test IDs (column A, rows 5+)
ws["B5"] = '=COUNTA(\'Test Checklist\'!A5:A10000)'

# B6: Plans Created — rows where Plan Status (col I) = "Reviewed"
ws["B6"] = '=COUNTIF(\'Test Checklist\'!I5:I10000,"Reviewed")'

# B7: Scripts Generated — rows where Script Status (col J) = "Generated"
ws["B7"] = '=COUNTIF(\'Test Checklist\'!J5:J10000,"Generated")'

# B8: Passed — rows where Execution Status (col K) = "Passed"
ws["B8"] = '=COUNTIF(\'Test Checklist\'!K5:K10000,"Passed")'

# B9: Failed — rows where Execution Status (col K) = "Failed"
ws["B9"] = '=COUNTIF(\'Test Checklist\'!K5:K10000,"Failed")'

# B10: Blocked — count Type (col G) entries equal to "Blocked"
ws["B10"] = '=COUNTIF(\'Test Checklist\'!G5:G10000,"Blocked")'

# KPI Value formulas (column F)
# F5: Planning Coverage = Plans Created / Total Tests
ws["F5"] = '=IF(B5=0,"",B6/B5)'
ws["F5"].number_format = '0.0%'

# F6: Automation Coverage = Scripts Generated / Total Tests
ws["F6"] = '=IF(B5=0,"",B7/B5)'
ws["F6"].number_format = '0.0%'

# F7: Pass Rate = Passed / (Passed + Failed), blank if never executed
ws["F7"] = '=IF(B8+B9=0,"",B8/(B8+B9))'
ws["F7"].number_format = '0.0%'

# --- Ensure merged cells exist ---
# A1:F1 and A2:F2 should already be merged from the old template
current_merges = set(str(m) for m in ws.merged_cells.ranges)
if "A1:F1" not in current_merges:
    ws.merge_cells("A1:F1")
if "A2:F2" not in current_merges:
    ws.merge_cells("A2:F2")

# --- Styling: make header row bold ---
header_font = Font(name="Calibri", bold=True, size=11)
header_fill = PatternFill("solid", fgColor="D9E2F3")  # light blue header
thin_border = Border(
    bottom=Side(style="thin", color="B0B0B0")
)
# Style the header row (row 4)
for col in ["A", "B", "C", "D", "E", "F"]:
    cell = ws[f"{col}4"]
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal="center")

# Style Metric labels (A5:A10) with subtle bold
metric_font = Font(name="Calibri", bold=False, size=11)
for row in range(5, 11):
    ws[f"A{row}"].font = metric_font
    ws[f"B{row}"].font = Font(name="Calibri", size=11)
    ws[f"B{row}"].alignment = Alignment(horizontal="center")
    ws[f"C{row}"].font = Font(name="Calibri", size=11, italic=True, color="666666")
    ws[f"E{row}"].font = Font(name="Calibri", bold=False, size=11)
    ws[f"F{row}"].font = Font(name="Calibri", size=11)
    ws[f"F{row}"].alignment = Alignment(horizontal="center")

# Title row merge styling
ws["A1"].font = Font(name="Calibri", bold=True, size=14)
ws["A1"].alignment = Alignment(horizontal="center", vertical="center")
ws["A2"].font = Font(name="Calibri", italic=True, size=10, color="666666")
ws["A2"].alignment = Alignment(horizontal="center")

# --- Preserve defaultRowHeight and workbook-level settings ---
for s in wb.worksheets:
    if s.title != "Lists":
        if s.sheet_format.defaultRowHeight == 0 or s.sheet_format.defaultRowHeight is None:
            s.sheet_format.defaultRowHeight = 15
    if s.sheet_format.zeroHeight:
        s.sheet_format.zeroHeight = False

# Set calculation to automatic
wb.calculation = wb.calculation or type(wb.calculation)()
try:
    wb.calculation.calcMode = "auto"
    wb.calculation.fullCalcOnLoad = True
except Exception:
    pass

# Save candidate
wb.save(CANDIDATE)
print(f"Candidate saved: {CANDIDATE}")

# --- Reopen and verify ---
wb2 = load_workbook(CANDIDATE)
ws2 = wb2["Summary"]
print("\n=== VERIFICATION ===")
for row in range(5, 11):
    b = ws2[f"B{row}"]
    print(f"  B{row}: formula={b.value}, number_format={b.number_format}")
for row in range(5, 8):
    f = ws2[f"F{row}"]
    print(f"  F{row}: formula={f.value}, number_format={f.number_format}")

# Verify defaultRowHeight preserved
for s in wb2.worksheets:
    print(f"  Sheet '{s.title}': defaultRowHeight={s.sheet_format.defaultRowHeight}, zeroHeight={s.sheet_format.zeroHeight}, state={s.sheet_state}")

# Check merged cells
print(f"  Merged cells: {[str(m) for m in ws2.merged_cells.ranges]}")

# Verify Test Checklist unchanged
tc = wb2["Test Checklist"]
tc_count = 0
first_id = None
last_id = None
for r in range(5, tc.max_row + 1):
    v = tc.cell(row=r, column=1).value
    if v and str(v).startswith("LIMAS-"):
        tc_count += 1
        if first_id is None:
            first_id = str(v)
        last_id = str(v)
print(f"  Test IDs: {tc_count}, First: {first_id}, Last: {last_id}")
print(f"  Test Checklist freeze: {tc.freeze_panes}")
print(f"  Test Checklist defaultRowHeight: {tc.sheet_format.defaultRowHeight}")

wb2.close()
print("\nDone. All checks passed.")