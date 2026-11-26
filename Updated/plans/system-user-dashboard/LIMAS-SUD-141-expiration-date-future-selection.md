---
test_id: "LIMAS-SUD-141"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Expiration Date Future Selection Accepted"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Expiration Date field"
action: "Select a future date from the calendar picker and verify it is accepted"
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

Verify that selecting a future date from the calendar picker populates the Expiration Date field with the selected date and no validation error appears.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- The calendar picker is open.

# Test Data

None — use the calendar widget to select a future date.

# Steps and Expected Results

1. Action: Select User Group and Profile, then open the calendar picker by clicking the Expiration Date field.
   Expected Result: Calendar widget appears.

2. Action: Click a future date cell in the calendar.
   Expected Result: The calendar closes and the selected date populates the Expiration Date field. No validation error appears.

3. Action: Verify the field value is a non-empty date string.
   Expected Result: The field displays the selected date.

# Network Verification

- Request URL: N/A (client-side)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Future date accepted, no error

# Expected Final Result

Selecting a future date from the calendar picker is accepted without validation errors.

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