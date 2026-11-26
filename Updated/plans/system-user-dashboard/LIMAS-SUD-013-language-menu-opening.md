---
test_id: "LIMAS-SUD-013"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Language Control" → "Menu Opening"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Language control (globe button)"
action: "Open language menu"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-013-language-menu-opening.spec.ts"
---

# Purpose

Verify that clicking the language control opens a menu with language options.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Click the language control (first button in header).
   Expected Result: A menu with role "menu" appears containing menuitems.

3. Action: Verify the menu is visible and contains at least one menuitem.
   Expected Result: The menu is visible with role "menu" and menuitem children.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Language menu opens with role "menu"

# Expected Final Result

Clicking the language control opens a menu containing language options.

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