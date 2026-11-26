---
test_id: "LIMAS-SUD-120"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Partial user name search"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search by partial user name — typing a single character from a user name still returns results containing that character"
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

Verify that the search supports partial matching — even a single character from a visible user name returns results. This confirms the search is a substring match rather than requiring exact word or prefix match.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded with at least one visible row.

# Test Data

No hardcoded user names. The test extracts a single character from the first visible user name at runtime.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and confirm the list is loaded.
   Expected Result: The count display shows a positive loaded count and the table has visible data rows.

2. Action: Capture the first visible user name and extract a single alphabetic character from it.
   Expected Result: A single character is extracted from the user name.

3. Action: Type that single character into the search field.
   Expected Result: The search field receives the input.

4. Action: Observe the loaded count display.
   Expected Result: The loaded count is ≥ 1 (since the character appears in at least that user name), confirming partial/substring matching works.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Typing a single character from a visible user name returns at least one result, confirming partial substring search behavior.

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