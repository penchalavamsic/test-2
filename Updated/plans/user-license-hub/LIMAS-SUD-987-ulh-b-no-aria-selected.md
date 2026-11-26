---
test_id: "LIMAS-SUD-987"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"No aria-selected On Cards\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "No aria-selected On Cards"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-semantics.spec.ts"
---

# Purpose

Verify that user cards do not use `aria-selected` to communicate selection state — selection is purely visual.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First card is auto-selected (green ring).

2. Action: Check all visible user cards for `aria-selected` attribute.
   Expected Result: 0 cards have `aria-selected` — neither `true` nor `false`.

3. Action: Click a different user card to change selection.
   Expected Result: Still 0 cards have `aria-selected`.

# Network Verification

No API requests.

# Expected Final Result

No user card exposes selection state via `aria-selected`.

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

- Live UI observation via Playwright MCP: 0 cards have aria-selected.