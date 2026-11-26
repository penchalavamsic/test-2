---
test_id: "LIMAS-SUD-1594"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Core filter Groups in Deleted\" → \"Combobox select, POST with filter, counts update\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Core filter Groups in Deleted"
action: "Groups combobox present in Deleted filter panel. Select a group. POST fires with group value. Chip appears. Counts update. Results match selected group. Profiles and Roles comboboxes also present and functional."
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

Verify that the Groups, Profiles, and Roles combobox filters are all present and functional in Deleted mode: selecting a value triggers a POST to the filter API, a chip appears, and the results and counts update.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active; filter panel is expanded.

# Test Data

Select a group from the Groups combobox. Monitor POST requests to the filter API endpoint.

# Steps and Expected Results

1. Action: In Deleted mode with filter panel expanded, assert the Groups combobox is visible and interactive.
   Expected Result: Groups control present.

2. Action: Assert Profiles and Roles comboboxes are also visible in the filter panel.
   Expected Result: All combobox-based core filters present in Deleted mode.

3. Action: Open the Groups combobox dropdown and select a specific group.
   Expected Result: Group selected.

4. Action: Wait for a POST request to the filter API endpoint to fire with the selected group in the body and complete with status 200.
   Expected Result: Filter POST fires with group value.

5. Action: Assert a filter chip appears showing the selected group name.
   Expected Result: Chip visible with group name.

6. Action: Assert the toolbar record count updates to reflect the filtered subset.
   Expected Result: Count decreases from unfiltered "433 records".

7. Action: Assert all visible table rows have the User Group column matching the selected group.
   Expected Result: Results filtered correctly.

8. Action: Click Clear to reset, then repeat for a Profile selection and verify the same behavior.
   Expected Result: Profile filter also works in Deleted mode.

# Network Verification

- POST request to filter API includes `userGroup` (string) in the body.
- POST request for Profile includes `profile` in the body.
- Response `content` items match the filter selection.

# Expected Final Result

The Groups, Profiles, and Roles combobox filters are all present and functional in Deleted mode: selection triggers API call, chip appears, counts and table update correctly.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group, profile, or role names.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP