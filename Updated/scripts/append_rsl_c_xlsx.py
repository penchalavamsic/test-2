from pathlib import Path
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border
from copy import copy

SRC = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")

wb = openpyxl.load_workbook(SRC)
ws = wb['Test Checklist']

# Reference row for format — RSL-B last row was 1560
ref_row = 1560
white_fill = PatternFill(start_color='FFFFFF', end_color='FFFFFF', fill_type='solid')
green_fill = PatternFill(start_color='E2EFDA', end_color='E2EFDA', fill_type='solid')

ref_cell_font = {}
ref_cell_align = {}
ref_cell_border = {}
ref_cell_fill_white = {}
ref_cell_fill_green = {}

# Row 1559 (white) and 1560 (green) as reference
for c in range(1, 13):
    cell_white = ws.cell(row=1559, column=c)
    cell_green = ws.cell(row=1560, column=c)
    ref_cell_font[c] = copy(cell_white.font) if cell_white.font else Font()
    ref_cell_align[c] = copy(cell_white.alignment) if cell_white.alignment else Alignment()
    ref_cell_border[c] = copy(cell_white.border) if cell_white.border else Border()
    ref_cell_fill_white[c] = copy(cell_white.fill) if cell_white.fill else white_fill
    ref_cell_fill_green[c] = copy(cell_green.fill) if cell_green.fill else green_fill

