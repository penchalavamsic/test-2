---
test_id: "LIMAS-SUD-137"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Role Reset When Profile Changes"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Role combobox"
action: "Change Profile after Role selection and verify Role resets to placeholder"
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

Verify that when the selected Profile is changed after a Role has been selected, the Role combobox resets to its placeholder state and dependent fields (date fields) also reset.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group is selected, and the Profile listbox has at least two options.
- A Profile and Role have been selected.

# Test Data

None — use the first two available Profile options.

# Steps and Expected Results

1. Action: Select User Group, select first Profile, then select a Role.
   Expected Result: Role combobox displays the selected Role name.

2. Action: Change the Profile by selecting a different Profile option.
   Expected Result: Role combobox resets to its initial placeholder/empty state.

3. Action: Verify date fields also reset.
   Expected Result: Expiration Date and Maintenance Date fields return to their unselected state.

# Network Verification

- Request URL: May trigger new Role options fetch
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: New Role options loaded
- Visible UI Result: Role reset to placeholder, date fields cleared

# Expected Final Result

Changing the Profile clears any previously selected Role and resets dependent date fields.

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