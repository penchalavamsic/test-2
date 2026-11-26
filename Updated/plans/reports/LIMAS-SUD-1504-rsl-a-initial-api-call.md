---
test_id: "LIMAS-SUD-1504"
title: "To verify the functionality of \"Reports\" → \"Initial Network\" → \"API Request\" → \"GET with page and size params\""
module: "Reports"
page: "Reports"
section: "Initial Network"
control: "API Request"
action: "GET with page and size params"
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

Verify that when the Reports page loads, the initial API call is a `GET` request to `/api/report/allstandardlicenses` and includes both `page` and `size` query parameters.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the System User Dashboard.

# Test Data

Use `ReportsPage.waitForStandardLicenseInitialRequest()` which waits for the first GET response to `standardLicensesApiPath` and returns `{ url: URL, status: number }`.

# Steps and Expected Results

1. Action: Set up a response promise for the standard-licenses API, then navigate to Reports.
   Expected Result: The navigation triggers the API call.

2. Action: Assert the response status is 200.
   Expected Result: The request succeeds.

3. Action: Assert the URL pathname contains `standardLicensesApiPath`.
   Expected Result: The correct endpoint was called.

4. Action: Assert the URL has `page` and `size` query parameters.
   Expected Result: Both pagination params are present.

# Network Verification

- Request URL: `GET /api/report/allstandardlicenses?page={n}&size={n}`
- HTTP Method: GET
- Expected Status: 200

# Expected Final Result

The initial page load triggers a GET request to the standard-licenses API with `page` and `size` query parameters.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page or size values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP