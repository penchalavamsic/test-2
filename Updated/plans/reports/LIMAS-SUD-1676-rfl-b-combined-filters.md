---
test_id: "LIMAS-SUD-1676"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Combined\" → \"Multiple Filters Simultaneously\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Combined"
action: "Multiple Filters Simultaneously"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that multiple filters can be combined simultaneously — Email, Product Profile, Role, and Expiration Date — all chips visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Apply Email filter.
   Expected Result: "Email: {runtimeEmail}" chip visible.

2. Action: Apply Product Profile filter.
   Expected Result: "Profiles: 1" chip visible alongside Email chip. Profile Role enabled.

3. Action: Apply Profile Role filter.
   Expected Result: "Roles: 1" chip visible alongside other chips.

4. Action: Apply Expiration Date filter.
   Expected Result: "Exp: {runtimeDate}" chip visible alongside all other chips.

5. Action: Verify no server request triggered at any step.
   Expected Result: All filtering is client-side; count shows 0 results (empty dataset).

# Network Verification

No server requests triggered by any combined filter action.

# Expected Final Result

All four filter types coexist with individual chips, all client-side.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending