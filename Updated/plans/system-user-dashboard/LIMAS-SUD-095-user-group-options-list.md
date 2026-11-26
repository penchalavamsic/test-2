---
test_id: "LIMAS-SUD-095"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "User Group Options List Appears"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "User Group combobox listbox"
action: "Click User Group combobox and verify options list appears"
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

Verify that clicking the User Group combobox opens a dropdown listbox containing ~19 User Group options.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible.

2. Action: Click the User Group combobox.
   Expected Result: A listbox/dropdown appears with multiple options.

3. Action: Count the number of options or verify at least one option is present.
   Expected Result: Multiple options (approximately 19) are listed; at least one is selectable.

# Network Verification

- Request URL: N/A (client-side or preloaded data)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Options list displayed

# Expected Final Result

Clicking the User Group combobox reveals a listbox with multiple selectable User Group options.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.
- Do not hardcode User Group option names — use first/last/nth selection.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending