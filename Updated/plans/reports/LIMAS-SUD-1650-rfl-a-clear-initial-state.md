---
test_id: "LIMAS-SUD-1650"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filters Panel\" → \"Clear Initial State\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filters Panel"
action: "Clear Initial State"
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

With all filters empty, activate Clear once and verify filters remain empty, counts remain stable, and no unnecessary request occurs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, all filters empty/default.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Expand the Filters panel and verify all filter values are empty.
   Expected Result: All six filter controls have empty/default values.

2. Action: Click the Clear button.
   Expected Result: Clear button is clickable; all filters remain empty.

3. Action: Verify record count and loaded/total remain stable.
   Expected Result: Counts unchanged after Clear activation.

4. Action: Observe whether a new API request was triggered.
   Expected Result: No unnecessary API request is emitted (or if one is, it returns the same data).

# Network Verification

No new data request should be triggered; if one fires, it must be a read-only GET returning identical data.

# Expected Final Result

Clearing already-empty filters is safe — filters stay empty, counts stable, no data change.

# Classification

- Read-only
- Positive

# Restrictions

- Do not enter or select filter values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending