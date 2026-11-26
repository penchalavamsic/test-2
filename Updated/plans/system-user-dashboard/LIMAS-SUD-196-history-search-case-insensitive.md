---
test_id: "LIMAS-SUD-196"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Case-Insensitive Matching\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Case-Insensitive Matching"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-196-history-search-case-insensitive.spec.ts"
---

# Purpose

Verify that search is case-insensitive — typing an uppercase variant of a loaded record's lowercase text yields the same results.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.
- A loaded record contains lowercase text that can be typed in uppercase.

# Test Data

Use environment variables and the authenticated fixture. Extract a lowercase substring from a visible record at runtime.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible.

2. Action: Extract a lowercase substring from a loaded record and capture the visible result count.
   Expected Result: A lowercase substring and current loaded count are captured.

3. Action: Type the lowercase substring and record the number of visible matching records.
   Expected Result: Matching records are filtered and count is recorded.

4. Action: Clear the search field and type the same substring in UPPERCASE.
   Expected Result: The field contains the uppercase variant.

5. Action: Assert the number of visible matching records equals the count from the lowercase search.
   Expected Result: Same count of matching records for both cases.

# Network Verification

- Request URL: N/A (client-side filtering)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Identical filtering results regardless of letter case.

# Expected Final Result

Search filtering is case-insensitive — uppercase and lowercase variants of the same substring produce identical result sets.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode user names, emails, request IDs, license IDs, hardware IDs, dates, User Groups, Profiles, Roles, feature names, versions, or local paths.
6. Use environment variables, access-profiles.json, runtime fixtures, or test-data configuration.
7. Select exactly one access profile: SUPER_USER_ADMIN_USER
8. Keep every plan shareable between environments and team members.
9. CI/CD owns test execution.
10. The Healer may propose test-only changes later but must not change expected LIMAS behavior.