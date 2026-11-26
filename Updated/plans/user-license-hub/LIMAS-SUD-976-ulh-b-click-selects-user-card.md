---
test_id: "LIMAS-SUD-976"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Click Selects User Card\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Click Selects User Card"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-selection.spec.ts"
---

# Purpose

Verify that clicking a non-selected user card selects it, indicated by the green-ring box-shadow.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.
- First user is auto-selected on load.

# Test Data

Use environment variables and the authenticated fixture. Runtime user index from the DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user and license loads.
   Expected Result: User cards rendered, first user auto-selected.

2. Action: Click a different user card (not the first; pick {runtimeUserIndex}).
   Expected Result: Clicked card receives selected box-shadow — `rgb(188, 255, 71) 0px 0px 0px 2px`.

# Network Verification

No API request is expected on selection — verify network is idle after the click.

# Expected Final Result

Clicking a user card applies the green-ring box-shadow, indicating selection.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.
- Use runtime DOM queries for box-shadow assertion.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: clicking any user card applies green-ring box-shadow rgb(188,255,71) 2px.