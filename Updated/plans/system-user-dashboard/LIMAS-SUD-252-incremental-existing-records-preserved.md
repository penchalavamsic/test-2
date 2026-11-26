---
test_id: "LIMAS-SUD-252"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"Incremental Loading\" → \"Existing Records Preserved After Load\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "Incremental Loading"
action: "Existing Records Preserved After Load"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-252-incremental-existing-records-preserved.spec.ts"
---

# Purpose

Verify that existing processed record cards remain visible and unchanged after incremental loads append new records.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are visible.
- The load-more note is present and the loaded count is less than the total count.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and wait for processed records to load.
   Expected Result: Processed record cards are visible.

2. Action: Capture identifying content (e.g., user name, feature name) from the first few visible cards, then scroll to trigger incremental loads.
   Expected Result: The initially visible cards are still present in the DOM with the same identifying content.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Initially rendered cards remain in the list after new records are appended.

# Expected Final Result

Existing processed record cards are preserved and remain visible after incremental loads, confirming that appending does not replace the list.

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