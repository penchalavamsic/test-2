---
test_id: "LIMAS-SUD-143"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Maintenance Date Before Expiration — Validation or Behavior"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Maintenance Date field"
action: "Set Maintenance Date earlier than Expiration Date and verify validation error or accepted behavior"
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

Verify the system's behavior when the Maintenance Date is set to a date earlier than the Expiration Date — either a validation error is shown or the dates are accepted depending on business rules.

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

2. Action: Type a Maintenance Date that is one day before the Expiration Date.
   Expected Result: Observe the system response — either a validation error message appears, or the date is accepted without error.

3. Action: If validation error appears, verify the error message is visible.
   Expected Result: Error text is displayed near the field. If no validation, verify the field value is accepted.

# Network Verification

- Request URL: N/A (client-side validation)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Validation error or accepted value shown

# Expected Final Result

Setting Maintenance Date before Expiration Date triggers either a validation error or is accepted — the observed behavior is documented.

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