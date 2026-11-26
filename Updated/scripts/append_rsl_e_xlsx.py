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

# RSL-E test cases (26 rows)
cases = [
    ('LIMAS-SUD-1584', 'Reports / Standard Licenses', 'Mode control structure: buttons inside group, aria-pressed semantics, keyboard focus', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Active and Deleted buttons inside group "License mode". 2. Verify aria-pressed="true" on Active, "false" on Deleted. 3. Verify native <button> elements. 4. Verify keyboard focusable.', 'Both buttons present. Group semantics correct. aria-pressed reflects state. Native HTML buttons.', 'Mode Control', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: A Control Structure'),
    ('LIMAS-SUD-1585', 'Reports / Standard Licenses', 'Already-selected Active click: no duplicate request, state unchanged', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Ensure Active is pressed. 2. Click Active again. 3. Verify no duplicate network request. 4. Verify state unchanged.', 'No additional GET request. Active remains pressed. Deleted unpressed. Counts unchanged.', 'Active Mode', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: B Already-Selected'),
    ('LIMAS-SUD-1586', 'Reports / Standard Licenses', 'Active-to-Deleted switch: button press, aria-pressed change, API call', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Click Deleted button. 2. Verify Deleted aria-pressed="true". 3. Verify Active aria-pressed="false". 4. Verify GET allstandarddeleted request fires.', 'Deleted pressed. Active unpressed. GET /api/report/allstandarddeleted?page=0&size=500. Deleted data loads.', 'Active-to-Deleted', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: C Active-to-Deleted'),
    ('LIMAS-SUD-1587', 'Reports / Standard Licenses', 'Deleted API contract: GET, endpoint, page/size params, deletedOn field', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Switch to Deleted. 2. Capture API request. 3. Verify GET method. 4. Verify endpoint /api/report/allstandarddeleted. 5. Verify page=0, size=500. 6. Verify deletedOn field in response.', 'GET allstandarddeleted?page=0&size=500. Response includes deletedOn timestamp. All standard fields present.', 'API Contract', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: D API Contract'),
    ('LIMAS-SUD-1588', 'Reports / Standard Licenses', 'Deleted counts: toolbar 433, loaded/total 150/433', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Switch to Deleted. 2. Check toolbar count. 3. Check loaded/total row.', 'Toolbar: "433 records". Loaded: "150 loaded \u00b7 433 total". Counts reflect Deleted not Active.', 'Counts', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: E Counts'),
    ('LIMAS-SUD-1589', 'Reports / Standard Licenses', 'Deleted table: 6 columns, License Dates Exp+Deleted format', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Switch to Deleted. 2. Verify 6 column headers. 3. Verify License Dates cell shows Exp + Deleted. 4. Verify no Maint in Deleted. 5. Verify rows populated.', 'Same 6 columns as Active. License Dates shows "Exp: D M Y" and "Deleted: D M Y". No maintenance date shown.', 'Table', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: F Table'),
    ('LIMAS-SUD-1590', 'Reports / Standard Licenses', 'Deleted infinite scroll: page param, next batch, rows append', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Switch to Deleted. 2. Scroll to bottom. 3. Verify page=1 request. 4. Verify rows appended.', 'GET allstandarddeleted?page=1 with incremented page. Rows append. No duplicates. Same scroll mechanism as Active.', 'Infinite Scroll', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: G Scroll'),
    ('LIMAS-SUD-1591', 'Reports / Standard Licenses', 'No cross-mode filter persistence: each switch loads fresh state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Email filter in Active. 2. Switch to Deleted. 3. Verify Deleted loads unfiltered. 4. Switch back to Active. 5. Verify Active loads fresh (no filter).', 'Deleted loads clean state (433 records). Active reloads clean (2,699 records). No filter chips in either mode after switch.', 'Filter Persistence', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: H Persistence'),
    ('LIMAS-SUD-1592', 'Reports / Standard Licenses', 'Email filter in Deleted: type, POST with filter, chip, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Expand Filters. 3. Type email. 4. Press Enter. 5. Verify POST. 6. Verify chip. 7. Verify counts. 8. Clear.', 'POST fires with email field. Chip "Email: value" visible. Filtered counts update. Clear restores Deleted unfiltered.', 'Core Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: I Email Filter'),
    ('LIMAS-SUD-1593', 'Reports / Standard Licenses', 'Hardware IDs filter in Deleted: combobox, select, POST, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Expand Filters. 3. Search Hardware IDs. 4. Select one. 5. Verify POST. 6. Verify counts. 7. Clear.', 'POST with hardwareId array. Chip visible. Counts update. Clear restores.', 'Core Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: I HW IDs'),
    ('LIMAS-SUD-1594', 'Reports / Standard Licenses', 'Groups filter in Deleted: combobox, select, POST, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Expand Filters. 3. Select group from combobox. 4. Verify POST. 5. Verify counts. 6. Clear.', 'POST with group array. Chip "Group: value" visible. Counts update. Clear restores.', 'Core Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: I Groups'),
    ('LIMAS-SUD-1595', 'Reports / Standard Licenses', 'Expiration Date filter in Deleted: fill date, POST, chip, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Expand Filters. 3. Fill Expiration Date. 4. Verify POST with expirationDate. 5. Verify chip. 6. Verify counts. 7. Clear.', 'POST with expirationDate ISO UTC. Chip "Exp: YYYY-MM-DD". Counts update. Clear restores Deleted unfiltered.', 'Date Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: J Exp Date'),
    ('LIMAS-SUD-1596', 'Reports / Standard Licenses', 'Maintenance Date filter in Deleted: fill date, POST, chip, counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Expand Filters. 3. Fill Maintenance Date. 4. Verify POST with maintenanceDate. 5. Verify chip. 6. Clear.', 'POST with maintenanceDate ISO UTC. Chip "Maint: YYYY-MM-DD". Counts update. Clear restores.', 'Date Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: J Maint Date'),
    ('LIMAS-SUD-1597', 'Reports / Standard Licenses', 'Combined dates in Deleted: multiple dates, POST includes all', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Fill Expiration + Maintenance dates. 3. Verify POST includes both. 4. Verify chips. 5. Clear.', 'POST includes expirationDate and maintenanceDate both non-null. Both chips visible. Clear restores.', 'Date Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: J Combined Dates'),
    ('LIMAS-SUD-1598', 'Reports / Standard Licenses', 'Clear in Deleted: global Clear resets all filters', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Apply multiple filters. 3. Click Clear. 4. Verify POST with all null. 5. Verify unfiltered Deleted restores.', 'Single POST with all fields null. All chips removed. Unfiltered Deleted data returns.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: K Clear'),
    ('LIMAS-SUD-1599', 'Reports / Standard Licenses', 'Deleted-to-Active switch: Active pressed, Deleted unpressed, 2699 records', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Click Active. 3. Verify Active pressed. 4. Verify Deleted unpressed. 5. Verify toolbar 2699 records.', 'Active aria-pressed="true". Deleted aria-pressed="false". Toolbar: "2,699 records". Loaded: "20 loaded \u00b7 2,699 total".', 'Deleted-to-Active', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: L Deleted-to-Active'),
    ('LIMAS-SUD-1600', 'Reports / Standard Licenses', 'Deleted-to-Active API: GET allstandardlicenses, no filter state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Click Active. 3. Capture API calls. 4. Verify GET allstandardlicenses?page=0&size=10. 5. Verify page=1 follow-up. 6. Verify no filter state.', 'GET allstandardlicenses?page=0&size=10 then page=1&size=10. No POST filter request. No filter chips.', 'Deleted-to-Active', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: L API'),
    ('LIMAS-SUD-1601', 'Reports / Standard Licenses', 'Active-to-Deleted stale response: only Deleted data rendered', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Start in Active. 2. Scroll triggers page=2 load. 3. Immediately click Deleted. 4. Verify only Deleted data rendered (no Active-page-2 data).', 'Active in-flight request discarded. Only Deleted data in DOM. No stale Active rows.', 'Stale Response', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: M Stale A\u2192D'),
    ('LIMAS-SUD-1602', 'Reports / Standard Licenses', 'Deleted-to-Active stale response: only Active data rendered', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Scroll triggers second page. 3. Immediately click Active. 4. Verify only Active data rendered.', 'Deleted in-flight request discarded. Only Active data in DOM. No stale Deleted rows.', 'Stale Response', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: M Stale D\u2192A'),
    ('LIMAS-SUD-1603', 'Reports / Standard Licenses', 'Loading indicator: spinner visible during Active-to-Deleted switch', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Start in Active. 2. Click Deleted. 3. Verify loading indicator appears. 4. Verify indicator disappears after load.', 'Spinner visible during request. Spinner removed after response. Deleted data rendered.', 'Loading', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: N Loading A\u2192D'),
    ('LIMAS-SUD-1604', 'Reports / Standard Licenses', 'Loading indicator: spinner visible during Deleted-to-Active switch', 'Authenticated SUPER_USER_ADMIN_USER on Reports page with Deleted mode', '1. Switch to Deleted. 2. Click Active. 3. Verify loading indicator appears. 4. Verify indicator disappears.', 'Spinner visible during request. Active data renders after load.', 'Loading', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: N Loading D\u2192A'),
    ('LIMAS-SUD-1605', 'Reports / Standard Licenses', 'Keyboard Tab order through Active and Deleted buttons', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Tab to Active button. 2. Verify focus visible. 3. Tab to Deleted button. 4. Verify focus visible.', 'Active and Deleted in Tab order. Focus ring visible on both. group "License mode" contains both.', 'Accessibility', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: O Tab Order'),
    ('LIMAS-SUD-1606', 'Reports / Standard Licenses', 'Enter/Space key activates mode switch', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Focus Active (already pressed). 2. Press Enter. 3. Verify no switch. 4. Focus Deleted. 5. Press Enter. 6. Verify Deleted activates.', 'Enter on already-pressed Active: no change. Enter on Deleted: switches to Deleted. Space key also works.', 'Accessibility', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: O Enter/Space'),
    ('LIMAS-SUD-1607', 'Reports / Standard Licenses', 'Active with filter \u2192 Deleted switch: filter reset for Deleted', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Email filter in Active. 2. Verify chip and filtered counts. 3. Click Deleted. 4. Verify Deleted loads clean (no filter chip). 5. Verify Deleted count 433.', 'Active filter not carried to Deleted. Deleted shows unfiltered data. No Email chip in Deleted.', 'Combined', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: Mode+Filter'),
    ('LIMAS-SUD-1608', 'Reports / Standard Licenses', 'Active with date filter \u2192 Deleted switch: Deleted loads fresh', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Expiration Date in Active. 2. Verify chip and filtered counts. 3. Click Deleted. 4. Verify Deleted loads clean (no date chip). 5. Verify Deleted count 433.', 'Active date filter not carried to Deleted. Deleted shows unfiltered data. No Exp chip.', 'Combined', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: Mode+Date'),
    ('LIMAS-SUD-1609', 'Reports / Standard Licenses', 'Rapid toggle: Active\u2192Deleted\u2192Active, verify consistent final state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Click Deleted. 2. Immediately click Active. 3. Verify final state is Active pressed, 2699 records. 4. Verify no stale Deleted data.', 'Final state: Active pressed, 2,699 records. No Deleted rows in DOM. No race condition artifacts.', 'Combined', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-E: Rapid Toggle'),
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