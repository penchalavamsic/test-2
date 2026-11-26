---
test_id: "LIMAS-SUD-978"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Any Sub-Element Click Triggers Selection\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Any Sub-Element Click Triggers Selection"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that clicking any child element inside a user card (name h3, email text, badge) triggers selection of that card.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime card sub-elements from DOM.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded, first user auto-selected.

2. Action: Click the name (h3) of a different user card.
   Expected Result: That card becomes selected (green-ring box-shadow).

3. Action: Click the email text of yet another user card.
   Expected Result: That card becomes selected.

4. Action: Click the license-count badge on yet another user card.
   Expected Result: That card becomes selected.

# Network Verification

No API requests on any of these clicks.

# Expected Final Result

Clicking any sub-element within a user card (name, email, badge area) triggers card selection.

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

- Live UI observation via Playwright MCP: clicking card body, text, or badge all trigger selection.