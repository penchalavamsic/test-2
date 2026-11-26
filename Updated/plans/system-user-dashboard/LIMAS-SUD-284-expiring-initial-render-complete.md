---
test_id: "LIMAS-SUD-284"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Initial Render" → "Heading Subtitle and Count All Visible""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Initial Render"
action: "Heading Subtitle and Count All Visible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-284-expiring-initial-render-complete.spec.ts"
---

# Purpose

Verify that after clicking the Expiring Licenses card, the heading, subtitle, and count text are all visible simultaneously.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses card has been clicked.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and click the Expiring Licenses summary card.
   Expected Result: The Expiring Licenses section appears.

2. Action: Assert the heading "Expiring Licenses" is visible.
   Expected Result: Heading is visible.

3. Action: Assert the subtitle "Review and extend licenses approaching expiration." is visible.
   Expected Result: Subtitle is visible.

4. Action: Assert the count text (e.g., "53 loaded - 53 total") is visible.
   Expected Result: Count text is visible.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Heading, subtitle, and count all present.

# Expected Final Result

Heading, subtitle, and count text are all visible after section render.

# Classification

- Read-only
- Visual

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
