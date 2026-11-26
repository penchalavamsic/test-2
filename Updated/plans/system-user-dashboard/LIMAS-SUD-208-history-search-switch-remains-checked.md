---
test_id: "LIMAS-SUD-208"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Search\" → \"Switch Remains Checked\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Search"
action: "Switch Remains Checked"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-208-history-search-switch-remains-checked.spec.ts"
---

# Purpose

Verify the history switch remains checked throughout all search operations.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded, history mode is active, and processed records are loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The dashboard heading, subtitle, and pending section are visible.

2. Action: Click the history switch to enable history mode.
   Expected Result: The history switch is checked.

3. Action: Type a search substring into the history search field.
   Expected Result: Filtering occurs.

4. Action: Assert the history switch is still checked.
   Expected Result: Switch remains in checked state.

5. Action: Clear the search field.
   Expected Result: Records restored.

6. Action: Assert the history switch is still checked.
   Expected Result: Switch remains checked throughout all operations.

# Network Verification

- Request URL: N/A (UI state verification only)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: History switch stays checked during search and clear.

# Expected Final Result

The history switch remains in the checked state throughout searching, filtering, and clearing operations.

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