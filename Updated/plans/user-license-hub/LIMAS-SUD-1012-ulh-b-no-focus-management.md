---
test_id: "LIMAS-SUD-1012"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"No Focus Management On Selection Change\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "No Focus Management On Selection Change"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts"
---

# Purpose

Verify that focus is not programmatically moved to the selected card when selection changes — there is no focus management for keyboard users.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: `document.activeElement` is `BODY`.

2. Action: Click a user card to select it.
   Expected Result: Card is selected. `document.activeElement` is still `BODY` — focus did not move to the card.

3. Action: Click a second user card.
   Expected Result: Second card selected. `document.activeElement` is still `BODY`.

# Network Verification

No API requests.

# Expected Final Result

No focus management occurs on selection change — `document.activeElement` remains `BODY`, meaning keyboard-only users cannot track selection through focus.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: activeElement stays BODY; no focus moves to cards after selection.