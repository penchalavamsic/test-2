---
test_id: "LIMAS-SUD-1680"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filter Panel\" → \"State and Focus Stability\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filter Panel"
action: "State and Focus Stability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Verify the filter panel remains expanded after filter actions, filter values persist in controls, and focus stays near the changed control.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Apply an Email filter.
   Expected Result: Panel remains expanded, Email value persists in the input, chip visible.

2. Action: Apply Expiration Date.
   Expected Result: Panel stays expanded, date value visible.

3. Action: Collapse the panel, then re-expand.
   Expected Result: All filter values are preserved.

4. Action: Verify no focus jump to empty state occurs.
   Expected Result: Focus remains near the filter controls.

# Network Verification

No server requests triggered by panel state changes (client-side).

# Expected Final Result

Filter panel maintains state, preserves values across collapse/expand, and keeps focus stable.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending