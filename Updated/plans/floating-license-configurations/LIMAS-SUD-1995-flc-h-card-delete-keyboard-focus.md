---
test_id: "LIMAS-SUD-1995"
title: "Card-menu Delete receives keyboard focus"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Card-Menu Delete"
control: "Delete Keyboard Focus"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-H"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-delete.spec.ts"
---

# Purpose

Verify Delete can receive focus.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.
- No deletion will occur during inspection.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or values.

# Steps and Expected Results

1. Open card menu.

2. Focus Delete.

3. Verify it is the active element.

4. Close.

Expected: Delete receives focus.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Delete receives focus.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or values.
- NEVER delete an existing configuration unless TEST_FLC_ALLOW_DELETE is set and config was created by this run.
- Click Delete exactly once; treat "already absent" as successful idempotent cleanup.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
