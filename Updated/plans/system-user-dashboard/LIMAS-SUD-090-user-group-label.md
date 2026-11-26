---
test_id: "LIMAS-SUD-090"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "User Group* Label Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "User Group* label"
action: "Verify the User Group label with required asterisk is visible in the inline form"
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

Verify that when the inline approval form is open, a label reading "User Group*" (with required asterisk) is visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form via Approve button.
   Expected Result: Inline form is visible.

2. Action: Locate the label "User Group*" within the form.
   Expected Result: The label is visible and contains the text "User Group" with a trailing asterisk indicating required.

# Network Verification

- Request URL: N/A (static label)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: "User Group*" label displayed

# Expected Final Result

The "User Group*" label is visible in the inline approval form.

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