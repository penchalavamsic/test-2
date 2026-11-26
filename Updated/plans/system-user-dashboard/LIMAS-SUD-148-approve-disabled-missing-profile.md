---
test_id: "LIMAS-SUD-148"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Disabled When Profile Missing"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button"
action: "Verify Approve Request button is disabled when Profile has not been selected, even with User Group filled"
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

Verify that the Approve Request button remains disabled when a User Group has been selected but Profile has not been selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group has been selected.
- Profile has NOT been selected.

# Test Data

None — select the first available User Group.

# Steps and Expected Results

1. Action: Open form and select a User Group.
   Expected Result: User Group combobox displays the selected value. Profile combobox still shows "Select Profile".

2. Action: Verify Approve Request button state.
   Expected Result: Approve Request button is disabled.

3. Action: Select a Profile.
   Expected Result: Approve Request button is no longer disabled solely due to missing Profile (may still require other fields).

# Network Verification

- Request URL: N/A (client-side state)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Approve Request disabled when Profile missing

# Expected Final Result

Approve Request remains disabled after User Group selection until Profile is also selected.

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