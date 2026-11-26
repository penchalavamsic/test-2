---
test_id: "LIMAS-SUD-1968"
title: "Edit opens inline form with heading"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Edit Form Shell"
control: "Edit Form Heading"
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

Verify Edit menu item opens an inline form with heading.

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

3. Verify "Edit Floating License Configuration" heading is visible.

4. Cancel the form.

Expected: Edit form opens with visible heading.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Edit form opens with visible heading.

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
