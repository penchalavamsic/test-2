---
test_id: "LIMAS-SUD-127"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "API behavior"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that typing in the search field does not trigger additional network requests (client-side filtering)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "API"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that search filtering is performed client-side — no new network request is triggered when typing in the search field. If a network request IS observed, its URL and method are documented.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded.

# Test Data

No hardcoded user names. A search substring is extracted at runtime from a visible row.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and wait for all initial network activity to settle.
   Expected Result: The list is fully loaded with no pending network requests.

2. Action: Set up a network request listener and type a search substring into the search field.
   Expected Result: The search field receives the input.

3. Action: Wait briefly and check whether any new XHR or fetch requests were triggered by the search action.
   Expected Result: No new network requests (or a specific request is documented if one occurs). The loaded count updates without a page reload.

4. Action: Clear the search field.
   Expected Result: The field is cleared and the list is restored without triggering a network request.

# Network Verification

- Request URL: N/A (no new request expected during search)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Count updates without a visible network request

# Expected Final Result

Typing in the search field updates the loaded count without triggering a new network request, confirming client-side filtering.

# Classification

- Read-only
- API

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode user names — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending