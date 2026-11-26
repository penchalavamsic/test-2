---
test_id: "LIMAS-SUD-921"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Empty State\" → \"Count Text Stable Across Empty State Transitions\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Empty State"
action: "Count Text Stable Across Empty State Transitions"
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

Verify that the count text ("0 loaded · 0 total licenses") remains stable across all empty state transitions — default → filtered → default.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded with zero data.

# Test Data

Use runtime-provided values via `TEST_FL_SEARCH_USER_ID` and `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Count shows "0 loaded · 0 total licenses".

2. Action: Fill search with `TEST_FL_SEARCH_USER_ID`.
   Expected Result: Count still shows "0 loaded · 0 total licenses" — unchanged.

3. Action: Set date to `TEST_FL_FUTURE_DATE` (wait for GET).
   Expected Result: Count still shows "0 loaded · 0 total licenses".

4. Action: Clear search, clear date (wait for default-date GET).
   Expected Result: Count remains "0 loaded · 0 total licenses" through every transition.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Count text stable across all transitions.

# Expected Final Result

The count text never changes format or values across any empty state transition.

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

- Live UI observation via Playwright MCP: count text stable across all transitions.