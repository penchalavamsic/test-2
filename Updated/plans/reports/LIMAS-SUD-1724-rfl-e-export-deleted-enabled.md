---
test_id: "LIMAS-SUD-1724"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"Export Enabled in Deleted Mode\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "Export Enabled in Deleted Mode"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

Verify that switching to Deleted mode enables the Export Excel button with correct interactive semantics.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected. Active mode is initially active.
- Deleted mode has data (totalElements > 0).

# Test Data

All values read dynamically from the DOM after switching to Deleted mode.

# Steps and Expected Results

1. Action: Switch from Active to Deleted mode by clicking the Deleted button.
   Expected Result: Deleted button becomes pressed (aria-pressed="true"), Deleted data loads.

2. Action: Wait for the Deleted API request to settle.
   Expected Result: Deleted records are displayed, totalElements > 0.

3. Action: Inspect the Export Excel button state.
   Expected Result: The Export button is not disabled. No `disabled` attribute is present. `aria-disabled` is absent or `"false"`.

4. Action: Read the computed cursor style on the Export button.
   Expected Result: Cursor is `pointer`, indicating the button is interactive.

5. Action: Read the accessible name of the Export button.
   Expected Result: Accessible name is "Export Excel".

6. Action: Read the tabindex of the Export button.
   Expected Result: Tabindex is `0`, making it reachable via keyboard Tab.

# Network Verification

The Deleted API GET request returns with totalElements > 0. No other unexpected requests.

# Expected Final Result

In Deleted mode, the Export Excel button is enabled (`not disabled`, `cursor=pointer`), has accessible name "Export Excel", and `tabindex=0`.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode element attributes.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending