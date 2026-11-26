---
test_id: "LIMAS-SUD-1600"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted-to-Active API\" → \"GET allstandardlicenses page=0 size=10, no filter state carried\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted-to-Active API"
action: "When switching Deleted→Active, the API call is GET /api/report/allstandardlicenses?page=0&size=10. No filter state from the Deleted session is included. Response is fresh unfiltered Active data. Follow-up page=1 request fires after initial load."
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

Verify the exact API contract when switching from Deleted to Active mode: the correct endpoint, parameters, method, and the absence of any residual filter state from the Deleted session.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card selected; Deleted mode active with filters applied (e.g., Email filter).

# Test Data

Apply an Email filter in Deleted mode before switching. Intercept and inspect the Active-mode request.

# Steps and Expected Results

1. Action: In Deleted mode, apply an Email filter and wait for the filtered response.
   Expected Result: Filter active in Deleted mode; chip visible.

2. Action: Start network request monitoring, then click the Active button.
   Expected Result: Active button clicked.

3. Action: Wait for the first Active-mode request to fire.
   Expected Result: Request captured.

4. Action: Assert the request uses GET method.
   Expected Result: Method is GET.

5. Action: Assert the request URL pathname ends with `/api/report/allstandardlicenses`.
   Expected Result: Correct Active endpoint (not the Deleted endpoint).

6. Action: Assert the URL query string contains `page=0` and `size=10`.
   Expected Result: Active-mode pagination params.

7. Action: Assert the request URL does NOT contain any email, date, or other filter query parameters.
   Expected Result: No filter state from Deleted session is carried over.

8. Action: Assert the response status is 200 and Content-Type is `application/json`.
   Expected Result: Valid JSON response.

9. Action: Assert the response `totalElements` matches the unfiltered Active total (~2,699).
   Expected Result: Fresh unfiltered Active data, not the filtered Deleted subset.

10. Action: Assert the response `content` items do NOT carry a `deletedOn` field (Active data, not Deleted).
    Expected Result: Active items have the Active schema (Exp + Maint, no Deleted).

# Network Verification

- Request: `GET /api/report/allstandardlicenses?page=0&size=10`
- No filter query params or body
- Response: `{ content: Array<{ expirationDate, maintenanceDate, ... }>, totalElements: number, ... }`
- Follow-up: `GET /api/report/allstandardlicenses?page=1&size=10`

# Expected Final Result

Switching Deleted→Active calls `GET /api/report/allstandardlicenses?page=0&size=10` with no residual filter state; the response is fresh unfiltered Active data.

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