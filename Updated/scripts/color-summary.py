from pathlib import Path
"""Apply color differentiation to Summary sheet and fix Blocked formula."""
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, numbers
from copy import copy

MAIN = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")
CANDIDATE = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_SUMMARY_COLORED.xlsx")

wb = load_workbook(MAIN)
ws = wb["Summary"]

# --- Color palette ---
# Light fills with dark text for metric rows (A:C)
# Dark fills with white text for header rows (A4:C4, E4:F4)

thin_border = Border(
    left=Side(style="thin", color="D0D0D0"),
    right=Side(style="thin", color="D0D0D0"),
    top=Side(style="thin", color="D0D0D0"),
    bottom=Side(style="thin", color="D0D0D0"),
)

# Header: dark teal/green fill, white text, bold
header_fill = PatternFill("solid", fgColor="1B5E20")  # dark green
header_font = Font(name="Calibri", bold=True, size=11, color="FFFFFF")

# Metric fills and fonts (A:C columns)
colors = {
    5: {  # Total Tests - blue
        "fill": PatternFill("solid", fgColor="D6E4F0"),  # light blue
        "font": Font(name="Calibri", bold=True, size=11, color="1A3A5C"),  # dark blue
        "label": "Total Tests",
    },
    6: {  # Plans Created - teal/cyan
        "fill": PatternFill("solid", fgColor="D0ECE7"),  # light teal
        "font": Font(name="Calibri", bold=True, size=11, color="004D40"),  # dark teal
        "label": "Plans Created",
    },
    7: {  # Scripts Generated - purple
        "fill": PatternFill("solid", fgColor="E8DAEF"),  # light purple
        "font": Font(name="Calibri", bold=True, size=11, color="4A235A"),  # dark purple
        "label": "Scripts Generated",
    },
    8: {  # Passed - green
        "fill": PatternFill("solid", fgColor="D5F5E3"),  # light green
        "font": Font(name="Calibri", bold=True, size=11, color="1B5E20"),  # dark green
        "label": "Passed",
    },
    9: {  # Failed - red
        "fill": PatternFill("solid", fgColor="FADBD8"),  # light red
        "font": Font(name="Calibri", bold=True, size=11, color="7B241C"),  # dark red
        "label": "Failed",
    },
    10: {  # Blocked - amber/orange
        "fill": PatternFill("solid", fgColor="FDEBD0"),  # light amber
        "font": Font(name="Calibri", bold=True, size=11, color="7D6608"),  # dark amber
        "label": "Blocked",
    },
}

# KPI color mapping (E:F columns) — same family as corresponding metric
kpi_colors = {
    5: {"fill": PatternFill("solid", fgColor="D6E4F0"), "font": Font(name="Calibri", bold=True, size=11, color="1A3A5C")},  # blue (Planning Cov)
    6: {"fill": PatternFill("solid", fgColor="E8DAEF"), "font": Font(name="Calibri", bold=True, size=11, color="4A235A")},  # purple (Auto Cov)
    7: {"fill": PatternFill("solid", fgColor="D5F5E3"), "font": Font(name="Calibri", bold=True, size=11, color="1B5E20")},  # green (Pass Rate)
}

# Meaning text font (italic, subtle)
meaning_font = Font(name="Calibri", size=10, italic=True, color="666666")

# --- Apply header styling ---
header_cols = ["A", "B", "C", "E", "F"]
for col in header_cols:
    cell = ws[f"{col}4"]
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = Alignment(horizontal="center", vertical="center")
    cell.border = thin_border

# --- Apply metric row colors (A:C) ---
for row_num, style in colors.items():
    for col in ["A", "B", "C"]:
        cell = ws[f"{col}{row_num}"]
        cell.fill = style["fill"]
        if col in ["A", "B"]:
            cell.font = style["font"]
        else:  # C column is meaning text
            cell.font = meaning_font
        cell.border = thin_border

    # Center the count
    ws[f"B{row_num}"].alignment = Alignment(horizontal="center", vertical="center")

