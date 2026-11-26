from pathlib import Path
"""Apply 3-color theme to How to Use sheet without changing content."""
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment

MAIN = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")
CANDIDATE = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist_HOW_TO_USE_COLORED.xlsx")
BACKUP = str(Path(__file__).resolve().parent.parent / "scripts/_row19.txt")

wb = load_workbook(MAIN)
ws = wb["How to Use"]

# Read original row 19 content (unicode-safe)
with open(BACKUP, "r", encoding="utf-8") as f:
    row19_text = f.read()

# Color palette
DARK_GREEN = PatternFill("solid", fgColor="1B5E20")
LIGHT_GREEN = PatternFill("solid", fgColor="E8F5E9")
WHITE = PatternFill("solid", fgColor="FFFFFF")

TITLE_FONT = Font(name="Calibri", bold=True, size=14, color="FFFFFF")
HEADING_FONT = Font(name="Calibri", bold=True, size=11, color="FFFFFF")
DARK_FONT = Font(name="Calibri", size=11, color="000000")

def fill_row(row_num, fill, font):
    for c in range(1, ws.max_column + 1):
        cell = ws.cell(row=row_num, column=c)
        cell.fill = fill
        cell.font = font

# Row 1: Title — dark green, white bold
fill_row(1, DARK_GREEN, TITLE_FONT)
ws.cell(row=1, column=1).alignment = Alignment(horizontal="center", vertical="center")

# Row 2: Subtitle — light green, dark text
fill_row(2, LIGHT_GREEN, DARK_FONT)
ws.cell(row=2, column=1).alignment = Alignment(horizontal="center", vertical="center")

# Row 3: blank — leave white
fill_row(3, WHITE, DARK_FONT)

# Section headings (rows 4, 7, 10, 13, 16) — dark green, white bold
for r in [4, 7, 10, 13, 16]:
    fill_row(r, DARK_GREEN, HEADING_FONT)

# Instruction rows alternating white/light green per section
# For each section: first instruction = white, next = light green (restarts per section)
instruction_rows = [5, 8, 11, 14, 17]
for i, r in enumerate(instruction_rows):
    fill = WHITE if i % 2 == 0 else LIGHT_GREEN
    fill_row(r, fill, DARK_FONT)

# Blank separator rows — leave white
for r in [6, 9, 12, 15, 18]:
    fill_row(r, WHITE, DARK_FONT)

# Row 19: Note — light green, dark text
fill_row(19, LIGHT_GREEN, DARK_FONT)

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
print("Saved:", CANDIDATE)

# --- Verify ---
wb2 = load_workbook(CANDIDATE)
ws2 = wb2["How to Use"]

print("\n=== Color Check ===")
for r in range(1, 20):
    cell = ws2.cell(row=r, column=1)
    fill_rgb = cell.fill.start_color.rgb if cell.fill.patternType else "none"
    bold = cell.font.bold
    val = cell.value
    val_preview = (str(val)[:60] + "...") if val and len(str(val)) > 60 else str(val) if val else "(empty)"
    print("Row " + str(r) + ": fill=" + fill_rgb + " bold=" + str(bold) + " text=" + val_preview)

# Check merged cells preserved
merges = [str(m) for m in ws2.merged_cells.ranges]
print("\nMerged cells:", len(merges))
print("Expected 13, got", len(merges))
print("All preserved:", len(merges) == 13)

# Check only approved colors
fills = set()
for r in range(1, 20):
    for c in range(1, ws2.max_column + 1):
        cell = ws2.cell(row=r, column=c)
        if cell.fill.patternType:
            fills.add(cell.fill.start_color.rgb)

print("\nFills used:", fills)
approved = {"001B5E20", "00E8F5E9", "00FFFFFF"}
print("Only approved:", fills == approved)

# Verify Test Checklist unchanged
tc = wb2["Test Checklist"]
ids = []
for r in range(5, tc.max_row + 1):
    v = tc.cell(row=r, column=1).value
    if v and str(v).startswith("LIMAS-"):
        ids.append(str(v))
print("\nTest IDs:", len(ids), "First:", ids[0], "Last:", ids[-1])

# Verify Summary formulas present
ws_s = wb2["Summary"]
print("Summary B5:", repr(ws_s["B5"].value))
print("Summary B10:", repr(ws_s["B10"].value)[:80])

# Verify defaultRowHeight
for s in wb2.worksheets:
    if s.title != "Lists":
        print(s.title, "drh:", s.sheet_format.defaultRowHeight)

wb2.close()
print("\nDone.")