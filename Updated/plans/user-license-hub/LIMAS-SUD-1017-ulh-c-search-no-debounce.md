---
test_id: "LIMAS-SUD-1017"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search Trigger\" → \"No Client Debounce On Search\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search Trigger"
action: "No Client Debounce On Search"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-search.spec.ts"
---

# Purpose

Verify that the search request fires immediately on each input change — no client-side debounce is applied.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Initial GET to `/api/users/f` completed.

2. Action: Type a single character into the search input and capture the GET request.
   Expected Result: A GET request fires within a short time window (< 500 ms) — no artificial delay.

3. Action: Type additional characters in rapid succession, counting the GET requests.
   Expected Result: Each character triggers its own GET request without debounce.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` set to the current input value after each keystroke
- Visible UI Result: UI updates on each response

# Expected Final Result

No client-side debounce delays the search — each input change triggers an immediate GET.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: each input change sends a new request immediately; no debounce observed.