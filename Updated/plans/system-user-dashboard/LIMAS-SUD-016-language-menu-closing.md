---
test_id: "LIMAS-SUD-016"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Language Control" → "Menu Closing"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Language control (globe button)"
action: "Close language menu"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-016-language-menu-closing.spec.ts"
---

# Purpose

Verify that pressing Escape closes the language menu and the authenticated route remains unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Click the language control to open the menu.
   Expected Result: Menu with role "menu" appears.

3. Action: Press Escape to close the menu.
   Expected Result: The menu is no longer visible or present in the DOM.

4. Action: Verify the authenticated route is unchanged.
   Expected Result: The page URL still contains `/system-user-dashboard` and the dashboard heading remains visible.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Menu closed, authenticated route unchanged

# Expected Final Result

The language menu closes on Escape and the authenticated session remains on the dashboard.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending