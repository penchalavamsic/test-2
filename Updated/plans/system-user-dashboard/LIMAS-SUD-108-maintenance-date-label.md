---
test_id: "LIMAS-SUD-108"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Maintenance Date Label Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Maintenance Date label"
action: "Verify Maintenance Date label is visible after Expiration Date appears"
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

Verify that after selecting a Profile, the "Maintenance Date" label appears in the inline form (likely conditionally after Expiration Date is shown).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form is open.
- A User Group and Profile have been selected.

# Test Data

None.

# Steps and Expected Results

1. Action: Open form, select User Group, select Profile to reveal Expiration Date.
   Expected Result: Expiration Date* label and input are visible.

2. Action: Look for "Maintenance Date" label in the form.
   Expected Result: A "Maintenance Date" label (likely without required asterisk) is visible with its associated date input.

# Network Verification

- Request URL: N/A (conditional UI)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: "Maintenance Date" label and date input visible

# Expected Final Result

The "Maintenance Date" label appears in the form after Profile selection, alongside Expiration Date.

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