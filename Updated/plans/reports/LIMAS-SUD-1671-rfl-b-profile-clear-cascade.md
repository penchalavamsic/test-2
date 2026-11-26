---
test_id: "LIMAS-SUD-1671"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Profile and Role\" → \"Clearing Profile Clears Role\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Profile and Role"
action: "Clearing Profile Clears Role"
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

Verify that removing the Product Profile also removes the Profile Role selection and disables the role control.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, both Profile and Role selected.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Select a Product Profile and a Profile Role.
   Expected Result: Both "Profiles: 1" and "Roles: 1" chips visible.

2. Action: Remove the Product Profile via its chip remove button.
   Expected Result: Both "Profiles:" and "Roles:" chips disappear. Profile Role becomes disabled with "Select a profile first".

3. Action: Verify the profile pill and role pill are both cleared.
   Expected Result: Searchboxes are empty; no stale selection remains.

# Network Verification

No filter API triggered.

# Expected Final Result

Clearing the Product Profile cascades to clear the Profile Role and re-disable it.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode profile or role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending