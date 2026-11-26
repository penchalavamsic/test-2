---
test_id: "LIMAS-SUD-1509"
title: "To verify the functionality of \"Reports\" → \"Accessibility\" → \"Report-Type Cards\" → \"aria-pressed conveys selection, not color alone\""
module: "Reports"
page: "Reports"
section: "Accessibility"
control: "Report-Type Cards"
action: "aria-pressed conveys selection, not color alone"
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

Verify that report-type cards communicate selection state through the `aria-pressed` attribute rather than relying on color alone.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use `ReportsPage` card locators: Standard Licenses, Floating Licenses, Floating Configurations. Each is a `role="button"` element with `aria-pressed`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: All three cards are visible.

2. Action: Assert Standard Licenses has `aria-pressed="true"`.
   Expected Result: Selected state is exposed programmatically.

3. Action: Assert Floating Licenses has `aria-pressed="false"`.
   Expected Result: Unselected state is exposed programmatically.

4. Action: Assert Floating Configurations has `aria-pressed="false"`.
   Expected Result: Unselected state is exposed programmatically.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Selection state is conveyed via `aria-pressed` on all three report-type cards, satisfying WCAG 1.4.1 (Use of Color).

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