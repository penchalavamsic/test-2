---
test_id: "LIMAS-SUD-859"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Maint-to-Exp Uses /flconfig/e/ Endpoint\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Maint-to-Exp Uses /flconfig/e/ Endpoint"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec.ts"
---

# Purpose

Verify that switching from Maintenance to Expiration with a date set uses the `/limas/api/flconfig/e/` endpoint.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Maintenance radio selected, date is populated.

# Test Data

Use environment variables and the authenticated fixture. Past date is generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, click Maintenance radio, wait for the maintenance GET, fill date with a past date, wait for the maintenance date GET.
   Expected Result: Maintenance GET to `/limas/api/flconfig/m/{past-date}/{userId}?page=0&size=5` completes.

2. Action: Click the Expiration radio button and wait for the API response.
   Expected Result: A GET to `/limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5` is observed, not an `/flconfig/m/` request.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: The expiration endpoint is used when switching tabs with a date set.

# Expected Final Result

Switching from Maintenance to Expiration with a date set triggers the `/flconfig/e/` endpoint.

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