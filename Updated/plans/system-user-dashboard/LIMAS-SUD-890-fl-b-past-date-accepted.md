---
test_id: "LIMAS-SUD-890"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Past Date Accepted\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Past Date Accepted"
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

Verify that a past date (e.g. `TEST_FL_PAST_DATE`) can be entered into the Expires before date control without native browser rejection.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided past date via `TEST_FL_PAST_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible with empty date control.

2. Action: Fill the Expires before date input with `TEST_FL_PAST_DATE`.
   Expected Result: The date control accepts the value; no `badInput` validity error is reported. The control shows the entered past date.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Response may have Content-Length: 0
- Visible UI Result: Past date value is displayed in the control.

# Expected Final Result

A past date is accepted without native browser rejection, and the control shows the entered value.

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

- Live UI observation via Playwright MCP: past date `2020-01-15` entered and accepted.