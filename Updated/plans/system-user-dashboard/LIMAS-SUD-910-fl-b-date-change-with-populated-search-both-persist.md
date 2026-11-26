---
test_id: "LIMAS-SUD-910"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Date Change With Populated Search — Both Persist\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Date Change With Populated Search — Both Persist"
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

Verify that when both date and search are already set, changing the date to a new value preserves the search text.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_SEARCH_USER_ID`, `TEST_FL_FUTURE_DATE`, and `TEST_FL_CURRENT_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set date to `TEST_FL_FUTURE_DATE`, fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Both controls show their values.

3. Action: Change the date to `TEST_FL_CURRENT_DATE` while capturing the response.
   Expected Result: After the GET completes, the date shows `TEST_FL_CURRENT_DATE` and the search still shows `TEST_FL_SEARCH_USER_ID`. Both persist.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: New date and original search both visible.

# Expected Final Result

Changing the date while search is populated preserves both values.

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

- Live UI observation via Playwright MCP: date change with populated search — both persisted.