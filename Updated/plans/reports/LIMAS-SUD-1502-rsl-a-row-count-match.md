---
test_id: "LIMAS-SUD-1502"
title: "To verify the functionality of \"Reports\" → \"Standard License Table\" → \"Row Count\" → \"Rendered row count matches runtime loaded count\""
module: "Reports"
page: "Reports"
section: "Standard License Table"
control: "Row Count"
action: "Rendered row count matches runtime loaded count"
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

Verify that the number of visible `<tbody> tr` rows in the standard-license table equals the `loaded` count shown in the loaded-total text.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use `ReportsPage.getStandardLicenseLoadedState()` for `{loaded, total}` and `getVisibleStandardLicenseRows()` for the `<tbody> tr` locator count.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for data to load.
   Expected Result: The loaded-total text is visible.

2. Action: Call `getStandardLicenseLoadedState()` to get the `loaded` count.
   Expected Result: `loaded` is a non-negative integer.

3. Action: Call `getVisibleStandardLicenseRows()` and count the rows.
   Expected Result: The rendered row count equals the `loaded` value.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The number of `<tbody>` rows rendered in the table matches the `loaded` count from the UI text.

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