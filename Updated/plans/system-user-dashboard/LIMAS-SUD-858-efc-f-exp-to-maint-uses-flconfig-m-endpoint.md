---
test_id: "LIMAS-SUD-858"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Exp-to-Maint Uses /flconfig/m/ Endpoint\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Exp-to-Maint Uses /flconfig/m/ Endpoint"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-858-efc-f-exp-to-maint-uses-flconfig-m-endpoint.spec.ts"
---

# Purpose

Verify that switching from Expiration to Maintenance with a date set uses the `/limas/api/flconfig/m/` endpoint.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, date is populated.

# Test Data

Use environment variables and the authenticated fixture. Past date is generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill Expires until with a past date, wait for the expiration GET to complete.
   Expected Result: Expiration GET to `/limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5` completes.

2. Action: Click the Maintenance radio button and wait for the API response.
   Expected Result: A GET to `/limas/api/flconfig/m/{current-date}/{userId}?page=0&size=5` is observed, not an `/flconfig/e/` request.

# Network Verification

- Request URL: `GET /limas/api/flconfig/m/{current-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: The maintenance endpoint is used when switching tabs with a date set.

# Expected Final Result

Switching from Expiration to Maintenance with a date set triggers the `/flconfig/m/` endpoint.

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