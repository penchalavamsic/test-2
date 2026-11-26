---
test_id: "LIMAS-SUD-1655"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"API\" → \"Request Count and Safety\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "API"
action: "Request Count and Safety"
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

Verify only one GET request is triggered when selecting Floating Licenses; no PUT, PATCH, DELETE, or export request occurs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Monitor all network requests when selecting Floating Licenses.
   Expected Result: Only one GET request to allfloatinglicenses is observed.

2. Action: Verify no PUT, PATCH, DELETE, or POST to report APIs.
   Expected Result: No data-changing requests are emitted.

3. Action: Verify no export/download request occurs.
   Expected Result: No request with spreadsheet, excel, or attachment content-disposition.

# Network Verification

Count all report API requests; assert exactly one GET.

# Expected Final Result

Selecting Floating Licenses triggers exactly one safe GET request with no side effects.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode endpoint paths.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending