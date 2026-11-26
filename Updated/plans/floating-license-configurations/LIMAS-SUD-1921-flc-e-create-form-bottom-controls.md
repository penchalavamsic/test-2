---
test_id: "LIMAS-SUD-1921"
title: "Create form has Reset and Save Configuration buttons at the bottom"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Form Shell and Layout"
control: "Reset and Save Configuration Buttons"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-create.spec.ts"
---

# Purpose

Verify Reset and Save Configuration buttons are present at the form bottom.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Navigate to the Floating License Configurations page and select a runtime group.

2. Click Create Configuration to open the form.

3. Verify Reset button is visible.

4. Verify Save Configuration button is visible.

5. Click Cancel to close the form.

Expected: Reset and Save Configuration buttons are visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Reset and Save Configuration buttons are visible.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
