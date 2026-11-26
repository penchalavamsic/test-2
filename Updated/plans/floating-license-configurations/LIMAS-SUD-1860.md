---
test_id: "LIMAS-SUD-1860"
title: "To verify Refresh preserves selected group name"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Refresh"
control: "Refresh Button"
action: "Group Preservation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts"
---

# Purpose

Verify after clicking Refresh, the selected group name displayed on the page remains unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view displays the selected group name.

2. Action: Capture the currently displayed group name text at runtime.
   Expected Result: A non-empty group name string is captured.

3. Action: Click the Refresh button.
   Expected Result: The page refreshes.

4. Action: Capture the group name text again and compare with the value from step 2.
   Expected Result: The group name remains unchanged (exact match).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The selected group name is preserved and unchanged after clicking Refresh.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, configuration names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending