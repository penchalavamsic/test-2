---
test_id: "LIMAS-SUD-1587"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted API contract\" → \"GET /api/report/allstandarddeleted, page and size params, response includes deletedOn\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted API contract"
action: "GET method, endpoint /api/report/allstandarddeleted, query params page and size (size=500 vs Active's size=10), response JSON with content array including deletedOn field, totalElements, pagination metadata"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-E"
test_type: "Network"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the exact API contract for loading Deleted records: GET method to `/api/report/allstandarddeleted`, query parameters `page` and `size` with size=500 (vs Active's size=10), response is JSON with `content` array containing `deletedOn` field, `totalElements`, and pagination metadata.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is visible.

# Test Data

Intercept all network requests to `/api/report/allstandarddeleted`. No specific data values required.

# Steps and Expected Results

1. Action: Start network request monitoring for `/api/report/allstandarddeleted`, then click the Deleted button.
   Expected Result: A GET request to `/api/report/allstandarddeleted` is captured.

2. Action: Assert the request uses the GET HTTP method.
   Expected Result: Method is GET (not POST).

3. Action: Assert the request URL pathname ends with `/api/report/allstandarddeleted`.
   Expected Result: Correct Deleted-mode endpoint used (distinct from Active's `/api/report/allstandardlicenses`).

4. Action: Assert the URL query string contains `page=0` and `size=500`.
   Expected Result: Deleted mode uses size=500 (not size=10 as in Active mode).

5. Action: Assert the response status is 200 and Content-Type is `application/json`.
   Expected Result: Valid JSON response received.

6. Action: Assert the response body contains `content` as an array and `totalElements` as a number.
   Expected Result: Response conforms to pagination JSON shape.

7. Action: Assert that at least one item in the `content` array has a `deletedOn` field with a non-null value.
   Expected Result: Deleted records carry the `deletedOn` timestamp field.

8. Action: Assert response body also contains `size`, `number`, and `totalPages` pagination fields.
   Expected Result: Full pagination metadata present.

# Network Verification

- Request URL: `GET /api/report/allstandarddeleted?page=0&size=500`
- HTTP Method: GET
- Expected Status: 200
- Response Content-Type: `application/json`
- Response Shape: `{ content: Array<{ ..., deletedOn: string }>, totalElements: number, size: number, number: number, totalPages: number }`
- `size` in response = 500.

# Expected Final Result

The Deleted API contract is: GET to `/api/report/allstandarddeleted` with `page` and `size=500` query params, returning standard pagination JSON with `content` items carrying the `deletedOn` field.

# Classification

- Read-only
- Network

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page or size values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP