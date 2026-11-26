---
test_id: "LIMAS-SUD-1835"
title: "To verify tree state is restored after returning via Back"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Back and Change Group"
control: "Back Button"
action: "Tree State Restoration"
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

Verify that after selecting a group and returning via Back, the group tree is rendered with items visible (not empty or broken).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names, IDs, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed.

2. Action: Record the baseline count of visible tree items in the group tree.
   Expected Result: A baseline count of visible tree items is captured (must be greater than zero in a populated environment).

3. Action: Discover a runtime leaf group and click it to navigate to the configuration page.
   Expected Result: The page transitions to the configuration view.

4. Action: Click the Back button.
   Expected Result: The page returns to the group-selection view.

5. Action: Count the visible tree items in the group tree.
   Expected Result: The count of visible tree items is greater than zero, confirming the tree is rendered with items (not empty or broken).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

After returning via Back, the group tree is rendered with items visible. The tree is not empty or broken.

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