# RSL-C test cases (27 rows)
cases = [
    ('LIMAS-SUD-1530', 'Reports / Standard Licenses', 'Filter Panel: controls visible, Profile Role disabled, no request on expand', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand Filters. 2. Verify five RSL-C controls. 3. Verify Profile Role disabled. 4. Verify date controls. 5. Verify no request.', 'Five controls visible. Profile Role disabled. Date controls untouched. No API request on expand.', 'Filter Panel', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Filter Panel'),
    ('LIMAS-SUD-1531', 'Reports / Standard Licenses', 'Email Input: focus, accessible name, visible focus indicator, input type', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify searchbox role. 2. Focus input. 3. Verify active element.', 'searchbox role. Focus works. Active element is INPUT.', 'Email Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Email Input'),
    ('LIMAS-SUD-1532', 'Reports / Standard Licenses', 'Email Filter: Enter trigger, debounce, POST request, page reset', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Type email (no Enter). 2. Verify no request. 3. Press Enter. 4. Verify POST to /api/report/standardlicenses. 5. Verify page=0.', 'Enter triggers POST. page reset to 0. size preserved. email in body.', 'Email Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Email Trigger'),
    ('LIMAS-SUD-1533', 'Reports / Standard Licenses', 'Email Filter: tag, Remove button, Clear all button', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply email filter. 2. Verify filter chip shows "Email: value". 3. Verify Remove button. 4. Verify Clear all button.', 'Chip visible. Remove button on chip. Clear all button visible.', 'Email Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Email Chip'),
    ('LIMAS-SUD-1534', 'Reports / Standard Licenses', 'Filtered Results: counts update, visible rows match, Active selected', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply email filter. 2. Verify loaded/total counts. 3. Verify visible rows match loaded. 4. Verify all rows contain email. 5. Verify Active pressed.', 'Filtered counts. Row count = loaded. All rows match email. Active selected.', 'Email Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Filtered Results'),
    ('LIMAS-SUD-1535', 'Reports / Standard Licenses', 'Email API Contract: POST, JSON body, email string, paginated response', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply email filter. 2. Inspect request method, endpoint, body. 3. Inspect response format. 4. Verify no duplicate request.', 'POST /api/report/standardlicenses. email string in JSON body. Paginated JSON response. No duplicate.', 'Email Filter', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Email API'),
    ('LIMAS-SUD-1536', 'Reports / Standard Licenses', 'Partial email: substring match, page=0, count update', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Enter partial email fragment. 2. Press Enter. 3. Verify filtered results. 4. Verify rows match fragment.', 'Substring match. page=0. Filtered count updates. Rows contain fragment.', 'Email Filter', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Partial Email'),
    ('LIMAS-SUD-1537', 'Reports / Standard Licenses', 'No-match email: zero results, empty state, Clear restores', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Enter no-match email. 2. Press Enter. 3. Verify loaded=0, total=0. 4. Click Clear. 5. Verify unfiltered data returns.', 'loaded=0, total=0. Clear restores unfiltered data and counts.', 'Email Filter', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: No-Match Email'),
    ('LIMAS-SUD-1538', 'Reports / Standard Licenses', 'Hardware IDs: searchbox combobox, focus, keyboard', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify searchbox role. 2. Focus input. 3. Verify active element.', 'searchbox role. Focus works. Combobox with checkboxes.', 'Hardware IDs', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: HW IDs Control'),
    ('LIMAS-SUD-1539', 'Reports / Standard Licenses', 'Single Hardware ID: checkbox selection, POST, filtered results', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Type HW ID. 2. Click checkbox. 3. Verify POST with hardwareId array. 4. Verify counts. 5. Verify all rows contain HW ID.', 'POST with hardwareId array. Filtered counts. All rows match HW ID. HW chip visible.', 'Hardware IDs', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Single HW ID'),
    ('LIMAS-SUD-1540', 'Reports / Standard Licenses', 'Multiple Hardware IDs: multi-value POST, Clear restores', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select first HW ID. 2. Select second HW ID. 3. Verify multi-value in POST. 4. Verify chip count. 5. Clear and verify restore.', 'Multi-value hardwareId array. Chip shows count. Clear restores unfiltered data.', 'Hardware IDs', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Multiple HW IDs'),
    ('LIMAS-SUD-1541', 'Reports / Standard Licenses', 'Hardware IDs API Contract: POST, hardwareId array, page/size, JSON response', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select HW ID. 2. Inspect POST body. 3. Verify hardwareId as JSON array. 4. Verify page/size params. 5. Verify JSON response.', 'POST /api/report/standardlicenses. hardwareId array. page=0. JSON paginated response.', 'Hardware IDs', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: HW API'),
    ('LIMAS-SUD-1542', 'Reports / Standard Licenses', 'No-match Hardware ID: zero results, Clear restores', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Enter no-match HW ID. 2. Verify no results. 3. Clear. 4. Verify unfiltered data returns.', 'No results for no-match HW ID. Clear restores unfiltered data.', 'Hardware IDs', 'Medium', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: No-Match HW'),
    ('LIMAS-SUD-1543', 'Reports / Standard Licenses', 'User Group: searchable combobox, dynamic options, selected state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify searchbox role. 2. Focus input. 3. Verify active element.', 'searchbox role. Focus works. Dynamic options from API.', 'User Group', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Group Control'),
    ('LIMAS-SUD-1544', 'Reports / Standard Licenses', 'User Group filter: select triggers POST, filtered counts, rows match', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Type and select group option. 2. Verify POST with group array. 3. Verify counts. 4. Verify all rows match group.', 'POST with group array. Filtered counts. All rows match group name.', 'User Group', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Group Filter'),
    ('LIMAS-SUD-1545', 'Reports / Standard Licenses', 'User Group API Contract: POST, group array, page/size, JSON response', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select group. 2. Inspect POST body. 3. Verify group as JSON array. 4. Verify page/size. 5. Verify JSON response.', 'POST /api/report/standardlicenses. group array in body. page/size params. JSON response.', 'User Group', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Group API'),
    ('LIMAS-SUD-1546', 'Reports / Standard Licenses', 'Product Profile: searchable combobox, dynamic options', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify searchbox role. 2. Focus input. 3. Verify active element.', 'searchbox role. Focus works. Dynamic options from API.', 'Product Profile', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Profile Control'),
    ('LIMAS-SUD-1547', 'Reports / Standard Licenses', 'Product Profile filter: POST with productProfile, Profile Role enabled', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select profile. 2. Verify POST with productProfile array. 3. Verify counts. 4. Verify Profile Role enabled.', 'POST with productProfile array. Filtered counts. Profile Role enabled.', 'Product Profile', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Profile Filter'),
    ('LIMAS-SUD-1548', 'Reports / Standard Licenses', 'Profile Role dependency: Profile enables Role, Clear disables', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Profile Role disabled initially. 2. Select Profile. 3. Verify Role enabled. 4. Clear. 5. Verify Role disabled.', 'Profile Role disabled initially. Enabled after Profile selection. Disabled after Clear.', 'Profile Role', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Role Dependency'),
    ('LIMAS-SUD-1549', 'Reports / Standard Licenses', 'Profile Role: dynamic options, selected state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select Profile. 2. Verify Profile Role enabled. 3. Focus Role input. 4. Verify active element.', 'Profile Role enabled after Profile. Dynamic options correspond to Profile.', 'Profile Role', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Role Control'),
    ('LIMAS-SUD-1550', 'Reports / Standard Licenses', 'Profile Role filter: POST with both profile arrays, rows match', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select Profile. 2. Select Role. 3. Verify POST includes both arrays. 4. Verify all rows match Profile and Role.', 'POST includes productProfile and profileRole arrays. All rows match both.', 'Profile Role', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Role Filter'),
    ('LIMAS-SUD-1551', 'Reports / Standard Licenses', 'Profile change: clears incompatible Role, options refresh', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Select Profile + Role. 2. Change to different Profile. 3. Verify Role cleared. 4. Verify no stale Role submitted.', 'Role cleared on Profile change. No stale Role in POST.', 'Profile Role', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Profile Change'),
    ('LIMAS-SUD-1552', 'Reports / Standard Licenses', 'Clear: single field reset, chip removed, unfiltered data', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply email filter. 2. Click Clear. 3. Verify email reset. 4. Verify chip removed. 5. Verify unfiltered data returns.', 'Email reset. Chip removed. Unfiltered data and counts restored.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Clear Single'),
    ('LIMAS-SUD-1553', 'Reports / Standard Licenses', 'Clear: multiple fields reset, Profile Role disabled, no duplicates', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply email + HW ID filters. 2. Click Clear. 3. Verify all reset. 4. Verify Profile Role disabled. 5. Verify no duplicate requests.', 'All filters reset. Profile Role disabled. No duplicate reset requests.', 'Clear', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Clear Multiple'),
    ('LIMAS-SUD-1554', 'Reports / Standard Licenses', 'Combined filters: Group + Profile + Role, POST all arrays, no duplicates', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply Group, Profile, and Role. 2. Verify POST includes all three arrays. 3. Verify results match all. 4. Verify no duplicate rows. 5. Clear restores.', 'POST includes group, productProfile, profileRole. No duplicates. Clear restores default.', 'Combined', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Combined'),
    ('LIMAS-SUD-1555', 'Reports / Standard Licenses', 'Filter reset: page=0, scroll resets, no stale scrolled rows', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Scroll to trigger next-page. 2. Apply filter. 3. Verify page=0 in POST. 4. Verify only filter results. 5. Verify no stale rows.', 'page=0 in POST. Only filter results visible. No stale scrolled rows.', 'Filter Reset', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Filter Reset'),
    ('LIMAS-SUD-1556', 'Reports / Standard Licenses', 'Result synchronization: counts match, rendered = loaded, restore after Clear', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Apply filter. 2. Verify loaded <= total. 3. Verify row count = loaded. 4. Clear. 5. Verify counts restore.', 'loaded matches row count. Total <= unfiltered total. Clear restores counts.', 'Sync', 'High', 'Reviewed', 'Not Generated', 'Not Run', 'RSL-C: Sync'),
]

start_row = 1561
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

wb.save(SRC)
print(f'Appended {len(cases)} rows starting at row {start_row}. Last row now: {last_data_row}')
wb.close()