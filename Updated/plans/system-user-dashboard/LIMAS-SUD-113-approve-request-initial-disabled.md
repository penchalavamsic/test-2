---
test_id: "LIMAS-SUD-113"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Button Initially Disabled"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button (submit)"
action: "Verify Approve Request is disabled when required fields are empty"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the "Approve Request" button is disabled when the inline form first opens, before any required fields are filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open with no fields filled.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible with all fields in their default empty state.

2. Action: Inspect the "Approve Request" button state.
   Expected Result: The button is disabled — it has a `disabled` attribute or `aria-disabled="true"`.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Approve Request button appears disabled/greyed out

# Expected Final Result

The "Approve Request" button is disabled when no required fields are filled.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending