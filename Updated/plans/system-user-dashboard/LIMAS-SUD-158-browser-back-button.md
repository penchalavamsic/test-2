---
test_id: "LIMAS-SUD-158"
title: 'To verify the functionality of "System User Dashboard" → "Browser Navigation" → "Back Button" → "Correct Navigation Behavior"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Browser Navigation"
control: "Browser back button"
action: "Verify back button navigates to previous page correctly"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-158-browser-back-button.spec.ts"
---

# Purpose

Verify that the browser back button correctly navigates away from the System User Dashboard to the previous page in history, and that forward navigation returns to the dashboard.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The dashboard is the second page in browser history (the login flow provides the first entry).

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, and confirm the heading is visible.
   Expected Result: "System User Dashboard" heading is visible.

2. Action: Use page.goBack() to simulate the browser back button.
   Expected Result: The URL changes — the page navigated away from /system-user-dashboard.

3. Action: Use page.goForward() to simulate the browser forward button.
   Expected Result: The page returns to /system-user-dashboard and the heading is visible again.

# Expected Final Result

The browser back button navigates away from the dashboard, and the forward button returns to it successfully. This is a read-only verification of browser history behavior.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending