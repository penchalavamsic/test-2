---
test_id: "LIMAS-SUD-741"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Maintenance Radio\" → \"Click on Already-Checked\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Maintenance Radio"
action: "Click on Already-Checked"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-741-efc-c-maintenance-radio-click-on-checked.spec.ts"
---

# Purpose

Verify clicking already-checked Maintenance radio does not trigger an API request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded, EFC section selected, Maintenance radio selected, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click the already-checked Maintenance radio.
   Expected Result: No new API request is triggered.
# Network Verification

- Request URL: `GET /limas/api/flconfig/{e|m}/{date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Response shape: { content: [], totalElements: 0, empty: true }

# Expected Final Result

Click on already-checked Maintenance triggers no API request.

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

# Evidence Source

- Network observation

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP and source code analysis.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode user names, emails, request IDs, license IDs, hardware IDs, dates, User Groups, Profiles, Roles, feature names, versions, or local paths.
6. Use environment variables, access-profiles.json, runtime fixtures, or test-data configuration.
7. Select exactly one access profile: SUPER_USER_ADMIN_USER
8. Keep every plan shareable between environments and team members.
9. CI/CD owns test execution.
10. Source-code-verified: DashboardSection.tsx and LoadingSpinner.tsx define loading behavior.
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
