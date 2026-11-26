---
test_id: "LIMAS-SUD-1513"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Initial scroll metrics recorded dynamically\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Scroll Metrics"
action: "Initial scroll metrics recorded dynamically"
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

Record initial scrollTop, scrollHeight, clientHeight, loaded count, total count, and rendered row count dynamically for use as baseline.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page with Standard Licenses, Active, initial table batch visible.
- No request is pending.

# Test Data

Use `ReportsPage.getStandardLicenseScrollMetrics()` and `getStandardLicenseLoadedState()`.

# Steps and Expected Results

1. Action: Call `getStandardLicenseScrollMetrics()`.
   Expected Result: Returns `{ scrollTop, scrollHeight, clientHeight }` with runtime values ≥ 0.

2. Action: Call `getStandardLicenseLoadedState()`.
   Expected Result: Returns `{ loaded, total }` with loaded > 0, total > 0, loaded ≤ total.

3. Action: Call `getStandardLicenseRenderedRowCount()`.
   Expected Result: Row count equals the runtime loaded count.

# Network Verification

No additional API verification needed.

# Expected Final Result

All initial metrics are captured dynamically; no hardcoded values in assertions beyond `≥ 0` and `loaded ≤ total`.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts, scroll dimensions, or pagination values.
- Do not include row data in assertions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending