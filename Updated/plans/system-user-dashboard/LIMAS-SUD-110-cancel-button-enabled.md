---
test_id: "LIMAS-SUD-110"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Cancel Button Always Enabled"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Cancel button"
action: "Verify Cancel button is enabled (not disabled) at all times in the inline form"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that the Cancel button in the inline approval form is always enabled — it has no disabled state, allowing the user to dismiss the form at any point.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible.

2. Action: Verify the Cancel button is enabled.
   Expected Result: Cancel button has no `disabled` attribute or `aria-disabled="true"` — it is interactive.

3. Action: After filling some fields, verify Cancel remains enabled.
   Expected Result: Cancel button is still enabled regardless of form progress.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Cancel button always enabled

# Expected Final Result

The Cancel button is always enabled and clickable while the inline form is open.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending