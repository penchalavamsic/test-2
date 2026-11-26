---
test_id: "LIMAS-SUD-138"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Expiration Date Calendar Picker Opens on Click"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Expiration Date field"
action: "Click the Expiration Date input and verify a calendar picker widget appears"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that clicking the Expiration Date input field opens a calendar/date-picker widget for visual date selection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected (so the Expiration Date field is visible).

# Test Data

None.

# Steps and Expected Results

1. Action: Select User Group and Profile to reveal the Expiration Date field.
   Expected Result: Expiration Date* input field is visible.

2. Action: Click the Expiration Date input field.
   Expected Result: A calendar popup/dialog appears (likely a MUI date picker popup or native calendar widget).

3. Action: Verify the calendar widget is visible and interactive.
   Expected Result: The calendar widget contains month navigation and selectable day cells.

# Network Verification

- Request URL: N/A (client-side widget)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Calendar picker widget displayed

# Expected Final Result

Clicking the Expiration Date field opens a calendar picker widget.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode dates, User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending