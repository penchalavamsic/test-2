---
test_id: "LIMAS-SUD-1541"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Hardware IDs\" → \"API Contract: POST, hardwareId as JSON array, page and size params, no duplicate\""
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "API Contract"
action: "POST method, hardwareId as JSON array in body, page and size query params, response JSON, no duplicate request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Network"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the exact API contract for the Hardware IDs filter: POST method to `/api/report/standardlicenses`, JSON body with `hardwareId` as a JSON string array, `page` and `size` as query parameters, JSON pagination response, and no duplicate requests per single filter action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.

# Test Data

Use `{runtimeHardwareId}` as the filter value. Intercept all network requests to `/api/report/standardlicenses`.

# Steps and Expected Results

1. Action: Start network monitoring for `/api/report/standardlicenses`, then apply the Hardware IDs filter with `{runtimeHardwareId}`.
   Expected Result: One or more POST requests are captured.

2. Action: Assert all captured requests use POST method.
   Expected Result: Method is POST.

3. Action: Assert the URL pathname ends with `/api/report/standardlicenses`.
   Expected Result: Correct endpoint.

4. Action: Assert query string contains `page` and `size` parameters.
   Expected Result: Pagination params present.

5. Action: Parse the POST body and assert `hardwareId` exists as a JSON array of strings.
   Expected Result: Body is `{ "hardwareId": ["..."] }` with string elements.

6. Action: Assert response status is 200 and Content-Type is `application/json`.
   Expected Result: Valid JSON response.

7. Action: Assert response body contains `content` (array), `totalElements` (number), and pagination metadata.
   Expected Result: Response shape is valid pagination.

8. Action: Assert only a single unique POST request was sent (no duplicate).
   Expected Result: One request per action.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page={n}&size={n}`
- HTTP Method: POST
- Expected Status: 200
- Request Body: `{ "hardwareId": ["{runtimeHardwareId}"] }` (array of strings)
- Response Content-Type: `application/json`
- Response Shape: `{ content: Array, totalElements: number, size: number, number: number, totalPages: number }`
- No duplicate requests

# Expected Final Result

The Hardware IDs filter API contract sends `hardwareId` as a JSON string array via POST, with `page`/`size` query params, returning JSON pagination exactly once per action.

# Classification

- Read-only
- Network

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode Hardware ID values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending