---
test_id: "LIMAS-SUD-1863"
title: "To verify Include Subgroups checkbox has role checkbox and initial boolean state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Include Subgroups"
control: "Include Subgroups Checkbox"
action: "Role and Initial State"
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

Verify the Include Subgroups checkbox has role="checkbox" and its checked and enabled states are boolean values. The checkbox may be disabled if the selected group has no subgroups.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or subgroup data.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed.

2. Action: Locate the Include Subgroups checkbox element and verify its ARIA role attribute.
   Expected Result: The checkbox has role="checkbox".

3. Action: Verify the checked property of the checkbox is a boolean value (true or false).
   Expected Result: The checked state is a boolean (either true or false).

4. Action: Verify the enabled/disabled property of the checkbox is a boolean value (true or false).
   Expected Result: The enabled/disabled state is a boolean (either true or false).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Include Subgroups checkbox has role="checkbox" and its checked and enabled states are well-defined boolean values.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, configuration names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending