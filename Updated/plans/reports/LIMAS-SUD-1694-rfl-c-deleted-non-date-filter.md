---
test_id: "LIMAS-SUD-1694"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Non-Date Filter — Apply, Chip, Client-Side, Clear\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Non-Date Filter — Apply, Chip, Client-Side, Clear"
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

Verify that a representative non-date filter (Product Profile) can be applied in Deleted mode: input visible, chip visible, filtering is client-side (no server request), counts and table synchronize with the filter, and clearing restores the unfiltered Deleted state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, Filters expanded.

# Test Data

Use placeholders: {runtimeProfile}.

# Steps and Expected Results

1. Action: Select a Product Profile in the combobox.
   Expected Result: The Product Profile input is visible and accepts selection. A "Profiles: {count}" chip appears.

2. Action: Monitor network requests.
   Expected Result: No server API request is triggered by the filter application — filtering is client-side.

3. Action: Verify toolbar counts and table rows update to reflect the filtered data.
   Expected Result: Counts and visible rows are consistent with the client-side filter.

4. Action: Clear the Product Profile filter (via chip remove button).
   Expected Result: The chip disappears. Counts and table return to the unfiltered Deleted state.

# Network Verification

No server request triggered by filter application or removal. Only the initial Deleted GET request was observed.

# Expected Final Result

Non-date filters work in Deleted mode as client-side operations: chip appears, no server request, counts/table synchronize, clearing restores the full Deleted dataset.

# Classification

- Read-only
- Positive
- Client-side

# Restrictions

- Do not hardcode profile names.
- Use only one representative non-date filter.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending