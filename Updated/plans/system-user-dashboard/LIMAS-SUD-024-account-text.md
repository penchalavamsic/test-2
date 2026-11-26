---
test_id: "LIMAS-SUD-024"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Account Control" → "Account Text Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Account control (avatar/initials button)"
action: "Verify account text is visible and non-empty"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-024-account-text.spec.ts"
---

# Purpose

Verify that the account button displays non-empty text (email address) within the header.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Locate the account button and verify it contains non-empty text.
   Expected Result: The account button text is not empty and contains an email-like value.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Account button displays non-empty account text

# Expected Final Result

The account control displays visible, non-empty account text.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode usernames, emails, or avatar initials.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending