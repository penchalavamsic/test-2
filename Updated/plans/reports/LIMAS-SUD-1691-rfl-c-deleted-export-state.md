---
test_id: "LIMAS-SUD-1691"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Export Button State\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Export Button State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the Export Excel button in Deleted mode is enabled when records are present, uses aria-disabled state correctly, and is not accidentally activated during inspection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, and {runtimeDeletedTotal} > 0.

# Test Data

Conditional on {runtimeDeletedTotal} > 0. If zero, document the skip.

# Steps and Expected Results

1. Action: If {runtimeDeletedTotal} = 0, verify Export is disabled and skip remaining steps.
   Expected Result: Export button has aria-disabled="true" or equivalent disabled state.

2. Action: If {runtimeDeletedTotal} > 0, inspect the Export Excel button.
   Expected Result: Export button is visible, enabled (not disabled), and has an accessible name containing "Export".

3. Action: Read the aria-disabled attribute.
   Expected Result: aria-disabled is absent or "false".

4. Action: Verify clicking the button is not performed accidentally — only inspect state.
   Expected Result: No export download is triggered during this inspection-only test.

# Network Verification

No export request should be triggered during inspection-only steps.

# Expected Final Result

Export button is enabled when Deleted records exist, disabled state is communicated via aria-disabled, and no accidental export activation occurs.

# Classification

- Read-only
- Positive

# Restrictions

- Do not click the Export button.
- Do not hardcode the button label or aria-disabled value.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending