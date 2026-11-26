---
test_id: "LIMAS-SUD-1657"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Infinite Scroll\" → \"Scroll Container and Sentinel Identification\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Infinite Scroll"
action: "Scroll Container and Sentinel Identification"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Identify the scroll container, measure scrollTop/scrollHeight/clientHeight, detect the sentinel or observer mechanism, and assess whether additional data is available — without triggering another batch.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, initial request has settled.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Identify the scroll container element.
   Expected Result: A scrollable container is found (or none if all content fits in one batch).

2. Action: Read scrollTop, scrollHeight, and clientHeight.
   Expected Result: scrollTop=0 initially; scrollHeight and clientHeight are nonnegative.

3. Action: Check for a sentinel element (aria-hidden spacer) or IntersectionObserver mechanism.
   Expected Result: If data exceeds one batch, a sentinel or observer is present.

4. Action: Check last flag in API response to determine if more data exists.
   Expected Result: last=true when totalElements ≤ size; last=false indicates more batches available.

5. Action: Verify ordinary non-boundary scroll inspection does not trigger another request.
   Expected Result: No additional API request fires during inspection.

# Network Verification

Only the initial GET should be observed; no additional batch request.

# Expected Final Result

Scroll container and pagination mechanism are identified without triggering additional data loads.

# Classification

- Read-only
- Positive

# Restrictions

- Do not scroll to the trigger threshold.
- Do not load another batch.
- Do not traverse the dataset.
- Do not reach the final page.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending