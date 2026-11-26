from pathlib import Path
import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from copy import copy

SRC = str(Path(__file__).resolve().parent.parent / "inventory/LIMAS_3_Simple_Test_Checklist.xlsx")

wb = openpyxl.load_workbook(SRC)
ws = wb['Test Checklist']

# Reference row 1512 for format
ref_row = 1512
green_fill = PatternFill(start_color='E2EFDA', end_color='E2EFDA', fill_type='solid')
white_fill = PatternFill(start_color='FFFFFF', end_color='FFFFFF', fill_type='solid')

# Gather reference styles from an existing data row
ref_cell_font = {}
ref_cell_align = {}
ref_cell_border = {}
ref_cell_fill_green = {}
ref_cell_fill_white = {}

# Use row 1511 (white) and 1512 (green) as reference
for c in range(1, 13):
    cell_white = ws.cell(row=1511, column=c)
    cell_green = ws.cell(row=1512, column=c)
    ref_cell_font[c] = copy(cell_white.font) if cell_white.font else Font()
    ref_cell_align[c] = copy(cell_white.alignment) if cell_white.alignment else Alignment()
    ref_cell_border[c] = copy(cell_white.border) if cell_white.border else Border()
    ref_cell_fill_white[c] = copy(cell_white.fill) if cell_white.fill else white_fill
    ref_cell_fill_green[c] = copy(cell_green.fill) if cell_green.fill else green_fill

