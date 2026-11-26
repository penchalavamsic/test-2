---
test_id: "LIMAS-SUD-1758"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"API\" → \"Initial API Contract (Error)\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "API"
action: "Initial API Contract (Error)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Observe the GET /limas/api/report/all?page={runtimePage}&size={runtimeSize} request returns 500 Internal Server Error. Confirm status code, no Spring Page envelope in the response, one request per selection or Retry, and no POST/PUT/PATCH/DELETE.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page.
- Floating Configurations card is selected.

# Test Data

All API identifiers and parameter values are read dynamically. Use placeholders for values.

# Steps and Expected Results

1. Action: Wait for the initial GET request after selecting Floating Configurations.
   Expected Result: A GET request to an endpoint matching /api/report/all is observed with query params page={runtimePage} and size={runtimeSize}.

2. Action: Verify the response status.
   Expected Result: Response status is {runtimeErrorStatus} (500).

3. Action: Verify the response body.
   Expected Result: The response is NOT a Spring Page envelope — no totalElements, numberOfElements, content array, etc.

4. Action: Verify request count per action.
   Expected Result: Exactly one GET request per card selection or Retry click. No duplicate requests on a single action.

5. Action: Verify no mutation requests.
   Expected Result: No POST, PUT, PATCH, or DELETE requests are observed during the selection or error state.

# Network Verification

- Request URL: Contains /api/report/all
- HTTP Method: GET
- Expected Status: {runtimeErrorStatus}
- Query Params: page={runtimePage}, size={runtimeSize}

# Expected Final Result

The initial API call is GET with page/size params, returns 500, does not return a Spring Page envelope, fires once per action, and no mutations occur.

# Classification

- Read-only
- Negative
- API

# Restrictions

- Do not hardcode endpoint paths, API identifiers, query param values, or response values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending