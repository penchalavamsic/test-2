---
test_id: "LIMAS-SUD-1781"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"API Full Load\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "API Full Load"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that selecting Deleted mode triggers two sequential GET requests to the alldeleted endpoint (page=0 and page=1), loading all available deleted records automatically into the UI without requiring a manual infinite-scroll trigger.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is displayed initially (default).
- The alldeleted API has more than one page of data.

# Test Data

Use environment variables and runtime API responses. Page size and total elements are read dynamically from the response.

# Steps and Expected Results

1. Action: Intercept network and click the Deleted mode control.
   Expected Result: Two sequential GET requests fire automatically to the alldeleted endpoint.

2. Action: Verify the first request.
   Expected Result: GET {runtimeBaseUrl}/api/report/alldeleted?page=0&size={runtimeSize}. Response status 200. Response body contains totalElements={runtimeTotalElements} and totalPages={runtimeTotalPages}.

3. Action: Verify the second request.
   Expected Result: GET {runtimeBaseUrl}/api/report/alldeleted?page=1&size={runtimeSize}. Response status 200. Response body contains last=true.

4. Action: Verify no manual scroll trigger is needed.
   Expected Result: All data is loaded automatically. No additional API requests fire when scrolling through the loaded rows.

5. Action: Verify rendered row count.
   Expected Result: The table renders {runtimeRenderedRows} rows, matching the sum of content from both pages (up to the UI's render capacity).

# Network Verification

- Request URL 1: {runtimeBaseUrl}/api/report/alldeleted?page=0&size={runtimeSize}
- Request URL 2: {runtimeBaseUrl}/api/report/alldeleted?page=1&size={runtimeSize}
- HTTP Method: GET
- Expected Status: 200 for both
- No further API requests triggered by scroll.

# Expected Final Result

Deleted mode automatically fires two sequential GET requests that load all available deleted records. All data is rendered without any manual infinite-scroll trigger.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode page, size, totalElements, totalPages, or rendered row counts. Read dynamically from API responses.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending