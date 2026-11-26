---
test_id: "LIMAS-SUD-1489"
title: "To verify the functionality of \"Reports\" → \"Active View Toolbar\" → \"Record Count\" → \"Display runtime numeric value with 'records' label\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Record Count"
action: "Display runtime numeric value with 'records' label"
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

Verify that the record count displays a runtime numeric value followed by the label "records" (e.g., `{runtimeTotal} records`).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use environment variables and `ReportsPage.recordCountText` locator: regex `/^\d{1,3}(,\d{3})* records$/`. Extract the count via `getReportsRecordCount()`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The record count text is visible.

2. Action: Parse the numeric value from the record count text.
   Expected Result: The parsed count is a non-negative integer (`{runtimeTotal}`).

# Network Verification

No API verification needed for this plan; the record count is derived from the API response verified separately.

# Expected Final Result

The record count displays in the format `{runtimeTotal} records` where `{runtimeTotal}` is the runtime value from the API.

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