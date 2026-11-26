---
test_id: "LIMAS-SUD-817"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Expires Until Date Behavior\" → \"Empty State Wording Unchanged After Date\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Expires Until Date Behavior"
action: "Empty State Wording Unchanged After Date"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-817-efc-d-empty-state-wording-unchanged.spec.ts"
---

# Purpose

Verify that the empty state wording does not change after a date change returns zero results.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded, EFC section selected, Expiration radio checked.

# Test Data

Use environment variables and the authenticated fixture. Dates used are runtime-generated via `new Date()`. Reference `TEST_EFC_CURRENT_DATE`.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, capture the empty state text from the initial zero-data state.
   Expected Result: Empty state text is read and stored.

2. Action: Fill a date, wait for the request to complete with zero results, then capture empty state text again.
   Expected Result: Empty state wording is identical to the initial zero-data state wording.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Response shape: { content: [], totalElements: 0, empty: true }

# Expected Final Result

Empty state wording is unchanged after date change.

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

- Live UI observation

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