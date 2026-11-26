---
test_id: "LIMAS-SUD-1810"
title: "To verify 'Select a User Group' heading is visible"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group-Selection Panel"
control: "Panel Heading"
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

Verify the "Select a User Group" heading is visible in the group-selection panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Locate the group-selection panel heading with the text "Select a User Group".
   Expected Result: The heading is visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The "Select a User Group" heading is rendered and visible in the group-selection panel.

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