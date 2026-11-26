from pathlib import Path
"""Apply simple 3-color row banding to the Test Checklist sheet."""
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

MAIN = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")
CANDIDATE = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_CHECKLIST_COLORED.xlsx")

wb = load_workbook(MAIN)
tc = wb["Test Checklist"]

# Color definitions
DARK_GREEN = PatternFill("solid", fgColor="1B5E20")
WHITE = PatternFill("solid", fgColor="FFFFFF")
LIGHT_GREEN = PatternFill("solid", fgColor="E8F5E9")
WHITE_FONT = Font(name="Calibri", bold=True, size=11, color="FFFFFF")
DARK_FONT = Font(name="Calibri", size=11, color="000000")
TITLE_FONT = Font(name="Calibri", bold=True, size=14, color="FFFFFF")
SUBTITLE_FONT = Font(name="Calibri", size=11, color="000000")
thin_border = Border(
    left=Side(style="thin", color="D0D0D0"),
    right=Side(style="thin", color="D0D0D0"),
    top=Side(style="thin", color="D0D0D0"),
    bottom=Side(style="thin", color="D0D0D0"),
)

def apply_row_style(row_num, fill, font, cols=12):
    """Apply fill and font to all cells in a row."""
    for c in range(1, cols + 1):
        cell = tc.cell(row=row_num, column=c)
        cell.fill = fill
        cell.font = font

# Row 1: Title — dark green, white bold
apply_row_style(1, DARK_GREEN, TITLE_FONT)
tc.cell(row=1, column=1).alignment = Alignment(horizontal="center", vertical="center")

# Row 2: Subtitle — light green, dark text
apply_row_style(2, LIGHT_GREEN, SUBTITLE_FONT)
tc.cell(row=2, column=1).alignment = Alignment(horizontal="center", vertical="center")

# Row 3: Blank separator — leave as-is (no fill)

# Row 4: Header — dark green, white bold
apply_row_style(4, DARK_GREEN, WHITE_FONT)
for c in range(1, 13):
    tc.cell(row=4, column=c).alignment = Alignment(horizontal="center", vertical="center")

# Data rows: alternate white/light-green only on populated test-case rows
# Track banding across populated rows, skipping blank separator rows
band_index = 0  # 0 = white, 1 = light green
last_data_row = None
first_data_row = None

for r in range(5, tc.max_row + 1):
    tid = tc.cell(row=r, column=1).value
    # Check if row is a populated test case (has a LIMAS- Test ID)
    if tid and str(tid).startswith("LIMAS-"):
        if first_data_row is None:
            first_data_row = r
        last_data_row = r
        fill = WHITE if band_index == 0 else LIGHT_GREEN
        font = DARK_FONT
        for c in range(1, 13):
            cell = tc.cell(row=r, column=c)
            cell.fill = fill
            # Preserve existing font unless it's the default
            if cell.font and cell.font.color and cell.font.color.rgb == "00FFFFFF":
                cell.font = Font(name="Calibri", size=11, color="FFFFFF")
            else:
                cell.font = font
        band_index = 1 - band_index  # toggle
    # Blank separator rows: leave unstyled

print(f"First data row colored: {first_data_row}")
print(f"Last data row colored: {last_data_row}")

# Preserve workbook settings
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

wb.save(CANDIDATE)
print(f"Candidate saved: {CANDIDATE}")

# --- Verify ---
wb2 = load_workbook(CANDIDATE)
tc2 = wb2["Test Checklist"]

print("\n=== Color Verification ===")
# Row 1
r1 = tc2.cell(row=1, column=1)
print(f"Row 1 A: fill={r1.fill.start_color.rgb if r1.fill.patternType else 'none'}, font_color={r1.font.color.rgb if r1.font.color else 'none'}, bold={r1.font.bold}")

# Row 2
r2 = tc2.cell(row=2, column=1)
print(f"Row 2 A: fill={r2.fill.start_color.rgb if r2.fill.patternType else 'none'}, font_color={r2.font.color.rgb if r2.font.color else 'none'}")

# Row 4
r4 = tc2.cell(row=4, column=1)
print(f"Row 4 A: fill={r4.fill.start_color.rgb if r4.fill.patternType else 'none'}, font_color={r4.font.color.rgb if r4.font.color else 'none'}")

# Check alternating pattern
for r in [5, 6, 7, 8]:
    cell = tc2.cell(row=r, column=1)
    fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
    print(f"Row {r} A: fill={fill_rgb}, value={cell.value}")

# Check last rows
for r in [889, 890, 891]:
    cell = tc2.cell(row=r, column=1)
    fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
    print(f"Row {r} A: fill={fill_rgb}, value={cell.value}")

# Verify no extra colors beyond the 3 approved
fills_seen = set()
for r in range(5, tc2.max_row + 1):
    tid = tc2.cell(row=r, column=1).value
    if tid and str(tid).startswith("LIMAS-"):
        f = tc2.cell(row=r, column=1).fill
        if f.patternType:
            fills_seen.add(f.start_color.rgb)

print(f"Data row fills used: {fills_seen}")
expected = {"00FFFFFF", "00E8F5E9"}
print(f"Approved colors only: {fills_seen == expected}")

# Verify data integrity
ids = []
for r in range(5, tc2.max_row + 1):
    v = tc2.cell(row=r, column=1).value
    if v and str(v).startswith("LIMAS-"):
        ids.append(str(v))

from collections import Counter
dupes = [k for k, v in Counter(ids).items() if v > 1]
print(f"\nTest IDs: {len(ids)}, First: {ids[0]}, Last: {ids[-1]}")
print(f"Duplicates: {len(dupes)}")

# Verify Summary unchanged
ws_s = wb2["Summary"]
print(f"Summary B5: {ws_s['B5'].value}")
print(f"Summary B10: {ws_s['B10'].value}")

# Verify freeze panes and filter
print(f"Freeze: {tc2.freeze_panes}")
print(f"Filter: {tc2.auto_filter.ref}")
print(f"DefaultRowHeight: {tc2.sheet_format.defaultRowHeight}")

wb2.close()
print("\nDone.")