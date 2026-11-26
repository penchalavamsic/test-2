---
test_id: "LIMAS-SUD-033"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Reports" → "Link Visibility & Route"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "Reports nav link"
action: "Verify link is present and navigates to /reports"
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

Verify that the Reports navigation link is present in the sidebar and clicking it navigates to `/reports`.

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

3. Action: Locate the nav link with `href="/reports"`.
   Expected Result: The link is present and visible in the sidebar navigation list.

4. Action: Click the Reports link.
   Expected Result: The browser navigates to `/reports`, the sidebar closes, and the destination page loads.

5. Action: Reopen the sidebar and confirm `aria-current` is now on the Reports link.
   Expected Result: The Reports link has `aria-current="page"` after navigation.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/reports`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Reports page loads with its heading visible

# Expected Final Result

The Reports link is visible in the sidebar, navigates to `/reports`, and the sidebar closes on navigation.

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