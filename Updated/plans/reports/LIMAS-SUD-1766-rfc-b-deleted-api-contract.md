---
test_id: "LIMAS-SUD-1766"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"API\" → \"Deleted API Contract\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "API"
action: "Deleted API Contract"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify the Deleted mode API uses a GET request to the report/alldeleted endpoint with page and size query params, returns a 200 status with a Spring Page envelope containing content, totalElements, and totalPages, and is a separate endpoint from the Active mode endpoint (report/all).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected.

# Test Data

Use environment variables and the authenticated fixture. API endpoint and response fields are verified at runtime.

# Steps and Expected Results

1. Action: Click Deleted mode and capture the network request.
   Expected Result: A GET request is sent to report/alldeleted with page={runtimePage}&size={runtimeSize}.

2. Action: Verify the response status.
   Expected Result: Response status is 200.

3. Action: Inspect the response body structure.
   Expected Result: Response contains a Spring Page envelope with "content" (array), "totalElements" (number), and "totalPages" (number).

4. Action: Confirm the Deleted endpoint is distinct from the Active endpoint.
   Expected Result: The Deleted request URL (report/alldeleted) differs from the Active request URL (report/all). They are separate endpoints.

# Network Verification

- Request URL: Contains report/alldeleted?page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Expected Status: 200
- Response Envelope: Spring Page (content, totalElements, totalPages)
- Endpoint Separation: Distinct from report/all

# Expected Final Result

The Deleted mode fetches data from a distinct report/alldeleted endpoint returning a 200 with a Spring Page envelope containing content, totalElements, and totalPages.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode endpoint paths, page, or size values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending