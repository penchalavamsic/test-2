---
test_id: "LIMAS-SUD-1922"
title: "User Group field is prepopulated with the currently selected group"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "User Group Field"
control: "User Group Combobox"
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

Verify the User Group field shows the currently selected group name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Navigate to the Floating License Configurations page and select a runtime group.

2. Record the selected group name.

3. Click Create Configuration to open the form.

4. Verify the User Group combobox selected value contains the recorded group name.

5. Click Cancel to close the form.

Expected: User Group combobox is prepopulated with the current group.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

User Group combobox is prepopulated with the current group.

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
