---
test_id: "LIMAS-SUD-1573"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Date Request-Body Contract\" → \"POST to /api/report/standardlicenses, all date fields as ISO UTC or null, JSON body with all core-filter fields, paginated JSON response, no PUT/PATCH/DELETE\""
module: "Reports"
page: "Reports"
section: "Date Request-Body Contract"
control: "All Date Fields"
action: "POST method, endpoint /api/report/standardlicenses, fields: expirationDate (ISO timestamp UTC string or null), maintenanceDate (same), createdDate (same), modifiedDate (same), page (0), size (10), JSON body with all core-filter fields present, response is paginated JSON, no PUT/PATCH/DELETE, no duplicate request, null represents empty"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-D"
test_type: "Network"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify the exact API contract for date filter fields: POST to `/api/report/standardlicenses`, JSON body containing `expirationDate`, `maintenanceDate`, `createdDate`, `modifiedDate` each as ISO UTC timestamp strings or `null`, `page` and `size` as numeric fields, response in paginated JSON format, no PUT, PATCH, or DELETE methods, and no duplicate requests per single filter action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.

# Test Data

Use `{runtimeCurrentDate}` to populate one or more date fields. Intercept all network requests to `/api/report/standardlicenses`.

# Steps and Expected Results

1. Action: Start network request monitoring, then populate Expiration Date with `{runtimeCurrentDate}`.
   Expected Result: A POST request is captured.

2. Action: Assert the request method is POST.
   Expected Result: Method is POST; no PUT, PATCH, or DELETE.

3. Action: Assert the request URL pathname ends with `/api/report/standardlicenses`.
   Expected Result: Correct endpoint.

4. Action: Parse the POST body and assert it contains `expirationDate` as an ISO UTC timestamp string.
   Expected Result: Date field is ISO UTC (e.g., `"YYYY-MM-DDTHH:mm:ss.sssZ"`).

5. Action: Assert `page` and `size` are present as numeric fields in the body.
   Expected Result: Body includes `page: 0, size: 10`.

6. Action: Assert that `maintenanceDate`, `createdDate`, and `modifiedDate` are present in the body as `null`.
   Expected Result: Unset date fields are `null`, not absent or empty string.

7. Action: Assert the response status is 200 and Content-Type is `application/json`.
   Expected Result: Valid JSON response.

8. Action: Assert the response body contains `content` (array), `totalElements` (number), and pagination metadata.
   Expected Result: Standard pagination shape.

9. Action: Assert only a single unique POST request was triggered.
   Expected Result: No duplicate request.

10. Action: Repeat with Maintenance Date, then License Created Date, then License Modified Date independently and assert each field is sent correctly while others remain `null`.
    Expected Result: Each date field is independently verifiable in the contract.

# Network Verification

- Request URL: `POST /api/report/standardlicenses`
- HTTP Method: POST
- Expected Status: 200
- Request Body: `{ expirationDate: "ISO" | null, maintenanceDate: "ISO" | null, createdDate: "ISO" | null, modifiedDate: "ISO" | null, page: 0, size: 10, ...core fields }`
- Response Content-Type: `application/json`
- No duplicate requests

# Expected Final Result

The date filter API contract is: POST to `/api/report/standardlicenses`, each date field as ISO UTC string or `null`, `page`/`size` as body fields, returning standard pagination JSON with exactly one request per action.

# Classification

- Read-only
- Network

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or field values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending