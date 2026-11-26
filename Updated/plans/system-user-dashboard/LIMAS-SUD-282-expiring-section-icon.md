---
test_id: "LIMAS-SUD-282"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Section Icon" → "Visible Content in Container""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Section Icon"
action: "Visible Content in Container"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-282-expiring-section-icon.spec.ts"
---

# Purpose

Verify that the Expiring Licenses section container has visible content (icon or graphic element) after card selection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded and the Expiring Licenses card has been clicked.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and click the Expiring Licenses summary card.
   Expected Result: The Expiring Licenses section appears.

2. Action: Inspect the section container for visible child content near the heading (icon, image, or decorative element).
   Expected Result: The section container has visible content (non-empty rendering).

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Section container has visible content.

# Expected Final Result

The Expiring Licenses section container has visible content after selection.

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
