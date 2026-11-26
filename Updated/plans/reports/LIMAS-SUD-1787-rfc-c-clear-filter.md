---
test_id: "LIMAS-SUD-1787"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Clear Filter\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Clear Filter"
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

Verify that after filling one or more filter fields in Deleted mode, clicking the Clear button empties all filter fields, restores the full dataset, and leaves the UI in a consistent state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Fill one filter field (e.g., "Deleted By") with a value from the dataset.
   Expected Result: The table filters to show only matching rows. The filtered record count is less than the full count.

2. Action: Click the Clear button.
   Expected Result: All 3 filter fields become empty. A brief loading delay may be observed.

3. Action: Verify the dataset is fully restored.
   Expected Result: The record count returns to {runtimeTotalElements}. All {runtimeLoaded} rows are loaded. The counts match the initial full-load state.

4. Action: Verify UI consistency after clear.
   Expected Result: The table, counts, and filter fields are all in the same state as immediately after initial Deleted mode load.

# Network Verification

- If a reload is triggered by Clear, a GET to alldeleted may fire.
- If Clear operates client-side, no additional API requests fire.
- Record the behavior observed at runtime.

# Expected Final Result

Clicking Clear empties all filter fields and restores the full dataset to the initial loaded state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values or record counts. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending