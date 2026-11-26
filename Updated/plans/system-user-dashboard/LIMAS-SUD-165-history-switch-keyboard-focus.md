---
test_id: "LIMAS-SUD-165"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Switch\" → \"Keyboard Focus\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Switch"
action: "Keyboard Focus"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-165-history-switch-keyboard-focus.spec.ts"
---

# Purpose

Verify the history switch can receive keyboard focus via the Tab key.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded and the Pending License Requests section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The dashboard heading, subtitle, and pending section are visible.

2. Action: Press Tab to move focus toward the history switch.
   Expected Result: Focus moves through the document's focus order.

3. Action: Assert that the history switch is focused using `toBeFocused()`.
   Expected Result: The switch receives keyboard focus.

# Network Verification

- Request URL: N/A (keyboard focus verification only)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Switch has focus indicator.

# Expected Final Result

The history switch is reachable and receives focus via keyboard Tab navigation.

# Classification

- Read-only
- Accessibility

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