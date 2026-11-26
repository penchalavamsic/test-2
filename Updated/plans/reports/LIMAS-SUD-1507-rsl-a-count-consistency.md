---
test_id: "LIMAS-SUD-1507"
title: "To verify the functionality of \"Reports\" → \"Initial Network\" → \"Count Consistency\" → \"Loaded ≤ total and record-count label matches\""
module: "Reports"
page: "Reports"
section: "Initial Network"
control: "Count Consistency"
action: "Loaded ≤ total and record-count label matches"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that the loaded count does not exceed the total count and that the runtime total from the loaded-total text equals the record-count toolbar label value.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use `ReportsPage.getStandardLicenseLoadedState()` for `{loaded, total}` and `getReportsRecordCount()` for the toolbar record-count value.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for data.
   Expected Result: The loaded-total text is visible.

2. Action: Call `getStandardLicenseLoadedState()` to get `{loaded, total}`.
   Expected Result: Both values are non-negative integers.

3. Action: Assert `loaded <= total`.
   Expected Result: Loaded count does not exceed total.

4. Action: Call `getReportsRecordCount()` and assert it equals `total`.
   Expected Result: The toolbar record-count label is consistent with the total from the loaded-total text.

# Network Verification

No API verification needed; values derive from the API response verified in LIMAS-SUD-1505.

# Expected Final Result

The loaded count is ≤ total, and the record-count toolbar label matches the total from the loaded-total text.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode record counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP