---
test_id: "LIMAS-SUD-042"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Active State" → "Update After Round-Trip Navigation"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "aria-current indicator"
action: "Verify aria-current moves after navigating away and back"
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

Verify that the `aria-current="page"` indicator correctly moves to the newly navigated link and returns to the System User Dashboard link after navigating back.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar dialog is open.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, open the sidebar with Ctrl+B.
   Expected Result: System User Dashboard link has `aria-current="page"`.

2. Action: Click the User Licenses nav link.
   Expected Result: Browser navigates to `/users-licenses`, sidebar closes.

3. Action: Press Ctrl+B to reopen the sidebar.
   Expected Result: User Licenses link now has `aria-current="page"`. System User Dashboard link does not.

4. Action: Click the System User Dashboard nav link.
   Expected Result: Browser navigates back to `/system-user-dashboard`, sidebar closes.

5. Action: Press Ctrl+B to reopen the sidebar.
   Expected Result: System User Dashboard link has `aria-current="page"` again. Only one link has the attribute.

# Network Verification

- Request URL: `${LIMAS_BASE_URL}/users-licenses`, then `${LIMAS_BASE_URL}/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200 for both
- Payload Presence: N/A
- Visible UI Result: Active indicator moves correctly between navigation targets

# Expected Final Result

The `aria-current="page"` attribute moves to the active route after each navigation, with only one link holding it at any time.

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