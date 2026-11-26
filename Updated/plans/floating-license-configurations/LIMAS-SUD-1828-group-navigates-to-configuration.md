---
test_id: "LIMAS-SUD-1828"
title: "To verify selecting a runtime group navigates to configuration page"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Selection"
control: "Tree Item"
action: "Group Selection Navigation"
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

Verify that clicking a discovered leaf group navigates to the configuration page, showing the Floating License Configurations heading.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Discover a runtime leaf group — a tree item that has no chevron/expand indicator (representing a terminal node).
   Expected Result: A leaf tree item is identified at runtime.

3. Action: Click the discovered leaf group.
   Expected Result: The page transitions away from the group-selection view.

4. Action: Verify that the Floating License Configurations heading is still visible after the transition.
   Expected Result: The heading is displayed, confirming navigation to the configuration page succeeded.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clicking a runtime leaf group navigates to the configuration page while the Floating License Configurations heading remains visible, confirming successful navigation.

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