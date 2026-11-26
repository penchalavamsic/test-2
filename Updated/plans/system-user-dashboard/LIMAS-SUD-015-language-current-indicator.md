---
test_id: "LIMAS-SUD-015"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Language Control" → "Current Language Indicator"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Language control (globe button)"
action: "Verify current language selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-015-language-current-indicator.spec.ts"
---

# Purpose

Verify that the current language option within the opened menu is visually indicated (via `bg-accent` class).

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

3. Action: Check which menuitem has a visual selection indicator (bg-accent class).
   Expected Result: At least one menuitem has the `bg-accent` class, indicating the currently selected language. The default selected language is "English".

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: One language option shows a selection indicator

# Expected Final Result

The current language (English) is visually indicated within the opened language menu.

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