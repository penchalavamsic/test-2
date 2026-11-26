---
test_id: "LIMAS-SUD-114"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Approve Request Enabled Only After All Required Fields Filled"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve Request button (submit)"
action: "Verify Approve Request becomes enabled only after all required fields are filled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the "Approve Request" button transitions from disabled to enabled only after all required fields (User Group, Profile, Role, Expiration Date) are filled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None — use first available options for each combobox.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Approve Request button is disabled.

2. Action: Select a User Group (first option).
   Expected Result: Approve Request button remains disabled.

3. Action: Select a Profile (first option).
   Expected Result: Approve Request button remains disabled (Role and Expiration Date still unfilled).

4. Action: Select a Role (first option) and set an Expiration Date.
   Expected Result: Approve Request button becomes enabled.

# Network Verification

- Request URL: N/A (client-side form validation)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Approve Request button enables after all required fields filled

# Expected Final Result

The "Approval Request" button is enabled only when all required fields (User Group, Profile, Role, Expiration Date) are populated.

# Classification

- Read-only (no submission)
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form — stop after verifying enabled state.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending