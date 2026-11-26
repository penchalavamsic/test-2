---
test_id: "LIMAS-SUD-088"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Close Button Closes Form & Reverts to Approve"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Close button (was Approve)"
action: "Click Close and verify inline form closes, button reverts to Approve"
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

Verify that clicking the Close button (previously Approve) while the inline form is open closes the form and the button reverts to its original "Approve" label.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is currently open (Approve was clicked, now showing Close).

# Test Data

None.

# Steps and Expected Results

1. Action: Click Approve on first pending request row to open the inline form.
   Expected Result: Inline form opens, button text is "Close".

2. Action: Click the Close button.
   Expected Result: The inline form disappears and the button text reverts to "Approve".

3. Action: Verify the button is no longer in expanded state.
   Expected Result: aria-expanded is "false" or absent.

# Network Verification

- Request URL: N/A (client-side UI toggle)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Form closed, Approve button restored

# Expected Final Result

Clicking Close when the form is open closes the form and the button returns to its original "Approve" state.

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