---
test_id: "LIMAS-SUD-1834"
title: "To verify Change Group button returns to group-selection view"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Back and Change Group"
control: "Change Group Button"
action: "Return Navigation"
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

Verify that clicking the Change Group button returns to the group-selection view with the "Select a User Group" heading visible.

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

3. Action: Click the Change Group button.
   Expected Result: The page navigates away from the configuration view.

4. Action: Verify that the "Select a User Group" heading is visible again.
   Expected Result: The group-selection heading is displayed, confirming return to the group-selection view.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Change Group button returns the user to the group-selection view with the "Select a User Group" heading visible.

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