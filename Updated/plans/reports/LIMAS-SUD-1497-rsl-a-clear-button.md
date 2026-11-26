---
test_id: "LIMAS-SUD-1497"
title: "To verify the functionality of \"Reports\" → \"Filters Panel\" → \"Clear Button\" → \"Visible and clickable with empty controls\""
module: "Reports"
page: "Reports"
section: "Filters Panel"
control: "Clear Button"
action: "Visible and clickable with empty controls"
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

Verify that the Clear button is visible and enabled, and that clicking it when all controls are empty does not disrupt the page (the loaded-total text remains visible).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Filters panel is expanded and all controls are empty.

# Test Data

Use `ReportsPage.clearFiltersButton` locator: `page.getByRole('button', { name: 'Clear' })`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and expand the filters panel.
   Expected Result: Filter controls are visible and empty.

2. Action: Assert the Clear button is visible and enabled.
   Expected Result: Clear button is interactive.

3. Action: Click the Clear button.
   Expected Result: The loaded-total text remains visible; page state is unchanged.

# Network Verification

Clicking Clear with empty controls should not trigger an API request.

# Expected Final Result

The Clear button is functional and does not break the page when controls are already empty.

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