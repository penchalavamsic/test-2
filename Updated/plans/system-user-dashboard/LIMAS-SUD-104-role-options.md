---
test_id: "LIMAS-SUD-104"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Role Options List Appears"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Role combobox listbox"
action: "Click Role combobox and verify options list appears"
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

Verify that after Profile selection, clicking the Role combobox opens a listbox with Role options.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- The Role combobox is visible.

# Test Data

None.

# Steps and Expected Results

1. Action: Open form, select User Group, select Profile, then click the Role combobox.
   Expected Result: A listbox/dropdown appears with Role options.

2. Action: Verify at least one Role option is present.
   Expected Result: The listbox contains one or more selectable Role options (e.g., Standard, AGCOT, asasasa).

# Network Verification

- Request URL: N/A (data pre-loaded with Profile selection)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Role options list displayed

# Expected Final Result

Clicking the Role combobox reveals a listbox with Role options populated based on the selected Profile.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.
- Do not hardcode Role option names like "Standard" or "AGCOT" — use first/last/nth selection.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending