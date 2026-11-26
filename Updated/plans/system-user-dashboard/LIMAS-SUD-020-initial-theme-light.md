---
test_id: "LIMAS-SUD-020"
title: 'To verify the functionality of "System User Dashboard" → "Header" → "Theme Control" → "Initial Light Theme"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Header"
control: "Theme control (moon/sun button)"
action: "Verify initial theme is light"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-020-initial-theme-light.spec.ts"
---

# Purpose

Verify that the initial theme state after authentication is light (no `dark` class on `<html>`, moon icon visible).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Check the `<html>` element for the `dark` class.
   Expected Result: The `dark` class is not present on `<html>`.

3. Action: Verify the moon icon is visible on the theme button.
   Expected Result: The `lucide-moon` icon is present; `lucide-sun` is not.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Light theme active with moon icon visible

# Expected Final Result

The initial theme is light: `<html>` has no `dark` class and the moon icon is displayed.

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