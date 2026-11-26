---
test_id: "LIMAS-SUD-1512"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll Container\" → \"Identified with overflow and sentinel\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Scroll Container"
action: "Identified with overflow and sentinel"
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

Identify the infinite-scroll container and the sentinel element that triggers additional page loads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page with Standard Licenses selected.
- Initial page=0, size=runtime request has completed.

# Test Data

Use `ReportsPage.getStandardLicenseScrollContainer()` and runtime DOM inspection.

# Steps and Expected Results

1. Action: Call `getStandardLicenseScrollContainer()`.
   Expected Result: Returns the element with `overflow-y: auto` that wraps the table and sentinel.

2. Action: Verify the sentinel element exists within the scroll container.
   Expected Result: A `<div class="h-4" aria-hidden="true">` exists as the last child of the scroll container.

3. Action: Record scroll metrics (`scrollHeight`, `clientHeight`, `scrollTop`) from the runtime scroll container.
   Expected Result: Runtime numeric values retrieved dynamically.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The infinite-scroll container is a div with `overflow-auto` wrapping the table. A sentinel `<div class="h-4" aria-hidden="true">` is present as the last child.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, or cookies.
- Do not hardcode scroll dimensions.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending