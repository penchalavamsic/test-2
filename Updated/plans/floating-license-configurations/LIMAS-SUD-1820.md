---
test_id: "LIMAS-SUD-1820"
title: "To verify collapsed parent has aria-expanded false"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Group Tree"
control: "Parent State"
action: "Aria-Expanded"
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

Verify initially collapsed parent groups have aria-expanded="false".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Discover a runtime parent group — a tree item that has children (by inspecting for the presence of an expand control or by checking that its aria-expanded attribute exists).
   Expected Result: At least one parent group is found.

3. Action: Assert the `aria-expanded` attribute of the discovered parent group.
   Expected Result: The value of `aria-expanded` is `"false"`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Parent groups start in a collapsed state, correctly reported to assistive technology as `aria-expanded="false"`.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, IDs, counts, or hierarchy positions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending