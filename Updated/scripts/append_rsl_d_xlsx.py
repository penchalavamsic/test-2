from pathlib import Path
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border
from copy import copy

SRC = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")

wb = openpyxl.load_workbook(SRC)
ws = wb['Test Checklist']

# RSL-C last row was 1587
ref_row = 1587
white_fill = PatternFill(start_color='FFFFFF', end_color='FFFFFF', fill_type='solid')
green_fill = PatternFill(start_color='E2EFDA', end_color='E2EFDA', fill_type='solid')

ref_cell_font = {}
ref_cell_align = {}
ref_cell_border = {}
ref_cell_fill_white = {}
ref_cell_fill_green = {}

for c in range(1, 13):
    cell_white = ws.cell(row=1586, column=c)
    cell_green = ws.cell(row=1587, column=c)
    ref_cell_font[c] = copy(cell_white.font) if cell_white.font else Font()
    ref_cell_align[c] = copy(cell_white.alignment) if cell_white.alignment else Alignment()
    ref_cell_border[c] = copy(cell_white.border) if cell_white.border else Border()
    ref_cell_fill_white[c] = copy(cell_white.fill) if cell_white.fill else white_fill
    ref_cell_fill_green[c] = copy(cell_green.fill) if cell_green.fill else green_fill

# RSL-D test cases (27 rows)
cases = [
    ('LIMAS-SUD-1557', 'Reports / Standard Licenses', 'Date control structure: visibility, labels, types, IDs, states', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand Filters. 2. Verify 4 date controls. 3. Verify type=date, empty, enabled. 4. Verify IDs and calendar buttons.', 'All 4 date controls visible, type=date, empty, enabled, no min/max/required. Calendar buttons present.', 'Date Structure', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Date Structure'),
    ('LIMAS-SUD-1558', 'Reports / Standard Licenses', 'Native date-picker: browser chrome, Escape, focus return', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Focus Expiration Date. 2. Verify type=date native picker. 3. Escape behavior. 4. Focus return.', 'Native browser picker (not application DOM). Change event fires on selection.', 'Date Picker', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Native Picker'),
    ('LIMAS-SUD-1559', 'Reports / Standard Licenses', 'Expiration Date current: change-event POST, expirationDate ISO, chip, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Expiration Date with current. 2. Verify POST with expirationDate. 3. Verify chip Exp: YYYY-MM-DD. 4. Verify counts. 5. Verify rows sync.', 'POST fires on change. expirationDate as ISO timestamp UTC. Chip visible. Counts and rows sync. Active stays pressed.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Current'),
    ('LIMAS-SUD-1560', 'Reports / Standard Licenses', 'Expiration Date past: POST, counts, rows, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Expiration Date with past date. 2. Verify POST. 3. Verify counts. 4. Clear restores.', 'POST with expirationDate. Counts update. Clear restores unfiltered data.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Past'),
    ('LIMAS-SUD-1561', 'Reports / Standard Licenses', 'Expiration Date future: POST, counts, rows, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Expiration Date with future date. 2. Verify POST. 3. Verify counts. 4. Clear restores.', 'POST with expirationDate. Counts update. Clear restores unfiltered data.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Future'),
    ('LIMAS-SUD-1562', 'Reports / Standard Licenses', 'Expiration Date month-boundary: POST, counts, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Expiration Date with month-boundary date. 2. Verify POST. 3. Verify counts. 4. Clear restores.', 'POST with expirationDate. Calendar boundary behavior validated. Clear restores.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Month-Boundary'),
    ('LIMAS-SUD-1563', 'Reports / Standard Licenses', 'Expiration Date second date: replacement, chip update, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill first date. 2. Fill second date. 3. Verify chip replaces. 4. Clear restores.', 'Second date replaces first. Chip updates. No date stacking. Clear restores.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Second'),
    ('LIMAS-SUD-1564', 'Reports / Standard Licenses', 'Expiration Date same date reapply: no duplicate request', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill date. 2. Wait for POST. 3. Refill same date. 4. Verify no duplicate request.', 'Same date reapplied. No duplicate simultaneous POST. Clear restores.', 'Expiration Date', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Same-Date'),
    ('LIMAS-SUD-1565', 'Reports / Standard Licenses', 'Expiration Date invalid: browser validity prevents, no request', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Attempt invalid text on date input. 2. Verify browser validity constraint. 3. Verify no POST fires.', 'Browser type=date prevents invalid input. No filter request. Clear restores.', 'Expiration Date', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Invalid'),
    ('LIMAS-SUD-1566', 'Reports / Standard Licenses', 'Expiration Date clear: individual remove, input empties, unfiltered returns', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill date. 2. Clear date. 3. Verify input empty. 4. Verify POST with expirationDate=null. 5. Verify unfiltered returns.', 'Input empties. expirationDate=null in POST. Unfiltered data and counts return.', 'Expiration Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Exp Clear'),
    ('LIMAS-SUD-1567', 'Reports / Standard Licenses', 'Maintenance Date: one valid date, POST, maintenanceDate, chip, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Maintenance Date. 2. Verify POST with maintenanceDate. 3. Verify chip Maint: YYYY-MM-DD. 4. Verify other dates empty. 5. Clear restores.', 'POST with maintenanceDate. Chip visible. Other date fields remain null. Clear restores.', 'Maintenance Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Maint Date'),
    ('LIMAS-SUD-1568', 'Reports / Standard Licenses', 'Maintenance Date clear: individual, input empties, unfiltered returns', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill date. 2. Clear date. 3. Verify POST with maintenanceDate=null. 4. Verify unfiltered returns.', 'Input empties. maintenanceDate=null. Unfiltered data returns.', 'Maintenance Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Maint Clear'),
    ('LIMAS-SUD-1569', 'Reports / Standard Licenses', 'License Created Date: one valid date, POST, createdDate, chip, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Created Date. 2. Verify POST with createdDate. 3. Verify other dates null. 4. Clear restores.', 'POST with createdDate. Other date fields null. Clear restores unfiltered data.', 'Created Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Created Date'),
    ('LIMAS-SUD-1570', 'Reports / Standard Licenses', 'License Created Date clear: individual, unfiltered returns', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill date. 2. Clear date. 3. Verify POST with createdDate=null. 4. Verify unfiltered returns.', 'Input empties. createdDate=null. Unfiltered data returns.', 'Created Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Created Clear'),
    ('LIMAS-SUD-1571', 'Reports / Standard Licenses', 'License Modified Date: one valid date, POST, modifiedDate, chip, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Modified Date. 2. Verify POST with modifiedDate. 3. Verify other dates null. 4. Clear restores.', 'POST with modifiedDate. Other date fields null. Clear restores unfiltered data.', 'Modified Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Modified Date'),
    ('LIMAS-SUD-1572', 'Reports / Standard Licenses', 'License Modified Date clear: individual, unfiltered returns', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill date. 2. Clear date. 3. Verify POST with modifiedDate=null. 4. Verify unfiltered returns.', 'Input empties. modifiedDate=null. Unfiltered data returns.', 'Modified Date', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Modified Clear'),
    ('LIMAS-SUD-1573', 'Reports / Standard Licenses', 'Date request-body contract: POST, field names, ISO UTC, null empty', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply date. 2. Inspect POST body. 3. Verify field names. 4. Verify ISO timestamp format. 5. Verify null for empty dates.', 'Fields: expirationDate, maintenanceDate, createdDate, modifiedDate. Format: ISO timestamp UTC. Null for empty.', 'Network', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Date Contract'),
    ('LIMAS-SUD-1574', 'Reports / Standard Licenses', 'Global Clear: one date, chip removed, unfiltered returns', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill one date. 2. Click Clear. 3. Verify date empty, chip removed. 4. Verify POST with date=null.', 'Date emptied. Chip removed. Unfiltered data returns. No duplicate request.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Clear One Date'),
    ('LIMAS-SUD-1575', 'Reports / Standard Licenses', 'Global Clear: multiple dates, single POST, all null', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill two dates. 2. Click Clear. 3. Verify single POST with both =null. 4. Verify unfiltered returns.', 'Single POST. All dates null. Unfiltered data returns. No duplicate reset.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Clear Multi Date'),
    ('LIMAS-SUD-1576', 'Reports / Standard Licenses', 'Global Clear: core filter + date, both reset, Profile Role disabled', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Profile + date. 2. Click Clear. 3. Verify both reset. 4. Verify Profile Role disabled. 5. Verify unfiltered returns.', 'Core and date filters reset. Profile Role disabled. Unfiltered data returns.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Clear Core+Date'),
    ('LIMAS-SUD-1577', 'Reports / Standard Licenses', 'Combined dates: Expiration + Maintenance, both in POST, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Fill Maintenance Date. 2. Fill Expiration Date. 3. Verify POST has both. 4. Verify both chips. 5. Clear restores.', 'POST includes both expirationDate and maintenanceDate. Both chips visible. Clear restores.', 'Combined', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Combined Dates'),
    ('LIMAS-SUD-1578', 'Reports / Standard Licenses', 'Core filter + date: Email + Expiration, POST includes both, restore', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Email filter. 2. Apply Expiration Date. 3. Verify POST includes both. 4. Verify both chips. 5. Clear restores.', 'POST includes email and expirationDate. Both chips visible. Clear restores unfiltered data.', 'Cross', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Core+Date'),
    ('LIMAS-SUD-1579', 'Reports / Standard Licenses', 'Filter-triggered scroll reset: page=0, stale rows removed', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Scroll to append rows. 2. Apply date filter. 3. Verify page=0. 4. Verify only filtered rows, no stale rows.', 'page=0. Stale appended rows removed. Filtered batch only visible.', 'Scroll Reset', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Scroll Reset'),
    ('LIMAS-SUD-1580', 'Reports / Standard Licenses', 'Result sync: counts consistent after date filter', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply date filter. 2. Verify loaded <= total. 3. Verify rendered = loaded. 4. Clear and verify restore.', 'loaded matches row count. total <= unfiltered total. Clear restores counts.', 'Sync', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Counts'),
    ('LIMAS-SUD-1581', 'Reports / Standard Licenses', 'No-result date: zero counts, empty state, Clear restores', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply no-match date. 2. Verify loaded=0, total=0. 3. Verify empty state. 4. Clear restores.', 'loaded=0, total=0. Empty state handled. Clear restores unfiltered data.', 'No-Result', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: No-Result'),
    ('LIMAS-SUD-1582', 'Reports / Standard Licenses', 'Filter panel state: stays expanded, date persists, focus stable', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply date. 2. Verify filter panel stays expanded. 3. Collapse and re-expand. 4. Verify date persists. 5. Clear restores.', 'Filters stay expanded after date request. Date persists on re-expand. Clear empties.', 'Panel', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: Panel State'),
    ('LIMAS-SUD-1583', 'Reports / Standard Licenses', 'Accessibility: labels, focus, keyboard navigation', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify date labels via parent text. 2. Tab through controls. 3. Verify focus indicators. 4. Verify Clear accessible.', 'Parent text labels. Tab navigation. Clear accessible. Active stays selected.', 'Accessibility', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-D: A11y'),
]

start_row = 1588
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

ws.auto_filter.ref = f'A4:L{start_row + len(cases) - 1}'

ws_summary = wb['Summary']
last_data_row = start_row + len(cases) - 1
ws_summary['B5'] = f"=COUNTA('Test Checklist'!A5:A{last_data_row})"
ws_summary['B6'] = f"=COUNTIF('Test Checklist'!I5:I{last_data_row},\"Reviewed\")"
ws_summary['B7'] = f"=COUNTIF('Test Checklist'!J5:J{last_data_row},\"Generated\")"
ws_summary['B8'] = f"=COUNTIF('Test Checklist'!K5:K{last_data_row},\"Passed\")"
ws_summary['B9'] = f"=COUNTIF('Test Checklist'!K5:K{last_data_row},\"Failed\")"

wb.save(SRC)
print(f'Appended {len(cases)} rows starting at row {start_row}. Last row now: {last_data_row}')
wb.close()