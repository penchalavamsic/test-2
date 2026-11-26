---
test_id: "LIMAS-SUD-259"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"Search\" → \"Restoration After History Disabled\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "Search"
action: "Restoration After History Disabled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-259-pending-search-restoration.spec.ts"
---

# Purpose

Verify that after toggling the history switch off, the search field with placeholder text "Search license requests..." is visible and enabled for pending mode queries.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded with history mode active and processed records visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode, and confirm processed records are visible.
   Expected Result: History mode is active.

2. Action: Click the history switch to toggle it off.
   Expected Result: Switch becomes unchecked.

3. Action: Assert that the search input with placeholder "Search license requests..." is visible.
   Expected Result: The pending search field is displayed.

4. Action: Assert the search input is enabled (not disabled).
   Expected Result: The search input accepts focus and text entry.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Pending search field restored and enabled.

# Expected Final Result

The "Search license requests..." field is visible and enabled after history mode is disabled.

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