---
test_id: "LIMAS-SUD-1535"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"API Contract: POST, /api/report/standardlicenses, JSON body with email, page and size params\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "API Contract"
action: "POST method, endpoint /api/report/standardlicenses, JSON body with email field as string, query params page and size, response is JSON pagination, no duplicate request"
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

Verify the exact API contract for the Email filter: POST method to `/api/report/standardlicenses`, JSON body with `email` as a string field, `page` and `size` as query parameters, response in JSON pagination format, and no duplicate requests per single filter action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.

# Test Data

Use `{runtimeEmail}` as the filter value. Intercept all network requests to `/api/report/standardlicenses`.

# Steps and Expected Results

1. Action: Start network request monitoring for `/api/report/standardlicenses`, then apply the Email filter with `{runtimeEmail}`.
   Expected Result: One or more POST requests are captured.

2. Action: Assert all captured requests use the POST HTTP method.
   Expected Result: Method is POST.

3. Action: Assert the request URL pathname ends with `/api/report/standardlicenses`.
   Expected Result: Correct endpoint.

4. Action: Assert the query string contains `page` and `size` parameters with expected values.
   Expected Result: Both pagination query params are present.

5. Action: Parse the POST body and assert it contains `email` as a JSON string field equal to `{runtimeEmail}`.
   Expected Result: Body is `{ "email": "{runtimeEmail}" }`.

6. Action: Assert the response status is 200 and Content-Type is `application/json`.
   Expected Result: Valid JSON response.

7. Action: Assert the response body contains `content` (array), `totalElements` (number), and pagination metadata.
   Expected Result: Response conforms to JSON pagination shape.

8. Action: Assert only a single unique POST request was triggered (no duplicate).
   Expected Result: One request per filter action.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page={n}&size={n}`
- HTTP Method: POST
- Expected Status: 200
- Request Body: `{ "email": "{runtimeEmail}" }`
- Response Content-Type: `application/json`
- Response Shape: `{ content: Array, totalElements: number, size: number, number: number, totalPages: number }`
- No duplicate requests

# Expected Final Result

The Email filter API contract is: POST to `/api/report/standardlicenses` with `email` as a JSON string, `page`/`size` as query params, returning standard pagination JSON with exactly one request per action.

# Classification

- Read-only
- Network

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses or field values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending