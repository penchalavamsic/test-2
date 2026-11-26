from pathlib import Path
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from copy import copy

SRC = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")

wb = openpyxl.load_workbook(SRC)
ws = wb['Test Checklist']

# Reference row for format — use existing alternating colors from RSL-A
# RSL-A last row was 1542 (1512 + 30 rows). Next row is 1543.
ref_row = 1542
green_fill = PatternFill(start_color='E2EFDA', end_color='E2EFDA', fill_type='solid')
white_fill = PatternFill(start_color='FFFFFF', end_color='FFFFFF', fill_type='solid')

# Gather reference styles from existing data rows
ref_cell_font = {}
ref_cell_align = {}
ref_cell_border = {}
ref_cell_fill_green = {}
ref_cell_fill_white = {}

# Row 1541 (white) and 1542 (green) as reference
for c in range(1, 13):
    cell_white = ws.cell(row=1541, column=c)
    cell_green = ws.cell(row=1542, column=c)
    ref_cell_font[c] = copy(cell_white.font) if cell_white.font else Font()
    ref_cell_align[c] = copy(cell_white.alignment) if cell_white.alignment else Alignment()
    ref_cell_border[c] = copy(cell_white.border) if cell_white.border else Border()
    ref_cell_fill_white[c] = copy(cell_white.fill) if cell_white.fill else white_fill
    ref_cell_fill_green[c] = copy(cell_green.fill) if cell_green.fill else green_fill

