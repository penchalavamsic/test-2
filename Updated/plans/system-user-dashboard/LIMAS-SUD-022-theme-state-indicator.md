---
test_id: "LIMAS-SUD-022"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Theme Control" → "Theme State Indicator"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Theme control (moon/sun button)"
action: "Verify icon changes with theme"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-022-theme-state-indicator.spec.ts"
---

# Purpose

Verify that the theme control icon changes between moon (light) and sun (dark) to indicate the current theme state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard` in light theme.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and confirm light theme.
   Expected Result: Dashboard loaded, moon icon (lucide-moon) is visible.

2. Action: Click the theme control button.
   Expected Result: Sun icon (lucide-sun) is now visible; moon icon is hidden.

3. Action: Click the theme control again to restore light theme.
   Expected Result: Moon icon (lucide-moon) is visible again; sun icon is hidden.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Icon toggles between moon (light) and sun (dark) with each click

# Expected Final Result

The theme control icon correctly reflects the current theme: moon for light, sun for dark.

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