---
test_id: "LIMAS-SUD-017"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Theme Control" → "Visibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Theme control (moon/sun button)"
action: "Verify visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-017-theme-control-visibility.spec.ts"
---

# Purpose

Verify that the theme toggle button is visible in the dashboard header after authentication.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Locate the second button inside the header (moon or sun icon, theme control).
   Expected Result: The theme button is visible and enabled.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Theme control button visible in header

# Expected Final Result

The theme control (moon/sun icon button) is visible in the dashboard header.

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