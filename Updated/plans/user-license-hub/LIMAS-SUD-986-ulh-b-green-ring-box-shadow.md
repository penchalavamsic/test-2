---
test_id: "LIMAS-SUD-986"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Selected Card Green Ring Box-Shadow\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Selected Card Green Ring Box-Shadow"
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

Verify that the selected user card displays a green ring via `box-shadow: rgb(188, 255, 71) 0px 0px 0px 2px`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First card is auto-selected.

2. Action: Get the computed box-shadow of the selected card.
   Expected Result: The box-shadow string contains `rgb(188, 255, 71)` and includes `0px 0px 0px 2px` (the green outline ring).

3. Action: Click a different user card.
   Expected Result: The newly selected card's box-shadow contains `rgb(188, 255, 71)`. The old card's box-shadow no longer contains it.

# Network Verification

No API requests.

# Expected Final Result

The selected card is distinguished by a green ring box-shadow (`rgb(188, 255, 71) 0px 0px 0px 2px`).

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: selected card box-shadow is `rgb(188, 255, 71) 0px 0px 0px 2px` with elevated shadow.