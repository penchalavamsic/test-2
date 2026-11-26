---
test_id: "LIMAS-SUD-971"
title: "To verify the functionality of \"User & License Hub\" → \"Network\" → \"User API\" → \"Response 200 OK JSON\""
module: "User & License Hub"
page: "User & License Hub"
section: "Network"
control: "User API"
action: "Response 200 OK JSON"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-network.spec.ts"
---

# Purpose

Verify that the user API response returns HTTP 200 with JSON content type.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Network interception is active.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Authenticate and navigate to User & License Hub via sidebar, capturing the user API response.
   Expected Result: A response is received.

2. Action: Verify the response status and content type.
   Expected Result: Status is 200 and the content-type header includes `application/json`.

# Network Verification

- Request URL: `**/api/users/f**`
- HTTP Method: GET
- Expected Status: 200
- Expected Content-Type: application/json

# Expected Final Result

The user API returns a successful JSON response.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode response body values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP