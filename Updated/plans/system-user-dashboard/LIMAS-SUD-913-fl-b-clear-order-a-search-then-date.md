---
test_id: "LIMAS-SUD-913"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Clear Order A — Search Then Date — Both Empty\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Clear Order A — Search Then Date — Both Empty"
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

Verify that clearing search first then date second results in both controls being empty and default empty state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set both date (`TEST_FL_FUTURE_DATE`) and search (`TEST_FL_SEARCH_USER_ID`).
   Expected Result: Both controls show their values.

3. Action: Clear search first (fill ''), then clear date (fill ''), waiting for the date-clear GET.
   Expected Result: Both controls are empty. 1 GET fires (from date clear with default date). Default empty state is displayed.

# Network Verification

- Request URL: `/api/flicense/ex/{defaultDate}/{profileId}?page=0&size=5` (1 GET from date clear)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Both controls empty, default empty state.

# Expected Final Result

Clearing search then date leaves both empty with default empty state restored.

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

- Live UI observation via Playwright MCP: clear order A (search then date) — both empty, default state.