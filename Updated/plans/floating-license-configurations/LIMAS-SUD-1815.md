---
test_id: "LIMAS-SUD-1815"
title: "To verify no group is selected initially"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group-Selection Panel"
control: "Tree Items"
action: "Initial Selection State"
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

Verify no tree item has aria-selected="true" when the page first loads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Query all tree items with `aria-selected="true"`.
   Expected Result: The count of elements matching `aria-selected="true"` among tree items is zero.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

No tree item is preselected on initial page load; all tree items have default selection state.

# Classification

- Read-only
- Positive
- Initial State

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending