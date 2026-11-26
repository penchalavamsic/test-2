---
test_id: "LIMAS-SUD-1483"
title: "To verify the functionality of \"Reports\" → \"Page Shell\" → \"Heading\" → \"Display h1 'Reports'\""
module: "Reports"
page: "Reports"
section: "Page Shell"
control: "Heading"
action: "Display h1 'Reports'"
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

Verify that the Reports page heading is an `h1` element with the exact text "Reports".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and the `ReportsPage.heading` locator: `page.getByRole('heading', { name: 'Reports', level: 1 })`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the heading to be visible.
   Expected Result: The heading is visible.

2. Action: Assert the heading's text content.
   Expected Result: The heading text is exactly "Reports".

3. Action: Assert the heading's HTML tag name.
   Expected Result: The element's tag name is `h1`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Reports page displays a single `h1` heading with accessible text "Reports".

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