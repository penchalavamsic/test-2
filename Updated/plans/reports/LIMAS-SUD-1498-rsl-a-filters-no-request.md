---
test_id: "LIMAS-SUD-1498"
title: "To verify the functionality of \"Reports\" → \"Filters Panel\" → \"Expand/Collapse\" → \"No request when empty\""
module: "Reports"
page: "Reports"
section: "Filters Panel"
control: "Expand/Collapse"
action: "No request when empty"
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

Verify that expanding and collapsing the filters panel does not trigger any new standard-license API requests when no filter values have been entered.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- The initial API request has completed.

# Test Data

Use `ReportsPage.standardLicensesApiPath` (`/api/report/allstandardlicenses`) to monitor API requests. Use `expandFilters()` and `collapseFilters()`.

# Steps and Expected Results

1. Action: Navigate to the Reports page and wait for the initial API request to complete.
   Expected Result: Standard Licenses data has loaded.

2. Action: Set up a request counter that increments for every GET request to `standardLicensesApiPath`.
   Expected Result: Counter tracks API calls.

3. Action: Expand the filters panel, then collapse it.
   Expected Result: No new requests to the standard-licenses API are fired.

4. Action: Assert the request counter remains at zero from expand/collapse operations.
   Expected Result: Counter is 0.

# Network Verification

- Request URL: `/api/report/allstandardlicenses`
- Expected: No GET request is triggered by expand/collapse alone.

# Expected Final Result

Toggling the filter panel visibility does not issue additional API calls when no filter criteria are populated.

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