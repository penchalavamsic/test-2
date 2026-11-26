---
test_id: "LIMAS-SUD-102"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Profile Dynamic Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Profile combobox"
action: "Select a Profile option and verify the displayed value updates"
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

Verify that selecting a Profile option from the dropdown updates the combobox displayed value to the selected Profile name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group has been selected and the Profile options list is open.

# Test Data

None — use the first available Profile option.

# Steps and Expected Results

1. Action: Select a User Group, then click the Profile combobox to open the options list.
   Expected Result: Profile options listbox appears.

2. Action: Select the first option in the Profile listbox.
   Expected Result: The listbox closes and the combobox displays the selected Profile name.

# Network Verification

- Request URL: May trigger Role options fetch
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Role options loaded based on selected Profile
- Visible UI Result: Combobox value updated to selected Profile name

# Expected Final Result

Selecting a Profile option updates the combobox displayed value dynamically, and dependent fields (Role) may appear.

# Classification

- Read-only (selection only)
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending