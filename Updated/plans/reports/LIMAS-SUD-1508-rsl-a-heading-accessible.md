---
test_id: "LIMAS-SUD-1508"
title: "To verify the functionality of \"Reports\" → \"Accessibility\" → \"Heading\" → \"Only h1 with accessible text 'Reports'\""
module: "Reports"
page: "Reports"
section: "Accessibility"
control: "Heading"
action: "Only h1 with accessible text 'Reports'"
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

Verify that the Reports heading is the only `h1` on the page and has an accessible name of "Reports" for assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use `ReportsPage.heading` locator: `page.getByRole('heading', { name: 'Reports', level: 1 })` and `toHaveAccessibleName('Reports')`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the heading.
   Expected Result: The `h1` heading "Reports" is visible.

2. Action: Assert the heading has accessible name "Reports".
   Expected Result: Screen readers receive "Reports" as the accessible name.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Reports page has a single `h1` heading with accessible text "Reports".

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