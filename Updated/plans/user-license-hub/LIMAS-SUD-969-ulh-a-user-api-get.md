---
test_id: "LIMAS-SUD-969"
title: "To verify the functionality of \"User & License Hub\" → \"Network\" → \"User API\" → \"GET /api/users/f\""
module: "User & License Hub"
page: "User & License Hub"
section: "Network"
control: "User API"
action: "GET /api/users/f"
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

Verify that navigating to User & License Hub triggers a GET request to `/api/users/f`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Network interception is active.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Authenticate and prepare a response promise for `/api/users/f` GET requests.
   Expected Result: The promise is set up.

2. Action: Navigate to User & License Hub.
   Expected Result: A GET request to a URL containing `/api/users/f` is received.

# Network Verification

- Request URL: `**/api/users/f**`
- HTTP Method: GET
- Expected Status: 200

# Expected Final Result

The user list data is fetched via GET to `/api/users/f`.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP