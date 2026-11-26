---
test_id: "LIMAS-SUD-1675"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Clear\" → \"Clear All Button\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Clear"
action: "Clear All Button"
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

Verify the "Clear all" button in the chip area removes all chips and resets all filter controls in one action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, multiple filters applied.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Apply Email, Product Profile, Role, and Expiration Date filters.
   Expected Result: At least 4 chips visible: Email, Profiles, Roles, Exp.

2. Action: Click "Clear all" button in the chip area.
   Expected Result: All chips disappear. All filter inputs cleared. Profile Role disabled. "Clear all" button disappears.

3. Action: Verify the state matches the initial un-filtered state.
   Expected Result: No chips, all inputs empty, Profile Role disabled.

# Network Verification

No server request triggered.

# Expected Final Result

Clear all removes all filters atomically and restores the initial empty filter state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending