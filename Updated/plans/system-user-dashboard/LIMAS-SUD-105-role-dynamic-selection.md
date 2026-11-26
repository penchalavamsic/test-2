---
test_id: "LIMAS-SUD-105"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Role Dynamic Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Role combobox"
action: "Select a Role option and verify the displayed value updates"
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

Verify that selecting a Role option from the dropdown updates the combobox displayed value to the selected Role name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- The Role options list is open.

# Test Data

None — use the first available Role option.

# Steps and Expected Results

1. Action: Open form, select User Group, select Profile, click Role combobox.
   Expected Result: Role options listbox appears.

2. Action: Select the first option in the Role listbox.
   Expected Result: The listbox closes and the combobox displays the selected Role name.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Combobox value updated to selected Role name

# Expected Final Result

Selecting a Role option updates the combobox displayed value dynamically.

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