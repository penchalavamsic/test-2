---
test_id: "LIMAS-SUD-205"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Initial List Restoration After Clear\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Initial List Restoration After Clear"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-205-history-search-initial-list-restoration.spec.ts"
---

# Purpose

Verify that after clearing the search field, the original loaded processed records return dynamically without requiring a page reload.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed records are visible with initial loaded count.

2. Action: Type a search value that reduces the visible record set.
   Expected Result: Filtered records shown; loaded count reduced.

3. Action: Clear the search field using keyboard (backspace or select-all+delete).
   Expected Result: Search field is empty.

4. Action: Assert that the loaded count returns to the initial value and the previously filtered-out records reappear.
   Expected Result: Original records are restored dynamically — no page refresh or API call.

5. Action: Assert no new network request is triggered by the clear operation.
   Expected Result: Restoration is purely client-side with zero API calls.

# Network Verification

- Request URL: No additional API request triggered.
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Original records reappear dynamically after clearing search.

# Expected Final Result

Clearing the search field dynamically restores all originally loaded processed records without triggering a new API request.

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