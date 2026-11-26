---
test_id: "LIMAS-SUD-096"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "User Group Dynamic Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "User Group combobox"
action: "Select an option from the User Group listbox and verify the displayed value updates"
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

Verify that selecting an option from the User Group dropdown updates the combobox displayed value to the selected User Group name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- The User Group options list is open.

# Test Data

None — use the first available option.

# Steps and Expected Results

1. Action: Open the inline approval form and click the User Group combobox.
   Expected Result: Options listbox appears.

2. Action: Select the first option in the listbox.
   Expected Result: The listbox closes and the combobox displays the selected User Group name (no longer shows "Select User Group").

# Network Verification

- Request URL: May trigger a Profile options fetch
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Profile options populated based on selected User Group
- Visible UI Result: Combobox value updated to selected User Group name

# Expected Final Result

Selecting a User Group option updates the combobox displayed value dynamically.

# Classification

- Read-only (selection only, no form submission)
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending