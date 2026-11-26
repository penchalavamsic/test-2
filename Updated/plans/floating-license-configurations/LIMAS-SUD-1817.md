---
test_id: "LIMAS-SUD-1817"
title: "To verify parent groups render with expand chevron"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Tree"
control: "Parent Groups"
action: "Expand Control"
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

Verify parent groups (groups with children) display a chevron/expand control.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Discover a runtime parent group — a tree item that has child elements (by querying for a treeitem whose expand control or aria-expanded attribute can be inspected).
   Expected Result: At least one parent group is found.

3. Action: Locate the expand chevron/control within the discovered parent group.
   Expected Result: The expand chevron is visible on the parent group.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Every parent group in the tree displays a visible expand chevron, allowing the user to reveal children.

# Classification

- Read-only
- Positive
- Tree Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, IDs, counts, or hierarchy positions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending