---
test_id: "LIMAS-SUD-1492"
title: "To verify the functionality of \"Reports\" → \"Active View Toolbar\" → \"Filters Button\" → \"Visible, enabled, toggles filter panel\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Filters Button"
action: "Visible, enabled, toggles filter panel"
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

Verify that the Filters button is visible and enabled, and clicking it toggles the filter panel (expands to show controls, collapses to hide them).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.

# Test Data

Use environment variables and `ReportsPage` methods:
- `getFiltersButton()` → returns the Filters button locator
- `expandFilters()` → clicks button and waits for Email searchbox visibility
- `collapseFilters()` → clicks button and waits for Email searchbox hidden

# Steps and Expected Results

1. Action: Navigate to the Reports page.
   Expected Result: The heading is visible.

2. Action: Assert the Filters button is visible and enabled.
   Expected Result: Filters button is interactive.

3. Action: Click the Filters button to expand the panel.
   Expected Result: The Email searchbox filter control becomes visible.

4. Action: Click the Filters button again to collapse the panel.
   Expected Result: The Email searchbox filter control becomes hidden.

# Network Verification

Verify that expanding/collapsing the filters panel does not trigger an API request (verified in LIMAS-SUD-1498).

# Expected Final Result

The Filters button toggles the filter panel: expanded shows filter controls, collapsed hides them.

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