# RSL-A test cases (30 rows)
cases = [
    ('LIMAS-SUD-1482', 'Reports / Standard Licenses', 'Reports sidebar link navigates to /reports', 'Authenticated SUPER_USER_ADMIN_USER on System User Dashboard', '1. Click Reports sidebar link. 2. Wait for /reports route.', 'URL pathname is /reports.', 'Navigation', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Navigation'),
    ('LIMAS-SUD-1483', 'Reports / Standard Licenses', 'Reports heading is h1 with text "Reports"', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify heading visibility. 2. Verify heading tag and text.', 'h1 element visible with text "Reports".', 'Shell', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Page Shell'),
    ('LIMAS-SUD-1484', 'Reports / Standard Licenses', 'Reports page shell has description main and footer', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify description text. 2. Verify main region. 3. Verify footer.', 'Description, <main>, and footer all visible.', 'Shell', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Page Shell'),
    ('LIMAS-SUD-1485', 'Reports / Standard Licenses', 'Reports sidebar link has accessible role and icon', 'Authenticated SUPER_USER_ADMIN_USER on System User Dashboard', '1. Locate sidebar link. 2. Verify icon and enabled state.', 'Link with svg icon, enabled, href=/reports.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Navigation'),
    ('LIMAS-SUD-1486', 'Reports / Standard Licenses', 'Three report-type cards visible with correct labels and aria-pressed', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify all three cards visible. 2. Check aria-pressed states.', 'Standard Licenses pressed, others not. Cards have labels.', 'Cards', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Report Cards'),
    ('LIMAS-SUD-1487', 'Reports / Standard Licenses', 'Exactly one report-type card selected at all times', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify only Standard Licenses has aria-pressed=true.', 'Exactly one card has aria-pressed="true".', 'Cards', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Report Cards'),
    ('LIMAS-SUD-1488', 'Reports / Standard Licenses', 'Report-type cards have descriptions icons keyboard accessible', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Check SVG icon presence. 2. Check description text. 3. Check tabindex.', 'Cards have SVG, descriptions, tabindex=0.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Report Cards'),
    ('LIMAS-SUD-1489', 'Reports / Standard Licenses', 'Record count shows runtime numeric value with records label', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify record count text visible. 2. Parse count value.', 'Text pattern "{N} records" with nonnegative count.', 'Toolbar', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Toolbar'),
    ('LIMAS-SUD-1490', 'Reports / Standard Licenses', 'Active tab selected Deleted tab unselected and visible', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Active aria-pressed=true. 2. Verify Deleted aria-pressed=false. 3. Verify both enabled.', 'Active pressed, Deleted not pressed, both enabled.', 'Tabs', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Tabs'),
    ('LIMAS-SUD-1491', 'Reports / Standard Licenses', 'License mode group wraps Active and Deleted tabs with accessible name', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Locate group element. 2. Check aria-label.', 'role="group" aria-label="License mode".', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Tabs'),
    ('LIMAS-SUD-1492', 'Reports / Standard Licenses', 'Filters button visible enabled collapses expands panel', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Filters button visible. 2. Click to expand. 3. Click to collapse.', 'Filters panel opens/closes. Email searchbox toggles visibility.', 'Toolbar', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Toolbar'),
    ('LIMAS-SUD-1493', 'Reports / Standard Licenses', 'Export Excel button visible and enabled without activation', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Locate Export Excel button. 2. Verify visible and enabled.', 'Button text "Export Excel", enabled, not activated.', 'Toolbar', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Toolbar'),
    ('LIMAS-SUD-1494', 'Reports / Standard Licenses', 'Filters panel contains all nine filter controls with correct labels', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand filters. 2. Verify 9 controls visible with correct labels.', 'Email, Hardware IDs, Expiration Date, Maintenance Date, User Group, Product Profile, Profile Role, License Created Date, License Modified Date visible.', 'Filters', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Filters Shell'),
    ('LIMAS-SUD-1495', 'Reports / Standard Licenses', 'Profile Role disabled with Select a profile first placeholder', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand filters. 2. Check Profile Role disabled and placeholder.', 'Profile Role searchbox disabled, placeholder "Select a profile first".', 'Filters', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Filters Shell'),
    ('LIMAS-SUD-1496', 'Reports / Standard Licenses', 'Date controls use native date inputs with calendar buttons empty initially', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand filters. 2. Verify 4 date inputs: Expiration, Maintenance, Created, Modified. 3. Check initial empty values.', 'All 4 date textboxes empty, each has calendar button.', 'Filters', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Filters Shell'),
    ('LIMAS-SUD-1497', 'Reports / Standard Licenses', 'Clear button visible and clickable with all controls empty', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Expand filters. 2. Verify Clear button visible and enabled. 3. Click Clear with all empty controls.', 'Clear button clickable. No request triggered. Table unchanged.', 'Filters', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Filters Shell'),
    ('LIMAS-SUD-1498', 'Reports / Standard Licenses', 'Filters expand and collapse without sending request when empty', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Track Standard License API requests. 2. Expand filters. 3. Collapse filters. 4. Verify zero new API requests.', 'No new Standard License API request from expand/collapse alone.', 'Filters', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Filters Shell'),
    ('LIMAS-SUD-1499', 'Reports / Standard Licenses', 'Table has six column headers', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify table visible. 2. Read all column header texts.', 'Headers: User Group, Profile, Role, Email, Hardware ID, License Dates.', 'Table', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Table'),
    ('LIMAS-SUD-1500', 'Reports / Standard Licenses', 'Table uses semantic table role with thead and tbody', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify table role. 2. Verify thead. 3. Verify tbody.', 'role="table", thead and tbody present.', 'Table', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Table'),
    ('LIMAS-SUD-1501', 'Reports / Standard Licenses', 'Loaded-total text shows runtime counts', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify loaded text visible. 2. Parse loaded and total. 3. Validate loaded <= total.', 'Text "{loaded} loaded \u00b7 {total} total", loaded >= 0, total >= 0, loaded <= total.', 'Table', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Table'),
    ('LIMAS-SUD-1502', 'Reports / Standard Licenses', 'Rendered row count matches runtime loaded count', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Count rendered rows. 2. Compare with loaded count from text.', 'Row count equals loaded count from loaded-total text.', 'Table', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Table'),
    ('LIMAS-SUD-1503', 'Reports / Standard Licenses', 'Table scrollable container exists when more records available than loaded', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Get loaded and total. 2. If loaded < total, verify scrollHeight >= clientHeight.', 'Scroll container identified. scrollHeight >= clientHeight when more records exist.', 'Table', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Table'),
    ('LIMAS-SUD-1504', 'Reports / Standard Licenses', 'Initial API call uses GET with page and size params', 'Authenticated SUPER_USER_ADMIN_USER on System User Dashboard', '1. Navigate to Reports. 2. Capture Standard License request. 3. Verify method and params.', 'GET /api/report/allstandardlicenses?page={n}&size={m}. Status 200.', 'Network', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Network'),
    ('LIMAS-SUD-1505', 'Reports / Standard Licenses', 'API response is JSON with content array totalElements and pagination metadata', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Capture response. 2. Verify JSON content-type. 3. Verify response shape.', 'Response has content[], totalElements, pageable, totalPages, size, number.', 'Network', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Network'),
    ('LIMAS-SUD-1506', 'Reports / Standard Licenses', 'No data-changing request during initial load', 'Authenticated SUPER_USER_ADMIN_USER on System User Dashboard', '1. Monitor all Standard License API requests. 2. Navigate to Reports. 3. Verify no POST/PUT/PATCH/DELETE.', 'Zero data-changing requests. Only GET.', 'Network', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Network'),
    ('LIMAS-SUD-1507', 'Reports / Standard Licenses', 'Loaded count does not exceed total and record-count label is consistent', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Parse loaded and total. 2. Parse record-count label. 3. Verify consistency.', 'loaded <= total. Record-count toolbar value equals total from loaded-text.', 'Network', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: Network'),
    ('LIMAS-SUD-1508', 'Reports / Standard Licenses', 'Reports heading is the only h1 and has accessible text', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify heading visible. 2. Check accessible name. 3. Verify only one h1.', 'Heading accessible name "Reports". Single h1 on page.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: A11y'),
    ('LIMAS-SUD-1509', 'Reports / Standard Licenses', 'Report-type cards use aria-pressed for selected state not color alone', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Standard Licenses card aria-pressed=true. 2. Verify other cards aria-pressed=false.', 'Selection communicated via aria-pressed, not only color.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: A11y'),
    ('LIMAS-SUD-1510', 'Reports / Standard Licenses', 'Active Deleted tabs use aria-pressed for selected state', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Verify Active aria-pressed=true. 2. Verify Deleted aria-pressed=false.', 'Tab selection state via aria-pressed attribute.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: A11y'),
    ('LIMAS-SUD-1511', 'Reports / Standard Licenses', 'Focusable elements in main have logical tab order', 'Authenticated SUPER_USER_ADMIN_USER on Reports page', '1. Check tabindex on all main interactive elements. 2. Verify each has tabindex=0.', 'Cards, tabs, Filters, Export Excel all have tabindex=0.', 'Accessibility', 'High', 'Reviewed', 'Generated', 'Not Run', 'RSL-A: A11y'),
]

start_row = 1513
for i, (tid, mod, title, precond, steps, expected, ttype, prio, plan_status, script_status, exec_status, notes) in enumerate(cases):
    row = start_row + i
    is_white = (i % 2 == 0)  # First new row (i=0) is white since row 1512 was green

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
# Update COUNTA range
ws_summary['B5'] = f"=COUNTA('Test Checklist'!A5:A{start_row + len(cases) - 1})"
ws_summary['B6'] = f"=COUNTIF('Test Checklist'!I5:I{start_row + len(cases) - 1},\"Reviewed\")"
ws_summary['B7'] = f"=COUNTIF('Test Checklist'!J5:J{start_row + len(cases) - 1},\"Generated\")"
ws_summary['B8'] = f"=COUNTIF('Test Checklist'!K5:K{start_row + len(cases) - 1},\"Passed\")"
ws_summary['B9'] = f"=COUNTIF('Test Checklist'!K5:K{start_row + len(cases) - 1},\"Failed\")"
ws_summary['B10'] = f"=SUMPRODUCT(('Test Checklist'!G5:G{start_row + len(cases) - 1}=\"Blocked\")+(ISNUMBER(SEARCH(\"Blocked\",'Test Checklist'!L5:L{start_row + len(cases) - 1}))))-SUMPRODUCT(('Test Checklist'!G5:G{start_row + len(cases) - 1}=\"Blocked\")*(ISNUMBER(SEARCH(\"Blocked\",'Test Checklist'!L5:L{start_row + len(cases) - 1}))))"

wb.save(SRC)
print(f'Appended {len(cases)} rows starting at row {start_row}. Last row now: {start_row + len(cases) - 1}')
wb.close()