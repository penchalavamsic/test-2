---
test_id: "LIMAS-SUD-893"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Date Clearing Triggers Default-Date GET\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Date Clearing Triggers Default-Date GET"
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

Verify that clearing the Expires before date control triggers a GET request using the application's default date (the date the application supplies when no user date is specified).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded and a date has been set.

# Test Data

Use a runtime-provided date via `TEST_FL_FUTURE_DATE` to set, then clear.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible.

2. Action: Set Expires before to `TEST_FL_FUTURE_DATE` and capture the response.
   Expected Result: GET fires with the future date in the URL.

3. Action: Clear the Expires before date (fill with empty string) while capturing the next API response.
   Expected Result: Exactly one GET request fires. The URL contains the application's default date (not the previously set date). Response status is 200.

# Network Verification

- Request URL: `/api/flicense/ex/{defaultDate}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Response may have Content-Length: 0
- Visible UI Result: Date control value is empty; default empty state returns.

# Expected Final Result

Clearing the date triggers a GET request with the application's default date, and the control shows an empty value.

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

- Live UI observation via Playwright MCP: fill('') triggers GET with default date `December 11, 2026`.