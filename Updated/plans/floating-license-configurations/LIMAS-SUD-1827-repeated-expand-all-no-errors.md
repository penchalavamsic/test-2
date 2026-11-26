---
test_id: "LIMAS-SUD-1827"
title: "To verify repeated Expand All does not cause errors"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Expand/Collapse"
control: "Expand All Button"
action: "Repeated Activation"
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

Verify that activating Expand All twice does not cause page errors or leave the page in a broken state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static group names or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page and verify the "Select a User Group" heading is visible.
   Expected Result: The group-selection heading is displayed.

2. Action: Click the Expand All button, wait briefly, then click Expand All a second time.
   Expected Result: Both clicks complete without visible errors or console exceptions.

3. Action: Verify that the page heading is still visible, indicating the page remains stable.
   Expected Result: The "Select a User Group" heading is still present and the tree is interactive.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Repeated activation of Expand All causes no errors and the page remains in a stable, functional state.

# Classification

- Floating License Configurations FLC-A
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending