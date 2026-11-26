---
test_id: "LIMAS-SUD-1598"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Clear in Deleted\" → \"Global Clear button resets all filters in Deleted mode\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Clear in Deleted"
action: "Apply core and date filters in Deleted mode. Click global Clear button. All filter chips removed. All filter inputs reset to empty/default. Toolbar count returns to '433 records'. Table shows unfiltered Deleted data. Filter panel remains expanded."
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

Verify that the global Clear button correctly resets all filters when in Deleted mode: removes all chips, clears all filter inputs, reloads unfiltered Deleted data, while keeping the filter panel expanded.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Apply a combination of Email filter and Expiration Date filter as setup. Monitor POST and GET requests.

# Steps and Expected Results

1. Action: Apply an Email filter with `{runtimeEmail}` in Deleted mode.
   Expected Result: Email chip visible; count reduced.

2. Action: Also fill Expiration Date with `{runtimeCurrentDate}`.
   Expected Result: Date chip visible; count further reduced.

3. Action: Assert multiple filter chips are visible.
   Expected Result: Both chips present.

4. Action: Click the global Clear button.
   Expected Result: Clear action triggered.

5. Action: Assert all filter chips are removed from the UI.
   Expected Result: No filter chips visible.

6. Action: Assert the Email input field is empty and all date inputs are cleared.
   Expected Result: All filter controls reset to empty/default.

7. Action: Wait for the unfiltered Deleted data request to complete.
   Expected Result: `GET /api/report/allstandarddeleted?page=0&size=500` fires (or equivalent unfiltered POST).

8. Action: Assert the toolbar once again shows "433 records".
   Expected Result: Count restored to unfiltered Deleted total.

9. Action: Assert the filter panel remains expanded (controls still visible).
   Expected Result: Panel not collapsed by Clear.

# Network Verification

- After Clear, a fresh unfiltered request loads the full Deleted dataset.
- Request method matches the Deleted loading pattern (GET with page=0, size=500).

# Expected Final Result

Global Clear in Deleted mode resets all applied filters, clears chips and inputs, reloads unfiltered Deleted data with "433 records", and keeps the filter panel expanded.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email or dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP