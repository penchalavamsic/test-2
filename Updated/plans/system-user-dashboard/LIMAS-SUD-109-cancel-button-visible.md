---
test_id: "LIMAS-SUD-109"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Cancel Button Always Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Cancel button"
action: "Verify Cancel button is visible in the inline form at all times"
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

Verify that the Cancel button is always visible when the inline approval form is open, regardless of which fields have been filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible with "License Assignment" heading.

2. Action: Locate the Cancel button within the form.
   Expected Result: A button labeled "Cancel" is visible.

3. Action: Fill some fields (e.g., select User Group) and verify Cancel remains visible.
   Expected Result: Cancel button is still visible after partial form fill.

# Network Verification

- Request URL: N/A (static button)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Cancel button always present

# Expected Final Result

The Cancel button is visible in the inline form at all times — before and after filling any fields.

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