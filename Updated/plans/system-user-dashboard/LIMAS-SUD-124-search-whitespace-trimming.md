---
test_id: "LIMAS-SUD-124"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Leading and trailing whitespace handling"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that search input with leading and trailing whitespace is trimmed before matching"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
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

Verify that the search field handles leading and trailing whitespace by either trimming it or producing the same results as the trimmed search term. This confirms the search behaves predictably when users accidentally include extra spaces.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded with at least one visible row.

# Test Data

No hardcoded user names. A search substring is extracted at runtime from a visible row. The test uses the same substring with leading and trailing spaces added.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the list is loaded.
   Expected Result: The count display shows a positive loaded count.

2. Action: Extract a search substring from the first visible row and perform a normal search to capture the loaded count.
   Expected Result: A loaded count ≥ 1 is captured as `trimmedCount`.

3. Action: Clear the search field and enter the same substring but with leading and trailing spaces (e.g., "  searchterm  ").
   Expected Result: The search field accepts the input.

4. Action: Observe the loaded count display.
   Expected Result: Either the loaded count matches `trimmedCount` (trimming is applied) or the count is 0 (whitespace is NOT trimmed). The test documents the observed behavior.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

The behavior of leading/trailing whitespace is observed and documented — either results match the trimmed search (whitespace is stripped) or zero results are returned (whitespace is treated literally).

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode user names — extract at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending