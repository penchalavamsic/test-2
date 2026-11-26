---
test_id: "LIMAS-SUD-1812"
title: "To verify Group Search input visibility and initial empty state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group-Selection Panel"
control: "Search Input"
action: "Initial State"
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

Verify the Group Search input is visible, enabled, and initially empty.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Locate the Group Search input field.
   Expected Result: The search input is visible and enabled.

3. Action: Read the current value of the search input.
   Expected Result: The input value is empty (an empty string).

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Group Search input is visible, enabled, and has no pre-filled text on initial load.

# Classification

- Read-only
- Positive
- Input State

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending