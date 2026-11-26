---
test_id: "LIMAS-SUD-895"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Exactly One GET Per Date Change\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Exactly One GET Per Date Change"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-date-behavior.spec.ts"
---

# Purpose

Verify that changing the date triggers exactly one GET request — no duplicate or extra API calls.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use runtime-provided dates via `TEST_FL_FUTURE_DATE` and `TEST_FL_CURRENT_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Start tracking all `/api/flicense/` requests. Set the date to `TEST_FL_FUTURE_DATE`.
   Expected Result: Exactly 1 GET is counted on the `/api/flicense/` path.

3. Action: Change the date to `TEST_FL_CURRENT_DATE`.
   Expected Result: Exactly 1 additional GET is counted (total 2: one for each set operation). No duplicate requests fire for a single change.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Each date change produces exactly one GET.

# Expected Final Result

Exactly one GET request fires for each individual date change, with no duplicates.

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

- Live UI observation via Playwright MCP: exactly 1 GET per date change confirmed.