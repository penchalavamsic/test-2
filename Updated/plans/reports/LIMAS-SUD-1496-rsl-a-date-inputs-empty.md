---
test_id: "LIMAS-SUD-1496"
title: "To verify the functionality of \"Reports\" → \"Filters Panel\" → \"Date Controls\" → \"Native date inputs, empty initially\""
module: "Reports"
page: "Reports"
section: "Filters Panel"
control: "Date Controls"
action: "Native date inputs, empty initially"
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

Verify that all four date controls (Expiration Date, Maintenance Date, License Created Date, License Modified Date) use native date inputs, are enabled, and are empty on initial load.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Filters panel is expanded.

# Test Data

Use `ReportsPage` locators:
- `expirationDateInput`: `page.getByRole('textbox', { name: 'Expiration Date' })`
- `maintenanceDateInput`: `page.getByRole('textbox', { name: 'Maintenance Date' })`
- `licenseCreatedDateInput`: `page.getByRole('textbox', { name: 'License Created Date' })`
- `licenseModifiedDateInput`: `page.getByRole('textbox', { name: 'License Modified Date' })`

# Steps and Expected Results

1. Action: Navigate to the Reports page and expand the filters panel.
   Expected Result: Filter controls are visible.

2. Action: For each date input (Expiration, Maintenance, License Created, License Modified), assert it is visible, enabled, and has an empty value.
   Expected Result: All four date controls are visible, enabled, and empty.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All four date filter controls are native date inputs, enabled, and empty on initial load.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP