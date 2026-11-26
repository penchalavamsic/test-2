---
test_id: "LIMAS-SUD-182"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"Initial Page Size\" → \"Size Param is 20\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Initial Page Size"
action: "Size Param is 20"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "API"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-182-initial-page-size.spec.ts"
---

# Purpose

Verify that the initial processed request uses size=20 in the API query parameters.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded and the Pending License Requests section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The dashboard heading, subtitle, and pending section are visible.

2. Action: Start network route interception for `**/limas/api/request/processed**`.
   Expected Result: Route is intercepted.

3. Action: Click the history switch to enable history mode.
   Expected Result: The history switch is checked and processed view is shown.

4. Action: Assert the intercepted request query parameter "size" equals "20".
   Expected Result: The size query parameter is "20".

# Network Verification

- Request URL: `/limas/api/request/processed`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Query parameter size is 20.

# Expected Final Result

The initial processed license requests API call uses size=20 as the query parameter.

# Classification

- Read-only
- API

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