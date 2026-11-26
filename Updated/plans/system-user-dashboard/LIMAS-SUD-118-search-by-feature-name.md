---
test_id: "LIMAS-SUD-118"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Search by feature name"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search by feature name — typing a feature name substring filters results to matching rows"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that typing a feature name substring from a visible row into the search field filters the Pending License Requests list and the loaded count updates accordingly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded with at least one visible row containing a feature name in the Feature column.

# Test Data

No hardcoded feature names. The test extracts the feature name from the Feature column (second cell) of the first visible row at runtime and uses a substring of it as the search term.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the list is loaded.
   Expected Result: The count display shows a positive loaded count and the table has visible data rows.

2. Action: Locate the feature name paragraph in the second cell of the first visible data row.
   Expected Result: A non-empty feature name string is captured from the table.

3. Action: Extract a substring (first 3–5 characters) and type it into the search field.
   Expected Result: The search field receives the input.

4. Action: Observe the loaded count display.
   Expected Result: The loaded count is ≥ 1 and the count format is maintained, confirming the search filter applied using the feature name.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Typing a feature name substring from a visible row into the search field produces at least one matching result and the count display reflects the filtered state.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode feature names — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending