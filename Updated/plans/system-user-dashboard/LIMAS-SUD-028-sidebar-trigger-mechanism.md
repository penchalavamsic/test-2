---
test_id: "LIMAS-SUD-028"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Sidebar Trigger" → "Trigger Mechanism & Accessibility"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Sidebar trigger (Ctrl+B)"
action: "Document trigger mechanism and note missing accessible button"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Document that the sidebar is triggered exclusively via the Ctrl+B keyboard shortcut and that no accessible trigger button exists in the DOM when the sidebar is closed. This is an accessibility case.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar is in its collapsed (closed) state.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible.

2. Action: Search the DOM for any button with an accessible name related to opening a sidebar (aria-label containing "sidebar", "menu", "toggle", or "open").
   Expected Result: No button with a sidebar-related accessible name is found.

3. Action: Search the DOM for a button with a panel-left-open or similar icon.
   Expected Result: No such button is locatable via standard accessible selectors.

4. Action: Press Ctrl+B and confirm the sidebar dialog opens.
   Expected Result: The sidebar dialog appears, confirming Ctrl+B is the trigger mechanism.

# Accessibility Recommendation

Add a visible, focusable button with `aria-label="Open sidebar"` or `aria-label="Toggle navigation"` in the collapsed sidebar state so that mouse-only and screen-reader users can open the sidebar.

# Expected Final Result

The sidebar trigger is keyboard-only (Ctrl+B); no accessible button is present in the collapsed state. The fallback test strategy uses `page.keyboard.press('Control+b')`.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not modify LIMAS source code.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending