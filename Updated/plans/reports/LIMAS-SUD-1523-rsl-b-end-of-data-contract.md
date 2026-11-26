---
test_id: "LIMAS-SUD-1523"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"End-of-data contract via response metadata\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "End-of-Data Contract"
action: "Verified through metadata and source logic"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify end-of-data logic by inspecting API response metadata (totalElements, totalPages, last, numberOfElements) and the source sentinel behavior.

# Preconditions

- Initial page=0, size=runtime request completed.
- `loaded < total` (more data available).
- The page=0 response metadata confirms `last: false`, `totalPages > 0`.

# Test Data

Use `ReportsPage.getStandardLicensePaginationMetadata()` which inspects the latest API response for pagination metadata.

# Steps and Expected Results

1. Action: Inspect the page=0 response metadata.
   Expected Result: `totalElements > 0`, `totalPages > 0`, `last = false` (since loaded < total), `numberOfElements = runtime batch size`, `number = 0`.

2. Action: Verify that loading can continue while `loaded < total`.
   Expected Result: Sentinel is present; IntersectionObserver attached.

3. Action: Verify the `last` field would be `true` when `number = totalPages - 1` (from response metadata, not live traversal).
   Expected Result: Logic confirmed: `last = true` when current page is the final page.

4. Action: Verify that when `loaded = total`, no further request would be sent.
   Expected Result: Sentinel or observer is disabled/removed when no more pages available. Verified through source inspection — the sentinel remains but no request fires because `hasNextPage` (derived from `last: false`) would be false.

5. Action: Confirm live final-page traversal was not performed.
   Expected Result: Verification is through metadata and logic only.

# Network Verification

- Response metadata fields: `totalElements`, `totalPages`, `last`, `numberOfElements`, `number`.

# Expected Final Result

End-of-data contract verified: loading continues while `loaded < total`, stops when `loaded = total`, and no request fires beyond final page.

# Classification

- Read-only
- Positive

# Restrictions

- Do not traverse to the final page live.
- Do not fabricate an end-of-data response.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending