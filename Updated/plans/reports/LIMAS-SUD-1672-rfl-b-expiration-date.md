---
test_id: "LIMAS-SUD-1672"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Expiration Date\" → \"Native Date Input and Chip\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Expiration Date"
action: "Native Date Input and Chip"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Verify Expiration Date is a native type=date input with a calendar button, and filling a date produces an "Exp: {date}" chip.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime-generated date values. Do not hardcode.

# Steps and Expected Results

1. Action: Inspect the Expiration Date input.
   Expected Result: Input has type=date, accessible name "Expiration Date", id "fl-exp-date". A calendar button ("Open calendar") is adjacent.

2. Action: Fill a valid date value.
   Expected Result: An "Exp: {runtimeDate}" chip appears with a remove button.

3. Action: Verify no server request is triggered.
   Expected Result: Filtering is client-side; no API call.

4. Action: Click the chip remove button.
   Expected Result: Chip disappears, date input is cleared.

# Network Verification

No server API request triggered by date filter.

# Expected Final Result

Expiration Date is a native date input producing "Exp: {date}" chips with client-side filtering.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode date values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending