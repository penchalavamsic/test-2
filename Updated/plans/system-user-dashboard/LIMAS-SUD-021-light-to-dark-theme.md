---
test_id: "LIMAS-SUD-021"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Theme Control" → "Light to Dark Switch"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Theme control (moon/sun button)"
action: "Switch from light to dark theme"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-021-light-to-dark-theme.spec.ts"
---

# Purpose

Verify that clicking the theme control switches from light to dark theme, updating the HTML class and icon, while the header remains readable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard` in light theme.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and confirm light theme.
   Expected Result: Dashboard loaded with light theme (no `dark` class, moon icon visible).

2. Action: Click the theme control button.
   Expected Result: The `dark` class is added to `<html>`, the moon icon is replaced by the sun icon.

3. Action: Verify all header elements remain visible in dark theme.
   Expected Result: LIMAS logo, header controls, and dashboard heading "System User Dashboard" remain visible.

4. Action: Restore original light theme by clicking the theme control again.
   Expected Result: The `dark` class is removed from `<html>` and the moon icon returns.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Theme toggles from light to dark and back; header readable in both states

# Expected Final Result

Clicking the theme control switches to dark theme (html.dark added, sun icon visible). After restoration, the original light theme is re-applied.

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