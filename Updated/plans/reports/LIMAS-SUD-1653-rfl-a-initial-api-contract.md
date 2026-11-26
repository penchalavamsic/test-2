---
test_id: "LIMAS-SUD-1653"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"API\" → \"Initial API Contract\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "API"
action: "Initial API Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Observe the initial API request for Floating Licenses Active view and record HTTP method, sanitized endpoint, query-parameter names, response status, content type, and safe response-shape metadata.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All API identifiers are read dynamically. Use placeholders for values.

# Steps and Expected Results

1. Action: Wait for the initial GET request to the floating licenses API.
   Expected Result: A single GET request to an endpoint containing "allfloatinglicenses" is observed.

2. Action: Inspect query parameter names.
   Expected Result: Query params include "page" and "size".

3. Action: Verify response status 200 and Content-Type application/json.
   Expected Result: Response is 200 OK with JSON content type.

4. Action: Inspect safe response shape: totalElements, numberOfElements, content array, pageable, last, first, totalPages, size, number.
   Expected Result: Response contains standard Spring Page metadata fields.

5. Action: Verify no PUT, PATCH, DELETE, or export request is triggered.
   Expected Result: Only GET requests are observed.

# Network Verification

- Request URL: Contains /api/report/allfloatinglicenses
- HTTP Method: GET
- Expected Status: 200
- Content-Type: application/json

# Expected Final Result

The initial API contract is GET with page/size pagination, returning standard Spring Page JSON with totalElements and content.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode endpoint paths, API identifiers, or response values.
- Do not infer the endpoint from Standard Licenses.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending