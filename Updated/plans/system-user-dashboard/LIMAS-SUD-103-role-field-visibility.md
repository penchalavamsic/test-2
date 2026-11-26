---
test_id: "LIMAS-SUD-103"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Role* Combobox Appears After Profile Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Role* combobox"
action: "Verify Role combobox becomes visible after a Profile is selected"
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

Verify that the Role* combobox appears in the inline form only after a Profile has been selected (it is conditionally rendered).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form and verify the Role combobox is not present before Profile selection.
   Expected Result: Role combobox is absent — not in the DOM.

2. Action: Select a User Group, then select a Profile.
   Expected Result: After Profile selection, the Role* combobox appears in the form.

3. Action: Verify the Role combobox is visible with a "Role*" label.
   Expected Result: A combobox labeled "Role*" is now present and visible.

# Network Verification

- Request URL: N/A (conditional UI rendering)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Role* combobox appears after Profile selection

# Expected Final Result

The Role* combobox is conditionally visible — present only after a Profile is selected.

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