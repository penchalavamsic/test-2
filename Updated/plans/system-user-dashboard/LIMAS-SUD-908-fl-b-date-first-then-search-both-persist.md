---
test_id: "LIMAS-SUD-908"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Date First Then Search — Both Persist\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Date First Then Search — Both Persist"
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

Verify that when the date is set first and then a search term is entered, both values persist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set the date to `TEST_FL_FUTURE_DATE` and wait for its GET response.
   Expected Result: Date is visible; GET completed.

3. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Both date (`TEST_FL_FUTURE_DATE`) and search (`TEST_FL_SEARCH_USER_ID`) values are visible in their respective controls. The filtered no-match state is displayed.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5` (1 GET for date)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Both controls show their values; no-match filtered state shown.

# Expected Final Result

Both date and search values persist when set in date-first order.

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

- Live UI observation via Playwright MCP: date then search — both values persisted.