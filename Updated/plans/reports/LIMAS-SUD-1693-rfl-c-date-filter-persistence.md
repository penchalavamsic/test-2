---
test_id: "LIMAS-SUD-1693"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Date Filter Persistence Across Mode Switches\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Date Filter Persistence Across Mode Switches"
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

Determine the actual contract for date filter persistence across mode switches. Apply one date filter (Expiration Date) in Active mode, switch to Deleted, switch back to Active, and observe whether the date value persists or resets.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use placeholders: {runtimeDate}.

# Steps and Expected Results

1. Action: In Active mode, set an Expiration Date filter and record the selected date ({runtimeDate}).
   Expected Result: "Exp: {runtimeDate}" chip appears.

2. Action: Switch to Deleted mode.
   Expected Result: Document the actual behavior — whether the Expiration Date filter persists in Deleted mode or resets.

3. Action: Switch back to Active mode.
   Expected Result: Document the actual behavior — whether the Expiration Date filter is still applied or has reset.

4. Action: Record the observed contract for date filters across mode switches.
   Expected Result: The observed behavior is the authoritative contract.

# Network Verification

Track API requests triggered by mode switches. No server-side filter request is expected.

# Expected Final Result

The plan records the actual date filter persistence contract across Active ↔ Deleted mode switches.

# Classification

- Read-only
- Positive
- Session

# Restrictions

- Do not assume persistence or reset — observe and document.
- Use only one date filter (Expiration Date).

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending