---
test_id: "LIMAS-SUD-979"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Selection Is Purely Visual\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Selection Is Purely Visual"
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

Verify that selection is communicated solely through visual styling (green-ring box-shadow) and not through ARIA attributes or programmatic state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First card is selected (green-ring). No card has aria-selected, aria-pressed, or data-state.

2. Action: Click a different user card.
   Expected Result: New card has green-ring. No card has aria-selected, aria-pressed, or data-state.

# Network Verification

No API requests on selection change.

# Expected Final Result

Selection is communicated purely through box-shadow color; no ARIA or data-state attributes are present on any card.

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

- Live UI observation via Playwright MCP: 0 cards have aria-selected, aria-pressed, data-state, or role; selection communicated via box-shadow rgb(188,255,71) only.