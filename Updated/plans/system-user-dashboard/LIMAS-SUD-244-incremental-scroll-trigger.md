---
test_id: "LIMAS-SUD-244"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Incremental Loading\" → \"Scroll Triggers Additional Load\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Incremental Loading"
action: "Scroll Triggers Additional Load"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-244-incremental-scroll-trigger.spec.ts"
---

# Purpose

Verify that scrolling the "More requests will load automatically." note into the viewport triggers additional data loading.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are visible.
- The load-more note is present and the loaded count is less than the total count.
- The initial processed records API response has returned.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed record cards are visible with the load-more note below them.

2. Action: Capture the initial loaded count, then scroll the load-more note into the viewport.
   Expected Result: Additional API requests fire and the loaded count increases from its initial value.

# Network Verification

- Request URL: `/limas/api/request/processed?page={N}&size={const}`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: More processed record cards appear below the previously visible cards.

# Expected Final Result

Scrolling the load-more note into view triggers additional processed record loading, confirming the infinite-scroll behavior works.

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