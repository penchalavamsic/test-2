---
test_id: "LIMAS-SUD-909"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Search First Then Date — Search Persists After GET\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Search First Then Date — Search Persists After GET"
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

Verify that when the search is entered first and then the date is changed, the search value persists after the date's GET request completes.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_SEARCH_USER_ID` and `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Search value is visible.

3. Action: Set the date to `TEST_FL_FUTURE_DATE` while capturing the API response.
   Expected Result: The date GET fires and completes. After the response, the search input still contains `TEST_FL_SEARCH_USER_ID`.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Search value persists across the date-triggered GET.

# Expected Final Result

Search value is preserved when a date change triggers an API request.

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

- Live UI observation via Playwright MCP: Search persisted across date GET.