---
test_id: "LIMAS-SUD-1944"
title: "Reset restores form fields to default values"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Reset Behavior"
control: "Reset Button"
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

Verify Reset clears modifications and restores defaults.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Navigate to Floating License Configurations and select a runtime group.

2. Click Create Configuration.

3. Select a Product Profile.

4. Fill Number of Licenses with 10.

5. Check the Unavailable radio.

6. Click the Reset button.

7. Verify Product Profile returns to "Select a profile…".

8. Verify Available radio is checked again.

9. Click Cancel.

Expected: Reset restores fields to initial default values.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Reset restores fields to initial default values.

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
