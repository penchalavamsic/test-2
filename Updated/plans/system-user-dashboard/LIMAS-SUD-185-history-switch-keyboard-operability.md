---
test_id: "LIMAS-SUD-185"
title: "To verify the functionality of \"System User Dashboard\" → \"Pending License Requests\" → \"History Switch\" → \"Keyboard Operability\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Pending License Requests"
control: "History Switch"
action: "Keyboard Operability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-185-history-switch-keyboard-operability.spec.ts"
---

# Purpose

Verify that pressing the Space key on the history switch toggles its state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded and the Pending License Requests section is visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The dashboard heading, subtitle, and pending section are visible.

2. Action: Focus the history switch using keyboard Tab navigation.
   Expected Result: The history switch receives focus.

3. Action: Assert the switch has `aria-checked="false"`.
   Expected Result: Switch is initially unchecked.

4. Action: Press the Space key on the focused switch.
   Expected Result: The Space key press completes without error.

5. Action: Assert the switch now has `aria-checked="true"`.
   Expected Result: Switch toggled to checked state via keyboard.

# Network Verification

- Request URL: N/A (keyboard interaction verification only)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Switch toggles via Space key.

# Expected Final Result

Pressing the Space key on the focused history switch toggles it from unchecked to checked.

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