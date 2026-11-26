---
test_id: "LIMAS-SUD-1819"
title: "To verify children are hidden after collapsing parent group"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Tree"
control: "Parent Collapse"
action: "Child Hiding"
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

Verify that collapsing an expanded parent group hides its child tree items again.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Discover a runtime parent group and expand it by clicking its expand chevron.
   Expected Result: The parent group expands and children become visible.

3. Action: Record the count of visible tree items after expansion.
   Expected Result: An expanded count is captured at runtime.

4. Action: Click the collapse control on the same parent group.
   Expected Result: The parent group collapses.

5. Action: Record the count of visible tree items after collapse.
   Expected Result: The visible tree item count has decreased relative to the expanded count.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Collapsing a previously expanded parent group hides its children, reducing the number of visible tree items.

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