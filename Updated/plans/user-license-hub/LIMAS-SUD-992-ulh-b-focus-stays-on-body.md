---
test_id: "LIMAS-SUD-992"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Focus Stays On Body After Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Focus Stays On Body After Selection"
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

Verify that after clicking a user card to select it, focus does not move to the card — `document.activeElement` remains `BODY`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Evaluate `document.activeElement` and ensure it is `BODY`.
   Expected Result: Active element is `BODY` (not any card or input).

3. Action: Click a user card to select it.
   Expected Result: The card becomes selected (green ring), but `document.activeElement` remains `BODY`.

# Network Verification

No API requests.

# Expected Final Result

Selection by click does not move focus — `document.activeElement` stays `BODY` before and after selection changes.

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

- Live UI observation via Playwright MCP: document.activeElement is BODY after selection.