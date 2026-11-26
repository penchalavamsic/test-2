---
test_id: "LIMAS-SUD-245"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Incremental Loading\" → \"Next Page API Request Fires\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Incremental Loading"
action: "Next Page API Request Fires"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-245-incremental-next-page-api.spec.ts"
---

# Purpose

Verify that scrolling to the load-more note triggers a GET request to the next page of processed records with the expected URL pattern.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are visible.
- The load-more note is present and the loaded count is less than the total count.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed record cards are visible.

2. Action: Scroll the load-more note into the viewport and monitor outgoing network requests.
   Expected Result: A GET request to `/limas/api/request/processed?page={NEXT}&size={const}` fires with a page number greater than the initial page.

# Network Verification

- Request URL: `/limas/api/request/processed?page={NEXT}&size={const}`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: The next page GET request fires and returns a 200 response.

# Expected Final Result

Scrolling triggers a GET request for the next processed-records page, confirming the paginated incremental loading mechanism.

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