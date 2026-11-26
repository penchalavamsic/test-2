---
test_id: "LIMAS-SUD-1490"
title: "To verify the functionality of \"Reports\" → \"Active View Toolbar\" → \"License Mode Tabs\" → \"Active tab selected, Deleted tab unselected\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "License Mode Tabs"
action: "Active tab selected, Deleted tab unselected"
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

Verify that on initial load the Active tab has `aria-pressed="true"` and the Deleted tab has `aria-pressed="false"`, and that both are visible and enabled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and `ReportsPage` locators:
- `activeTab`: `page.getByRole('button', { name: 'Active' })`
- `deletedTab`: `page.getByRole('button', { name: 'Deleted' })`

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the Active tab is visible, enabled, and has `aria-pressed="true"`.
   Expected Result: Active tab is selected.

3. Action: Assert the Deleted tab is visible, enabled, and has `aria-pressed="false"`.
   Expected Result: Deleted tab is unselected.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Active license-mode tab is the default selection; the Deleted tab is visible but unselected.

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