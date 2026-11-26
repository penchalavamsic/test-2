---
test_id: "LIMAS-SUD-1991"
title: "Gated create-edit-delete lifecycle with mutation flags"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Controlled Update Lifecycle"
control: "Gated Lifecycle"
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

Verify full create-edit lifecycle under mutation flags.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or values.

# Steps and Expected Results

1. Verify TEST_FLC_ALLOW_MUTATION and TEST_FLC_ALLOW_DELETE flags.

2. Skip if not set.

3. Create a config, edit it, and cleanup.

Expected: Lifecycle guarded by flags; skipped when flags absent.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Lifecycle guarded by flags; skipped when flags absent.

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
