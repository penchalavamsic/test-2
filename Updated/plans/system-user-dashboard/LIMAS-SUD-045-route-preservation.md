---
test_id: "LIMAS-SUD-045"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Route Stability" → "Route Preservation After Open/Close"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Current route URL"
action: "Verify route is unchanged after opening and closing the sidebar"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Session"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that opening and closing the sidebar (without clicking any nav link) does not change the current route — the page URL and dashboard heading remain the same.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard heading "System User Dashboard" is visible. URL contains `/system-user-dashboard`.

2. Action: Press Ctrl+B to open the sidebar dialog.
   Expected Result: The sidebar dialog is visible.

3. Action: Press Escape to close the sidebar dialog.
   Expected Result: The sidebar dialog is no longer visible.

4. Action: Verify the page URL and dashboard heading.
   Expected Result: The URL still contains `/system-user-dashboard` and the "System User Dashboard" heading is still visible.

5. Action: Press Ctrl+B to open the sidebar again, then click the Toggle Sidebar button to close.
   Expected Result: The sidebar closes.

6. Action: Verify the page URL and dashboard heading.
   Expected Result: The URL still contains `/system-user-dashboard` and the "System User Dashboard" heading is still visible.

# Network Verification

- Request URL: N/A (no navigation should occur)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Route and page content are preserved across open/close cycles

# Expected Final Result

Opening and closing the sidebar does not trigger any route change; the current page and its content remain stable.

# Classification

- Read-only
- Session

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending