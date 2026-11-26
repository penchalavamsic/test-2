---
test_id: "LIMAS-SUD-1503"
title: "To verify the functionality of \"Reports\" → \"Standard License Table\" → \"Scroll Container\" → \"Exists when more records than loaded\""
module: "Reports"
page: "Reports"
section: "Standard License Table"
control: "Scroll Container"
action: "Exists when more records than loaded"
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

Verify that when more records exist than are initially loaded, the table's scrollable container has `scrollHeight >= clientHeight`, confirming scroll functionality.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data with `loaded < total`.

# Test Data

Use `ReportsPage.getStandardLicenseLoadedState()` and `getReportsScrollContainer()` which walks up ancestors to find the element with `overflow-y: auto` or `scroll`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for data.
   Expected Result: The loaded-total text is visible.

2. Action: Call `getStandardLicenseLoadedState()` to get `{loaded, total}`.
   Expected Result: Runtime values retrieved.

3. Action: If `loaded < total`, call `getReportsScrollContainer()` and compare `scrollHeight` to `clientHeight`.
   Expected Result: `scrollHeight >= clientHeight`, indicating scrollable overflow.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

When more records exist than are displayed, the table is wrapped in a scrollable container.

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