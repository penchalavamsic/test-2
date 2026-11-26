---
test_id: "LIMAS-SUD-1491"
title: "To verify the functionality of \"Reports\" → \"Active View Toolbar\" → \"License Mode Group\" → \"Wrap tabs with accessible name\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "License Mode Group"
action: "Wrap tabs with accessible name"
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

Verify that the Active and Deleted tabs are wrapped in a `role="group"` element with `aria-label="License mode"`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and `ReportsPage.licenseModeGroup` locator: `page.getByRole('group', { name: 'License mode' })`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the license-mode group is visible.
   Expected Result: The group element is present.

3. Action: Assert the group has `aria-label="License mode"`.
   Expected Result: The accessible name is "License mode".

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Active/Deleted tabs are grouped with `role="group"` and an accessible name of "License mode".

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