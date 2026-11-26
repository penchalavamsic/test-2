---
test_id: "LIMAS-SUD-1487"
title: "To verify the functionality of \"Reports\" → \"Report-Type Cards\" → \"Selection\" → \"Exactly one card is selected at all times\""
module: "Reports"
page: "Reports"
section: "Report-Type Cards"
control: "Selection"
action: "Exactly one card is selected at all times"
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

Verify that on initial load exactly one report-type card has `aria-pressed="true"` and that the selected card is "Standard Licenses".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and `ReportsPage.getSelectedReportType()` which scans all three cards for `aria-pressed="true"`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The Reports page loads with all three cards visible.

2. Action: Call `getSelectedReportType()` to determine which card is selected.
   Expected Result: The returned text contains "Standard Licenses".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Exactly one report-type card is selected (aria-pressed="true") and it is the Standard Licenses card.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP