---
test_id: "LIMAS-SUD-881"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Network\" → \"Card Selection Triggers GET Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Network"
action: "Card Selection Triggers GET Request"
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

Verify that clicking the Floating Licenses summary card triggers a GET request to the flicense endpoint.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The Floating Licenses card is visible.

2. Action: Click the Floating Licenses card and wait for the flicense API response.
   Expected Result: A GET request is sent to `/api/flicense/ex/` and a response is received.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: A GET request is triggered by card selection.

# Expected Final Result

Clicking the Floating Licenses card triggers exactly one GET request to the flicense endpoint.

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