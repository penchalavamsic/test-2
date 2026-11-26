---
test_id: "LIMAS-SUD-1784"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter by Deleted By\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter by Deleted By"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that typing a value into the "Deleted By" filter textbox filters the loaded deleted records client-side, updating the visible row count and loaded/total display without firing any API requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.

# Test Data

The filter value is chosen at runtime from a Deleted By value present in the loaded dataset.

# Steps and Expected Results

1. Action: Observe the initial fully loaded state: record count, loaded, and total display values.
   Expected Result: The initial counts reflect the full dataset: {runtimeTotalElements} records, {runtimeLoaded} loaded · {runtimeTotalElements} total.

2. Action: Type a Deleted By value present in the dataset into the "Deleted By" textbox.
   Expected Result: The table updates: visible row count decreases to match the filter. The loaded/total display updates to reflect the filtered subset.

3. Action: Verify no API request fires during filter input.
   Expected Result: No new network requests are observed. Only the initial page-0 and page-1 GET requests were sent.

4. Action: Verify the filtering is client-side.
   Expected Result: The filter operates on the preloaded data. The filtered row count is less than or equal to the full dataset row count.

5. Action: Clear the filter after verification.
   Expected Result: The full dataset is restored.

# Network Verification

- Only the initial GET requests to alldeleted (page=0, page=1) are observed.
- No additional requests fire during filter input.
- Filtering is client-side.

# Expected Final Result

Typing into the "Deleted By" textbox filters the table client-side, updates the row count and loaded/total display, and fires no additional API requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode Deleted By values. Read filter values from the loaded dataset at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending