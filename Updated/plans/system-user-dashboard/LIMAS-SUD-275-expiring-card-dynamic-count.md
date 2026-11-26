---
test_id: "LIMAS-SUD-275"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Summary Card" → "Dynamic Count Displayed""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Summary Card"
action: "Dynamic Count Displayed"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-275-expiring-card-dynamic-count.spec.ts"
---

# Purpose

Verify that the Expiring Licenses summary card button text includes a numeric count (e.g., "53 Expiring Licenses").

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and summary cards are rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The dashboard heading and summary cards are visible.

2. Action: Locate the Expiring Licenses summary card button.
   Expected Result: The button is found.

3. Action: Assert the button text matches a pattern of one or more digits followed by "Expiring Licenses".
   Expected Result: The accessible name contains a numeric count, e.g., "53 Expiring Licenses".

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: The card accessible name includes a digits-plus-text pattern.

# Expected Final Result

The Expiring Licenses summary card displays a dynamic numeric count in its accessible name.

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
