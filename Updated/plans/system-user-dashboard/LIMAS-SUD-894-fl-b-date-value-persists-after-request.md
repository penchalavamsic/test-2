---
test_id: "LIMAS-SUD-894"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Date Value Persists After Request\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Date Value Persists After Request"
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

Verify that once a date is set in the Expires before control, the value remains visible in the DOM after the API request completes.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided date via `TEST_FL_FUTURE_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible with empty date control.

2. Action: Fill the Expires before date input with `TEST_FL_FUTURE_DATE` and wait for the API response.
   Expected Result: After the response completes, the date input's `inputValue()` still returns `TEST_FL_FUTURE_DATE`.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A
- Visible UI Result: Date value persists in the DOM after the API response.

# Expected Final Result

The date value remains visible and retrievable from the DOM after the GET response completes.

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

- Live UI observation via Playwright MCP: date value visible in DOM after setting and waiting for response.