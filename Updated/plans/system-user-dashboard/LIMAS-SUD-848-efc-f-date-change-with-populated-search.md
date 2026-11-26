---
test_id: "LIMAS-SUD-848"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Combined Date and Search\" → \"Date Change With Populated Search\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Combined Date and Search"
action: "Date Change With Populated Search"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec.ts"
---

# Purpose

Verify that changing the date while search is populated triggers one GET for the new date and preserves the search value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, both date and search are populated.

# Test Data

Use environment variables and the authenticated fixture. Two past dates and search text are generated at runtime.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with a runtime-generated query string, fill Expires until with a first past date, wait for the API response.
   Expected Result: Search and date are both populated.

2. Action: Change Expires until to a second past date and wait for the API response.
   Expected Result: Exactly one GET to `/limas/api/flconfig/e/{second-past-date}/{userId}?page=0&size=5` is observed. The search input still contains the original query string.

# Network Verification

- Request URL: `GET /limas/api/flconfig/e/{second-past-date}/{userId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Search value is preserved after date change.

# Expected Final Result

Changing the date with populated search triggers one GET for the new date and preserves the search value.

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