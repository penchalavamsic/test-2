---
test_id: "LIMAS-SUD-1493"
title: "To verify the functionality of \"Reports\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Visible and enabled without activation\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Visible and enabled without activation"
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

Verify that the Export Excel button is visible, enabled, and labeled "Export Excel" without requiring any prior user action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and `ReportsPage.exportExcelButton` locator: `page.getByRole('button', { name: 'Export Excel' })`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the Export Excel button is visible.
   Expected Result: The button is present in the toolbar.

3. Action: Assert the Export Excel button is enabled.
   Expected Result: The button is interactive without any prior activation step.

4. Action: Assert the button text is "Export Excel".
   Expected Result: The label is correct.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Export Excel button is immediately visible, enabled, and labeled "Export Excel" on page load.

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