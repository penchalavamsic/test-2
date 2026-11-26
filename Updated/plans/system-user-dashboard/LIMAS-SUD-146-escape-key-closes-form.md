---
test_id: "LIMAS-SUD-146"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Escape Key Closes Form"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Escape key"
action: "Press Escape while the approval form is open and verify the form closes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that pressing the Escape key while the inline approval form is open closes the form and reverts the row button to "Approve", without submitting any data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Click Approve to open the inline form.
   Expected Result: Form is visible, button reads "Close".

2. Action: Press the Escape key.
   Expected Result: The form closes. The row button reverts from "Close" to "Approve".

3. Action: Verify no submission was triggered.
   Expected Result: The pending request row is unchanged.

# Network Verification

- Request URL: None (no API call triggered)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Form closed, Approve button restored

# Expected Final Result

Pressing Escape closes the approval form without submitting, identical to clicking Cancel or Close.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending