---
test_id: "LIMAS-SUD-884"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Network\" → \"Single Request per Card Selection\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Network"
action: "Single Request per Card Selection"
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

Verify that exactly one GET request is sent per Floating Licenses card selection — no duplicates and no POST/PUT/PATCH/DELETE.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, set up request tracking for the flicense endpoint.
   Expected Result: Request tracking is initialized.

2. Action: Click the Floating Licenses card, wait for the flicense response.
   Expected Result: Exactly one GET request is tracked.

3. Action: Verify no POST, PUT, PATCH, or DELETE requests were made to the flicense endpoint.
   Expected Result: Only GET requests are observed.

# Network Verification

- Request URL: `**/api/flicense/ex/**`
- HTTP Method: GET (exactly 1)
- Expected Status: 200
- Payload Presence: Empty body (Content-Length: 0)
- Visible UI Result: Single GET request per card selection.

# Expected Final Result

Exactly one GET request is sent per Floating Licenses card click; no data-changing methods are used.

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