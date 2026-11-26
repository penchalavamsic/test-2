---
test_id: "LIMAS-SUD-121"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Keyboard focus"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that pressing Tab navigates focus into the search field"
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

Verify that the search field is reachable via keyboard navigation — pressing Tab from a known focusable element focuses the search input.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the search field is present.
   Expected Result: The search field with placeholder "Search license requests..." is visible.

2. Action: Focus a known element before the search field (e.g., the Pending License Requests heading) and press Tab.
   Expected Result: The search field receives focus (document.activeElement is the search input).

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A

# Expected Final Result

After pressing Tab from a preceding focusable element, the search input field is focused.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode tab order indices — use locator-based focus assertions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending