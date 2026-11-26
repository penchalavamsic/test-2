---
test_id: "LIMAS-SUD-1831"
title: "To verify selected group name matches runtime selection on configuration page"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration Page"
control: "Group Name Display"
action: "Name Synchronization"
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

Verify that the group name displayed on the configuration page matches the runtime-selected group name from the tree.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Capture the text label of a runtime leaf group name.
   Expected Result: A non-empty group name string is captured at runtime.

3. Action: Click the captured leaf group to navigate to the configuration page.
   Expected Result: The page transitions to the configuration view.

4. Action: Verify that the group name displayed on the configuration page (e.g., in the User Group summary or heading area) contains the captured group name text.
   Expected Result: The displayed name on the configuration page contains the runtime-captured group name.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The group name shown on the configuration page matches the name of the group selected from the tree.

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