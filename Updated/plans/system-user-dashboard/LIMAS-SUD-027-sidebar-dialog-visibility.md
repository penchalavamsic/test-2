---
test_id: "LIMAS-SUD-027"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Sidebar Dialog" → "Visibility after Ctrl+B"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Sidebar dialog (shadcn Sheet)"
action: "Open sidebar with Ctrl+B and verify dialog appears"
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

Verify that pressing Ctrl+B opens the sidebar as a dialog element with role="dialog" containing a list of navigation items.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar is in its collapsed (closed) state.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible. The sidebar dialog is not present in the DOM or is hidden.

2. Action: Press Ctrl+B to open the sidebar.
   Expected Result: A `dialog` element with `role="dialog"` appears in the DOM and is visible.

3. Action: Locate the `<ul>` with `role="list"` inside the dialog.
   Expected Result: The list contains 12 `<li>` items (1 toggle button + 11 navigation links).

4. Action: Verify the first item is the Toggle Sidebar button with a panel-left-close icon.
   Expected Result: The first `<li>` contains a button for toggling the sidebar closed.

# Network Verification

- Request URL: N/A (client-side sidebar interaction)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Sidebar dialog opens as an overlay with 12 list items

# Expected Final Result

Pressing Ctrl+B opens a shadcn Sheet dialog containing a 12-item navigation list with the toggle button as the first entry.

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