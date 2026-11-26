---
test_id: "LIMAS-SUD-1824"
title: "To verify no-match state when search returns no results"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search Groups"
control: "Search Input"
action: "No-Match State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts"
---

# Purpose

Verify that searching with a non-existent group name shows zero tree items, confirming the no-match state is handled correctly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. The search term "zzz_no_such_group_xyz" is a deliberately non-matching string.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Type "zzz_no_such_group_xyz" into the Group Search input.
   Expected Result: The search input contains the non-matching term.

3. Action: Count the visible tree items.
   Expected Result: The count of visible tree items is 0.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Searching for a non-existent group name results in zero visible tree items, confirming the no-match state is handled gracefully.

# Classification

- Floating License Configurations FLC-A
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending