---
test_id: "LIMAS-SUD-1816"
title: "To verify tree items render with role treeitem"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Tree"
control: "Tree Items"
action: "Semantic Role"
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

Verify tree items are rendered with the semantic role="treeitem".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Query the tree container for elements with role `treeitem`.
   Expected Result: At least one tree item exists.

3. Action: Assert the role attribute of the first tree item.
   Expected Result: The first tree item has `role="treeitem"`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Tree items are rendered with the semantic `role="treeitem"` for assistive technology compliance.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending