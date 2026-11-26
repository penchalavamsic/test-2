---
test_id: "LIMAS-SUD-883"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Network\" → \"Response 200 with Zero Content-Length\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Network"
action: "Response 200 with Zero Content-Length"
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

Verify that the flicense API response returns HTTP 200 with an empty body (Content-Length: 0).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, click the Floating Licenses card, and capture the API response.
   Expected Result: The response status is 200.

2. Action: Verify the response content-length header or body size.
   Expected Result: The response has Content-Length: 0 or an empty body.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Response status 200 with zero-length body.

# Expected Final Result

The flicense API returns HTTP 200 with Content-Length: 0 (empty body).

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