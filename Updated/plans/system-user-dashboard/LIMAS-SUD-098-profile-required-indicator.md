---
test_id: "LIMAS-SUD-098"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Profile Required Asterisk Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Profile label required indicator (*)"
action: "Verify asterisk is present on Profile label confirming required field"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Profile field label in the inline approval form includes a visible asterisk (`*`) indicating it is a required field.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the inline approval form.
   Expected Result: Form is visible.

2. Action: Locate the label text containing "Profile" and verify it ends with `*`.
   Expected Result: The label reads "Profile*" — visible asterisk confirms required field.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Asterisk adjacent to "Profile" label

# Expected Final Result

The Profile label includes a visible `*` indicating the field is required.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending