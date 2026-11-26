---
test_id: "LIMAS-SUD-100"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Profile Initial State — Placeholder Before User Group"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Profile combobox placeholder"
action: "Verify Profile shows 'Select Profile' placeholder before any User Group is selected"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that before any User Group is selected, the Profile combobox displays the placeholder "Select Profile" — it is visible but its options are not yet populated.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- No User Group has been selected.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible.

2. Action: Inspect the Profile combobox before selecting any User Group.
   Expected Result: The placeholder text "Select Profile" is displayed. The Profile combobox is visible.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: "Select Profile" placeholder shown

# Expected Final Result

The Profile combobox shows "Select Profile" placeholder before a User Group is selected.

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