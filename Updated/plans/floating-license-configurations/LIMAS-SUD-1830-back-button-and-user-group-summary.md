---
test_id: "LIMAS-SUD-1830"
title: "To verify configuration page shows Back button and User Group summary"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration Page"
control: "Page Shell"
action: "Configuration Shell Visibility"
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

Verify that after selecting a group, the Back button and User Group summary panel are visible on the configuration page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Discover a runtime leaf group and click it to navigate to the configuration page.
   Expected Result: The page transitions to the configuration view.

3. Action: Verify that the Back button is visible on the configuration page.
   Expected Result: The Back button element is present and visible.

4. Action: Verify that the User Group summary panel is visible on the configuration page.
   Expected Result: The User Group summary element is present and visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The configuration page displays both the Back button and the User Group summary panel after group selection.

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