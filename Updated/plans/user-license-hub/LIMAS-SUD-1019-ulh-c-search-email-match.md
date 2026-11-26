---
test_id: "LIMAS-SUD-1019"
title: "To verify the functionality of \"User & License Hub\" → \"User Search\" → \"Search States\" → \"Email Search Via Same Endpoint\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Search"
control: "Search States"
action: "Email Search Via Same Endpoint"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that searching by a value that matches an email in the user list returns the correct user — the search endpoint treats the input as a match across name and email fields.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.
- A runtime-known email domain is available from the visible card data.

# Test Data

Use a visible user's email substring extracted from the DOM at runtime.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Default user list loaded.

2. Action: Extract an email substring from a visible user card, type it into the search input, and wait for the GET response.
   Expected Result: Request sends with `firstName` set to that substring.

3. Action: Verify the results contain the user whose email was used.
   Expected Result: At least one visible card's email text contains the search substring.

# Network Verification

- Request URL: `/api/users/f`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: `firstName` query parameter with email substring
- Visible UI Result: Matching user cards shown

# Expected Final Result

Search by a value that matches an email field returns the correct user — the search spans both name and email.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses or search terms.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: search input sends value as `firstName`; matches across first name and email fields.