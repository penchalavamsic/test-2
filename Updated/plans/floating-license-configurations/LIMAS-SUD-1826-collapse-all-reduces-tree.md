---
test_id: "LIMAS-SUD-1826"
title: "To verify Collapse All collapses all expanded groups"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Expand/Collapse"
control: "Collapse All Button"
action: "Collapse All"
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

Verify that Collapse All reduces visible tree items back after an Expand All, confirming collapse behavior works correctly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Click the Expand All button to expand all parent groups.
   Expected Result: Expand All completes without errors and the tree shows more items.

3. Action: Record the expanded count of visible tree items.
   Expected Result: Expanded count is captured at runtime.

4. Action: Click the Collapse All button.
   Expected Result: The Collapse All action completes without errors.

5. Action: Count the visible tree items after Collapse All.
   Expected Result: The visible item count is less than the expanded count recorded in step 3, confirming collapse reduced visible items.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Collapse All reduces the number of visible tree items compared to the expanded state, confirming collapse behavior is functional.

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