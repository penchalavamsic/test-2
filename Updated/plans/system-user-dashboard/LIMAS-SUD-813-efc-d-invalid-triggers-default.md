---
test_id: "LIMAS-SUD-813"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Expires Until Date Behavior\" → \"Invalid Text Triggers Default Date Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Expires Until Date Behavior"
action: "Invalid Text Triggers Default Date Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-813-efc-d-invalid-triggers-default.spec.ts"
---

# Purpose

Verify that after invalid text is rejected, the resulting request uses the default current date.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded, EFC section selected, Expiration radio checked, a valid date is present.

# Test Data

Use environment variables and the authenticated fixture. Dates used are runtime-generated via `new Date()`. Reference `TEST_EFC_CURRENT_DATE`.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, fill invalid text into the date input.
   Expected Result: Browser rejects the text, value is cleared.

2. Action: Inspect the network request URL triggered by the change handler.
   Expected Result: Request URL contains the current date as the date parameter.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{current-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Response shape: { content: [...], totalElements: N, empty: true|false }

# Expected Final Result

Invalid text input triggers a request with the default current date.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode dates.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Network observation

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
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"