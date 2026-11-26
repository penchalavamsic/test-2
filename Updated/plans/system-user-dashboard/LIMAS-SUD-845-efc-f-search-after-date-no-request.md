---
test_id: "LIMAS-SUD-845"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Search After Date Produces No Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Search After Date Produces No Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-845-efc-f-search-after-date-no-request.spec.ts"
---

# Purpose

Verify that filling the search field after a date is already set produces no additional flconfig API request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture. Past date and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill Expires until with a past date, wait for the date-triggered GET to complete.
   Expected Result: Date is set and the date-triggered API response has returned.

2. Action: Fill search with a runtime-generated query string.
   Expected Result: No additional flconfig API request is observed in the network after the search input is filled.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{past-date}/{userId}?page=0&size=5` (date trigger only)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Search text is populated without triggering a new network request.

# Expected Final Result

Search input after a date is set does not trigger an additional flconfig API request.

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