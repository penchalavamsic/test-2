---
test_id: "LIMAS-SUD-1847"
title: "To verify Include Subgroups checkbox has accessible name"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Configuration List Shell"
control: "Include Subgroups Checkbox"
action: "Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts"
---

# Purpose

Verify the Include Subgroups checkbox is visible and has the accessible name "Include subgroups".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed.

2. Action: Locate the Include Subgroups checkbox.
   Expected Result: The checkbox element is visible.

3. Action: Verify the checkbox has an accessible name equal to "Include subgroups".
   Expected Result: The accessible name is "Include subgroups".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Include Subgroups checkbox is visible and has accessible name "Include subgroups".

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending