---
test_id: "LIMAS-SUD-1695"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Date Filter — Apply, Chip, Client-Side, Clear\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Date Filter — Apply, Chip, Client-Side, Clear"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Verify that a date filter (Expiration Date) can be applied in Deleted mode: date value is accepted, "Exp: {date}" chip appears, filtering is client-side, counts and table synchronize, and clearing restores the unfiltered Deleted state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, Filters expanded.

# Test Data

Use placeholders: {runtimeDate}.

# Steps and Expected Results

1. Action: Set an Expiration Date value and move focus away (Tab or blur).
   Expected Result: The date input shows {runtimeDate}. An "Exp: {runtimeDate}" chip appears.

2. Action: Monitor network requests.
   Expected Result: No server API request is triggered by the date filter — filtering is client-side.

3. Action: Verify toolbar counts and table rows reflect the date filter.
   Expected Result: Counts and visible rows are consistent with the client-side date filter.

4. Action: Clear the date filter (via chip remove button or clearing the input).
   Expected Result: The date chip disappears. Counts and table return to the unfiltered Deleted state.

# Network Verification

No server request triggered by setting or clearing the date filter.

# Expected Final Result

Date filters work in Deleted mode as client-side operations: value displayed, chip appears, counts/table synchronize, clearing restores full dataset.

# Classification

- Read-only
- Positive
- Client-side

# Restrictions

- Do not hardcode date values.
- Use only one date filter (Expiration Date).

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending