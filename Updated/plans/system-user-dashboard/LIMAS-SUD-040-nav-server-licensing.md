---
test_id: "LIMAS-SUD-040"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Server Licensing" → "Link Visibility & Route"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Server Licensing nav link"
action: "Verify link is present and navigates to /server-licensing"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Server Licensing navigation link is present in the sidebar and clicking it navigates to `/server-licensing`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar dialog is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Press Ctrl+B to open the sidebar dialog.
   Expected Result: The sidebar dialog is visible with the navigation list.

3. Action: Locate the nav link with `href="/server-licensing"`.
   Expected Result: The link is present and visible in the sidebar navigation list.

4. Action: Click the Server Licensing link.
   Expected Result: The browser navigates to `/server-licensing`, the sidebar closes, and the destination page loads.

5. Action: Reopen the sidebar and confirm `aria-current` is now on the Server Licensing link.
   Expected Result: The Server Licensing link has `aria-current="page"` after navigation.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/server-licensing`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Server Licensing page loads with its heading visible

# Expected Final Result

The Server Licensing link is visible in the sidebar, navigates to `/server-licensing`, and the sidebar closes on navigation.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending