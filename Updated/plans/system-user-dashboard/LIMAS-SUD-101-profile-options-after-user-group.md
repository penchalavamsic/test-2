---
test_id: "LIMAS-SUD-101"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Profile Options Populate After User Group Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Profile combobox listbox"
action: "Select a User Group, then click Profile and verify options list appears"
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

Verify that after selecting a User Group, clicking the Profile combobox reveals a populated options list (Profile options fetched based on the selected User Group).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group has been selected from the User Group combobox.

# Test Data

None — use the first available User Group and then first available Profile.

# Steps and Expected Results

1. Action: Open the inline approval form, click User Group combobox, select the first option.
   Expected Result: User Group selection is reflected in the combobox.

2. Action: Click the Profile combobox.
   Expected Result: A listbox/dropdown appears with Profile options populated for the selected User Group.

3. Action: Verify at least one Profile option is present.
   Expected Result: The listbox contains one or more selectable Profile options.

# Network Verification

- Request URL: Profile fetch API
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Profile options returned in response
- Visible UI Result: Profile options list displayed

# Expected Final Result

After selecting a User Group, the Profile combobox listbox is populated with options.

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