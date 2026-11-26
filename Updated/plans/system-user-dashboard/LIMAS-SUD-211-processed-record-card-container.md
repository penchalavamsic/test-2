---
test_id: "LIMAS-SUD-211"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Record Card\" → \"Card Container Rendered\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Record Card"
action: "Card Container Rendered"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-211-processed-record-card-container.spec.ts"
---

# Purpose

Verify each processed record renders as a visible card container with 3 distinct sections: User, Feature, and Hardware / Created.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are visible.
- At least one processed record card is present.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: At least one processed record card is visible.

2. Action: Inspect the first processed record card's structure.
   Expected Result: The card is a visible container element.

3. Action: Verify the card contains exactly 3 sections labeled "User", "Feature", and "Hardware / Created".
   Expected Result: All three section labels are present as text within the card.

# Network Verification

- Request URL: N/A (history mode loads processed records)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Processed record cards are rendered with 3 labeled sections.

# Expected Final Result

Each processed record renders as a visible card with User, Feature, and Hardware / Created sections.

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