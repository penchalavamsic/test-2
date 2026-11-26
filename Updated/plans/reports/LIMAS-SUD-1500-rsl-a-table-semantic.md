---
test_id: "LIMAS-SUD-1500"
title: "To verify the functionality of \"Reports\" → \"Standard License Table\" → \"Semantic Table\" → \"role='table' with thead and tbody\""
module: "Reports"
page: "Reports"
section: "Standard License Table"
control: "Semantic Table"
action: "role='table' with thead and tbody"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that the standard-license table uses semantic HTML: `role="table"`, and contains both `<thead>` and `<tbody>` elements.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The standard-licenses API has returned data.

# Test Data

Use `ReportsPage.getStandardLicenseTable()` which returns the table locator.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the table to render.
   Expected Result: The table is visible.

2. Action: Assert the table has `role="table"`.
   Expected Result: The role attribute is "table".

3. Action: Locate `<thead>` within the table and assert it is visible.
   Expected Result: A `<thead>` element exists.

4. Action: Locate `<tbody>` within the table and assert it is visible.
   Expected Result: A `<tbody>` element exists.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The table uses semantic HTML with `role="table"`, `<thead>`, and `<tbody>` for assistive technology.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP