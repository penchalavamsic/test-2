---
test_id: "LIMAS-SUD-029"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Toggle Button" → "Visibility & Enabled State"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Toggle Sidebar button (panel-left-close icon)"
action: "Verify visibility and enabled state inside the dialog"
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

Verify that the Toggle Sidebar button (first item in the sidebar list, with panel-left-close icon) is visible and enabled when the sidebar dialog is open.

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
   Expected Result: The sidebar dialog is visible.

3. Action: Locate the first `<li>` item in the sidebar list and inspect its button.
   Expected Result: The first `<li>` contains a button with a panel-left-close icon and text "Toggle Sidebar".

4. Action: Verify the button is visible and not disabled.
   Expected Result: The button is visible and has no `disabled` attribute or `aria-disabled="true"`.

# Network Verification

- Request URL: N/A (client-side UI state)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Toggle button is visible and enabled inside the open sidebar dialog

# Expected Final Result

The Toggle Sidebar button is the first item in the sidebar list, visible and enabled when the dialog is open.

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