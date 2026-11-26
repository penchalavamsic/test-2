---
test_id: "LIMAS-SUD-889"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Future Date Triggers GET\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Future Date Triggers GET"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts"
---

# Purpose

Verify that entering a future date (`TEST_FL_FUTURE_DATE`) triggers a GET request to the `/api/flicense/ex/` endpoint.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided future date via `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section shows default empty state.

2. Action: Fill the Expires before date input with `TEST_FL_FUTURE_DATE` while capturing the next API response.
   Expected Result: Exactly one GET request to `/api/flicense/ex/` is fired. Response has status 200. The URL-encoded date appears in the request path.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Response may have Content-Length: 0
- Visible UI Result: Date value persists after the request completes.

# Expected Final Result

Entering a future date triggers exactly one GET to `/api/flicense/ex/` with status 200.

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

- Live UI observation via Playwright MCP: future date `2027-06-15` → GET 200 OK.