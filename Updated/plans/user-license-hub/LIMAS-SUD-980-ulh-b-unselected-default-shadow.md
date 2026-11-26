---
test_id: "LIMAS-SUD-980"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Unselected Card Has Default Shadow\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Unselected Card Has Default Shadow"
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

Verify that unselected user cards have the default subtle box-shadow (not the green ring).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.
- At least 2 user cards are visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards rendered, first card selected.

2. Action: Check the box-shadow of unselected cards (cards 2+).
   Expected Result: Unselected cards do NOT have the green-ring box-shadow `rgb(188, 255, 71) 0px 0px 0px 2px`; they have a different (default) value.

# Network Verification

No API requests.

# Expected Final Result

Only the selected card has the green-ring box-shadow; all other visible cards have the default subtle shadow.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: unselected cards have subtle shadow rgba(0,0,0,0.05) vs selected green ring rgb(188,255,71).