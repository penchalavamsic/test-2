---
test_id: "LIMAS-SUD-1596"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Date filter Maintenance in Deleted\" → \"Fill date, POST with filter, chip appears, counts update, Clear restores\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Date filter Maintenance in Deleted"
action: "Maintenance Date input present in Deleted filter panel. Fill a valid date. POST fires with maintenance date filter. Chip appears. Counts update. Clear restores unfiltered state. Note: table cells in Deleted mode do not display Maintenance date (only Exp + Deleted), but the filter is still functional."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Maintenance Date filter is present and functional in Deleted mode, even though the Deleted table cells do not display the Maintenance date. The filter should still filter results correctly, and Clear should restore the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Use `{runtimeCurrentDate}` as the date value. Monitor POST requests to the filter API endpoint.

# Steps and Expected Results

1. Action: In Deleted mode with filter panel expanded, assert the Maintenance Date input is visible.
   Expected Result: Maintenance Date date control present in the filter panel.

2. Action: Fill the Maintenance Date input with `{runtimeCurrentDate}`.
   Expected Result: Date value entered.

3. Action: Wait for a POST request to the filter API to fire with the maintenance date in the body and complete with status 200.
   Expected Result: Filter POST fires with maintenance date filter; response received.

4. Action: Assert a filter chip appears showing the applied maintenance date.
   Expected Result: Chip visible.

5. Action: Assert the toolbar record count updates to a reduced number.
   Expected Result: Count decreases from "433 records".

6. Action: Assert the API response items match the maintenance date filter (verify the items carry a `maintenanceDate` field in the JSON even though the table cell does not display it).
   Expected Result: Backend filtering works correctly; API response items have matching `maintenanceDate`.

7. Action: Click Clear and assert unfiltered Deleted state is restored ("433 records").
   Expected Result: Clear restores unfiltered state.

# Network Verification

- POST request to filter API includes maintenance date filter in the body.
- Response `content` items carry `maintenanceDate` field (present in API even though not rendered in Deleted table cells).

# Expected Final Result

The Maintenance Date filter is functional in Deleted mode: the backend applies the filter correctly even though the Deleted table UI does not render the Maintenance date column value.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP