---
test_id: "LIMAS-SUD-030"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Active Indicator" → "aria-current on Current Page"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "System User Dashboard nav link"
action: "Verify aria-current=\"page\" on the active link"
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

Verify that when the user is on `/system-user-dashboard`, the corresponding sidebar navigation link has `aria-current="page"` indicating it is the active route.

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

3. Action: Locate the nav link pointing to `/system-user-dashboard`.
   Expected Result: The link has `href="/system-user-dashboard"`.

4. Action: Check the `aria-current` attribute on that link.
   Expected Result: `aria-current="page"` is set on the System User Dashboard nav link.

5. Action: Confirm no other nav link has `aria-current`.
   Expected Result: Only one link in the sidebar has `aria-current="page"`.

# Network Verification

- Request URL: N/A (DOM attribute inspection)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Active nav link has aria-current="page", all others do not

# Expected Final Result

The System User Dashboard sidebar link is marked with `aria-current="page"` and is the only link with this attribute.

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