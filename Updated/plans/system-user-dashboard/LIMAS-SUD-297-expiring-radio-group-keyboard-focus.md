---
test_id: "LIMAS-SUD-297"
title: "To verify the functionality of "System User Dashboard" → "Expiring Licenses" → "Radio Group" → "Keyboard Focus""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Licenses"
control: "Radio Group"
action: "Keyboard Focus"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-297-expiring-radio-group-keyboard-focus.spec.ts"
---

# Purpose

Verify that both radios in the Filter by group are keyboard-focusable (via Tab key).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard is loaded, Expiring Licenses card has been clicked, and section is rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and click the Expiring Licenses summary card.
   Expected Result: The Expiring Licenses section appears.

2. Action: Press Tab to move focus to the Filter by group.
   Expected Result: Focus reaches the radio group.

3. Action: Assert the "Expiration" radio receives focus and shows a focus indicator.
   Expected Result: Expiration radio is keyboard-focused.

4. Action: Press Tab again to move to the next radio.
   Expected Result: Focus moves to the "Maintenance" radio.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Both radios are keyboard-focusable.

# Expected Final Result

Both radios are reachable via keyboard focus.

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
