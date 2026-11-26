---
test_id: "LIMAS-SUD-1980"
title: "Number of Licenses can be changed in edit form"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Editable Field Behavior"
control: "Number of Licenses Spinbutton"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-G"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-edit.spec.ts"
---

# Purpose

Verify Number of Licenses can be edited.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or values.

# Steps and Expected Results

1. Navigate to FLC, select a runtime group.

2. Open Edit for the first card.

3. Fill "5" in Number of Licenses.

4. Verify value is "5".

5. Cancel.

Expected: License count updates to 5.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

License count updates to 5.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or values.
- Do not click Save unless TEST_FLC_ALLOW_MUTATION is set.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
