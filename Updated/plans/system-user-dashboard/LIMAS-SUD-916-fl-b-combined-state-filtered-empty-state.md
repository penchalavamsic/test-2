---
test_id: "LIMAS-SUD-916"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Combined State Shows Filtered Empty State\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Combined State Shows Filtered Empty State"
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

Verify that when both date and search are populated (with zero-data API response), the filtered no-match empty state is shown.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible with default empty state.

2. Action: Set date to `TEST_FL_FUTURE_DATE` (wait for GET), then fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Heading shows "No matching floating licenses found". Subtext shows "Try a different user ID, profile, hardware ID, or role." Both controls show their values.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5` (1 GET for date)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Filtered no-match empty state displayed.

# Expected Final Result

Combined date + search with zero data shows the filtered no-match empty state.

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

- Live UI observation via Playwright MCP: combined state showed filtered empty state.