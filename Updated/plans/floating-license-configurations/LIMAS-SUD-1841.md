---
test_id: "LIMAS-SUD-1841"
title: "To verify selected group name is displayed in User Group summary"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration List Shell"
control: "User Group Summary"
action: "Name Display"
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

Verify the selected runtime group name appears in the User Group summary panel after navigating to the configuration list.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Capture the text label of a runtime leaf group and click it to navigate to the configuration list.
   Expected Result: The page transitions to the configuration list view.

3. Action: Locate the User Group summary area and verify it displays the captured group name.
   Expected Result: The group name shown in the User Group summary matches the runtime-captured group name.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The User Group summary panel shows the name of the group selected from the tree.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending