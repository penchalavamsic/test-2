---
test_id: "LIMAS-SUD-135"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "User Group Keyboard Selection via Arrow Keys"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "User Group combobox"
action: "Verify that arrow keys navigate User Group options in the listbox"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that when the User Group combobox listbox is open, pressing the ArrowDown and ArrowUp keys navigates through the available options, and pressing Enter selects the highlighted option.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- The User Group combobox is focused.

# Test Data

None — use the first available option.

# Steps and Expected Results

1. Action: Open the User Group combobox by clicking it.
   Expected Result: User Group listbox appears with at least one option.

2. Action: Press ArrowDown to highlight the next option.
   Expected Result: Focus/active-descendant moves to the next option in the list.

3. Action: Press Enter to select the highlighted option.
   Expected Result: The listbox closes and the selected option is displayed in the combobox.

# Network Verification

- Request URL: May trigger Profile options fetch
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Profile options loaded based on selected User Group
- Visible UI Result: Combobox displays selected User Group name

# Expected Final Result

Arrow keys navigate User Group options and Enter selects the highlighted option, confirming keyboard accessibility of the combobox.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending