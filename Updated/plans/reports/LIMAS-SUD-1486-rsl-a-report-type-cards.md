---
test_id: "LIMAS-SUD-1486"
title: "To verify the functionality of \"Reports\" → \"Report-Type Cards\" → \"Cards\" → \"Display three cards with labels and aria-pressed\""
module: "Reports"
page: "Reports"
section: "Report-Type Cards"
control: "Cards"
action: "Display three cards with labels and aria-pressed"
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

Verify that three report-type cards — Standard Licenses, Floating Licenses, and Floating Configurations — are visible with their labels and that Standard Licenses is the initially selected card (`aria-pressed="true"`).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and the `ReportsPage` card locators:
- `standardLicensesCard`: `page.getByRole('button', { name: /Standard Licenses/ })`
- `floatingLicensesCard`: `page.getByRole('button', { name: /Floating Licenses/ })`
- `floatingConfigurationsCard`: `page.getByRole('button', { name: /Floating Configurations/ })`

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the Standard Licenses card is visible, contains text "Standard Licenses", and has `aria-pressed="true"`.
   Expected Result: Standard Licenses card is selected.

3. Action: Assert the Floating Licenses card is visible, contains text "Floating Licenses", and has `aria-pressed="false"`.
   Expected Result: Floating Licenses card is unselected.

4. Action: Assert the Floating Configurations card is visible, contains text "Floating Configurations", and has `aria-pressed="false"`.
   Expected Result: Floating Configurations card is unselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Three report-type cards render with correct labels and Standard Licenses is the active selection.

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