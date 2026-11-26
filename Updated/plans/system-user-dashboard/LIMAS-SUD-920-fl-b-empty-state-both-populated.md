---
test_id: "LIMAS-SUD-920"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"Empty State With Both Date and Search Populated\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "Empty State With Both Date and Search Populated"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-filtered-zero-state.spec.ts"
---

# Purpose

Verify that when both date and search are populated and the API returns zero data, the filtered no-match empty state is consistently displayed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded with zero data.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Default empty state visible.

2. Action: Set date to `TEST_FL_FUTURE_DATE` (wait for GET), then fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Both controls show values. "No matching floating licenses found" heading displayed. "Try a different user ID, profile, hardware ID, or role." subtext displayed. No license cards appear. No pagination or action buttons.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Filtered empty state shown, no cards.

# Expected Final Result

Both controls populated + zero API data = filtered no-match empty state with no cards.

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

- Live UI observation via Playwright MCP: both populated → filtered empty state.