---
test_id: "LIMAS-SUD-145"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Form Focus Order via Tab Key"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Inline form fields (Tab order)"
action: "Press Tab repeatedly through the form and verify focus moves through fields in expected order"
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

Verify that pressing Tab moves focus through the inline form fields in a logical order: User Group → Profile → Role → Expiration Date → Maintenance Date → Cancel → Approve Request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- All form fields are visible (User Group and Profile selected to reveal all fields).

# Test Data

None.

# Steps and Expected Results

1. Action: Open form, select User Group and Profile to reveal all fields, then click the User Group combobox to start focus.
   Expected Result: User Group combobox is focused.

2. Action: Press Tab repeatedly and track focused element roles/labels.
   Expected Result: Focus moves through: User Group combobox → Profile combobox → Role combobox → Expiration Date input → Maintenance Date input → Cancel button → Approve Request button → Close button (or cycles back).

3. Action: Verify all form fields are reachable via Tab.
   Expected Result: No field is skipped; the focus order makes logical sense top-to-bottom.

# Network Verification

- Request URL: N/A (keyboard navigation)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Focus ring moves through form fields in order

# Expected Final Result

Tab key navigates through form fields in a logical top-to-bottom order with no fields skipped.

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