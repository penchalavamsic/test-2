---
test_id: "LIMAS-SUD-147"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Disabled When User Group Missing"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button"
action: "Verify Approve Request button is disabled when User Group has not been selected"
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

Verify that the Approve Request button remains disabled when no User Group has been selected, even if other fields (Profile, Role, dates) are filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- User Group is the only required field that has NOT been filled.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the form and leave User Group unselected.
   Expected Result: User Group combobox shows "Select User Group".

2. Action: Verify Approve Request button state.
   Expected Result: Approve Request button is disabled (cannot be clicked).

3. Action: Select a User Group.
   Expected Result: Approve Request button is no longer disabled solely due to missing User Group (may still require other fields).

# Network Verification

- Request URL: N/A (client-side state)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Approve Request disabled when User Group missing

# Expected Final Result

Approve Request is disabled until User Group (and all other required fields) are filled.

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