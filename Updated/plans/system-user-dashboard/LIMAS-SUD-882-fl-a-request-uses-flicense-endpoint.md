---
test_id: "LIMAS-SUD-882"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Network\" → \"Request Uses Flicense Endpoint\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Network"
action: "Request Uses Flicense Endpoint"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts"
---

# Purpose

Verify that the Floating Licenses request targets the `/api/flicense/ex/` endpoint with correct path structure.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, click the Floating Licenses card, and capture the network request URL.
   Expected Result: The request URL contains `/api/flicense/ex/`.

2. Action: Verify the request URL includes a date segment and a numeric user ID segment.
   Expected Result: The URL path follows the pattern `/api/flicense/ex/{date}/{userId}`.

3. Action: Verify the request includes query parameters page=0 and size=5.
   Expected Result: The URL contains `page=0` and `size=5`.

# Network Verification

- Request URL: `**/api/flicense/ex/**?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Request targets the correct flicense endpoint.

# Expected Final Result

The GET request targets `/api/flicense/ex/{date}/{userId}?page=0&size=5`.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not enter a date value.
- Do not enter search text.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP