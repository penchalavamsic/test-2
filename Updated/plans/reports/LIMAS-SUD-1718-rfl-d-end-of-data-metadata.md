---
test_id: "LIMAS-SUD-1718"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"End-of-Data Detection from Spring Page Metadata\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "End-of-Data Detection from Spring Page Metadata"
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

Verify the end-of-data logic using Spring Page metadata only: when last:true or loaded equals totalElements, no further requests are triggered, totalPages from the response is consistent with the last flag, the sentinel is hidden or removed at end-of-data, and no request with page > totalPages-1 is attempted. Live traversal to the final page is not performed — verify via metadata inspection only.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled.

# Test Data

All values read dynamically. Use placeholders: {runtimeDeletedTotal}, {runtimeTotalPages}, {runtimeLoaded}, {runtimeSize}.

# Steps and Expected Results

1. Action: Inspect the initial batch response metadata: totalElements, totalPages, last flag.
   Expected Result: When {runtimeDeletedTotal} ≤ {runtimeSize}, last is true and totalPages is 1. When {runtimeDeletedTotal} > {runtimeSize}, last is false and totalPages > 1.

2. Action: Compute the last page value from totalPages.
   Expected Result: The maximum valid page value is {runtimeTotalPages} - 1.

3. Action: Verify that the sentinel is present in the DOM when last is false (more data available) and absent/hidden when last would be true.
   Expected Result: Sentinel visibility correlates with the last flag: sentinel present when last=false, sentinel absent or hidden when last=true. (For the typical case with last=false, document that sentinel is present.)

4. Action: Verify that the application uses last or totalPages to prevent requests beyond available data.
   Expected Result: The logic checks either the last flag or page < totalPages before firing a continuation; no request with page ≥ totalPages would be valid.

5. Action: Verify that no request with page > {runtimeTotalPages} - 1 is ever observed in the network log during any scrolling within the test.
   Expected Result: All observed page values are within [0, {runtimeTotalPages} - 1].

6. Action: Document that live traversal to the final page is not performed — this plan verifies end-of-data prevention through metadata inspection only.
   Expected Result: Test explicitly states the boundary condition and verifies it via the metadata contract.

# Network Verification

Inspect the last flag and totalPages from the API response. Confirm no request exceeds totalPages - 1 in page value.

# Expected Final Result

End-of-data is correctly detected via Spring Page metadata: last:true when no more data, sentinel hidden/absent at end, and no request with page ≥ totalPages is attempted.

# Classification

- Read-only
- Positive
- Boundary
- API

# Restrictions

- Do not traverse to the final page.
- Verify end-of-data via metadata inspection only.
- Do not hardcode totalPages or totalElements.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending