---
test_id: "LIMAS-SUD-912"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Clear Date With Populated Search — Search Stays\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Clear Date With Populated Search — Search Stays"
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

Verify that clearing the date control while search is populated preserves the search value and triggers a GET with the default date.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set date to `TEST_FL_FUTURE_DATE`, wait for response. Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Both controls show their values.

3. Action: Clear the date control (fill with empty string) while capturing the API response.
   Expected Result: 1 GET fires with the application default date. After response, search still shows `TEST_FL_SEARCH_USER_ID`. Date is empty. Filtered state is re-evaluated.

# Network Verification

- Request URL: `/api/flicense/ex/{defaultDate}/{profileId}?page=0&size=5` (1 GET with default date)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Date empty, search value preserved.

# Expected Final Result

Clearing date independently preserves the search value.

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

- Live UI observation via Playwright MCP: clearing date with populated search — search stayed, 1 GET fired.