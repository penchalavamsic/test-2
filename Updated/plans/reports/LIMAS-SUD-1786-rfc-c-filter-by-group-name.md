---
test_id: "LIMAS-SUD-1786"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter by Group Name\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter by Group Name"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that typing a value into the "Group Name" filter textbox filters the loaded deleted records client-side, updating the visible row count and loaded/total display without firing any API requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.
- No other filter has an active value.

# Test Data

The filter value is chosen at runtime from a Group Name value present in the loaded dataset.

# Steps and Expected Results

1. Action: Observe the initial fully loaded state: record count and loaded/total display.
   Expected Result: Full dataset counts are displayed.

2. Action: Type a Group Name value present in the dataset into the "Group Name" textbox.
   Expected Result: The table updates: visible row count decreases to match the filter. The loaded/total display updates to reflect the filtered subset.

3. Action: Verify no API request fires during filter input.
   Expected Result: No new network requests are observed. Filtering is client-side.

4. Action: Clear the filter after verification.
   Expected Result: The full dataset is restored.

# Network Verification

- Only the initial GET requests to alldeleted are observed.
- No additional requests fire during filter input.

# Expected Final Result

Typing into the "Group Name" textbox filters the table client-side, updating counts without additional API requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode Group Name values. Read filter values from the loaded dataset at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending