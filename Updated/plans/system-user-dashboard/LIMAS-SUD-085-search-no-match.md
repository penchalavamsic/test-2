---
test_id: "LIMAS-SUD-085"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "No-match state"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search for a nonexistent string and verify the empty/no-match state"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that searching for a string that does not match any user name in the Pending License Requests list results in a no-match state — zero loaded results and an appropriate empty-state or zero-count display.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and its list is loaded.

# Test Data

A generated nonexistent string such as a UUID or random alphanumeric string that is extremely unlikely to match any real user name. No real user data is used.

# Steps and Expected Results

1. Action: Navigate to the dashboard and open the Pending License Requests tab. Confirm the list is loaded with a positive loaded count.
   Expected Result: The count display shows a positive loaded count.

2. Action: Generate a nonexistent search string (e.g., a UUID like "00000000-0000-0000-0000-000000000000" or random string).
   Expected Result: A non-empty string guaranteed not to match any real user name.

3. Action: Type the nonexistent string into the search field.
   Expected Result: The search field receives the input.

4. Action: Observe the results area.
   Expected Result: The loaded count in the count display is "0 loaded", or a "No results" / empty table message is visible. No rows remain in the table body.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard with Pending License Requests data

# Expected Final Result

Searching for a nonexistent string produces zero loaded results. Either the count display shows "0 loaded" and/or an empty/no-results state is visible.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Use a generated nonexistent string — do not guess a "maybe not present" name.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending