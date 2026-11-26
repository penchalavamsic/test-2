---
test_id: "LIMAS-SUD-025"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Account Control" → "User Menu Opening"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Account control (avatar/initials button)"
action: "Open user menu and verify Logout option"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-025-user-menu.spec.ts"
---

# Purpose

Verify that clicking the account button opens the user menu containing the Logout option.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Click the account button.
   Expected Result: A menu with role "menu" appears containing a menuitem.

3. Action: Verify the Logout menuitem is visible and enabled.
   Expected Result: The menuitem "Logout" is visible and enabled. Do not click Logout.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: User menu opens showing Logout option

# Expected Final Result

Clicking the account button opens a user menu with a visible and enabled Logout option.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not click Logout.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending