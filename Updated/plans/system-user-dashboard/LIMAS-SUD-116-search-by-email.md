---
test_id: "LIMAS-SUD-116"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Search by email"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search by email — typing an email substring filters results to matching rows"
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

Verify that typing an email address substring from a visible row into the search field filters the Pending License Requests list and the loaded count updates accordingly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded with at least one visible row containing an email address with `@`.

# Test Data

No hardcoded emails. The test extracts the email text (containing `@`) from the first visible row at runtime and uses a substring of it as the search term.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the list is loaded.
   Expected Result: The count display shows a positive loaded count and the table has visible data rows.

2. Action: Locate the email paragraph (containing `@`) in the first visible data row.
   Expected Result: A non-empty email string is captured from the table.

3. Action: Extract a substring from that email (e.g. the part before `@`, or first few characters) and type it into the search field.
   Expected Result: The search field receives the input.

4. Action: Observe the loaded count display.
   Expected Result: The loaded count is ≥ 1 and the count format is maintained, confirming the search filter applied using the email substring.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Typing an email substring from a visible row into the search field produces at least one matching result and the count display reflects the filtered state.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode emails — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending