---
test_id: "LIMAS-SUD-263"
title: "To verify the functionality of \"System User Dashboard\" → \"History Switch\" → \"Route\" → \"Preservation After Toggle Off\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "History Switch"
control: "Route"
action: "Preservation After Toggle Off"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-263-route-preservation-after-toggle.spec.ts"
---

# Purpose

Verify that the URL remains `/system-user-dashboard` after toggling the history switch off — no route change or navigation occurs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded with history mode active.
- The current route is `/system-user-dashboard`.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and assert the current URL ends with `/system-user-dashboard`.
   Expected Result: URL is `/system-user-dashboard`.

2. Action: Click the history switch to toggle it off.
   Expected Result: Switch becomes unchecked; pending content appears.

3. Action: Assert the current URL still ends with `/system-user-dashboard`.
   Expected Result: Route is unchanged.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: URL remains `/system-user-dashboard`.

# Expected Final Result

The browser URL stays at `/system-user-dashboard` after toggling the history switch off.

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