# --- Apply KPI row colors (E:F) ---
for row_num, style in kpi_colors.items():
    for col in ["E", "F"]:
        cell = ws[f"{col}{row_num}"]
        cell.fill = style["fill"]
        cell.font = style["font"]
        cell.border = thin_border
        cell.alignment = Alignment(horizontal="center", vertical="center")

# --- Fix Blocked formula ---
# Count: Type=Blocked (G column) OR Notes contain "Blocked" (L column, case-insensitive)
# Using SUMPRODUCT to avoid double-counting rows that match both
ws["B10"] = (
    '=SUMPRODUCT((\'Test Checklist\'!G5:G10000="Blocked")'
    '+(ISNUMBER(SEARCH("Blocked",\'Test Checklist\'!L5:L10000))))'
    '-SUMPRODUCT((\'Test Checklist\'!G5:G10000="Blocked")'
    '*(ISNUMBER(SEARCH("Blocked",\'Test Checklist\'!L5:L10000))))'
)

# --- Preserve workbook settings ---
for s in wb.worksheets:
    if s.title != "Lists":
        if s.sheet_format.defaultRowHeight == 0 or s.sheet_format.defaultRowHeight is None:
            s.sheet_format.defaultRowHeight = 15
    if s.sheet_format.zeroHeight:
        s.sheet_format.zeroHeight = False

try:
    wb.calculation.calcMode = "auto"
    wb.calculation.fullCalcOnLoad = True
except Exception:
    pass

# --- Title styling ---
ws["A1"].font = Font(name="Calibri", bold=True, size=14, color="1B5E20")
ws["A1"].alignment = Alignment(horizontal="center", vertical="center")
ws["A2"].font = Font(name="Calibri", italic=True, size=10, color="666666")
ws["A2"].alignment = Alignment(horizontal="center")

# Save
wb.save(CANDIDATE)
print(f"Candidate saved: {CANDIDATE}")

# --- Verify ---
wb2 = load_workbook(CANDIDATE)
ws2 = wb2["Summary"]

print("\n=== Formula Verification ===")
for r in range(5, 11):
    b = ws2[f"B{r}"]
    print(f"  B{r} ({ws2['A'+str(r)].value}): {b.value}")
for r in range(5, 8):
    f = ws2[f"F{r}"]
    print(f"  F{r} ({ws2['E'+str(r)].value}): {f.value}, fmt={f.number_format}")

print("\n=== Color Verification ===")
for r in range(5, 11):
    for c in ["A", "B", "C"]:
        cell = ws2[f"{c}{r}"]
        fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
        print(f"  {c}{r}: fill={fill_rgb}, bold={cell.font.bold}")
for r in range(5, 8):
    for c in ["E", "F"]:
        cell = ws2[f"{c}{r}"]
        fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
        print(f"  {c}{r}: fill={fill_rgb}, bold={cell.font.bold}")

# Header
for c in ["A", "B", "C", "E", "F"]:
    cell = ws2[f"{c}4"]
    fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
    print(f"  Header {c}4: fill={fill_rgb}, font_color={cell.font.color.rgb if cell.font.color else 'none'}")

# Verify Test Checklist unchanged
tc = wb2["Test Checklist"]
ids = []
for r in range(5, tc.max_row + 1):
    v = tc.cell(row=r, column=1).value
    if v and str(v).startswith("LIMAS-"):
        ids.append(str(v))

print(f"\nTest IDs: {len(ids)}, First: {ids[0]}, Last: {ids[-1]}")
print(f"Freeze: {tc.freeze_panes}")
print(f"All visible sheets drh=15: ", all(
    s.sheet_format.defaultRowHeight == 15.0
    for s in wb2.worksheets if s.title != "Lists"
))

wb2.close()
print("\nDone.")