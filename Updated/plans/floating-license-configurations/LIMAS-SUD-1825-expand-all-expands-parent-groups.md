---
test_id: "LIMAS-SUD-1825"
title: "To verify Expand All expands all parent groups"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Expand/Collapse"
control: "Expand All Button"
action: "Expand All"
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

Verify that clicking Expand All expands all parent groups, increasing the number of visible tree items compared to the baseline.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed and the tree contains visible items.

2. Action: Record the baseline count of visible tree items before expanding.
   Expected Result: Baseline count is a positive integer captured at runtime.

3. Action: Click the Expand All button.
   Expected Result: The Expand All action completes without errors.

4. Action: Count the visible tree items after Expand All.
   Expected Result: The visible item count is greater than or equal to the baseline count.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Expand All increases or maintains the number of visible tree items, confirming that parent groups are expanded to reveal children.

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