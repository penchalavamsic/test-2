---
test_id: "LIMAS-SUD-206"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"No Duplicate Records After Re-Search\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "No Duplicate Records After Re-Search"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-206-history-search-no-duplicate.spec.ts"
---

# Purpose

Verify that after clearing search and re-searching with the same term, no duplicate records appear in the list.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.
- At least one record contains a known searchable substring.

# Test Data

Use environment variables and the authenticated fixture. Extract a visible substring from a loaded record at runtime.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible.

2. Action: Type a matching search substring and record the visible records and their count.
   Expected Result: Filtered records visible; count and record texts recorded.

3. Action: Clear the search field completely.
   Expected Result: All original records restored.

4. Action: Type the same search substring again.
   Expected Result: Filtering occurs again.

5. Action: Assert the visible record count equals the count from step 2.
   Expected Result: Same count — no duplicates.

6. Action: Assert each visible record text appears only once (no duplicate entries).
   Expected Result: No record text is repeated in the visible list.

# Network Verification

- Request URL: N/A (client-side filtering)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Filtering is idempotent — no duplicate records after clearing and re-searching.

# Expected Final Result

Clearing and re-searching produces the same result set without any duplicate records.

# Classification

- Read-only
- Negative

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