---
test_id: "LIMAS-SUD-1707"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Initial Batch Spring Page Metadata\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Initial Batch Spring Page Metadata"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

Inspect the initial Deleted API request (GET /limas/api/report/allfloatingdeleted?page=0&size=500) and verify the Spring Page metadata: totalElements, numberOfElements, totalPages, first:true, last:false. Confirm the content array length equals numberOfElements, and toolbar counts match the API metadata.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated.

# Test Data

All values read dynamically from the API response. Use placeholders: {runtimeDeletedTotal}, {runtimePage}, {runtimeSize}, {runtimeLoaded}, {runtimeNumberOfElements}, {runtimeTotalPages}.

# Steps and Expected Results

1. Action: Capture the initial GET request to the Deleted floating licenses endpoint.
   Expected Result: Request is GET allfloatingdeleted?page=0&size=500 (sanitized path permitted).

2. Action: Verify response status is 200 and Content-Type is application/json.
   Expected Result: 200 OK, application/json.

3. Action: Inspect totalElements in the Spring Page envelope.
   Expected Result: totalElements = {runtimeDeletedTotal} (a nonnegative integer, e.g., 13806).

4. Action: Inspect numberOfElements and content array length.
   Expected Result: numberOfElements = {runtimeNumberOfElements} (e.g., 500) and content.length equals numberOfElements.

5. Action: Inspect totalPages, first, and last flags.
   Expected Result: totalPages = {runtimeTotalPages} (e.g., 28 when {runtimeDeletedTotal} ≈ 13806 and size = 500), first is true, last is false.

6. Action: Verify toolbar loaded and total counts match the API metadata.
   Expected Result: Toolbar shows loaded count and total count; total matches {runtimeDeletedTotal}, and loaded count corresponds to the rendered rows from the first batch.

7. Action: Verify the number of rendered rows matches numberOfElements (or a UI-batch-dependent subset if the UI paginates the API batch further).
   Expected Result: Rendered row count is consistent with the loaded data.

# Network Verification

- Request URL: allfloatingdeleted?page=0&size=500 (sanitized)
- HTTP Method: GET
- Expected Status: 200
- Content-Type: application/json
- Response shape: Spring Page with content, totalElements, numberOfElements, totalPages, first: true, last: false

# Expected Final Result

The initial Deleted batch returns Spring Page metadata with correct totalElements, numberOfElements matching content length, totalPages derived from totalElements/size, first:true, last:false, and toolbar counts are consistent with the API response.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode the deleted endpoint path.
- Do not hardcode counts, page numbers, or totalElements values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending