---
test_id: "LIMAS-SUD-1643"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Toolbar\" → \"Record Count\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Toolbar"
action: "Record Count"
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

Dynamically parse the toolbar record count and verify it is nonnegative, stable after the initial request, and reflects Floating Licenses data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All counts are read dynamically. Do not hardcode any number.

# Steps and Expected Results

1. Action: Select Floating Licenses and wait for the initial request to settle.
   Expected Result: The toolbar shows a record count in the format "{runtimeCount} records".

2. Action: Parse the count as a number.
   Expected Result: The count is a nonnegative integer ({runtimeTotal}).

3. Action: Wait briefly and re-read the count.
   Expected Result: The count remains stable (does not change without user action).

# Network Verification

No additional API verification needed.

# Expected Final Result

The toolbar record count is nonnegative, dynamically parsed, and stable after the request settles.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode record totals.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending