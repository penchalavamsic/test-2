---
test_id: "LIMAS-SUD-1597"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Date filter combined in Deleted\" → \"Multiple dates filled, POST includes all, chips appear, counts update, Clear restores\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Date filter combined in Deleted"
action: "Fill multiple date fields (Expiration + Maintenance + Created + Modified) simultaneously in Deleted mode. POST includes all date filters in body. Multiple chips appear. Results reflect combined filter. Clear removes all and restores unfiltered Deleted state."
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

Verify that multiple date filters can be applied simultaneously in Deleted mode: all filled dates are sent in a single POST body, multiple chips appear, results are correctly filtered on all criteria, and Clear resets everything.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Use `{runtimeCurrentDate}` for all four date inputs. Monitor POST requests to the filter API endpoint and inspect the request body.

# Steps and Expected Results

1. Action: In Deleted mode with filter panel expanded, fill Expiration Date, Maintenance Date, Created Date, and Modified Date all with `{runtimeCurrentDate}`.
   Expected Result: All four date inputs populated.

2. Action: Wait for a POST request to fire. Capture and parse the request body.
   Expected Result: POST fires with a JSON body.

3. Action: Assert the POST body contains all four date filter fields: expiration date, maintenance date, created date, and modified date.
   Expected Result: All date values present in the request body.

4. Action: Assert multiple filter chips appear — one for each date filter applied.
   Expected Result: Four chips visible (or as many as the UI renders for date filters).

5. Action: Assert the toolbar record count updates to reflect the combined date filter.
   Expected Result: Count reduces accordingly.

6. Action: Click the global Clear button.
   Expected Result: All chips removed; all date inputs cleared.

7. Action: Wait for unfiltered Deleted data to reload and assert toolbar shows "433 records".
   Expected Result: Unfiltered state restored; all date filters cleared.

# Network Verification

- POST request body includes all filled date fields as separate keys.
- Clear triggers a request that does not include any date filter fields.

# Expected Final Result

Multiple date filters can be applied simultaneously in Deleted mode: the POST body carries all date values, chips appear for each, combined filtering works, and Clear restores the unfiltered state.

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