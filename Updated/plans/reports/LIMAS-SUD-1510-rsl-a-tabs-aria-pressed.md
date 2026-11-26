---
test_id: "LIMAS-SUD-1510"
title: "To verify the functionality of \"Reports\" → \"Accessibility\" → \"License Mode Tabs\" → \"aria-pressed conveys tab selection\""
module: "Reports"
page: "Reports"
section: "Accessibility"
control: "License Mode Tabs"
action: "aria-pressed conveys tab selection"
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

Verify that the Active and Deleted tabs use `aria-pressed` to communicate selection state to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use `ReportsPage` locators:
- `activeTab`: `page.getByRole('button', { name: 'Active' })`
- `deletedTab`: `page.getByRole('button', { name: 'Deleted' })`

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the Active tab has `aria-pressed="true"`.
   Expected Result: Active tab selection is conveyed programmatically.

3. Action: Assert the Deleted tab has `aria-pressed="false"`.
   Expected Result: Deleted tab unselected state is conveyed programmatically.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Active/Deleted tab selection state is exposed via `aria-pressed`, satisfying WCAG 4.1.2 (Name, Role, Value).

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