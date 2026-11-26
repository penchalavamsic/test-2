---
test_id: "LIMAS-SUD-1839"
title: "To verify parent is not incorrectly shown as selected when subgroup is selected"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Parent and Subgroup Selection"
control: "Group Name Display"
action: "Parent vs Subgroup"
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

Verify that when a subgroup is selected, the parent group name is not displayed as the selected group on the configuration page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree with expandable parent groups.

# Test Data

Use environment variables and the authenticated fixture. No static group names, IDs, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Discover a runtime parent group that has an expand control, then expand it.
   Expected Result: Child subgroups become visible under the expanded parent.

3. Action: Click a child subgroup within the expanded parent.
   Expected Result: The page navigates to the configuration view.

4. Action: Verify that the displayed group name on the configuration page does NOT contain the parent group name.
   Expected Result: The group name shown on the configuration page does not contain the parent name, confirming the parent is not incorrectly shown as the selected group.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The configuration page displays the subgroup name only, not the parent group name, confirming the correct subgroup was selected.

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