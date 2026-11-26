---
test_id: "LIMAS-SUD-1511"
title: "To verify the functionality of \"Reports\" → \"Accessibility\" → \"Focus Order\" → \"Focusable elements have logical tab order\""
module: "Reports"
page: "Reports"
section: "Accessibility"
control: "Focus Order"
action: "Focusable elements have logical tab order"
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

Verify that key interactive elements in the Reports page main area have `tabindex="0"` and are keyboard-reachable in a logical order: Standard Licenses card → Active tab → Deleted tab → Filters button → Export Excel button.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use `ReportsPage` locators for focusable elements: `standardLicensesCard`, `activeTab`, `deletedTab`, `filtersButton`, `exportExcelButton`.

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert each of the five focusable elements has `tabindex="0"`:
   - Standard Licenses card
   - Active tab
   - Deleted tab
   - Filters button
   - Export Excel button
   Expected Result: All five elements are keyboard-focusable.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All major interactive elements are keyboard-focusable with `tabindex="0"`, satisfying WCAG 2.1.1 (Keyboard) and 2.4.3 (Focus Order).

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