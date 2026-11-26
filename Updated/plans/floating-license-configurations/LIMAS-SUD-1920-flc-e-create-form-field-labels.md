---
test_id: "LIMAS-SUD-1920"
title: "Create form shows labels for all top-level fields"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Form Shell and Layout"
control: "Field Labels"
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

Verify all top-level form field labels are present.

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

3. Verify User Group, Product Profile, Profile Role, Number of Licenses, Max Checkout Time, Available for Checkout, Expiration Date, and Maintenance Date labels are visible.

4. Click Cancel to close the form.

Expected: All 8 field labels are visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All 8 field labels are visible.

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
