---
test_id: "LIMAS-SUD-1021"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search States\" → \"No-Match Search Displays Empty State\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search States"
action: "No-Match Search Displays Empty State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search-states.spec.ts"
---

# Purpose

Verify that searching with a term that matches no users displays the "No users found" message, hides user cards, hides pagination, and clears the license panel.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use a deliberately non-matching search term generated at runtime (e.g., a random string).

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded with cards.

2. Action: Type a non-matching search term and wait for the GET response.
   Expected Result: "No users found" message is displayed; no user cards rendered.

3. Action: Verify pagination and license panel states.
   Expected Result: No pagination summary visible; license panel shows empty/no-user state.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` with non-matching term
- Visible UI Result: "No users found", no cards, no pagination

# Expected Final Result

No-match search correctly shows the empty state across both panels.

# Classification

- Read-only
- Negative
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: "zzznoexist9999" → "No users found", no cards, no pagination, license panel empty.