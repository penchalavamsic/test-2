---
test_id: "LIMAS-SUD-026"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Account Control" → "Menu Closing & Session Stability"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Account control (avatar/initials button)"
action: "Close user menu and verify session stability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Session"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-026-user-menu-closing.spec.ts"
---

# Purpose

Verify that closing the user menu (via Escape) leaves the authenticated route unchanged and the dashboard heading remains visible.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Click the account button to open the user menu.
   Expected Result: Menu with role "menu" appears.

3. Action: Press Escape to close the user menu.
   Expected Result: The menu is no longer visible. The page URL still contains `/system-user-dashboard`.

4. Action: Verify the dashboard heading is still visible.
   Expected Result: The "System User Dashboard" heading remains visible, confirming session persistence.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: User menu closes, authenticated session and dashboard remain stable

# Expected Final Result

Closing the user menu does not disrupt the authenticated session; the dashboard route and heading remain intact.

# Classification

- Read-only
- Session

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not click Logout.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending