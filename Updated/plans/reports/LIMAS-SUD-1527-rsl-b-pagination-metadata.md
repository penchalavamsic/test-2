---
test_id: "LIMAS-SUD-1527"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Pagination metadata is consistent\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Pagination Metadata"
action: "Response metadata consistent"
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

Verify that the API response pagination metadata is internally consistent: `totalElements`, `totalPages`, `size`, `number`, `numberOfElements`, `first`, `last`, `empty`.

# Preconditions

- Initial page=0, size=runtime request completed.
- At least one additional batch load completed.

# Test Data

Use `ReportsPage.getStandardLicensePaginationMetadata()` from the latest response.

# Steps and Expected Results

1. Action: Inspect the page=0 response metadata.
   Expected Result: `number = 0`, `first = true`, `last = false` (when loaded < total), `empty = false`, `numberOfElements = runtimeBatchSize`.

2. Action: Verify `totalPages = Math.ceil(totalElements / size)`.
   Expected Result: Computed total pages matches response `totalPages`.

3. Action: Verify `numberOfElements ≤ size`.
   Expected Result: Returned elements never exceed requested size.

4. Action: Verify the `content` array length equals `numberOfElements`.
   Expected Result: Array length matches metadata.

5. Action: Verify `offset = number * size` in pageable object.
   Expected Result: Offset consistent.

6. Action: Inspect the next-page response metadata.
   Expected Result: `number = 1`, `first = false`, `offset = size`.

# Network Verification

- Response metadata fields checked against computed values.

# Expected Final Result

All pagination metadata fields are internally consistent.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode page numbers or sizes.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending