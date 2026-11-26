---
test_id: "LIMAS-SUD-1818"
title: "To verify children become visible after expanding parent group"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Tree"
control: "Parent Expansion"
action: "Child Visibility"
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

Verify that expanding a parent group reveals its previously hidden child tree items.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Record the current count of visible tree items.
   Expected Result: A baseline count is captured at runtime.

3. Action: Discover a runtime parent group and click its expand chevron.
   Expected Result: The parent group expands.

4. Action: Record the count of visible tree items after expansion.
   Expected Result: The visible tree item count has increased relative to the baseline.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Expanding a parent group increases the number of visible tree items as previously hidden children are revealed.

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