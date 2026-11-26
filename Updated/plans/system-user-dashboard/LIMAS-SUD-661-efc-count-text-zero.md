---
test_id: "LIMAS-SUD-661"
title: "To verify the functionality of "System User Dashboard" → "Expiring Floating Configurations" → "Count Text" → "Zero Data""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Count Text"
action: "Zero Data Display"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-661-efc-count-text-zero.spec.ts"
---

# Purpose

Verify the count text reads "0 loaded · 0 total configurations" at zero-data state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and summary cards are rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate, click EFC card, wait for data load.
   Expected Result: Section renders.

2. Action: Read the count text.
   Expected Result: Text is "0 loaded · 0 total configurations" (or matches "0 loaded · 0 total configurations" pattern).

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{expirationDate}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Response: `{ content: [], totalElements: 0, empty: true }`
- Visible UI Result: Zero-data state with empty-state messages.

# Expected Final Result

Count text shows "0 loaded · 0 total configurations".

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
11. Plans must use this Jira-style title format:

To verify the functionality of "<Module>" → "<Section>" → "<Control>" → "<Action>"
