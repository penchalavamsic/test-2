---
test_id: "LIMAS-SUD-977"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Single-Exclusive Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Single-Exclusive Selection"
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

Verify that exactly one user card is selected at all times — clicking a new card deselects the previous one.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime card count from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: First card is selected (green-ring box-shadow).

2. Action: Count cards with selected box-shadow.
   Expected Result: Exactly 1 card has the green-ring box-shadow.

3. Action: Click a different user card.
   Expected Result: Exactly 1 card has the green-ring box-shadow — the new one. The previously selected card reverts to default shadow.

# Network Verification

No API request is expected on selection change.

# Expected Final Result

At all times, exactly one user card is selected; clicking another card re-assigns selection exclusively.

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

- Live UI observation via Playwright MCP: exactly 1 card with green ring at all times; previous card loses ring on new selection.