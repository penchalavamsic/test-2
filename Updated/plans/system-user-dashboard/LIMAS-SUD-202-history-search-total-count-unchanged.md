---
test_id: "LIMAS-SUD-202"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Total Count Unchanged\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Total Count Unchanged"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-202-history-search-total-count-unchanged.spec.ts"
---

# Purpose

Verify the total processed count never changes during search filtering — it remains constant.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible with a "N loaded·{total} total processed" text.

2. Action: Record the total processed count value.
   Expected Result: Baseline total count is captured.

3. Action: Type a search substring that filters the list.
   Expected Result: Filtering occurs; loaded count changes.

4. Action: Assert the total processed count text remains identical to the baseline value.
   Expected Result: Total count is unchanged after filtering.

5. Action: Clear the search field.
   Expected Result: Records are restored.

6. Action: Assert the total processed count is still identical to the baseline.
   Expected Result: Total count remains constant throughout the search/clear cycle.

# Network Verification

- Request URL: N/A (client-side filtering)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Total count text never changes.

# Expected Final Result

The total processed count remains constant during search, filtering, and clearing — only the loaded count changes.

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