# RSL-B test cases (18 rows)
cases = [
    ('LIMAS-SUD-1512', 'Reports / Standard Licenses', 'Scroll container identified with overflow and sentinel', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Identify scroll container. 2. Verify sentinel exists.', 'Container with overflow-auto, sentinel div.h-4[aria-hidden] present.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Scroll Container'),
    ('LIMAS-SUD-1513', 'Reports / Standard Licenses', 'Initial scroll metrics, loaded state, and row count recorded dynamically', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Get scroll metrics. 2. Parse loaded/total. 3. Count rendered rows.', 'Dynamic runtime values. Row count equals loaded count.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Initial State'),
    ('LIMAS-SUD-1514', 'Reports / Standard Licenses', 'Non-boundary scroll does not trigger additional request', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Scroll within loaded rows. 2. Verify no new API request. 3. Verify counts unchanged.', 'No new API request. Loaded count unchanged. Active selected, Filters collapsed.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Non-Boundary Scroll'),
    ('LIMAS-SUD-1515', 'Reports / Standard Licenses', 'Next-page request increments page and preserves size', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Record initial page/size. 2. Scroll to trigger. 3. Verify next request page=1, same size, same endpoint.', 'Page increments by 1. Size preserved. No extra query params.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Next-Page Request'),
    ('LIMAS-SUD-1516', 'Reports / Standard Licenses', 'New rows append without replacing existing rows', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Capture row fingerprints in memory. 2. Trigger append. 3. Verify existing rows kept, new rows appended, headers unchanged.', 'Rows append below. No existing rows replaced. 6 column headers preserved.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Append'),
    ('LIMAS-SUD-1517', 'Reports / Standard Licenses', 'Loaded count increases and never exceeds total', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Record initial loaded/total. 2. Trigger append. 3. Verify loaded increased, total unchanged, loaded <= total.', 'Loaded count increases. Total unchanged. Loaded never exceeds total.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Loaded Count'),
    ('LIMAS-SUD-1518', 'Reports / Standard Licenses', 'No duplicate rows after append', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Trigger append. 2. Compare fingerprints in memory. 3. Verify all rows unique.', 'All rendered row fingerprints are unique. No duplicates across any batch.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Duplicate Prevention'),
    ('LIMAS-SUD-1519', 'Reports / Standard Licenses', 'No duplicate next-page requests', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Monitor all Standard License requests. 2. Trigger append. 3. Verify each page parameter appears once.', 'No page value requested more than once.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Duplicate Requests'),
    ('LIMAS-SUD-1520', 'Reports / Standard Licenses', 'Loading indicator behavior during append', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Check for stale indicator. 2. Trigger append, inspect DOM for spinner/skeleton. 3. Verify indicator gone after load.', 'Loading indicator documented. No stale indicator remains. Rows visible during load.', 'Infinite Scroll', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Loading Indicator'),
    ('LIMAS-SUD-1521', 'Reports / Standard Licenses', 'Scroll position does not reset unexpectedly after append', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Scroll to trigger. 2. Record position. 3. Append completes. 4. Verify scroll position not reset to 0.', 'Scroll position remains near continuation point. No jump to top.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Scroll Stability'),
    ('LIMAS-SUD-1522', 'Reports / Standard Licenses', 'Standard Licenses, Active, Filters unchanged after load', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify initial selection state. 2. Trigger append. 3. Re-verify all states unchanged.', 'Standard Licenses selected, Active selected, Filters collapsed throughout.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: State Preservation'),
    ('LIMAS-SUD-1523', 'Reports / Standard Licenses', 'End-of-data contract verified through response metadata and source logic', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Inspect page=0 response metadata. 2. Verify last=false when loaded<total. 3. Verify pagination math. 4. Sentinel present.', 'totalPages=ceil(totalElements/size). last=false confirmed. Sentinel present.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: End-of-Data'),
    ('LIMAS-SUD-1524', 'Reports / Standard Licenses', 'Failure and retry plans documented (gated on route interception)', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', 'Plans: next-page failure, row retention, retry, duplicate prevention. Script generation gated.', 'Failure plans documented. Script: Not Started. Execution: Not Run.', 'Infinite Scroll', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Failure Plans'),
    ('LIMAS-SUD-1525', 'Reports / Standard Licenses', 'Accessibility: scroll region, keyboard, announcements, focus, end-of-data', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Check table semantics. 2. Check aria-live. 3. Check keyboard reachability. 4. Check sentinel aria-hidden.', 'Table role, aria-live region, keyboard reachable focusable elements, sentinel aria-hidden=true.', 'Accessibility', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: A11y'),
    ('LIMAS-SUD-1526', 'Reports / Standard Licenses', 'Restore initial batch after additional load', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Trigger append. 2. Restore via navigation. 3. Verify page=0 reloaded. 4. Verify all initial conditions.', 'Initial batch restored. All states verified. Route /reports. No errors.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Restoration'),
    ('LIMAS-SUD-1527', 'Reports / Standard Licenses', 'Pagination metadata internally consistent', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Inspect response metadata. 2. Verify content.length=numberOfElements. 3. Verify offset=number*size.', 'All metadata fields consistent. content array length matches numberOfElements.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Pagination'),
    ('LIMAS-SUD-1528', 'Reports / Standard Licenses', 'Sentinel is present, aria-hidden, with defined height', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Find sentinel. 2. Verify aria-hidden=true. 3. Verify height>0. 4. Verify no text content.', 'Sentinel div.h-4[aria-hidden="true"] present with non-zero height.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Sentinel'),
    ('LIMAS-SUD-1529', 'Reports / Standard Licenses', 'All page-load requests use GET only, no data-changing method', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Monitor request methods. 2. Trigger append. 3. Verify only GET requests to Standard Licenses API.', 'All requests GET. No POST/PUT/PATCH/DELETE. Content-Type application/json.', 'Infinite Scroll', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-B: Request Method'),
]

start_row = 1543
for i, (tid, mod, title, precond, steps, expected, ttype, prio, plan_status, script_status, exec_status, notes) in enumerate(cases):
    row = start_row + i
    is_white = (i % 2 == 0)

    values = [tid, mod, title, precond, steps, expected, ttype, prio, plan_status, script_status, exec_status, notes]
    for c, val in enumerate(values, start=1):
        cell = ws.cell(row=row, column=c, value=val)
        cell.font = copy(ref_cell_font[c])
        cell.alignment = copy(ref_cell_align[c])
        cell.border = copy(ref_cell_border[c])
        cell.fill = copy(ref_cell_fill_white[c]) if is_white else copy(ref_cell_fill_green[c])

# Update autofilter to cover new rows
ws.auto_filter.ref = f'A4:L{start_row + len(cases) - 1}'

# Update Summary sheet to extend ranges
ws_summary = wb['Summary']
last_data_row = start_row + len(cases) - 1
ws_summary['B5'] = f"=COUNTA('Test Checklist'!A5:A{last_data_row})"
ws_summary['B6'] = f"=COUNTIF('Test Checklist'!I5:I{last_data_row},\"Reviewed\")"
ws_summary['B7'] = f"=COUNTIF('Test Checklist'!J5:J{last_data_row},\"Generated\")"
ws_summary['B8'] = f"=COUNTIF('Test Checklist'!K5:K{last_data_row},\"Passed\")"
ws_summary['B9'] = f"=COUNTIF('Test Checklist'!K5:K{last_data_row},\"Failed\")"
ws_summary['B10'] = f"=SUMPRODUCT(('Test Checklist'!G5:G{last_data_row}=\"Blocked\")+(ISNUMBER(SEARCH(\"Blocked\",'Test Checklist'!L5:L{last_data_row}))))-SUMPRODUCT(('Test Checklist'!G5:G{last_data_row}=\"Blocked\")*(ISNUMBER(SEARCH(\"Blocked\",'Test Checklist'!L5:L{last_data_row}))))"

wb.save(SRC)
print(f'Appended {len(cases)} rows starting at row {start_row}. Last row now: {last_data_row}')
wb.close()