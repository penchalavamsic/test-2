---
test_id: "LIMAS-SUD-1687"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"API\" → \"Deleted Floating Licenses API Contract\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "API"
action: "Deleted Floating Licenses API Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Observe the Deleted Floating Licenses API request and record the sanitized GET endpoint, query parameters (page and size), response status, content type, and Spring Page response shape. Compare toolbar counts with API response metadata.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, then Deleted mode is activated.

# Test Data

All API identifiers and response values are read dynamically. Use placeholders: {runtimeDeletedPage}, {runtimeDeletedSize}.

# Steps and Expected Results

1. Action: Activate Deleted mode and capture the outgoing API request.
   Expected Result: A GET request is triggered to a sanitized endpoint for deleted floating licenses (not the Active allfloatinglicenses endpoint).

2. Action: Inspect query parameter names.
   Expected Result: Query parameters include "page" and "size" with values like {runtimeDeletedPage} and {runtimeDeletedSize}.

3. Action: Verify response status 200 and Content-Type application/json.
   Expected Result: Response is 200 OK with JSON content type.

4. Action: Inspect the response body shape.
   Expected Result: Response contains standard Spring Page fields: totalElements, numberOfElements, content (array), pageable, last, first, totalPages, size, number.

5. Action: Compare the toolbar total count with response totalElements.
   Expected Result: Toolbar total count matches the API response totalElements value.

# Network Verification

- Request URL: Contains the deleted floating licenses API path (sanitized).
- HTTP Method: GET
- Expected Status: 200
- Content-Type: application/json
- Response shape: Spring Page envelope with totalElements, numberOfElements, totalPages, first, last, content.

# Expected Final Result

The Deleted view uses a dedicated GET endpoint with page/size pagination returning a Spring Page JSON response, and toolbar counts match the API metadata.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode the deleted endpoint path.
- Do not hardcode response values or pagination parameters.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending