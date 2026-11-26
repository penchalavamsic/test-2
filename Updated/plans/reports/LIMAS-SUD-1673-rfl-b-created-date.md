---
test_id: "LIMAS-SUD-1673"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"License Created Date\" → \"Native Date Input Structure\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "License Created Date"
action: "Native Date Input Structure"
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

Verify License Created Date is a native type=date input with a calendar button, accessible name, and produces a date chip on fill.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime-generated dates. Do not hardcode.

# Steps and Expected Results

1. Action: Inspect the License Created Date input.
   Expected Result: Input type=date, id "fl-created-date", accessible name "License Created Date", calendar button present.

2. Action: Fill a valid date and verify chip.
   Expected Result: A chip with the date appears. No server request triggered.

3. Action: Clear via chip remove.
   Expected Result: Input cleared, chip removed.

# Network Verification

No server API request.

# Expected Final Result

License Created Date behaves consistently with Expiration Date — native date input, chip display, client-side.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode dates.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending