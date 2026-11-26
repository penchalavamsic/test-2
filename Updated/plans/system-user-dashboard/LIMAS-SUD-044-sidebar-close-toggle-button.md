---
test_id: "LIMAS-SUD-044"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Close Behavior" → "Toggle Button Click"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Toggle Sidebar button (panel-left-close)"
action: "Verify clicking the toggle button closes the sidebar dialog"
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

Verify that clicking the Toggle Sidebar button (first item in the sidebar list, with panel-left-close icon) closes the sidebar dialog.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar dialog is open (after Ctrl+B).

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Press Ctrl+B to open the sidebar dialog.
   Expected Result: The sidebar dialog with `role="dialog"` is visible.

3. Action: Click the Toggle Sidebar button (first `<li>` item, button with panel-left-close icon and "Toggle Sidebar" text).
   Expected Result: The sidebar dialog closes (no longer visible).

4. Action: Verify the dashboard remains intact.
   Expected Result: The dashboard heading "System User Dashboard" is still visible and the page URL is still `/system-user-dashboard`.

# Network Verification

- Request URL: N/A (client-side dialog state)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Sidebar dialog closes, dashboard content remains visible

# Expected Final Result

Clicking the Toggle Sidebar button closes the sidebar dialog without affecting the current route or page content.

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