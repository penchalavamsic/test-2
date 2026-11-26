---
test_id: "LIMAS-SUD-086"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Case sensitivity"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Search with mixed case and observe whether the search is case-insensitive"
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

Verify whether the search field for Pending License Requests performs case-insensitive matching. Type a known user name substring in different casing (e.g., lowercase where original is uppercase) and observe whether the same results appear.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the list is loaded.
- At least one user name in the list contains alphabetic characters with distinguishable case.

# Test Data

No hardcoded user names. The test extracts a substring from a visible user name at runtime and searches with its original case, then with inverted case (e.g., lowercase). Results are compared.

# Steps and Expected Results

1. Action: Capture the first visible user name from the table and extract a substring that contains at least one alphabetic character.
   Expected Result: A non-empty substring with alphabetic characters is captured.

2. Action: Search using the substring in its original casing and capture the loaded count.
   Expected Result: A positive loaded count is obtained.

3. Action: Clear the search field, then search using the same substring with case inverted (e.g., all lowercase).
   Expected Result: The search field receives the inverted-case input.

4. Action: Observe the loaded count after the inverted-case search.
   Expected Result: If case-insensitive, the loaded count matches the original search count. If case-sensitive, the loaded count may be 0 (no-match) or different. The test documents the observed behavior.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard with Pending License Requests data

# Expected Final Result

The test documents whether the search is case-insensitive. If case-insensitive, both original and inverted casing produce the same loaded count. If case-sensitive, the inverted casing produces fewer or zero results.

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