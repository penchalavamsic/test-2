---
test_id: "LIMAS-SUD-111"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Cancel Closes Form Without Saving"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Cancel button"
action: "Click Cancel and verify form closes, Approve button reappears, no submission occurred"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that clicking the Cancel button closes the inline approval form without saving or submitting, and the Approve button reappears.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form via Approve button.
   Expected Result: Form is visible, Approve button now reads "Close".

2. Action: Click the Cancel button within the form.
   Expected Result: The inline form disappears. The row button reverts to "Approve".

3. Action: Verify no API submission was triggered.
   Expected Result: The pending request row is unchanged — no success/error toast or state change.

# Network Verification

- Request URL: None (no POST/PUT triggered)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Form closed, Approve button restored, row state unchanged

# Expected Final Result

Clicking Cancel closes the form, reverts the button to Approve, and does not submit any data.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending