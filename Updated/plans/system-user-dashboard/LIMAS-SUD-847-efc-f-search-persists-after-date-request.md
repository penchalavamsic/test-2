---
test_id: "LIMAS-SUD-847"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Search Persists After Date Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Search Persists After Date Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec.ts"
---

# Purpose

Verify that the search input value remains populated after filling a date triggers an API response when search is filled first.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture. Past date and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with a runtime-generated query string.
   Expected Result: Search input displays the query string.

2. Action: Fill Expires until with a past date, wait for the date-triggered GET to complete.
   Expected Result: The search input still contains the same query string value.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Search value is unchanged after the date-triggered API response.

# Expected Final Result

Search input value persists after filling a date triggers an API response (search-first order).

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