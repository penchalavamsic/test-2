---
test_id: "LIMAS-SUD-1023"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search States\" → \"Clearing Search Restores Default List\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search States"
action: "Clearing Search Restores Default List"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search-states.spec.ts"
---

# Purpose

Verify that clearing the search input (setting it to empty) triggers a GET request with an empty `firstName` parameter and restores the default user list, pagination, and first-user auto-selection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with a search active.

# Test Data

Use environment variables and the authenticated fixture. Use a runtime-known search term.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default list loaded.

2. Action: Type a search term, wait for filtered results.
   Expected Result: Filtered results visible.

3. Action: Clear the search input, capture the GET request.
   Expected Result: GET fires with `firstName=` (empty); default list restores.

4. Action: Verify pagination and first-user auto-selection.
   Expected Result: Pagination summary restored to default range; first user auto-selected; license panel synchronized.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName=` (empty) with full `groupids` list
- Visible UI Result: Default list, pagination, and selection restored

# Expected Final Result

Clearing search restores the complete default state — list, pagination, and selection.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names or search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: clearing input → GET with empty `firstName` → "Showing 1–20 of 1823" restores.