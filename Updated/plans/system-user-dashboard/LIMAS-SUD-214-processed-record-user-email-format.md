---
test_id: "LIMAS-SUD-214"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Record Card\" → \"User Email Contains @\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Record Card"
action: "User Email Contains @"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-214-processed-record-user-email-format.spec.ts"
---

# Purpose

Verify the user email text within a processed record card contains the @ character.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are visible.
- At least one processed record card is present.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed record cards are visible.

2. Action: Locate the user email text within the User section of each visible processed record card.
   Expected Result: Email text is found for each card.

3. Action: Assert that every email text contains the @ character.
   Expected Result: All user emails contain @.

# Network Verification

- Request URL: N/A (history mode loads processed records)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: All user emails contain @.

# Expected Final Result

Every processed record card displays a user email with a valid-looking format containing @.

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