---
test_id: "LIMAS-SUD-991"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Cards Have Null tabIndex\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Cards Have Null tabIndex"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that user cards have `tabIndex=null`, meaning they are not in the normal tab order and not keyboard-reachable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Check the `tabIndex` property of all visible user cards.
   Expected Result: All cards have `tabIndex` of `null` (or `-1`), meaning they are not in the tab sequence.

# Network Verification

No API requests.

# Expected Final Result

User cards are not keyboard-focusable — `tabIndex` is null, excluding them from the natural tab order.

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

- Live UI observation via Playwright MCP: cards have tabIndex=null.