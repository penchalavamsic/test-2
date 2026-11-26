---
test_id: "LIMAS-SUD-144"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Maintenance Date Equal to Expiration — Behavior"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Maintenance Date field"
action: "Set Maintenance Date equal to Expiration Date and verify acceptance or validation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Boundary"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the system's behavior when the Maintenance Date is set to the exact same date as the Expiration Date.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- An Expiration Date has been selected (making Maintenance Date enabled).

# Test Data

None — compute dates dynamically.

# Steps and Expected Results

1. Action: Select User Group, Profile, and set an Expiration Date one year from today.
   Expected Result: Expiration Date populated, Maintenance Date enabled.

2. Action: Type the exact same date into the Maintenance Date field.
   Expected Result: Observe whether the date is accepted without error or a validation message appears.

3. Action: Verify field state.
   Expected Result: Either the value is populated in the field, or a validation error is displayed.

# Network Verification

- Request URL: N/A (client-side validation)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Equal dates either accepted or rejected with error

# Expected Final Result

Setting Maintenance Date equal to Expiration Date is either accepted or triggers a validation error — the observed behavior is documented.

# Classification

- Read-only
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode dates, User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending