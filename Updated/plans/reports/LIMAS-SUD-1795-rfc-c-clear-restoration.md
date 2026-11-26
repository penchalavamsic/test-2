---
test_id: "LIMAS-SUD-1795"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Clear Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Clear Restoration"
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

Verify that after applying multiple different filter changes, clicking Clear empties all three filter fields, restores the full dataset with counts matching the API, and leaves the UI ready for the next test operation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Apply a series of filter changes across all three filter fields.
   Expected Result: Each filter change updates the visible rows and counts correctly.

2. Action: Click the Clear button.
   Expected Result: All three filter fields ("Deleted By", "Created By", "Group Name") become empty. A brief loading state may be observed.

3. Action: Verify the full dataset is restored.
   Expected Result: The record count returns to "{runtimeTotalElements} records". The loaded/total display shows "{runtimeLoaded} loaded · {runtimeTotalElements} total", matching the initial fully loaded state.

4. Action: Verify the counts match the API.
   Expected Result: The restored loaded and total values match those read from the alldeleted API response at runtime.

5. Action: Verify the UI is ready for the next operation.
   Expected Result: All filter fields are empty, the table is fully populated, mode controls are interactive, and the Export button is enabled. The UI is in the same state as immediately after initial Deleted mode load.

# Network Verification

- If Clear triggers a reload: GET {runtimeBaseUrl}/api/report/alldeleted?page=0&size={runtimeSize} → 200, plus page=1.
- If Clear is client-side: no additional requests. Record runtime behavior.

# Expected Final Result

After multiple filter changes, Clear empties all fields, restores the full dataset with API-matching counts, and leaves the UI in the initial fully loaded state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values or count numbers. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending