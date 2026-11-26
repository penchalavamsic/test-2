---
test_id: "LIMAS-SUD-1592"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Core filter Email in Deleted\" → \"Type email, POST with filter, chip appears, counts update\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Core filter Email in Deleted"
action: "Filters button visible in Deleted toolbar. Click to expand filter panel. Email input accepts typed value. On submit, POST fires to filter API endpoint with email field. Filter chip appears. Toolbar count and loaded/total update to filtered subset. Results match filter."
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

Verify that the Email filter is functional in Deleted mode: the Filters button is visible, the filter panel opens with the Email input, typing an email and submitting triggers a POST to the filter API, a filter chip appears, and the record counts update to reflect the filtered dataset.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active with unfiltered data.

# Test Data

Use `{runtimeEmail}` as the filter value. Monitor POST requests to the filter API endpoint.

# Steps and Expected Results

1. Action: In Deleted mode, assert the Filters toggle button is visible in the toolbar.
   Expected Result: Filters button is present and enabled.

2. Action: Click the Filters button to expand the filter panel.
   Expected Result: Filter panel expands; Email input field is visible.

3. Action: Type `{runtimeEmail}` into the Email input field and submit (e.g., press Enter or click an Apply button if present).
   Expected Result: Email value submitted.

4. Action: Wait for a POST request to the filter API endpoint to fire and complete with status 200.
   Expected Result: Filter POST fires with the email value in the body.

5. Action: Assert a filter chip (tag) appears showing the applied email value.
   Expected Result: Chip visible with `{runtimeEmail}` text.

6. Action: Assert the toolbar record count updates to a reduced number reflecting the filtered subset.
   Expected Result: Count changes from "433 records" to a smaller filtered count.

7. Action: Assert the loaded/total text updates to reflect the filtered data.
   Expected Result: Loaded/total shows filtered count.

8. Action: Assert all visible table rows have the Email column matching `{runtimeEmail}`.
   Expected Result: Filtered results are correct; no rows have a different email.

# Network Verification

- POST request to filter API endpoint includes `email` field in the body.
- Response contains filtered `content` and updated `totalElements`.

# Expected Final Result

The Email filter works in Deleted mode: Filter panel opens, email input accepts value, POST fires with filter, chip appears, counts and table rows reflect the filtered dataset.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP