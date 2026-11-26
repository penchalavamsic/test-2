---
test_id: "LIMAS-SUD-031"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "System User Dashboard" → "Link Visibility & aria-current"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "System User Dashboard nav link"
action: "Verify link is present, points to correct route, and has aria-current"
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

Verify that the System User Dashboard navigation link is present in the sidebar, points to `/system-user-dashboard`, and correctly shows `aria-current="page"` when active.

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
   Expected Result: The sidebar dialog is visible.

3. Action: Locate the nav link with `href="/system-user-dashboard"`.
   Expected Result: The link is present and visible in the sidebar navigation list.

4. Action: Verify the link has `aria-current="page"`.
   Expected Result: `aria-current="page"` is set, confirming this is the current route.

# Network Verification

- Request URL: N/A (DOM inspection)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: System User Dashboard link visible with active indicator

# Expected Final Result

The System User Dashboard nav link is present with `href="/system-user-dashboard"` and `aria-current="page"`.

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