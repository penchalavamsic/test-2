---
test_id: "LIMAS-SUD-1822"
title: "To verify exact group name search shows that group"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search Groups"
control: "Search Input"
action: "Exact Match"
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

Verify that searching with a runtime group's exact name shows that group in the filtered results.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Capture the text label of the first visible group name dynamically at runtime.
   Expected Result: A non-empty group name string is captured.

3. Action: Type the captured exact group name into the Group Search input.
   Expected Result: The search input contains the exact group name.

4. Action: Verify that at least one visible filtered tree item's text contains the captured group name.
   Expected Result: At least one filtered item is visible and its label contains the captured group name.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Searching with a runtime-discovered exact group name yields filtered results that include that group.

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