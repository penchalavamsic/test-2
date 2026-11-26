---
test_id: "LIMAS-SUD-139"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Expiration Date Manual Keyboard Input"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Expiration Date input"
action: "Type a date into the Expiration Date field and verify it is accepted"
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

Verify that a valid future date can be typed directly into the Expiration Date input field and is accepted by the form.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- The Expiration Date field is visible and editable.

# Test Data

None — generate a future date dynamically in the script.

# Steps and Expected Results

1. Action: Select User Group and Profile to reveal the Expiration Date field.
   Expected Result: Expiration Date* input field is visible.

2. Action: Focus the Expiration Date input and type a valid future date (e.g., one year from today) in the expected format.
   Expected Result: The date is accepted — no validation error appears. The field value reflects the typed date.

3. Action: Verify Approve Request button state.
   Expected Result: Approve Request is no longer blocked by the missing Expiration Date requirement.

# Network Verification

- Request URL: N/A (client-side input)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Date accepted, no validation error

# Expected Final Result

A valid future date typed manually is accepted by the Expiration Date field.

# Classification

- Read-only (no submission)
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode literal dates — compute dynamically.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending