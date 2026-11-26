---
test_id: "LIMAS-SUD-911"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Combined Filters\" → \"Clear Search With Populated Date — Date Stays\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Combined Filters"
action: "Clear Search With Populated Date — Date Stays"
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

Verify that clearing the search field while a date is populated does not affect the date value and triggers no API request.

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

3. Action: Clear the search field (fill with empty string).
   Expected Result: Search is empty. Date still shows `TEST_FL_FUTURE_DATE`. No API request is triggered. Default empty state returns (since API data is empty).

# Network Verification

- Request URL: N/A (no request expected on search clear)
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Date stays, search is empty, default empty state.

# Expected Final Result

Clearing search independently leaves the date value intact.

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

- Live UI observation via Playwright MCP: clearing search with date populated — date stayed.