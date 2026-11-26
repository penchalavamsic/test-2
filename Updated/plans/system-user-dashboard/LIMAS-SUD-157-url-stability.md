---
test_id: "LIMAS-SUD-157"
title: 'To verify the functionality of "System User Dashboard" → "Page Shell" → "URL" → "Stability During Interactions"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Page Shell"
control: "Browser URL"
action: "Verify URL remains /system-user-dashboard during all dashboard interactions"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-157-url-stability.spec.ts"
---

# Purpose

Verify that the browser URL remains on `/system-user-dashboard` throughout typical dashboard interactions — clicking summary cards, opening and closing the Approve form, and using search — without navigating to a new route.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request exists.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, and confirm the URL contains /system-user-dashboard.
   Expected Result: URL is on /system-user-dashboard.

2. Action: Click the Pending License Requests card and verify the URL.
   Expected Result: URL still contains /system-user-dashboard.

3. Action: Click the first Approve button to open the inline form and verify the URL.
   Expected Result: URL still contains /system-user-dashboard.

4. Action: Click Cancel to close the form and verify the URL.
   Expected Result: URL still contains /system-user-dashboard.

5. Action: Type into the search input and verify the URL.
   Expected Result: URL still contains /system-user-dashboard.

# Expected Final Result

The browser URL consistently stays on `/system-user-dashboard` for all in-page dashboard interactions — no route changes occur during card clicks, form open/close, or search filtering.

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