---
test_id: "LIMAS-SUD-1593"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Core filter Hardware IDs in Deleted\" → \"Combobox select, POST with filter, counts update\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Core filter Hardware IDs in Deleted"
action: "Hardware IDs combobox is present in Deleted filter panel. Select one or more hardware IDs. POST fires to filter API with hardware ID values. Chip appears. Counts update. Results match selected hardware IDs."
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

Verify that the Hardware IDs filter is functional in Deleted mode: the combobox control is present, selecting one or more hardware IDs triggers a POST to the filter API, a chip appears, and the results and counts update accordingly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Select a hardware ID from the combobox dropdown options. Monitor POST requests to the filter API endpoint.

# Steps and Expected Results

1. Action: In Deleted mode with filter panel expanded, locate the Hardware IDs combobox.
   Expected Result: Hardware IDs control is visible and interactive.

2. Action: Open the combobox dropdown and select a specific hardware ID from the available options.
   Expected Result: Hardware ID selected; the selection appears in the combobox.

3. Action: Wait for a POST request to the filter API endpoint to fire with the selected hardware ID in the body and complete with status 200.
   Expected Result: Filter POST fires with hardware ID value.

4. Action: Assert a filter chip appears showing the selected hardware ID.
   Expected Result: Chip visible with the hardware ID text.

5. Action: Assert the toolbar record count updates to a reduced number.
   Expected Result: Count decreases from the unfiltered "433 records".

6. Action: Assert all visible table rows have the Hardware ID column matching the selected hardware ID.
   Expected Result: All rows show the filtered hardware ID.

7. Action: Select a second hardware ID from the combobox (multi-select).
   Expected Result: Both hardware IDs selected; new POST fires.

8. Action: Assert the results now include rows matching either selected hardware ID.
   Expected Result: Multi-select filtering works correctly.

# Network Verification

- POST request to filter API includes `hardwareIds` (array) in the body.
- Response `content` items all match the selected hardware ID(s).

# Expected Final Result

The Hardware IDs filter works in Deleted mode: combobox is present, single and multi-select trigger correct API calls, chips appear, and table rows match the filter.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode hardware IDs.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP