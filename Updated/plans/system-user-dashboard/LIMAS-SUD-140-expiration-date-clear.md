---
test_id: "LIMAS-SUD-140"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Expiration Date Clear Action"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Expiration Date field"
action: "Clear a previously entered Expiration Date and verify the field empties"
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

Verify that a previously entered Expiration Date can be cleared, and that clearing the date re-disables the Approve Request button if Expiration Date is required.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- A date has been entered in the Expiration Date field.

# Test Data

None — dynamically enter and clear a date.

# Steps and Expected Results

1. Action: Select User Group, Profile, and type a future date into Expiration Date.
   Expected Result: Expiration Date field has a value.

2. Action: Clear the Expiration Date field (select all + delete, or use clear button).
   Expected Result: The field becomes empty.

3. Action: Verify Approve Request button state.
   Expected Result: Approve Request becomes disabled because Expiration Date is required but not filled.

# Network Verification

- Request URL: N/A (client-side)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Expiration Date cleared, Approve Request disabled

# Expected Final Result

Clearing the Expiration Date empties the field and causes Approve Request to become disabled.

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