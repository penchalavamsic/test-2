---
test_id: "LIMAS-SUD-1505"
title: "To verify the functionality of \"Reports\" → \"Initial Network\" → \"API Response\" → \"JSON with content, totalElements, pagination metadata\""
module: "Reports"
page: "Reports"
section: "Initial Network"
control: "API Response"
action: "JSON with content, totalElements, pagination metadata"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that the standard-licenses API response is `application/json` and contains the required shape: a `content` array, a numeric `totalElements`, and pagination metadata.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and has navigated to the Reports page.

# Test Data

Use `page.waitForResponse()` to intercept the GET response to `standardLicensesApiPath`.

# Steps and Expected Results

1. Action: Set up a response wait for the standard-licenses API, then navigate to Reports.
   Expected Result: The response is captured.

2. Action: Assert the response status is 200 and Content-Type includes `application/json`.
   Expected Result: The response is valid JSON.

3. Action: Parse the JSON body and assert `body.content` exists and is an array.
   Expected Result: A `content` array is present.

4. Action: Assert `body.totalElements` exists and is a number.
   Expected Result: `totalElements` is numeric.

# Network Verification

- Request URL: `GET /api/report/allstandardlicenses`
- Expected Status: 200
- Content-Type: `application/json`
- Payload: `{ content: Array, totalElements: number, size: number, number: number, totalPages: number }`

# Expected Final Result

The API response is well-formed JSON containing a `content` array, `totalElements`, and pagination metadata.

# Classification

- Read-only
- API

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode response field values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP