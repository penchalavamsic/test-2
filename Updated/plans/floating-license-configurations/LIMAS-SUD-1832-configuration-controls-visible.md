---
test_id: "LIMAS-SUD-1832"
title: "To verify configuration controls (Search Filters Refresh Create) are visible"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration Page"
control: "Toolbar Controls"
action: "Controls Visibility"
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

Verify that Search, Filters, Refresh, and Create Configuration controls are visible on the configuration page after selecting a group.

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

3. Action: Verify that the Search control is visible.
   Expected Result: The Search input or button is present and visible.

4. Action: Verify that the Filters control is visible.
   Expected Result: The Filters button or control is present and visible.

5. Action: Verify that the Refresh control is visible.
   Expected Result: The Refresh button or control is present and visible.

6. Action: Verify that the Create Configuration control is visible.
   Expected Result: The Create Configuration button or control is present and visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All four configuration controls — Search, Filters, Refresh, and Create Configuration — are visible on the configuration page.

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