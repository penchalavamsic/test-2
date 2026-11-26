---
test_id: "LIMAS-SUD-1495"
title: "To verify the functionality of \"Reports\" → \"Filters Panel\" → \"Profile Role\" → \"Disabled with placeholder 'Select a profile first'\""
module: "Reports"
page: "Reports"
section: "Filters Panel"
control: "Profile Role"
action: "Disabled with placeholder 'Select a profile first'"
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

Verify that the Profile Role searchbox is disabled on initial load and has the placeholder text "Select a profile first".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Filters panel is expanded.

# Test Data

Use `ReportsPage.profileRoleSearchbox` locator: `page.getByRole('searchbox', { name: 'Select a profile first' })`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and expand the filters panel.
   Expected Result: Filter controls are visible.

2. Action: Assert the Profile Role searchbox is visible.
   Expected Result: The control is present.

3. Action: Assert the Profile Role searchbox is disabled.
   Expected Result: The control is not interactive.

4. Action: Assert the placeholder text is "Select a profile first".
   Expected Result: The placeholder communicates the dependency.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Profile Role filter is disabled with placeholder "Select a profile first", indicating it requires a product profile selection first.

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