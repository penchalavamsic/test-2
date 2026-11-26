---
test_id: "LIMAS-SUD-180"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"Initial Processed API Request\" → \"GET /limas/api/request/processed\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Initial Processed API Request"
action: "GET /limas/api/request/processed"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "API"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-180-initial-processed-api-request.spec.ts"
---

# Purpose

Verify that enabling history triggers a GET request to /limas/api/request/processed?page=0&size=20 returning 200.

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

4. Action: Assert the intercepted request has page=0, size=20 query params and returns HTTP 200.
   Expected Result: Request matches `GET /limas/api/request/processed?page=0&size=20` and response status is 200.

# Network Verification

- Request URL: `/limas/api/request/processed?page=0&size=20`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Response body contains processed license request data.
- Visible UI Result: Processed items rendered after successful API response.

# Expected Final Result

Enabling history mode triggers a successful GET request to /limas/api/request/processed?page=0&size=20 returning 200.

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