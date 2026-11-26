---
test_id: "LIMAS-SUD-268"
title: "To verify the functionality of \"System User Dashboard\" → \"Processed License Requests\" → \"History Switch\" → \"Keyboard Deactivation\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Processed License Requests"
control: "History Switch"
action: "Keyboard Deactivation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-268-keyboard-deactivation.spec.ts"
---

# Purpose

Verify that pressing Space or Enter on the checked history switch toggles it to the unchecked state via keyboard interaction.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The dashboard is loaded with history mode active and the switch is checked.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard, enable history mode via mouse click, and confirm the switch has `aria-checked="true"`.
   Expected Result: History switch is checked.

2. Action: Focus the history switch via keyboard (Tab to it) and press Space.
   Expected Result: The switch receives focus; pressing Space toggles it.

3. Action: Assert the switch now has `aria-checked="false"`.
   Expected Result: Switch is unchecked after Space key.

4. Action: Click the switch to re-enable history, confirm `aria-checked="true"`, then focus it and press Enter.
   Expected Result: Switch is checked; pressing Enter toggles it.

5. Action: Assert the switch now has `aria-checked="false"`.
   Expected Result: Switch is unchecked after Enter key.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Switch toggles from checked to unchecked via Space and Enter.

# Expected Final Result

Both Space and Enter keys reliably toggle the checked history switch to unchecked via keyboard.

# Classification

- Accessibility
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