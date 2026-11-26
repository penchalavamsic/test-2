---
test_id: "LIMAS-SUD-1759"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"API\" → \"Pagination Mechanism\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "API"
action: "Pagination Mechanism"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify pagination uses page and size query parameters with page being 0-based. The mechanism is visible even during error state via the request URL.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page.
- Floating Configurations card is selected.

# Test Data

All pagination values are read dynamically from the request URL.

# Steps and Expected Results

1. Action: Capture the GET request URL after selecting Floating Configurations.
   Expected Result: Query string contains page={runtimePage} and size={runtimeSize}.

2. Action: Verify the page value.
   Expected Result: page parameter value is 0 or a non-negative integer (0-based pagination).

3. Action: Verify the size value.
   Expected Result: size parameter value is {runtimeSize}.

4. Action: Verify the pagination mechanism is visible even during error state.
   Expected Result: The page and size query params are present in the request URL regardless of 200 or 500 response.

# Network Verification

- Request URL: Contains /api/report/all
- HTTP Method: GET
- Query Params: page={runtimePage}, size={runtimeSize}
- Pagination: 0-based, GET-based

# Expected Final Result

Pagination uses standard GET-based page/size query params with page being 0-based, and is visible in the request URL even during error state.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode page or size values. Read dynamically.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending