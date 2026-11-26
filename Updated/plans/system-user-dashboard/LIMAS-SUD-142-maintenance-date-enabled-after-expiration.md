---
test_id: "LIMAS-SUD-142"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Maintenance Date Enabled After Expiration Date Selection"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Maintenance Date field"
action: "Verify Maintenance Date becomes editable after an Expiration Date is selected"
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

Verify that the Maintenance Date field transitions from a disabled/uneditable state to an enabled/editable state after a valid Expiration Date is selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.
- Both Expiration Date and Maintenance Date fields are visible.
- No Expiration Date has been selected yet.

# Test Data

None.

# Steps and Expected Results

1. Action: With no Expiration Date selected, inspect the Maintenance Date field.
   Expected Result: The Maintenance Date field is disabled or not editable.

2. Action: Select an Expiration Date (via manual input or calendar picker).
   Expected Result: The Expiration Date field has a value.

3. Action: Inspect the Maintenance Date field again.
   Expected Result: The Maintenance Date field is now enabled and editable.

# Network Verification

- Request URL: N/A (client-side state)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Maintenance Date transitions from disabled to enabled

# Expected Final Result

Maintenance Date becomes editable only after an Expiration Date has been selected.

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