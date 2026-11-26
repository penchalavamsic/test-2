---
test_id: "LIMAS-SUD-195"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Partial Substring Match\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Partial Substring Match"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-195-history-search-partial-match.spec.ts"
---

# Purpose

Verify that typing a partial substring of a loaded processed record matches via contains logic.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.
- At least one loaded record contains text from which a partial substring can be extracted.

# Test Data

Use environment variables and the authenticated fixture. Extract a partial substring from a visible record at runtime.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible with loaded count > 0.

2. Action: Extract a partial substring (e.g., first 3-4 characters of a visible text field) from a loaded record.
   Expected Result: A partial substring is captured.

3. Action: Type the partial substring into the history search field.
   Expected Result: The search field contains the typed value.

4. Action: Assert that at least one record is still visible and its text contains the partial substring.
   Expected Result: Records containing the partial substring are still visible via contains matching.

# Network Verification

- Request URL: N/A (client-side filtering)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Records whose text contains the partial substring remain visible.

# Expected Final Result

Partial substring search uses contains matching — records whose visible text contains the partial substring remain displayed.

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