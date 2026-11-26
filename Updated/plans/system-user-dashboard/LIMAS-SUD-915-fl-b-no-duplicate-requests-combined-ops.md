---
test_id: "LIMAS-SUD-915"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"No Duplicate Requests During Combined Operations\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "No Duplicate Requests During Combined Operations"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-combined-filters.spec.ts"
---

# Purpose

Verify that combined date and search operations do not produce duplicate API requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Start tracking all `/api/flicense/` requests. Set date to `TEST_FL_FUTURE_DATE`, then fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Exactly 1 GET from the date change. 0 additional GETs from search. Total: exactly 1 new GET request.

3. Action: Clear search, then clear date (wait for date-clear GET).
   Expected Result: Search clear triggers 0 GETs. Date clear triggers exactly 1 GET (with default date). No duplicate requests.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Each operation produces the expected single GET; no duplicates.

# Expected Final Result

Combined operations never produce duplicate requests — each date change produces exactly 1 GET, search operations produce 0.

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

- Live UI observation via Playwright MCP: no duplicate API calls during combined operations.