---
test_id: "LIMAS-SUD-1515"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Next-page request increments page and preserves size\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Next-Page Request"
action: "Page increments and size preserved"
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

Trigger exactly one additional batch load and verify the next request increments the page number by one while preserving the same size parameter and endpoint path.

# Preconditions

- Initial page=0, size=runtime request has completed.
- `loaded < total` (more records are available).

# Test Data

Use `ReportsPage.waitForStandardLicenseNextPageRequest()` and `ReportsPage.scrollStandardLicensesToNextLoadThreshold()`.

# Steps and Expected Results

1. Action: Record the initial page and size from the initial request URL.
   Expected Result: Runtime page=0 and size=runtime value captured.

2. Action: Start request observation for `/api/report/allstandardlicenses`.
   Expected Result: Observer active.

3. Action: Call `scrollStandardLicensesToNextLoadThreshold()`.
   Expected Result: Scroll reaches trigger boundary.

4. Action: Wait for exactly one additional GET request.
   Expected Result: Request URL contains `page=1` and same `size` as initial.

5. Action: Verify response status is 200.
   Expected Result: Successful JSON response.

6. Action: Verify no filter or extra query parameters were introduced.
   Expected Result: Only `page` and `size` query params present.

# Network Verification

- Request URL: matches `/api/report/allstandardlicenses?page=runtimeNext&size=runtimeSize`
- HTTP Method: GET
- Expected Status: 200
- Page increment: initialPage + 1
- Size: same as initial

# Expected Final Result

One additional GET fires with page incremented by one. Same endpoint, same size. No extra parameters.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode page numbers, size, or endpoint URLs.
- Perform only one deliberate additional load.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending