---
test_id: "LIMAS-SUD-922"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Network\" → \"No POST PUT PATCH DELETE During Date and Search Ops\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Network"
action: "No POST PUT PATCH DELETE During Date and Search Ops"
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

Verify that only GET requests are issued for date changes and that no POST, PUT, PATCH, or DELETE methods appear on the `/api/flicense/` path during date and search operations.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided values via `TEST_FL_FUTURE_DATE` and `TEST_FL_SEARCH_USER_ID`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Start tracking all HTTP methods on `/api/flicense/`. Set date to `TEST_FL_FUTURE_DATE`, fill search, clear search, clear date.
   Expected Result: Only GET methods are recorded on `/api/flicense/`. Zero POST, PUT, PATCH, or DELETE requests.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5` (GET only)
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: No state-changing operations occur.

# Expected Final Result

No non-GET HTTP methods are observed on the `/api/flicense/` path during date and search interactions.

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

- Live UI observation via Playwright MCP: no POST/PUT/PATCH/DELETE observed.