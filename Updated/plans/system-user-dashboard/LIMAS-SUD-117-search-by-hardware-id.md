---
test_id: "LIMAS-SUD-117"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Search by hardware ID"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search by hardware ID — typing a hardware ID substring filters results to matching rows"
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

Verify that typing a hardware ID substring from a visible row into the search field filters the Pending License Requests list and the loaded count updates accordingly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded with at least one visible row containing a hardware ID (quoted numeric).

# Test Data

No hardcoded hardware IDs. The test extracts the hardware ID text (quoted numeric, e.g. `"12345"`) from the first visible row at runtime and uses its numeric portion as the search term.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the list is loaded.
   Expected Result: The count display shows a positive loaded count and the table has visible data rows.

2. Action: Locate the hardware ID paragraph (containing a quoted number pattern `"\d+"`) in the first visible data row.
   Expected Result: A non-empty hardware ID string is captured from the table.

3. Action: Extract the numeric portion from inside the quotes and type it into the search field.
   Expected Result: The search field receives the input.

4. Action: Observe the loaded count display.
   Expected Result: The loaded count is ≥ 1 and the count format is maintained, confirming the search filter applied using the hardware ID.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Typing a hardware ID substring from a visible row into the search field produces at least one matching result and the count display reflects the filtered state.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode hardware IDs — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending