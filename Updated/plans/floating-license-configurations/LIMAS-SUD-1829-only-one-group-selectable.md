---
test_id: "LIMAS-SUD-1829"
title: "To verify only one group can be selected at a time"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Selection"
control: "Tree Items"
action: "Single Selection"
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

Verify that selecting a group navigates away from the group tree to the configuration view, confirming exactly one selection at a time is active.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Discover a runtime leaf group and click it.
   Expected Result: The page transitions; the group tree is no longer the primary view.

3. Action: Verify that either a Back button or a User Group summary panel is visible, indicating that a single group selection has occurred and the configuration view is active.
   Expected Result: Either the Back button or the User Group summary element is present on the page.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Selecting a group transitions to the configuration view with a Back button or User Group summary visible, confirming single-selection behavior.

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