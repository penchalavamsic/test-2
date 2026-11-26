---
test_id: "LIMAS-SUD-1595"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Date filter Expiration in Deleted\" → \"Fill date, POST with filter, chip appears, counts update, Clear restores\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Date filter Expiration in Deleted"
action: "Expiration Date input present in Deleted filter panel. Fill a valid date. POST fires with expiration date filter. Chip appears. Counts update to filtered subset. Clear removes the date filter and restores unfiltered Deleted data."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the Expiration Date filter is present and functional in Deleted mode: filling a valid date triggers a POST to the filter API, a chip appears, the counts update, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Use `{runtimeCurrentDate}` as the date value. Monitor POST requests to the filter API endpoint.

# Steps and Expected Results

1. Action: In Deleted mode with filter panel expanded, assert the Expiration Date input is visible.
   Expected Result: Expiration Date date control present in the filter panel.

2. Action: Fill the Expiration Date input with `{runtimeCurrentDate}` (via the native date picker or by typing a valid date string).
   Expected Result: Date value entered into the input.

3. Action: Wait for a POST request to the filter API endpoint to fire with the expiration date in the body and complete with status 200.
   Expected Result: Filter POST fires; response received.

4. Action: Assert a filter chip appears showing the applied date.
   Expected Result: Chip visible with the expiration date value.

5. Action: Assert the toolbar record count updates to a reduced number reflecting the filtered subset.
   Expected Result: Count changes from "433 records" to a filtered count.

6. Action: Assert the loaded/total text updates accordingly.
   Expected Result: Loaded/total reflects filtered data.

7. Action: Click the global Clear button.
   Expected Result: Clear action triggers; date input clears; chip removed.

8. Action: Wait for the unfiltered Deleted data to reload and assert the toolbar shows "433 records" again.
   Expected Result: Unfiltered Deleted state restored.

# Network Verification

- POST request to filter API includes expiration date filter in the body.
- Clear triggers a fresh `GET /api/report/allstandarddeleted?page=0&size=500` or a POST with empty body.

# Expected Final Result

The Expiration Date filter works in Deleted mode: date input present, POST fires with date filter, chip appears, counts update, Clear restores unfiltered state.

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