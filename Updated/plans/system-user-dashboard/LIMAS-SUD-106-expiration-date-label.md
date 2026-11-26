---
test_id: "LIMAS-SUD-106"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Expiration Date* Label Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Expiration Date* label"
action: "Verify Expiration Date label is visible after Profile selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that after selecting a Profile, the "Expiration Date*" label (with required asterisk) appears in the inline form.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.

# Test Data

None.

# Steps and Expected Results

1. Action: Open the form and verify Expiration Date label is not present before Profile selection.
   Expected Result: No "Expiration Date*" label visible.

2. Action: Select a User Group, then select a Profile.
   Expected Result: The "Expiration Date*" label appears with its associated date input.

3. Action: Verify the label text reads "Expiration Date" with a trailing asterisk.
   Expected Result: "Expiration Date*" label is visible.

# Network Verification

- Request URL: N/A (conditional UI)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: "Expiration Date*" label and date input visible

# Expected Final Result

The "Expiration Date*" label appears conditionally after Profile selection.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode dates, User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending