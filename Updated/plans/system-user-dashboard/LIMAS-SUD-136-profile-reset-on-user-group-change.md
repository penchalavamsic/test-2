---
test_id: "LIMAS-SUD-136"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Profile Reset When User Group Changes"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Profile combobox"
action: "Change User Group after Profile selection and verify Profile resets to placeholder"
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

Verify that when a User Group is changed after a Profile has been selected, the Profile combobox resets to its placeholder state and dependent fields (Role, Expiration Date) also reset.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- The User Group listbox has at least two options.
- A User Group and Profile have been selected.

# Test Data

None — use the first two available User Group options.

# Steps and Expected Results

1. Action: Select the first User Group option, then select a Profile.
   Expected Result: Profile combobox displays the selected Profile name.

2. Action: Change the User Group by selecting a different option.
   Expected Result: Profile combobox resets to "Select Profile" placeholder.

3. Action: Verify that dependent fields also reset.
   Expected Result: Role and date fields return to their initial unselected state.

# Network Verification

- Request URL: May trigger Profile options fetch for new User Group
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: New Profile options loaded
- Visible UI Result: Profile reset to placeholder, dependent fields cleared

# Expected Final Result

Changing the User Group clears any previously selected Profile and resets dependent fields.

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