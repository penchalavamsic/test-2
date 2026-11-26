---
test_id: "LIMAS-SUD-115"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Inline Form" → "Form Restoration After Cancel — Default State on Reopen"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Approve button → form reopen"
action: "Fill fields, cancel, reopen — verify form returns to default empty state"
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

Verify that after filling fields, canceling the form, and reopening via Approve, the form resets to its default empty state with no prior selections carried over.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The inline approval form was previously open, some fields were filled, and Cancel was clicked.

# Test Data

None.

# Steps and Expected Results

1. Action: Open form, fill User Group and Profile, then click Cancel.
   Expected Result: Form closes, Approve button reappears.

2. Action: Click Approve again on the same row.
   Expected Result: Form reopens.

3. Action: Verify form state.
   Expected Result: User Group shows "Select User Group" placeholder, Profile shows "Select Profile" placeholder, Approve Request button is disabled — form is in default clean state.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Form reset to default empty state on reopen

# Expected Final Result

Reopening the form after cancel restores the default empty state — no prior selections persist.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not submit the approval form.
- Do not hardcode User Group, Profile, or Role names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending