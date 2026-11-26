---
test_id: "LIMAS-SUD-1811"
title: "To verify instructional text in group-selection panel"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group-Selection Panel"
control: "Instruction Text"
action: "Visibility"
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

Verify the instructional text appears in the group-selection panel guiding the user to select a group.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Locate the instructional text element within the group-selection panel.
   Expected Result: The instructional text is visible and contains guidance about selecting a user group.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The group-selection panel displays instructional text guiding the user to select a group.

# Classification

- Read-only
- Positive
- Panel Structure

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending