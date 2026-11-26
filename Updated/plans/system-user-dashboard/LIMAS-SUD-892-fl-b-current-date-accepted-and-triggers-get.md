---
test_id: "LIMAS-SUD-892"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Expires Before Date\" → \"Current Date Accepted and Triggers GET\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Expires Before Date"
action: "Current Date Accepted and Triggers GET"
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

Verify that entering the current date (`TEST_FL_CURRENT_DATE`) is accepted and triggers a GET request to `/api/flicense/ex/`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses section is loaded.

# Test Data

Use a runtime-provided current date via `TEST_FL_CURRENT_DATE`.

# Steps and Expected Results

1. Action: Navigate to System User Dashboard, wait for full render, select Floating Licenses, wait for initial GET.
   Expected Result: Floating Licenses section is visible with empty date control.

2. Action: Fill the Expires before date input with `TEST_FL_CURRENT_DATE` while capturing the API response.
   Expected Result: The date is accepted. A GET to `/api/flicense/ex/` fires with status 200. The date value is visible in the control.

# Network Verification

- Request URL: `/api/flicense/ex/{date}/{profileId}?page=0&size=5`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Response may have Content-Length: 0
- Visible UI Result: Current date is displayed and persisted.

# Expected Final Result

The current date is accepted and triggers a 200 GET request to the flicense endpoint.

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

- Live UI observation: the application accepts the current date and issues a GET.